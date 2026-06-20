"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Header } from "@/components/layout/Header";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    medicos: 0,
    pacientes: 0,
    loading: true,
  });

  useEffect(() => {
    async function load() {
      try {
        const [medicos, pacientes] = await Promise.all([
          api.listarMedicos(0, 1),
          api.listarPacientes(0, 1),
        ]);
        setStats({
          medicos: medicos.totalElements,
          pacientes: pacientes.totalElements,
          loading: false,
        });
      } catch {
        setStats((prev) => ({ ...prev, loading: false }));
      }
    }
    load();
  }, []);

  const cards = [
    {
      title: "Médicos ativos",
      value: stats.loading ? "..." : stats.medicos,
      href: "/dashboard/medicos",
      color: "bg-brand-600",
    },
    {
      title: "Pacientes ativos",
      value: stats.loading ? "..." : stats.pacientes,
      href: "/dashboard/pacientes",
      color: "bg-emerald-600",
    },
    {
      title: "Agendar consulta",
      value: "Nova",
      href: "/dashboard/consultas",
      color: "bg-amber-600",
    },
  ];

  return (
    <>
      <Header title="Visão geral" />
      <main className="flex-1 p-4 lg:p-8">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.href}
              className="group rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
              href={card.href}
            >
              <div
                className={`mb-4 inline-flex rounded-xl px-3 py-1 text-xs font-semibold text-white ${card.color}`}
              >
                {card.title}
              </div>
              <p className="font-display text-4xl font-semibold text-brand-900">
                {card.value}
              </p>
              <p className="mt-3 text-sm text-brand-500 group-hover:text-brand-700">
                Acessar módulo →
              </p>
            </Link>
          ))}
        </div>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-card">
          <h2 className="font-display text-xl font-semibold text-brand-900">
            Como usar
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-brand-700">
            <li>1. Cadastre médicos e pacientes nos respectivos módulos.</li>
            <li>2. Agende consultas escolhendo paciente, médico ou especialidade.</li>
            <li>3. A API deve estar rodando em http://localhost:8080.</li>
          </ul>
        </section>
      </main>
    </>
  );
}
