
CREATE TABLE paciente
(
    ativo    BIT(1) NOT NULL,
    id       BIGINT NULL,
    nome     VARCHAR(255) NULL,
    email    VARCHAR(255) NULL,
    cpf      VARCHAR(255) NULL,
    telefone VARCHAR(255) NULL,
    CONSTRAINT pk_paciente PRIMARY KEY (ativo)
);
