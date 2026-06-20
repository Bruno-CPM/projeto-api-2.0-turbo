interface AlertProps {
  type?: "error" | "success" | "info";
  message: string;
}

const styles = {
  error: "border-red-200 bg-red-50 text-red-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  info: "border-brand-200 bg-brand-50 text-brand-800",
};

export function Alert({ type = "info", message }: AlertProps) {
  if (!message) return null;

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}
