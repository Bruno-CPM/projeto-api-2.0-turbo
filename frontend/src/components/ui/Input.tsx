import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s/g, "-");

  return (
    <label className="flex flex-col gap-1.5" htmlFor={inputId}>
      <span className="text-sm font-medium text-brand-800">{label}</span>
      <input
        id={inputId}
        className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-brand-950 transition placeholder:text-brand-300 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 ${
          error ? "border-red-300" : "border-brand-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
