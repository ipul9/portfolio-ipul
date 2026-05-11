import { getPrototypes, getAllStacks } from "@/lib/registry";
import PortfolioGrid from "@/components/PortfolioGrid";

export default function Home() {
  const prototypes = getPrototypes();
  const stacks = getAllStacks(prototypes);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900">Prototype Portfolio</h1>
        <p className="mt-2 text-sm text-gray-500">
          Kumpulan prototype yang saya buat — eksplorasi berbagai tech stack dan ide produk.
        </p>
      </div>
      <PortfolioGrid prototypes={prototypes} stacks={stacks} />
    </main>
  );
}
