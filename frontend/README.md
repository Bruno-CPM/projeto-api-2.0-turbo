# Frontend Next.js — Clínica Cadastro

Interface gráfica para a API Spring Boot do projeto.

## Pré-requisitos

- Node.js 18+
- API rodando em `http://localhost:8080`

## Como executar

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:3000

## Login padrão

- Usuário: `admin`
- Senha: `123456`

## Módulos

- **Médicos** — listar, cadastrar, editar e excluir
- **Pacientes** — listar, cadastrar, editar e excluir
- **Consultas** — agendar consultas

## Integração com a API

O Next.js faz proxy das requisições via `/api/*` → `http://localhost:8080/*`.

Para alterar a URL da API, crie `.env.local`:

```
API_URL=http://localhost:8080
```

## Observações

- Endpoint de pacientes na API: `/Paciented` (como implementado no backend)
- Login na API: `POST /auth/login`
