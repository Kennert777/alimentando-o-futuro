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

-- Inserir usuário admin padrão
IF NOT EXISTS (SELECT * FROM Usuario WHERE email = 'admin@alimentandoofuturo.com')
BEGIN
    INSERT INTO Usuario (nome, email, senha, tipo_perfil, pontos, nivel)
    VALUES ('Administrador', 'admin@alimentandoofuturo.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', 1000, 10);
END
GO

PRINT 'Database AlimentandoOFuturo created successfully!';