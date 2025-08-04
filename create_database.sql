-- Banco de Dados: Alimentando o Futuro
-- SQL Server

CREATE DATABASE AlimentandoOFuturo;
GO

USE AlimentandoOFuturo;
GO

-- Tabela de Usuários
CREATE TABLE Usuario (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    telefone NVARCHAR(20),
    senha NVARCHAR(255) NOT NULL,
    tipo_perfil NVARCHAR(20) DEFAULT 'usuario' CHECK (tipo_perfil IN ('usuario', 'admin', 'moderador')),
    pontos INT DEFAULT 0,
    nivel INT DEFAULT 1,
    data_cadastro DATETIME DEFAULT GETDATE(),
    data_ultimo_acesso DATETIME,
    ativo BIT DEFAULT 1,
    endereco NVARCHAR(255),
    cidade NVARCHAR(100),
    estado NVARCHAR(2)
);

-- Tabela de Hortas
CREATE TABLE Horta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    descricao NVARCHAR(500),
    localizacao NVARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    tipo_cultivo NVARCHAR(50) NOT NULL CHECK (tipo_cultivo IN ('organico', 'hidroponico', 'permacultura', 'tradicional')),
    area_m2 DECIMAL(8,2),
    capacidade_pessoas INT,
    status NVARCHAR(20) DEFAULT 'planejamento' CHECK (status IN ('planejamento', 'plantio', 'crescimento', 'colheita', 'inativo')),
    usuario_responsavel_id INT NOT NULL,
    data_criacao DATETIME DEFAULT GETDATE(),
    data_ultima_atualizacao DATETIME DEFAULT GETDATE(),
    aprovada BIT DEFAULT 0,
    data_aprovacao DATETIME,
    admin_aprovador_id INT,
    FOREIGN KEY (usuario_responsavel_id) REFERENCES Usuario(id),
    FOREIGN KEY (admin_aprovador_id) REFERENCES Usuario(id)
);

