"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import { setToken } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("admin");
  const [senha, setSenha] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await api.login({ login, senha });
      setToken(token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Não foi possível entrar. Verifique a API."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#d5f0ee,_transparent_35%),linear-gradient(180deg,_#f4f8f7_0%,_#e8f2f0_100%)] p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-soft lg:grid-cols-2">
        <section className="hidden bg-brand-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
              Clínica Cadastro
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight">
              Gestão de médicos, pacientes e consultas
            </h1>
            <p className="mt-4 max-w-md text-brand-100">
              Interface conectada à API Spring Boot. Faça login para acessar o
              painel administrativo.
            </p>
          </div>
        </section>

        <section className="p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="font-display text-3xl font-semibold text-brand-900">
              Entrar
            </h2>
            <p className="mt-2 text-sm text-brand-500">
              Use suas credenciais para acessar o sistema.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Usuário"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="admin"
              required
            />
            <Input
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              required
            />

            {error && <Alert type="error" message={error} />}

            <Button className="w-full" loading={loading} type="submit">
              Acessar painel
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
