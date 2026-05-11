"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/roi", label: "Dashboard" },
  { href: "/roi/platform", label: "Platform" },
  { href: "/roi/product", label: "Produk" },
];

export default function RoiNav() {
  const path = usePathname();
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-2 py-2 sm:h-14 sm:flex-row sm:items-center sm:gap-6 sm:py-0">
          <div className="flex items-center gap-2 sm:mr-4">
            <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">R</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">ROI Dashboard</span>
            <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">Demo</span>
            <span className="ml-auto text-[10px] text-gray-400 sm:hidden">Data dummy</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto -mx-1 px-1 sm:mx-0 sm:px-0">
            {NAV.map(({ href, label }) => {
              const active = path === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="ml-auto hidden text-xs text-gray-400 sm:block">Data: dummy · Periode max 2026-05-10</div>
        </div>
      </div>
    </header>
  );
}
