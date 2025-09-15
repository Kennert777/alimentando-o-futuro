-- Setup para banco AlimentandoOFuturo no Somee.com
-- O banco já existe, apenas criamos as tabelas

-- Tabela Usuario
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuario' AND xtype='U')
BEGIN
    CREATE TABLE Usuario (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        nome NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        telefone NVARCHAR(20),
        senha NVARCHAR(255) NOT NULL,
        tipo_perfil NVARCHAR(20) DEFAULT 'USUARIO',
        pontos INT DEFAULT 0,
        nivel INT DEFAULT 1,
        data_cadastro DATETIME2 DEFAULT GETDATE(),
        data_ultimo_acesso DATETIME2,
        ativo BIT DEFAULT 1,
        endereco NVARCHAR(255),
        cidade NVARCHAR(100),
        estado NVARCHAR(50)
    );
END
GO

-- Tabela Horta
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Horta' AND xtype='U')
BEGIN
    CREATE TABLE Horta (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        nome NVARCHAR(100) NOT NULL,
        descricao NVARCHAR(500),
        localizacao NVARCHAR(255) NOT NULL,
        latitude DECIMAL(10,8),
        longitude DECIMAL(11,8),
        tipo_cultivo NVARCHAR(20) NOT NULL,
        area_m2 DECIMAL(8,2),
        capacidade_pessoas INT,
        status NVARCHAR(20) DEFAULT 'PLANEJAMENTO',
        usuario_responsavel_id BIGINT NOT NULL,
        data_criacao DATETIME2 DEFAULT GETDATE(),
        data_ultima_atualizacao DATETIME2 DEFAULT GETDATE(),
        aprovada BIT DEFAULT 0,
        data_aprovacao DATETIME2,
        admin_aprovador_id BIGINT,
        FOREIGN KEY (usuario_responsavel_id) REFERENCES Usuario(id),
        FOREIGN KEY (admin_aprovador_id) REFERENCES Usuario(id)
    );
END
GO

-- Tabela Colheita
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Colheita' AND xtype='U')
BEGIN
    CREATE TABLE Colheita (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        horta_id BIGINT NOT NULL,
        usuario_id BIGINT NOT NULL,
        tipo_planta NVARCHAR(100) NOT NULL,
        quantidade_kg DECIMAL(8,2) NOT NULL,
        data_colheita DATE NOT NULL,
        data_registro DATETIME2 DEFAULT GETDATE(),
        qualidade NVARCHAR(20),
        destino NVARCHAR(255),
        observacoes NVARCHAR(500),
        foto_url NVARCHAR(500),
        FOREIGN KEY (horta_id) REFERENCES Horta(id),
        FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
    );
END
GO

-- Inserir dados de exemplo

-- Usuário admin padrão
IF NOT EXISTS (SELECT * FROM Usuario WHERE email = 'admin@alimentandoofuturo.com')
BEGIN
    INSERT INTO Usuario (nome, email, senha, tipo_perfil, pontos, nivel)
    VALUES ('Administrador', 'admin@alimentandoofuturo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 1000, 10);
END
GO

-- Usuários de exemplo
IF NOT EXISTS (SELECT * FROM Usuario WHERE email = 'maria@exemplo.com')
BEGIN
    INSERT INTO Usuario (nome, email, telefone, senha, pontos, nivel, cidade, estado) VALUES
    ('Maria Silva', 'maria@exemplo.com', '11999887766', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 150, 2, 'São Paulo', 'SP'),
    ('João Santos', 'joao@exemplo.com', '11888776655', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 200, 3, 'Rio de Janeiro', 'RJ'),
    ('Ana Costa', 'ana@exemplo.com', '11777665544', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 80, 1, 'Belo Horizonte', 'MG');
END
GO

-- Hortas de exemplo
IF NOT EXISTS (SELECT * FROM Horta WHERE nome = 'Horta Comunitária Vila Verde')
BEGIN
    DECLARE @userId1 BIGINT = (SELECT id FROM Usuario WHERE email = 'maria@exemplo.com');
    DECLARE @userId2 BIGINT = (SELECT id FROM Usuario WHERE email = 'joao@exemplo.com');
    DECLARE @adminId BIGINT = (SELECT id FROM Usuario WHERE email = 'admin@alimentandoofuturo.com');
    
    INSERT INTO Horta (nome, descricao, localizacao, latitude, longitude, tipo_cultivo, area_m2, capacidade_pessoas, status, usuario_responsavel_id, aprovada, admin_aprovador_id, data_aprovacao) VALUES
    ('Horta Comunitária Vila Verde', 'Horta urbana focada em hortaliças orgânicas para a comunidade local', 'Rua das Flores, 123 - Vila Verde, São Paulo/SP', -23.550520, -46.633308, 'ORGANICO', 150.50, 20, 'CRESCIMENTO', @userId1, 1, @adminId, GETDATE()),
    ('Jardim Sustentável Centro', 'Projeto de permacultura no centro da cidade', 'Av. Paulista, 1000 - Centro, São Paulo/SP', -23.561684, -46.656139, 'PERMACULTURA', 200.00, 15, 'PLANTIO', @userId2, 1, @adminId, GETDATE()),
    ('Horta Hidropônica Moderna', 'Sistema hidropônico para produção de folhas verdes', 'Rua da Inovação, 456 - Tecnópolis, São Paulo/SP', -23.563210, -46.654321, 'HIDROPONICO', 80.25, 8, 'COLHEITA', @userId1, 1, @adminId, GETDATE());
END
GO

-- Colheitas de exemplo
IF NOT EXISTS (SELECT * FROM Colheita WHERE tipo_planta = 'Alface')
BEGIN
    DECLARE @hortaId1 BIGINT = (SELECT id FROM Horta WHERE nome = 'Horta Comunitária Vila Verde');
    DECLARE @hortaId2 BIGINT = (SELECT id FROM Horta WHERE nome = 'Jardim Sustentável Centro');
    DECLARE @userId1 BIGINT = (SELECT id FROM Usuario WHERE email = 'maria@exemplo.com');
    DECLARE @userId2 BIGINT = (SELECT id FROM Usuario WHERE email = 'joao@exemplo.com');
    
    INSERT INTO Colheita (horta_id, usuario_id, tipo_planta, quantidade_kg, data_colheita, qualidade, destino, observacoes) VALUES
    (@hortaId1, @userId1, 'Alface', 5.50, '2024-01-15', 'EXCELENTE', 'Distribuição comunitária', 'Primeira colheita da temporada, excelente qualidade'),
    (@hortaId1, @userId1, 'Tomate', 12.30, '2024-01-20', 'BOA', 'Venda local', 'Tomates maduros e saborosos'),
    (@hortaId2, @userId2, 'Couve', 3.20, '2024-01-18', 'EXCELENTE', 'Doação', 'Folhas verdes e nutritivas'),
    (@hortaId1, @userId1, 'Cenoura', 8.75, '2024-01-25', 'BOA', 'Consumo próprio', 'Cenouras orgânicas bem desenvolvidas');
END
GO

PRINT 'Database AlimentandoOFuturo populated successfully!';