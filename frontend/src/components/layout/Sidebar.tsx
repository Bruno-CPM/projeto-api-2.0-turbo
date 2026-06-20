"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Início", icon: "⌂" },
  { href: "/dashboard/medicos", label: "Médicos", icon: "⚕" },
  { href: "/dashboard/pacientes", label: "Pacientes", icon: "👤" },
  { href: "/dashboard/consultas", label: "Consultas", icon: "📅" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-brand-100 bg-white lg:block">
      <div className="border-b border-brand-100 px-6 py-6">
        <p className="font-display text-2xl font-semibold text-brand-900">
          Clínica
        </p>
        <p className="text-sm text-brand-500">Cadastro API</p>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/dashboard" && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-brand-600 text-white shadow-sm"
                  : "text-brand-700 hover:bg-brand-50"
              }`}
              href={link.href}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
