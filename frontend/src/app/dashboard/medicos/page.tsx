"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Alert } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import { ESPECIALIDADES, type DadosListagemMedico, type Especialidade } from "@/lib/types";
import { formatEspecialidade, formatPhone } from "@/lib/utils";

type FormMode = "create" | "edit";

const emptyForm = {
  nome: "",
  email: "",
  telefone: "",
  crm: "",
  especialidade: "PEDIATRIA" as Especialidade,
};

export default function MedicosPage() {
  const [medicos, setMedicos] = useState<DadosListagemMedico[]>([]);
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

  const loadMedicos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await api.listarMedicos(page);
      setMedicos(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao carregar médicos");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadMedicos();
  }, [loadMedicos]);

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(medico: DadosListagemMedico) {
    setMode("edit");
    setEditingId(medico.id);
    setForm({
      nome: medico.nome,
      email: medico.email,
      telefone: medico.telefone,
      crm: medico.crm,
      especialidade: medico.especialidade,
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
        await api.cadastrarMedico(form);
        setSuccess("Médico cadastrado com sucesso.");
      } else if (editingId) {
        await api.atualizarMedico({ id: String(editingId), ...form });
        setSuccess("Médico atualizado com sucesso.");
      }
      setModalOpen(false);
      await loadMedicos();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao salvar médico");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este médico?")) return;
    setError("");
    try {
      await api.excluirMedico(id);
      setSuccess("Médico excluído com sucesso.");
      await loadMedicos();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Erro ao excluir médico");
    }
  }

  return (
    <>
      <Header title="Médicos" />
      <main className="flex-1 p-4 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-brand-600">
            Gerencie os médicos cadastrados na clínica.
          </p>
          <Button onClick={openCreate}>+ Novo médico</Button>
        </div>

        {error && <Alert type="error" message={error} />}
        {success && <Alert type="success" message={success} />}

        <div className="overflow-hidden rounded-2xl bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-50 text-brand-700">
                <tr>
                  <th className="px-5 py-4 font-semibold">Nome</th>
                  <th className="px-5 py-4 font-semibold">CRM</th>
                  <th className="px-5 py-4 font-semibold">Especialidade</th>
                  <th className="px-5 py-4 font-semibold">Contato</th>
                  <th className="px-5 py-4 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="px-5 py-8 text-brand-500" colSpan={5}>
                      Carregando...
                    </td>
                  </tr>
                ) : medicos.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8 text-brand-500" colSpan={5}>
                      Nenhum médico cadastrado.
                    </td>
                  </tr>
                ) : (
                  medicos.map((medico) => (
                    <tr key={medico.id} className="border-t border-brand-100">
                      <td className="px-5 py-4 font-medium text-brand-900">
                        {medico.nome}
                      </td>
                      <td className="px-5 py-4">{medico.crm}</td>
                      <td className="px-5 py-4">
                        {formatEspecialidade(medico.especialidade)}
                      </td>
                      <td className="px-5 py-4">
                        <p>{medico.email}</p>
                        <p className="text-brand-500">{medico.telefone}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Button variant="secondary" onClick={() => openEdit(medico)}>
                            Editar
                          </Button>
                          <Button variant="danger" onClick={() => handleDelete(medico.id)}>
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
        title={mode === "create" ? "Novo médico" : "Editar médico"}
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
            required
          />
          <Input
            label="CRM"
            value={form.crm}
            onChange={(e) =>
              setForm({ ...form, crm: e.target.value.replace(/\D/g, "").slice(0, 6) })
            }
            placeholder="123456"
            required
          />
          <Select
            label="Especialidade"
            value={form.especialidade}
            onChange={(e) =>
              setForm({ ...form, especialidade: e.target.value as Especialidade })
            }
            options={ESPECIALIDADES.map((e) => ({
              value: e,
              label: formatEspecialidade(e),
            }))}
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
