import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkEntries, getWorkContent } from "@/lib/work";

export async function generateStaticParams() {
  return getWorkEntries().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkEntries().find((w) => w.slug === slug);
  if (!entry) return { title: "Not found" };
  return {
    title: `${entry.title} — Ipul Rifai`,
    description: entry.summary,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkEntries().find((w) => w.slug === slug);
  if (!entry) notFound();

  const content = getWorkContent(slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/work" className="text-xs text-gray-500 hover:text-gray-900">
        ← back to work
      </Link>

      <header className="mt-6 flex flex-col gap-3 border-b border-gray-100 pb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
          {entry.anonymized ? "Confidential client" : entry.client} · {entry.year}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {entry.title}
        </h1>
        <p className="text-base leading-relaxed text-gray-600">{entry.summary}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {entry.stack.map((tech) => (
            <span key={tech} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {tech}
            </span>
          ))}
        </div>
      </header>

      {content ? (
        <article className="mt-10 flex flex-col gap-8">
          {content.sections.map((section, i) => (
            <section key={i} className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-gray-900">{section.heading}</h2>
              <p className="whitespace-pre-line text-base leading-relaxed text-gray-600">
                {section.body}
              </p>
            </section>
          ))}

          {content.links && (content.links.demo || content.links.source) && (
            <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-6">
              {content.links.demo && (
                <a
                  href={content.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Live demo →
                </a>
              )}
              {content.links.source && (
                <a
                  href={content.links.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400"
                >
                  Source code →
                </a>
              )}
            </div>
          )}
        </article>
      ) : (
        <p className="mt-10 text-sm text-gray-500">
          Detail case study sedang ditulis.
        </p>
      )}
    </main>
  );
}
