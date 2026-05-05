import Link from "next/link";

interface WorkflowCardProps {
  id: string;
  title: string;
  description: string;
  skills: string[];
  href: string;
  available: boolean;
}

export default function WorkflowCard({
  id,
  title,
  description,
  skills,
  href,
  available,
}: WorkflowCardProps) {
  const inner = (
    <div
      className={[
        "flex items-start gap-5 p-5 rounded-xl border transition-all",
        available
          ? "bg-[#0C0C0C] border-[#1A1A1A] hover:border-[#2A2A2A] hover:bg-[#111111] cursor-pointer"
          : "bg-[#0A0A0A] border-[#141414] opacity-50 cursor-not-allowed",
      ].join(" ")}
    >
      {/* Letter badge */}
      <div
        className={[
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold border",
          available
            ? "bg-[#1A0800] text-ember border-[#FF450033]"
            : "bg-[#111] text-[#444] border-[#1A1A1A]",
        ].join(" ")}
      >
        {id}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[#F0EDE8]">{title}</span>
          <span
            className={[
              "text-[9px] tracking-widest uppercase px-2 py-1 rounded-full border",
              available
                ? "text-[#4ADE80] border-[#4ADE8033] bg-[#4ADE8011]"
                : "text-[#333] border-[#1F1F1F]",
            ].join(" ")}
          >
            {available ? "Disponible" : "Próximamente"}
          </span>
        </div>

        <p className="text-xs text-[#666] leading-relaxed mb-3">
          {description}
        </p>

        <div className="flex gap-2 flex-wrap">
          {skills.map((s) => (
            <span
              key={s}
              className="text-[9px] tracking-wide px-2 py-1 border border-[#1F1F1F] rounded-full text-[#444]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (!available) return inner;
  return (
    <Link href={href} className="block">
      {inner}
    </Link>
  );
}
