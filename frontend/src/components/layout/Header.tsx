"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";
import { Button } from "@/components/ui/Button";

const mobileLinks = [
  { href: "/dashboard", label: "Início" },
  { href: "/dashboard/medicos", label: "Médicos" },
  { href: "/dashboard/pacientes", label: "Pacientes" },
  { href: "/dashboard/consultas", label: "Consultas" },
];

export function Header({ title }: { title: string }) {
  const router = useRouter();
  const pathname = usePathname();

  function logout() {
    clearToken();
    router.push("/login");
  }

  return (
    <header className="border-b border-brand-100 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
            Painel administrativo
          </p>
          <h1 className="font-display text-2xl font-semibold text-brand-900">
            {title}
          </h1>
        </div>
        <Button variant="secondary" onClick={logout}>
          Sair
        </Button>
      </div>
      <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href))
                ? "bg-brand-600 text-white"
                : "bg-brand-50 text-brand-700"
            }`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
