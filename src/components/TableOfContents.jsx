import { useCallback } from "react";

export default function TableOfContents({ headings }) {
  if (!headings?.length) return null;

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <div className="group flex items-center">
        <div
          className={[
            "mr-2 max-w-56",
            "opacity-0 translate-x-3 scale-[0.97]",
            "group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100",
            "transition-all duration-300 ease-out",
            "pointer-events-none group-hover:pointer-events-auto",
          ].join(" ")}
        >
          <div className="bg-white/75 dark:bg-neutral-900/75 backdrop-blur-xl rounded-xl border border-gray-200/50 dark:border-neutral-700/50 px-5 py-4 shadow-lg shadow-black/[0.04] dark:shadow-black/20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-app-muted mb-3 select-none">
              Contents
            </p>
            <nav aria-label="Table of contents">
              <ul className="space-y-1.5">
                {headings.map((h) => (
                  <li key={h.id}>
                    <button
                      onClick={() => scrollTo(h.id)}
                      className={[
                        "text-[13px] leading-snug text-app-muted",
                        "hover:text-app-primary transition-colors duration-200",
                        "text-left w-full cursor-pointer",
                        h.level === 3 ? "pl-3 text-[12px]" : "",
                      ].join(" ")}
                    >
                      {h.text}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="pl-6 pr-5 py-8 cursor-default">
          <div
            className={[
              "w-[3px] h-36 rounded-full",
              "bg-gray-300 dark:bg-neutral-600",
              "opacity-20 group-hover:opacity-50",
              "transition-opacity duration-300",
            ].join(" ")}
          />
        </div>
      </div>
    </div>
  );
}
