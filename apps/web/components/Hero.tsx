import Link from "next/link";

export default function Hero() {
  return (
    <section className="border-b border-gray-100 bg-gradient-to-b from-indigo-50/40 to-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-20 sm:py-28">
        <span className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700">
          Available for freelance & contract work
        </span>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Hi, saya <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ipul Rifai</span>.
        </h1>

        <p className="max-w-2xl text-lg text-gray-600 sm:text-xl">
          Full-stack developer yang fokus membangun{" "}
          <span className="font-medium text-gray-900">internal tools & SaaS</span>{" "}
          untuk small-medium businesses — dengan Next.js, Supabase, dan Google Apps Script.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/work"
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Lihat case study
          </Link>
          <Link
            href="#prototypes"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-400"
          >
            Lihat prototype
          </Link>
          <a
            href="mailto:ipulrifai@gmail.com"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Hubungi saya →
          </a>
        </div>
      </div>
    </section>
  );
}
