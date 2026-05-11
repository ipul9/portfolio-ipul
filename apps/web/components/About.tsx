export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-gray-100 bg-white">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 sm:grid-cols-[auto_1fr] sm:gap-12">
        <div className="flex sm:block">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-2xl text-2xl font-bold tracking-tight text-white shadow-lg sm:h-32 sm:w-32 sm:text-3xl"
            style={{
              background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            }}
          >
            IR
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">About</h2>

          <p className="text-base leading-relaxed text-gray-600">
            Saya developer yang membangun software untuk operasional bisnis nyata —
            bukan demo. Fokus utama: internal tools yang reliable, scalable, dan
            sesuai workflow tim, dari HR system, POS, sampai warehouse management.
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            Stack yang saya pakai harian: <span className="font-medium text-gray-900">Next.js (App Router) + Supabase</span> untuk web apps,
            <span className="font-medium text-gray-900"> Google Apps Script</span> untuk automation Spreadsheet,
            dan <span className="font-medium text-gray-900">Laravel/MySQL</span> untuk modernisasi sistem legacy. Sesekali bangun
            desktop tool dengan Electron.
          </p>

          <p className="text-base leading-relaxed text-gray-600">
            Saat ini menangani beberapa sistem internal lintas banner —
            HRD, POS offline-first, WMS FEFO, ROI dashboard, dan resi tracking.
            Project nyata yang sudah jalan bisa dilihat di section{" "}
            <a href="/work" className="font-medium text-indigo-600 hover:underline">
              Work
            </a>
            , eksplorasi & demo singkat di{" "}
            <a href="#prototypes" className="font-medium text-indigo-600 hover:underline">
              Prototypes
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
