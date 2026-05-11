import Link from "next/link";
import { getWorkEntries } from "@/lib/work";

export const metadata = {
  title: "Work — Ipul Rifai",
  description: "Case study project nyata yang sudah dibangun.",
};

export default function WorkPage() {
  const entries = getWorkEntries();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-900">
          ← back to portfolio
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Work</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Case study project nyata — internal tools, SaaS, dan automation yang sudah jalan di production.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <p className="text-sm font-medium text-gray-700">Case study sedang dikurasi.</p>
          <p className="mt-1 text-sm text-gray-500">
            Sementara, lihat <Link href="/#prototypes" className="text-indigo-600 hover:underline">prototype showcase</Link> di homepage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {entries.map((w) => (
            <Link
              key={w.slug}
              href={`/work/${w.slug}`}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-base font-semibold text-gray-900">{w.title}</h2>
                <span className="shrink-0 text-xs text-gray-400">{w.year}</span>
              </div>
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                {w.anonymized ? "Confidential client" : w.client}
              </p>
              <p className="text-sm leading-relaxed text-gray-600">{w.summary}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {w.stack.map((tech) => (
                  <span key={tech} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
