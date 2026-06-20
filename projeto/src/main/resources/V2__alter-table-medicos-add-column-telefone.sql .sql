CREATE TABLE medico
(
    id            BIGINT AUTO_INCREMENT NOT NULL,
    nome          VARCHAR(255) NULL,
    email         VARCHAR(255) NULL,
    cpf           VARCHAR(255) NULL,
    epecialidade  SMALLINT NULL,
    crm           VARCHAR(255) NULL,
    telefone      VARCHAR(255) NULL,
    especialidade VARCHAR(255) NULL,
    ativo         BIT(1) NOT NULL,
    CONSTRAINT pk_medico PRIMARY KEY (id)
);

