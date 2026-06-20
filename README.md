# Projeto Cadastro API (Spring Boot + Next.js)

API RESTful para gerenciamento de clínicas (médicos, pacientes e consultas) escrita em Java + Spring Boot, com frontend em Next.js.

Principais tecnologias
- Java 17+
- Spring Boot
- Spring Security (JWT)
- Spring Data JPA / Hibernate
- MySQL
- Maven
- Next.js (frontend)

Visão geral
- Backend: `/projeto` (Spring Boot) — executa em `http://localhost:8080` por padrão.
- Frontend: `/frontend` (Next.js) — executa em `http://localhost:3000` por padrão e faz proxy para a API via `/api`.

Pré-requisitos
- Java 17+
- Node.js 18+
- MySQL em execução

Configuração rápida
1. Banco de dados (MySQL): criar banco e ajustar `projeto/src/main/resources/application.properties`.

Exemplo mínimo (application.properties):
```
spring.datasource.url=jdbc:mysql://localhost:3306/banco_de_usuarios?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
```

Credencial inicial
- Usuário padrão criado por `DadosIniciais`: `admin` / `123456`.

Executando o backend
```
cd projeto
./mvnw spring-boot:run
```

Executando o frontend (desenvolvimento)
```
cd frontend
npm install
npm run dev
```

API — autenticação e uso
- Login (gera JWT): `POST /auth/login` com body `{ "login":"admin", "senha":"123456" }`. Retorna `{ "token": "..." }`.
- Use o token nas requisições protegidas no header: `Authorization: Bearer <token>`.

Endpoints principais (exemplos)
- `POST /medicos` — cadastrar médico (requer autenticação)
- `GET /medicos` — listar médicos
- `POST /Pacientes` — cadastrar paciente (atenção: rota mapeada como `/Pacientes` no backend)

Formato esperado para cadastro de médico
```
{
  "nome": "Rodrigo Ferreira",
  "email": "rodrigo.ferreira@api.med",
  "crm": "123456",
  "especialidade": "dermatologia"
}
```

Validações importantes
- `DadosCadastroMedico` valida: `nome` (não vazio), `email` (formato), `crm` (4–6 dígitos) e `especialidade` (enum). O enum `Especialidade` aceita valores case-insensitive (ex.: `dermatologia`).

CORS
- Backend: `SecurityConfig` permite origens `http://localhost:3000` e `http://localhost:8080`.
- Nota: Postman ignora CORS; problemas no navegador são por origem diferente (frontend → backend).

Testes com Postman
1. `POST /auth/login` → copiar token.
2. Em um POST para `/medicos`, adicionar header `Authorization: Bearer <token>` e `Content-Type: application/json`.

Bulk import
- Atualmente o endpoint aceita um único objeto por requisição. Posso adicionar um endpoint para receber um array se desejar carregar vários médicos de uma vez.

Como contribuir
- Faça fork, crie branch para a sua feature/fix e abra um pull request.

Observações
- O repositório já foi publicado em: https://github.com/Bruno-CPM/projeto-api-2.0-turbo.git
- Existem arquivos de configuração do IDE (`.idea`) incluídos no commit; se quiser, posso adicionar um `.gitignore` e remover arquivos desnecessários do repositório.

Contato
- Abra uma issue no repositório ou me diga o que mais quer que eu documente aqui.