-- Tabela de Colheitas
CREATE TABLE Colheita (
    id INT IDENTITY(1,1) PRIMARY KEY,
    horta_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo_planta NVARCHAR(100) NOT NULL,
    quantidade_kg DECIMAL(8,2) NOT NULL,
    data_colheita DATE NOT NULL,
    data_registro DATETIME DEFAULT GETDATE(),
    qualidade NVARCHAR(20) CHECK (qualidade IN ('excelente', 'boa', 'regular', 'ruim')),
    destino NVARCHAR(100),
    observacoes NVARCHAR(500),
    foto_url NVARCHAR(255),
    FOREIGN KEY (horta_id) REFERENCES Horta(id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabela de Solicitações de Apoio
CREATE TABLE SolicitacaoApoio (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    horta_id INT,
    tipo_solicitacao NVARCHAR(50) NOT NULL CHECK (tipo_solicitacao IN ('sementes', 'ferramentas', 'conhecimento', 'voluntarios', 'financeiro', 'outro')),
    titulo NVARCHAR(200) NOT NULL,
    descricao NVARCHAR(1000) NOT NULL,
    urgencia NVARCHAR(20) DEFAULT 'media' CHECK (urgencia IN ('baixa', 'media', 'alta', 'critica')),
    status NVARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_analise', 'aprovada', 'rejeitada', 'concluida')),
    data_solicitacao DATETIME DEFAULT GETDATE(),
    data_resposta DATETIME,
    resposta_admin NVARCHAR(1000),
    admin_responsavel_id INT,
    valor_estimado DECIMAL(10,2),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (horta_id) REFERENCES Horta(id),
    FOREIGN KEY (admin_responsavel_id) REFERENCES Usuario(id)
);

-- Tabela de Dicas
CREATE TABLE Dica (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    conteudo NVARCHAR(2000) NOT NULL,
    categoria NVARCHAR(50) NOT NULL CHECK (categoria IN ('cultivo', 'nutricao', 'receita', 'sustentabilidade', 'pragas', 'colheita')),
    tipo_planta NVARCHAR(100),
    dificuldade NVARCHAR(20) CHECK (dificuldade IN ('facil', 'medio', 'dificil')),
    autor_id INT NOT NULL,
    data_criacao DATETIME DEFAULT GETDATE(),
    data_atualizacao DATETIME DEFAULT GETDATE(),
    ativa BIT DEFAULT 1,
    visualizacoes INT DEFAULT 0,
    curtidas INT DEFAULT 0,
    tags NVARCHAR(500),
    imagem_url NVARCHAR(255),
    video_url NVARCHAR(255),
    FOREIGN KEY (autor_id) REFERENCES Usuario(id)
);

-- Tabela de Relatórios
CREATE TABLE Relatorio (
    id INT IDENTITY(1,1) PRIMARY KEY,
    tipo_relatorio NVARCHAR(50) NOT NULL CHECK (tipo_relatorio IN ('colheitas', 'usuarios', 'hortas', 'impacto', 'gamificacao')),
    titulo NVARCHAR(200) NOT NULL,
    periodo_inicio DATE,
    periodo_fim DATE,
    dados_json NVARCHAR(MAX),
    gerado_por_id INT NOT NULL,
    data_geracao DATETIME DEFAULT GETDATE(),
    filtros_aplicados NVARCHAR(500),
    total_registros INT,
    FOREIGN KEY (gerado_por_id) REFERENCES Usuario(id)
);

-- Tabela de Gamificação
CREATE TABLE Gamificacao (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    tipo_acao NVARCHAR(50) NOT NULL CHECK (tipo_acao IN ('cadastro_horta', 'colheita', 'dica_compartilhada', 'login_diario', 'meta_mensal', 'ajuda_comunidade')),
    pontos_ganhos INT NOT NULL,
    data_acao DATETIME DEFAULT GETDATE(),
    descricao NVARCHAR(255),
    horta_id INT,
    meta_id INT,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (horta_id) REFERENCES Horta(id)
);

-- Tabela de Emblemas
CREATE TABLE Emblema (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome NVARCHAR(100) NOT NULL,
    descricao NVARCHAR(255),
    icone NVARCHAR(50),
    pontos_necessarios INT,
    condicao_especial NVARCHAR(255),
    ativo BIT DEFAULT 1,
    data_criacao DATETIME DEFAULT GETDATE()
);

-- Tabela de Emblemas dos Usuários
CREATE TABLE UsuarioEmblema (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    emblema_id INT NOT NULL,
    data_conquista DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (emblema_id) REFERENCES Emblema(id),
    UNIQUE(usuario_id, emblema_id)
);

-- Tabela de Plantas
CREATE TABLE Planta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome_popular NVARCHAR(100) NOT NULL,
    nome_cientifico NVARCHAR(150),
    categoria NVARCHAR(50) CHECK (categoria IN ('hortaliça', 'fruta', 'legume', 'erva', 'tempero')),
    dificuldade_cultivo NVARCHAR(20) CHECK (dificuldade_cultivo IN ('facil', 'medio', 'dificil')),
    tempo_colheita_dias INT,
    epoca_plantio NVARCHAR(100),
    tipo_solo NVARCHAR(100),
    frequencia_rega NVARCHAR(50),
    exposicao_sol NVARCHAR(50),
    espacamento_cm INT,
    altura_maxima_cm INT,
    valor_nutricional NVARCHAR(1000),
    beneficios_saude NVARCHAR(1000),
    uso_medicinal NVARCHAR(500),
    receitas_sugeridas NVARCHAR(1000),
    pragas_comuns NVARCHAR(500),
    cuidados_especiais NVARCHAR(500),
    adequada_horta_escolar BIT DEFAULT 1,
    imagem_url NVARCHAR(255),
    ativa BIT DEFAULT 1
);

-- Índices para performance
CREATE INDEX IX_Usuario_Email ON Usuario(email);
CREATE INDEX IX_Horta_Status ON Horta(status);
CREATE INDEX IX_Horta_Usuario ON Horta(usuario_responsavel_id);
CREATE INDEX IX_Colheita_Data ON Colheita(data_colheita);
CREATE INDEX IX_Colheita_Horta ON Colheita(horta_id);
CREATE INDEX IX_SolicitacaoApoio_Status ON SolicitacaoApoio(status);
CREATE INDEX IX_Dica_Categoria ON Dica(categoria);
CREATE INDEX IX_Gamificacao_Usuario ON Gamificacao(usuario_id);

-- Tabela de Notificações
CREATE TABLE Notificacao (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo NVARCHAR(200) NOT NULL,
    mensagem NVARCHAR(500) NOT NULL,
    tipo NVARCHAR(50) CHECK (tipo IN ('info', 'sucesso', 'aviso', 'erro', 'sistema')),
    lida BIT DEFAULT 0,
    data_criacao DATETIME DEFAULT GETDATE(),
    data_leitura DATETIME,
    link_acao NVARCHAR(255),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Tabela de Metas/Desafios
CREATE TABLE Meta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    descricao NVARCHAR(500),
    tipo NVARCHAR(50) CHECK (tipo IN ('diario', 'semanal', 'mensal', 'especial')),
    objetivo_quantidade INT,
    objetivo_tipo NVARCHAR(100),
    pontos_recompensa INT DEFAULT 0,
    data_inicio DATE,
    data_fim DATE,
    ativa BIT DEFAULT 1,
    data_criacao DATETIME DEFAULT GETDATE()
);

-- Tabela de Progresso das Metas
CREATE TABLE UsuarioMeta (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT NOT NULL,
    meta_id INT NOT NULL,
    progresso_atual INT DEFAULT 0,
    concluida BIT DEFAULT 0,
    data_inicio DATETIME DEFAULT GETDATE(),
    data_conclusao DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    FOREIGN KEY (meta_id) REFERENCES Meta(id),
    UNIQUE(usuario_id, meta_id)
);

-- Tabela de Receitas
CREATE TABLE Receita (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo NVARCHAR(200) NOT NULL,
    descricao NVARCHAR(500),
    ingredientes NVARCHAR(2000) NOT NULL,
    modo_preparo NVARCHAR(3000) NOT NULL,
    tempo_preparo_min INT,
    rendimento NVARCHAR(50),
    categoria NVARCHAR(50) CHECK (categoria IN ('aproveitamento', 'saudavel', 'vegana', 'vegetariana', 'tradicional')),
    dificuldade NVARCHAR(20) CHECK (dificuldade IN ('facil', 'medio', 'dificil')),
    autor_id INT NOT NULL,
    aprovada BIT DEFAULT 0,
    data_criacao DATETIME DEFAULT GETDATE(),
    visualizacoes INT DEFAULT 0,
    curtidas INT DEFAULT 0,
    imagem_url NVARCHAR(255),
    tags NVARCHAR(500),
    FOREIGN KEY (autor_id) REFERENCES Usuario(id)
);

-- Tabela de Interações do Chatbot
CREATE TABLE ChatbotInteracao (
    id INT IDENTITY(1,1) PRIMARY KEY,
    usuario_id INT,
    sessao_id NVARCHAR(100),
    pergunta NVARCHAR(1000) NOT NULL,
    resposta NVARCHAR(2000) NOT NULL,
    categoria NVARCHAR(50),
    satisfacao INT CHECK (satisfacao BETWEEN 1 AND 5),
    data_interacao DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id)
);

