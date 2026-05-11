import { Prototype } from "@/lib/registry";

const statusConfig = {
  live: { label: "Live", className: "bg-green-100 text-green-700" },
  wip: { label: "WIP", className: "bg-yellow-100 text-yellow-700" },
  archived: { label: "Archived", className: "bg-gray-100 text-gray-500" },
};

export default function PrototypeCard({ proto }: { proto: Prototype }) {
  const status = statusConfig[proto.status];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900">{proto.title}</h2>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${status.className}`}>
          {status.label}
        </span>
      </div>

      <p className="text-sm text-gray-500 leading-relaxed">{proto.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {proto.stack.map((tech) => (
          <span key={tech} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-3 pt-2">
        {proto.demo_url && (
          <a
            href={proto.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            Live Demo
          </a>
        )}
        <a
          href={`https://github.com/ipul9/portfolio-ipul/tree/main/${proto.github_path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-gray-500 hover:underline"
        >
          Source
        </a>
      </div>
    </div>
  );
}
