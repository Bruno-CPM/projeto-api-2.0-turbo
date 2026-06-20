"use client";

import { FormEvent, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Alert } from "@/components/ui/Alert";
import {
  ESPECIALIDADES,
  type DadosDetalhesConsulta,
  type DadosListagemMedico,
  type DadosListagemPaciente,
  type Especialidade,
} from "@/lib/types";
import { formatEspecialidade, toApiDateTime, toDateTimeLocalValue } from "@/lib/utils";

export default function ConsultasPage() {
  const [pacientes, setPacientes] = useState<DadosListagemPaciente[]>([]);
  const [medicos, setMedicos] = useState<DadosListagemMedico[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resultado, setResultado] = useState<DadosDetalhesConsulta | null>(null);
  const [usarMedicoEspecifico, setUsarMedicoEspecifico] = useState(true);

  const minDate = toDateTimeLocalValue(
    new Date(Date.now() + 31 * 60 * 1000)
  );

  const [form, setForm] = useState({
    idPaciente: "",
    idMedico: "",
    especialidade: "PEDIATRIA" as Especialidade,
    data: minDate,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [pacientesData, medicosData] = await Promise.all([
          api.listarPacientes(0, 100),
          api.listarMedicos(0, 100),
        ]);
        setPacientes(pacientesData.content);
        setMedicos(medicosData.content);

        if (pacientesData.content[0]) {
          setForm((prev) => ({
            ...prev,
            idPaciente: String(pacientesData.content[0].id),
          }));
        }
        if (medicosData.content[0]) {
          setForm((prev) => ({
            ...prev,
            idMedico: String(medicosData.content[0].id),
            especialidade: medicosData.content[0].especialidade,
          }));
        }
      } catch (err) {
        setError(
          err instanceof ApiError
            ? err.message
            : "Erro ao carregar dados para agendamento"
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    setResultado(null);

    try {
      const payload = {
        idPaciente: Number(form.idPaciente),
        data: toApiDateTime(form.data),
        ...(usarMedicoEspecifico
          ? { idMedico: Number(form.idMedico) }
          : { idMedico: null, especialidade: form.especialidade }),
      };

      const consulta = await api.agendarConsulta(payload);
      setResultado(consulta);
      setSuccess("Consulta agendada com sucesso!");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao agendar consulta");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Header title="Consultas" />
      <main className="flex-1 p-4 lg:p-8">
        <div className="mx-auto max-w-2xl">
          <p className="mb-6 text-sm text-brand-600">
            Agende consultas com antecedência mínima de 30 minutos, em horário
            comercial (segunda a sábado, 07h às 18h).
          </p>

          {error && <div className="mb-4"><Alert type="error" message={error} /></div>}
          {success && <div className="mb-4"><Alert type="success" message={success} /></div>}

          <form
            className="space-y-5 rounded-2xl bg-white p-6 shadow-card"
            onSubmit={handleSubmit}
          >
            {loading ? (
              <p className="text-sm text-brand-500">Carregando dados...</p>
            ) : (
              <>
                <Select
                  label="Paciente"
                  value={form.idPaciente}
                  onChange={(e) =>
                    setForm({ ...form, idPaciente: e.target.value })
                  }
                  options={[
                    { value: "", label: "Selecione um paciente" },
                    ...pacientes.map((p) => ({
                      value: String(p.id),
                      label: `${p.nome} (${p.cpf})`,
                    })),
                  ]}
                  required
                />

                <div className="rounded-xl border border-brand-100 p-4">
                  <label className="flex items-center gap-3 text-sm font-medium text-brand-800">
                    <input
                      checked={usarMedicoEspecifico}
                      className="h-4 w-4 accent-brand-600"
                      onChange={(e) => setUsarMedicoEspecifico(e.target.checked)}
                      type="checkbox"
                    />
                    Escolher médico específico
                  </label>

                  {usarMedicoEspecifico ? (
                    <div className="mt-4">
                      <Select
                        label="Médico"
                        value={form.idMedico}
                        onChange={(e) =>
                          setForm({ ...form, idMedico: e.target.value })
                        }
                        options={[
                          { value: "", label: "Selecione um médico" },
                          ...medicos.map((m) => ({
                            value: String(m.id),
                            label: `${m.nome} - ${formatEspecialidade(m.especialidade)}`,
                          })),
                        ]}
                        required
                      />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <Select
                        label="Especialidade"
                        value={form.especialidade}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            especialidade: e.target.value as Especialidade,
                          })
                        }
                        options={ESPECIALIDADES.map((e) => ({
                          value: e,
                          label: formatEspecialidade(e),
                        }))}
                      />
                      <p className="mt-2 text-xs text-brand-500">
                        A API escolherá um médico disponível para a especialidade.
                      </p>
                    </div>
                  )}
                </div>

                <Input
                  label="Data e hora"
                  type="datetime-local"
                  value={form.data}
                  min={minDate}
                  onChange={(e) => setForm({ ...form, data: e.target.value })}
                  required
                />

                <Button className="w-full" loading={saving} type="submit">
                  Agendar consulta
                </Button>
              </>
            )}
          </form>

          {resultado && (
            <section className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
              <h3 className="font-semibold">Consulta confirmada</h3>
              <p className="mt-2">ID: {resultado.id}</p>
              <p>Médico: {resultado.idMedico}</p>
              <p>Paciente: {resultado.idPaciente}</p>
              <p>Data: {new Date(resultado.data).toLocaleString("pt-BR")}</p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
