[README (1).md](https://github.com/user-attachments/files/25503482/README.1.md)
# Cadastro API - Spring Boot

API RESTful para gerenciamento de usuários desenvolvida com Java e
Spring Boot, utilizando Spring Data JPA e MySQL para persistência de
dados.

------------------------------------------------------------------------

## Tecnologias

-   Java 17+
-   Spring Boot
-   Spring Data JPA
-   Hibernate
-   MySQL
-   Maven
-   Postman (testes)

------------------------------------------------------------------------

## Estrutura do Projeto

    src/main/java
     └── br.com.criandoAPI.projeto
          ├── controllers
          ├── DAO
          ├── models
          └── ProjetoApplication

Arquitetura em camadas:

Controller → Repository (DAO) → Model → Database

------------------------------------------------------------------------

## Pré-requisitos

-   Java 17 instalado
-   MySQL rodando
-   Maven instalado 

Verificar versão do Java:

    java -version

------------------------------------------------------------------------

## Configuração do Banco de Dados

Criar o banco no MySQL:

``` sql
CREATE DATABASE cadastro_api;
```

Configurar o arquivo `application.properties`:

    spring.datasource.url=jdbc:mysql://localhost:3306/cadastro_api?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=sua_senha

    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.format_sql=true

------------------------------------------------------------------------

## Executando o Projeto

### Usando Maven Wrapper

Linux / Mac:

    ./mvnw spring-boot:run

Windows:

    mvnw.cmd spring-boot:run

------------------------------------------------------------------------

### Usando Maven instalado

    mvn clean install
    mvn spring-boot:run

------------------------------------------------------------------------

## Compilar o Projeto

    mvn clean package

O arquivo `.jar` será gerado na pasta:

    target/

Executar o jar:

    java -jar target/nome-do-arquivo.jar

------------------------------------------------------------------------

## Endpoints Disponíveis

Base URL:

    http://localhost:8080

### Listar usuários

    GET /usuarios

### Criar usuário

    POST /usuarios

Body JSON:

``` json
{
  "nome": "Alex",
  "email": "alex@gmail.com",
  "senha": "123456",
  "telefone": "999999999"
}
```

### Atualizar usuário

    PUT /usuarios

Body JSON:

``` json
{
  "id": 1,
  "nome": "Alex Atualizado",
  "email": "alex@gmail.com",
  "senha": "123456",
  "telefone": "999999999"
}
```

### Deletar usuário

    DELETE /usuarios/{id}

Exemplo:

    DELETE /usuarios/1

------------------------------------------------------------------------

## Conceitos Aplicados

-   RESTful API
-   Injeção de dependência
-   JPA e Hibernate
-   Mapeamento objeto-relacional
-   CRUD completo
-   Integração frontend ↔ backend
-   Configuração de CORS
