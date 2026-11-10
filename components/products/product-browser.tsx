"use client";

import { useMemo, useState } from "react";
import { catalogueCategories } from "@/lib/catalogue";
import {
  getCategoryTitle,
  getGroupName,
  products,
  type ProductCategoryId,
} from "@/lib/products";
import { ProductGroupSection } from "@/components/products/product-group-section";

type ProductBrowserProps = {
  initialCategory?: string;
  initialGroup?: string;
  initialQuery?: string;
};

function isCategory(value: string | undefined): value is ProductCategoryId {
  return value === "dental" || value === "orthopedic" || value === "orthodontic";
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
          : "rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
      }
    >
      {children}
    </button>
  );
}

export function ProductBrowser({
  initialCategory = "all",
  initialGroup = "all",
  initialQuery = "",
}: ProductBrowserProps) {
  const [category, setCategory] = useState(isCategory(initialCategory) ? initialCategory : "all");
  const [group, setGroup] = useState(initialGroup);
  const [query, setQuery] = useState(initialQuery);

  const groupOptions = useMemo(() => {
    return catalogueCategories
      .filter((item) => category === "all" || item.id === category)
      .flatMap((item) => item.groups);
  }, [category]);

  const activeGroup = groupOptions.some((item) => item.id === group) ? group : "all";

  const visibleCategories = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return catalogueCategories
      .filter((item) => category === "all" || item.id === category)
      .map((item) => ({
        ...item,
        groups: item.groups
          .filter((entry) => activeGroup === "all" || entry.id === activeGroup)
          .map((entry) => ({
            ...entry,
            products: products.filter((product) => {
              if (product.groupId !== entry.id) {
                return false;
              }
              if (!normalized) {
                return true;
              }
              const haystack = [
                product.name,
                product.catalogueCode,
                product.figure,
                product.overview,
                getGroupName(product.groupId),
                getCategoryTitle(product.categoryId),
                ...product.specs.map((spec) => `${spec.label} ${spec.value}`),
              ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
              return haystack.includes(normalized);
            }),
          }))
          .filter((entry) => entry.products.length > 0),
      }))
      .filter((item) => item.groups.length > 0);
  }, [activeGroup, category, query]);

  const count = visibleCategories.reduce(
    (total, item) => total + item.groups.reduce((sum, entry) => sum + entry.products.length, 0),
    0,
  );
  const filtersActive = category !== "all" || activeGroup !== "all" || query.trim() !== "";

  function reset() {
    setCategory("all");
    setGroup("all");
    setQuery("");
  }

  function selectCategory(next: ProductCategoryId | "all") {
    setCategory(next);
    setGroup("all");
  }

  return (
    <section id="catalogue" className="scroll-mt-28">
      <div className="sticky top-16 z-30 rounded-2xl border border-line bg-white/95 p-4 shadow-sm backdrop-blur-sm xl:top-[4.5rem]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Browse the catalogue
            </h2>
            <p className="mt-1 text-sm text-muted">
              {count} {count === 1 ? "instrument" : "instruments"}
            </p>
          </div>
          <label className="sr-only" htmlFor="product-search">
            Search instruments
          </label>
          <input
            id="product-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by instrument name"
            className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-navy outline-none placeholder:text-muted focus:border-blue lg:max-w-sm"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Category">
          <FilterButton active={category === "all"} onClick={() => selectCategory("all")}>
            All categories
          </FilterButton>
          {catalogueCategories.map((item) => (
            <FilterButton
              key={item.id}
              active={category === item.id}
              onClick={() => selectCategory(item.id)}
            >
              {item.title}
            </FilterButton>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Instrument group">
          <FilterButton active={activeGroup === "all"} onClick={() => setGroup("all")}>
            All groups
          </FilterButton>
          {groupOptions.map((item) => (
            <FilterButton
              key={item.id}
              active={activeGroup === item.id}
              onClick={() => setGroup(item.id)}
            >
              {item.name}
            </FilterButton>
          ))}
        </div>

        {filtersActive ? (
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-semibold text-blue hover:text-blue-deep"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {count === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-ice px-6 py-10 text-center">
          <p className="text-lg font-semibold text-navy">No instruments match these filters.</p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 text-sm font-semibold text-blue hover:text-blue-deep"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-12 space-y-16">
          {visibleCategories.map((item) => (
            <section key={item.id} id={item.id} className="scroll-mt-40">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
                  Category
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-navy/70">{item.summary}</p>
              </div>
              <div className="mt-8 space-y-12">
                {item.groups.map((entry) => (
                  <ProductGroupSection
                    key={entry.id}
                    id={entry.id}
                    title={entry.name}
                    products={entry.products}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
