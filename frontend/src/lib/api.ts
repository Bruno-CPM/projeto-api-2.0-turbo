import { getToken, clearToken } from "./auth";
import type {
  DadosAgendamentoConsulta,
  DadosAtualizarMedico,
  DadosAtualizarPaciente,
  DadosAutenticacao,
  DadosCadastroMedico,
  DadosCadastroPaciente,
  DadosDetalhesConsulta,
  DadosDetalhesMedico,
  DadosDetalhesPaciente,
  DadosListagemMedico,
  DadosListagemPaciente,
  DadosTokenJWT,
  Page,
} from "./types";

const API_BASE = "/api";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  auth = true
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (auth) {
    const token = getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearToken();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiError("Sessão expirada", 401);
  }

  if (!response.ok) {
    let message = "Erro na requisição";
    let details: unknown;

    try {
      const body = await response.json();
      if (typeof body === "string") {
        message = body;
      } else if (Array.isArray(body)) {
        message = body.map((e: { mensagem?: string }) => e.mensagem).join(", ");
        details = body;
      } else if (body?.message) {
        message = body.message;
      }
    } catch {
      message = response.statusText || message;
    }

    throw new ApiError(message, response.status, details);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  login(data: DadosAutenticacao) {
    return request<DadosTokenJWT>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }, false);
  },

  listarMedicos(page = 0, size = 10) {
    return request<Page<DadosListagemMedico>>(
      `/medicos?page=${page}&size=${size}&sort=nome,asc`
    );
  },

  cadastrarMedico(data: DadosCadastroMedico) {
    return request<DadosDetalhesMedico>("/medicos", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  atualizarMedico(data: DadosAtualizarMedico) {
    return request<DadosDetalhesMedico>("/medicos", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  excluirMedico(id: number) {
    return request<void>(`/medicos/${id}`, { method: "DELETE" });
  },

  listarPacientes(page = 0, size = 10) {
    return request<Page<DadosListagemPaciente>>(
      `/Pacientes?page=${page}&size=${size}&sort=nome,asc`
    );
  },

  cadastrarPaciente(data: DadosCadastroPaciente) {
    return request<DadosDetalhesPaciente>("/Pacientes", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  atualizarPaciente(data: DadosAtualizarPaciente) {
    return request<DadosDetalhesPaciente>("/Pacientes", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  excluirPaciente(id: number) {
    return request<void>(`/Pacientes/${id}`, { method: "DELETE" });
  },

  agendarConsulta(data: DadosAgendamentoConsulta) {
    return request<DadosDetalhesConsulta>("/consultas", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};
