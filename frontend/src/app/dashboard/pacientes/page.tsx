"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import type { DadosListagemPaciente } from "@/lib/types";
import { formatCpf, formatPhone } from "@/lib/utils";

type FormMode = "create" | "edit";

const emptyForm = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
};

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<DadosListagemPaciente[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<FormMode>("create");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadPacientes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listarPacientes(page);
      setPacientes(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar pacientes");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadPacientes();
  }, [loadPacientes]);

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(paciente: DadosListagemPaciente) {
    setMode("edit");
    setEditingId(paciente.id);
    setForm({
      nome: paciente.nome,
      email: paciente.email,
      telefone: "",
      cpf: paciente.cpf,
    });
    setModalOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "create") {
        await api.cadastrarPaciente(form);
        setSuccess("Paciente cadastrado com sucesso.");
      } else if (editingId) {
        const payload = {
          id: editingId,
          nome: form.nome,
          email: form.email,
          ...(form.telefone ? { telefone: form.telefone } : {}),
        };
        await api.atualizarPaciente(payload);
        setSuccess("Paciente atualizado com sucesso.");
      }
      setModalOpen(false);
      await loadPacientes();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao salvar paciente");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este paciente?")) return;
    setError("");
    try {
      await api.excluirPaciente(id);
      setSuccess("Paciente excluído com sucesso.");
      await loadPacientes();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao excluir paciente");
    }
  }

  return (
    <>
      <Header title="Pacientes" />
      <main className="flex-1 p-4 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-brand-600">
            Gerencie os pacientes cadastrados na clínica.
          </p>
          <Button onClick={openCreate}>+ Novo paciente</Button>
        </div>

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-50 text-brand-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Nome</th>
                  <th className="px-5 py-4 font-semibold">CPF</th>
                  <th className="px-5 py-4 font-semibold">E-mail</th>
                  <th className="px-5 py-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-5 py-8 text-brand-500" colSpan={4}>
                      Carregando...
                    </td>
                  </tr>
                ) : pacientes.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-brand-500" colSpan={4}>
                      Nenhum paciente cadastrado.
                    </td>
                  </tr>
                ) : (
                  pacientes.map((paciente) => (
                    <tr key={paciente.id} className="border-t border-brand-100">
                      <td className="px-5 py-4 font-medium text-brand-900">
                        {paciente.nome}
                      </td>
                      <td className="px-5 py-4">{paciente.cpf}</td>
                      <td className="px-5 py-4">{paciente.email}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={() => openEdit(paciente)}>
                            Editar
                          </Button>
                          <Button variant="danger" onClick={() => handleDelete(paciente.id)}>
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-brand-100 px-5 py-4">
              <Button
                variant="secondary"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
              >
                Anterior
              </Button>
              <span className="text-sm text-brand-600">
                Página {page + 1} de {totalPages}
              </span>
              <Button
                variant="secondary"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      </main>

      <Modal
        open={modalOpen}
        title={mode === "create" ? "Novo paciente" : "Editar paciente"}
        onClose={() => setModalOpen(false)}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />
          <Input
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Telefone"
            value={form.telefone}
            onChange={(e) =>
              setForm({ ...form, telefone: formatPhone(e.target.value) })
            }
            placeholder="(11) 99999-9999"
            required={mode === "create"}
          />
          <Input
            label="CPF"
            value={form.cpf}
            onChange={(e) => setForm({ ...form, cpf: formatCpf(e.target.value) })}
            placeholder="123.456.789-00"
            required={mode === "create"}
            disabled={mode === "edit"}
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button loading={saving} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
