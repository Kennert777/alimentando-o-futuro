-- Script para popular dados adicionais no banco AlimentandoOFuturo

-- Mais usuários de exemplo
INSERT INTO Usuario (nome, email, telefone, senha, pontos, nivel, cidade, estado, endereco) VALUES
('Carlos Oliveira', 'carlos@exemplo.com', '11666554433', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 300, 4, 'Curitiba', 'PR', 'Rua das Araucárias, 789'),
('Fernanda Lima', 'fernanda@exemplo.com', '11555443322', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 120, 2, 'Porto Alegre', 'RS', 'Av. dos Pampas, 321'),
('Roberto Mendes', 'roberto@exemplo.com', '11444332211', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 250, 3, 'Salvador', 'BA', 'Rua do Dendê, 654'),
('Juliana Rocha', 'juliana@exemplo.com', '11333221100', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 180, 2, 'Recife', 'PE', 'Av. Boa Viagem, 987'),
('Pedro Almeida', 'pedro@exemplo.com', '11222110099', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 90, 1, 'Fortaleza', 'CE', 'Rua das Jangadas, 147');

-- Mais hortas de exemplo
DECLARE @carlosId BIGINT = (SELECT id FROM Usuario WHERE email = 'carlos@exemplo.com');
DECLARE @fernandaId BIGINT = (SELECT id FROM Usuario WHERE email = 'fernanda@exemplo.com');
DECLARE @robertoId BIGINT = (SELECT id FROM Usuario WHERE email = 'roberto@exemplo.com');
DECLARE @adminId BIGINT = (SELECT id FROM Usuario WHERE email = 'admin@alimentandoofuturo.com');

INSERT INTO Horta (nome, descricao, localizacao, latitude, longitude, tipo_cultivo, area_m2, capacidade_pessoas, status, usuario_responsavel_id, aprovada, admin_aprovador_id, data_aprovacao) VALUES
('Horta Escolar Esperança', 'Projeto educativo em escola pública', 'Escola Municipal Esperança - Curitiba/PR', -25.441105, -49.276855, 'ORGANICO', 120.00, 30, 'CRESCIMENTO', @carlosId, 1, @adminId, GETDATE()),
('Jardim Medicinal Comunitário', 'Cultivo de plantas medicinais para a comunidade', 'Centro Comunitário - Porto Alegre/RS', -30.034647, -51.217658, 'TRADICIONAL', 90.75, 12, 'PLANTIO', @fernandaId, 1, @adminId, GETDATE()),
('Horta Urbana Tropical', 'Adaptada ao clima tropical do nordeste', 'Praça da Liberdade - Salvador/BA', -12.971598, -38.501872, 'ORGANICO', 180.50, 25, 'COLHEITA', @robertoId, 1, @adminId, GETDATE()),
('Estufa Hidropônica Avançada', 'Sistema automatizado de cultivo', 'Parque Tecnológico - Curitiba/PR', -25.450000, -49.280000, 'HIDROPONICO', 250.00, 10, 'CRESCIMENTO', @carlosId, 0, NULL, NULL);

-- Mais colheitas de exemplo
DECLARE @hortaEscola BIGINT = (SELECT id FROM Horta WHERE nome = 'Horta Escolar Esperança');
DECLARE @jardimMedicinal BIGINT = (SELECT id FROM Horta WHERE nome = 'Jardim Medicinal Comunitário');
DECLARE @hortaTropical BIGINT = (SELECT id FROM Horta WHERE nome = 'Horta Urbana Tropical');

INSERT INTO Colheita (horta_id, usuario_id, tipo_planta, quantidade_kg, data_colheita, qualidade, destino, observacoes) VALUES
(@hortaEscola, @carlosId, 'Rúcula', 2.80, '2024-02-01', 'EXCELENTE', 'Merenda escolar', 'Colheita feita pelos alunos'),
(@hortaEscola, @carlosId, 'Rabanete', 4.50, '2024-02-05', 'BOA', 'Distribuição para famílias', 'Primeira experiência dos estudantes'),
(@jardimMedicinal, @fernandaId, 'Hortelã', 1.20, '2024-02-03', 'EXCELENTE', 'Chás comunitários', 'Aroma intenso e folhas saudáveis'),
(@jardimMedicinal, @fernandaId, 'Camomila', 0.80, '2024-02-07', 'BOA', 'Farmácia popular', 'Flores secas para infusões'),
(@hortaTropical, @robertoId, 'Quiabo', 6.30, '2024-02-02', 'EXCELENTE', 'Feira local', 'Adaptação perfeita ao clima'),
(@hortaTropical, @robertoId, 'Pimentão', 9.10, '2024-02-08', 'BOA', 'Venda direta', 'Variedade colorida e saborosa'),
(@hortaTropical, @robertoId, 'Coentro', 1.50, '2024-02-10', 'EXCELENTE', 'Doação', 'Tempero fresco para a comunidade');

PRINT 'Additional data populated successfully!';