-- Inserir dados iniciais
INSERT INTO Emblema (nome, descricao, icone, pontos_necessarios) VALUES
('🌱 Primeiro Passo', 'Primeiro cadastro na plataforma', '🌱', 0),
('🌿 Cultivador', 'Cadastrou sua primeira horta', '🌿', 50),
('🏆 Mestre da Horta', 'Realizou 10 colheitas', '🏆', 500),
('📚 Educador', 'Compartilhou 5 dicas', '📚', 200),
('🤝 Colaborador', 'Ajudou 3 pessoas da comunidade', '🤝', 300),
('🎯 Focado', 'Completou 5 metas', '🎯', 400),
('👨‍🍳 Chef Sustentável', 'Compartilhou 10 receitas', '👨‍🍳', 600),
('🌍 Guardião Verde', 'Atingiu 1000 pontos', '🌍', 1000);

INSERT INTO Planta (nome_popular, nome_cientifico, categoria, dificuldade_cultivo, tempo_colheita_dias, epoca_plantio, tipo_solo, frequencia_rega, exposicao_sol, valor_nutricional, beneficios_saude, receitas_sugeridas, pragas_comuns, cuidados_especiais) VALUES
('Alface', 'Lactuca sativa', 'hortaliça', 'facil', 45, 'Ano todo', 'Rico em matéria orgânica', 'Diária', 'Sol parcial', 'Rica em vitaminas A, C e K', 'Melhora digestão e hidratação', 'Saladas, sucos verdes, wraps', 'Pulgões, lesmas', 'Evitar sol forte do meio-dia'),
('Tomate', 'Solanum lycopersicum', 'fruta', 'medio', 80, 'Setembro a Dezembro', 'Bem drenado', 'Diária', 'Sol pleno', 'Rico em licopeno e vitamina C', 'Antioxidante, previne câncer', 'Molhos, saladas, conservas', 'Broca, pulgão, mosca-branca', 'Tutoramento necessário'),
('Manjericão', 'Ocimum basilicum', 'erva', 'facil', 30, 'Ano todo', 'Bem drenado', 'Moderada', 'Sol pleno', 'Rico em vitamina K e antioxidantes', 'Anti-inflamatório, digestivo', 'Pesto, temperos, chás', 'Pulgões, ácaros', 'Cortar flores para manter sabor'),
('Cebolinha', 'Allium schoenoprasum', 'tempero', 'facil', 60, 'Ano todo', 'Qualquer tipo', 'Regular', 'Sol parcial', 'Rica em vitamina C e folato', 'Fortalece imunidade', 'Temperos, saladas, omeletes', 'Tripes, pulgões', 'Cortar folhas regularmente'),
('Rúcula', 'Eruca sativa', 'hortaliça', 'facil', 30, 'Março a Agosto', 'Rico em matéria orgânica', 'Regular', 'Sol parcial', 'Rica em vitamina K e ferro', 'Fortalece ossos, combate anemia', 'Saladas, pizzas, sanduíches', 'Pulgões, lesmas', 'Colher folhas jovens'),
('Espinafre', 'Spinacia oleracea', 'hortaliça', 'facil', 50, 'Março a Julho', 'Rico e bem drenado', 'Regular', 'Sol parcial', 'Rico em ferro e ácido fólico', 'Combate anemia, fortalece músculos', 'Refogados, sucos, tortas', 'Pulgões, míldio', 'Evitar calor excessivo'),
('Couve', 'Brassica oleracea', 'hortaliça', 'facil', 70, 'Março a Agosto', 'Rico em matéria orgânica', 'Regular', 'Sol pleno', 'Rica em vitamina C e cálcio', 'Fortalece imunidade e ossos', 'Refogados, sucos, chips', 'Pulgões, lagartas', 'Colher folhas externas'),
('Beterraba', 'Beta vulgaris', 'legume', 'medio', 90, 'Março a Julho', 'Profundo e bem drenado', 'Regular', 'Sol pleno', 'Rica em folato e nitrato', 'Melhora circulação, energia', 'Saladas, sucos, conservas', 'Pulgões, míldio', 'Desbaste necessário'),
('Cenoura', 'Daucus carota', 'legume', 'medio', 100, 'Março a Julho', 'Profundo e solto', 'Regular', 'Sol pleno', 'Rica em betacaroteno', 'Melhora visão, pele saudável', 'Saladas, sucos, bolos', 'Mosca-da-cenoura', 'Solo sem pedras'),
('Rabanete', 'Raphanus sativus', 'legume', 'facil', 25, 'Ano todo', 'Solto e bem drenado', 'Regular', 'Sol parcial', 'Rico em vitamina C', 'Digestivo, desintoxicante', 'Saladas, conservas', 'Pulgões, lesmas', 'Crescimento rápido');

