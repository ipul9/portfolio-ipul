import { getPrototypes, getAllStacks } from "@/lib/registry";
import PortfolioGrid from "@/components/PortfolioGrid";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  const prototypes = getPrototypes();
  const stacks = getAllStacks(prototypes);

  return (
    <>
      <Hero />
      <About />

      <section id="prototypes" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Prototypes</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-500">
              Eksplorasi & demo singkat berbagai tech stack — versi compact dari konsep yang bisa dibangun lebih dalam saat dibutuhkan.
            </p>
          </div>
          <PortfolioGrid prototypes={prototypes} stacks={stacks} />
        </div>
      </section>
    </>
  );
}
