import RoiNav from "@/components/roi/RoiNav";

export const metadata = { title: "ROI Dashboard — Demo" };

export default function RoiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <RoiNav />
      <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
    </div>
  );
}
