-- Script para adicionar novas tabelas ao banco Alimentando o Futuro

-- Tabela para tokens de redefinição de senha
CREATE TABLE password_reset_tokens (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    token NVARCHAR(255) NOT NULL UNIQUE,
    email NVARCHAR(255) NOT NULL,
    expiry_date DATETIME2 NOT NULL,
    used BIT NOT NULL DEFAULT 0,
    created_date DATETIME2 DEFAULT GETDATE()
);

-- Tabela para solicitações de suporte
CREATE TABLE support_requests (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    assunto NVARCHAR(500) NOT NULL,
    mensagem NTEXT NOT NULL,
    data_criacao DATETIME2 DEFAULT GETDATE(),
    status NVARCHAR(50) DEFAULT 'PENDENTE'
);

-- Índices para melhor performance
CREATE INDEX IX_password_reset_tokens_email ON password_reset_tokens(email);
CREATE INDEX IX_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IX_support_requests_email ON support_requests(email);
CREATE INDEX IX_support_requests_status ON support_requests(status);
CREATE INDEX IX_support_requests_data_criacao ON support_requests(data_criacao);

-- Comentários nas tabelas
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabela para armazenar tokens de redefinição de senha com expiração de 15 minutos',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE', @level1name = N'password_reset_tokens';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Tabela para armazenar solicitações de suporte dos usuários',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE', @level1name = N'support_requests';