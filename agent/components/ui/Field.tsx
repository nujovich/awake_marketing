"use client";

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  tag?: "input" | "textarea" | "select";
  options?: string[];
  required?: boolean;
}

const baseClass =
  "w-full bg-[#0E0E0E] border border-[#1F1F1F] rounded-md px-3 py-2.5 text-[#F0EDE8] text-[13px] font-mono outline-none transition-colors";

export default function Field({
  label,
  value,
  onChange,
  placeholder,
  tag = "input",
  options,
  required,
}: FieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-[10px] tracking-[2px] uppercase text-[#666] mb-1.5">
        {label}
        {required && " *"}
      </label>

      {tag === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClass} cursor-pointer`}
        >
          {options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : tag === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className={`${baseClass} resize-vertical`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