INSERT INTO Meta (titulo, descricao, tipo, objetivo_quantidade, objetivo_tipo, pontos_recompensa, data_inicio, data_fim) VALUES
('Primeira Horta', 'Cadastre sua primeira horta comunitária', 'especial', 1, 'horta_cadastrada', 100, GETDATE(), DATEADD(month, 12, GETDATE())),
('Colhedor Semanal', 'Registre 3 colheitas em uma semana', 'semanal', 3, 'colheitas', 150, GETDATE(), DATEADD(day, 7, GETDATE())),
('Educador do Mês', 'Compartilhe 5 dicas úteis este mês', 'mensal', 5, 'dicas_compartilhadas', 200, GETDATE(), DATEADD(month, 1, GETDATE())),
('Login Diário', 'Acesse a plataforma por 7 dias consecutivos', 'diario', 7, 'login_consecutivo', 50, GETDATE(), DATEADD(day, 7, GETDATE())),
('Chef Sustentável', 'Compartilhe 3 receitas de aproveitamento', 'mensal', 3, 'receitas_compartilhadas', 180, GETDATE(), DATEADD(month, 1, GETDATE()));

-- Índices adicionais para performance
CREATE INDEX IX_Notificacao_Usuario ON Notificacao(usuario_id);
CREATE INDEX IX_UsuarioMeta_Usuario ON UsuarioMeta(usuario_id);
CREATE INDEX IX_Receita_Categoria ON Receita(categoria);
CREATE INDEX IX_ChatbotInteracao_Usuario ON ChatbotInteracao(usuario_id);
CREATE INDEX IX_Meta_Tipo ON Meta(tipo);

GO