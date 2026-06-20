import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({
  label,
  error,
  options,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s/g, "-");

  return (
    <label className="flex flex-col gap-1.5" htmlFor={selectId}>
      <span className="text-sm font-medium text-brand-800">{label}</span>
      <select
        id={selectId}
        className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-brand-950 transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 ${
          error ? "border-red-300" : "border-brand-200"
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
