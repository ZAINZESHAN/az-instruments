"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { getCategoryTitle, products } from "@/lib/products";

type SearchResult = {
  id: string;
  name: string;
  categoryTitle: string;
  href: string;
};

type CatalogueSearchProps = {
  variant?: "popover" | "inline";
  onNavigate?: () => void;
};

function catalogueResults(query: string): SearchResult[] {
  const items = products.map((product) => ({
    id: product.slug,
    name: product.name,
    categoryTitle: getCategoryTitle(product.categoryId),
    href: `/products/${product.slug}`,
  }));
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return items.slice(0, 5);
  }

  return items
    .filter(
      (item) =>
        item.name.toLowerCase().includes(normalized) ||
        item.categoryTitle.toLowerCase().includes(normalized),
    )
    .slice(0, 8);
}

function SearchField({
  query,
  onQueryChange,
  onNavigate,
  labelledBy,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onNavigate?: () => void;
  labelledBy: string;
}) {
  const results = useMemo(() => catalogueResults(query), [query]);
  const listId = useId();

  return (
    <div>
      <label htmlFor={labelledBy} className="sr-only">
        Search instruments
      </label>
      <input
        id={labelledBy}
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search instruments"
        className="h-11 w-full rounded-lg border border-line px-3 text-sm text-navy outline-none placeholder:text-muted focus:border-blue"
        role="combobox"
        aria-expanded="true"
        aria-controls={listId}
        aria-autocomplete="list"
      />
      <ul id={listId} role="listbox" className="mt-2 max-h-64 overflow-auto">
        {results.length > 0 ? (
          results.map((result) => (
            <li key={result.id} role="presentation">
              <Link
                href={result.href}
                role="option"
                aria-selected="false"
                onClick={onNavigate}
                className="block rounded-lg px-3 py-2.5 hover:bg-ice"
              >
                <span className="block text-sm font-semibold text-navy">{result.name}</span>
                <span className="mt-0.5 block text-xs text-muted">{result.categoryTitle}</span>
              </Link>
            </li>
          ))
        ) : (
          <li className="px-3 py-2.5 text-sm text-muted">No matching instruments</li>
        )}
      </ul>
      <Link
        href="/products#product-collection"
        onClick={onNavigate}
        className="mt-2 block px-3 py-2 text-sm font-semibold text-blue hover:text-blue-deep"
      >
        View all products
      </Link>
    </div>
  );
}

export function CatalogueSearch({ variant = "popover", onNavigate }: CatalogueSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (variant === "inline") {
    return (
      <SearchField
        query={query}
        onQueryChange={setQuery}
        onNavigate={onNavigate}
        labelledBy={inputId}
      />
    );
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? `${inputId}-panel` : undefined}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-navy transition hover:border-blue hover:text-blue"
        aria-label={open ? "Close search" : "Open search"}
      >
        {open ? <CloseIcon className="h-4 w-4" /> : <SearchIcon className="h-4 w-4" />}
      </button>
      {open ? (
        <div
          id={`${inputId}-panel`}
          className="absolute right-0 z-40 mt-3 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-line bg-white p-3 shadow-lg"
        >
          <SearchField
            query={query}
            onQueryChange={setQuery}
            onNavigate={() => {
              setOpen(false);
              onNavigate?.();
            }}
            labelledBy={inputId}
          />
        </div>
      ) : null}
    </div>
  );
}
