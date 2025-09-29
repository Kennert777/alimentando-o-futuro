# 📋 Documentação Técnica - Alimentando o Futuro

Esta pasta contém toda a documentação técnica do projeto Alimentando o Futuro.

## 📁 Arquivos

### 🗂️ Diagramas de Banco de Dados
- **`MER-alimentando-futuro.drawio`** - Modelo Entidade-Relacionamento (padrão BR Modelo)
- **`DER-alimentando-futuro.drawio`** - Diagrama Entidade-Relacionamento com tabelas e campos (padrão BR Modelo)

### 🎯 Diagramas de Sistema
- **`diagrama-caso-uso.drawio`** - Diagrama de Casos de Uso UML

## 🔧 Como Visualizar

### Draw.io (Recomendado)
1. Acesse [app.diagrams.net](https://app.diagrams.net)
2. Clique em "Open Existing Diagram"
3. Selecione o arquivo `.drawio` desejado

### VS Code
1. Instale a extensão "Draw.io Integration"
2. Abra o arquivo `.drawio` diretamente no VS Code

## 📊 Estrutura do Banco de Dados

### Entidades Principais
- **USUARIOS**
  - id_usuario (PK)
  - nome
  - email
  - telefone
  - senha
  - tipo_perfil
  - data_cadastro
- **HORTAS**
  - id_horta (PK)
  - id_usuario (FK)
  - nome
  - tipo_cultivo
  - tamanho
  - status
  - data_criacao
- **COLHEITAS**
  - id_colheita (PK)
  - id_horta (FK)
  - quantidade
  - data_colheita

### Relacionamentos
- USUARIO (1) → (N) HORTA
- HORTA (1) → (N) COLHEITA

## 👥 Atores do Sistema

### Usuário
- Gerenciar hortas pessoais
- Registrar colheitas
- Consultar receitas e dicas
- Usar chat assistente

### Administrador
- Gerenciar usuários
- Monitorar sistema
- Aprovar solicitações
- Visualizar relatórios

## 🎨 Padrões Utilizados
- Diagramas MER e DER seguem o padrão BR Modelo, com entidades, atributos, relacionamentos e cardinalidades representados conforme normas brasileiras de modelagem de dados.
- Nomenclatura de entidades e atributos em maiúsculo, chaves primárias e estrangeiras destacadas, relacionamentos com linhas e cardinalidades (1:N, N:1, N:M).
- Para detalhes visuais, consulte os arquivos `.drawio` na pasta documentação.

## 📝 Notas Técnicas

- Banco de dados: SQL Server
- Relacionamentos com integridade referencial
- Índices otimizados para consultas frequentes
- Constraints de domínio implementadas