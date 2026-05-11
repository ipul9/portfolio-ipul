import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold tracking-tight text-white"
            style={{
              background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            }}
          >
            IR
          </span>
          <span className="text-sm font-semibold text-gray-900">Ipul Rifai</span>
        </Link>

        <ul className="flex items-center gap-1 text-sm text-gray-600 sm:gap-2">
          <li>
            <Link href="/#about" className="rounded px-2 py-1 hover:text-gray-900 hover:bg-gray-100">
              About
            </Link>
          </li>
          <li>
            <Link href="/work" className="rounded px-2 py-1 hover:text-gray-900 hover:bg-gray-100">
              Work
            </Link>
          </li>
          <li>
            <Link href="/#prototypes" className="rounded px-2 py-1 hover:text-gray-900 hover:bg-gray-100">
              Prototypes
            </Link>
          </li>
          <li>
            <Link href="/#contact" className="rounded px-2 py-1 hover:text-gray-900 hover:bg-gray-100">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
