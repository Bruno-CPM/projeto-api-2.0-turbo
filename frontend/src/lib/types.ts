export type Especialidade =
  | "PEDIATRIA"
  | "GINECOLOGIA"
  | "DERMATOLOGIA"
  | "UROLOGIA";

export const ESPECIALIDADES: Especialidade[] = [
  "PEDIATRIA",
  "GINECOLOGIA",
  "DERMATOLOGIA",
  "UROLOGIA",
];

export interface DadosAutenticacao {
  login: string;
  senha: string;
}

export interface DadosTokenJWT {
  token: string;
}

export interface DadosCadastroMedico {
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  especialidade: Especialidade;
}

export interface DadosAtualizarMedico {
  id: string;
  nome?: string;
  email?: string;
  telefone?: string;
  crm?: string;
  especialidade?: Especialidade;
}

export interface DadosListagemMedico {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  especialidade: Especialidade;
}

export interface DadosDetalhesMedico {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  crm: string;
  especialidade: Especialidade;
}

export interface DadosCadastroPaciente {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

export interface DadosAtualizarPaciente {
  id: number;
  nome?: string;
  email?: string;
  telefone?: string;
}

export interface DadosListagemPaciente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

export interface DadosDetalhesPaciente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}

export interface DadosAgendamentoConsulta {
  idMedico?: number | null;
  idPaciente: number;
  data: string;
  especialidade?: Especialidade | null;
}

export interface DadosDetalhesConsulta {
  id: number;
  idMedico: number;
  idPaciente: number;
  data: string;
}

export interface DadosErroValidacao {
  campo: string;
  mensagem: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
