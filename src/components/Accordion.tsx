"use client";

import { useState } from "react";
import { ChevronDown } from "./Icons";

export interface QA {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-outline-variant bg-clinical-white"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-on-surface transition-colors hover:text-primary"
            >
              {item.q}
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-primary-container transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-outline-variant px-5 py-4 text-on-surface-variant">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
