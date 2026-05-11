export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 border-t border-gray-100 bg-gray-50">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Get in touch</h2>
          <p className="max-w-md text-base text-gray-600">
            Punya project internal tool, SaaS, atau automation yang perlu dibangun?
            Email saya — biasanya saya balas dalam 1-2 hari kerja.
          </p>
          <a
            href="mailto:ipulrifai@gmail.com"
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            ipulrifai@gmail.com
          </a>
        </div>

        <ul className="flex flex-col gap-2 text-sm text-gray-600 sm:text-right">
          <li>
            <a
              href="https://github.com/ipul9"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900"
            >
              GitHub — @ipul9
            </a>
          </li>
          <li>
            <a
              href="mailto:ipulrifai@gmail.com"
              className="hover:text-gray-900"
            >
              Email
            </a>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200/70">
        <div className="mx-auto max-w-5xl px-6 py-4 text-xs text-gray-400">
          © {new Date().getFullYear()} Ipul Rifai. Built with Next.js & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
