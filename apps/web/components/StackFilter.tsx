"use client";

export default function StackFilter({
  stacks,
  active,
  onChange,
}: {
  stacks: string[];
  active: string | null;
  onChange: (stack: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          active === null
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {stacks.map((stack) => (
        <button
          key={stack}
          onClick={() => onChange(active === stack ? null : stack)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition ${
            active === stack
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {stack}
        </button>
      ))}
    </div>
  );
}
