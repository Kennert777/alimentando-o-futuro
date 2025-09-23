# 📋 Documentação Técnica - Alimentando o Futuro

Esta pasta contém toda a documentação técnica do projeto Alimentando o Futuro.

## 📁 Arquivos

### 🗂️ Diagramas de Banco de Dados
- **`MER-alimentando-futuro.drawio`** - Modelo Entidade-Relacionamento (padrão BR Modelo)
- **`DER-alimentando-futuro.drawio`** - Diagrama Entidade-Relacionamento com tabelas e campos

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
- **USUARIOS** - Dados dos usuários do sistema
- **HORTAS** - Informações das hortas urbanas
- **COLHEITAS** - Registro das colheitas realizadas

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

- **MER**: Notação padrão BR Modelo
- **DER**: Notação de tabelas relacionais
- **Casos de Uso**: Padrão UML 2.0

## 📝 Notas Técnicas

- Banco de dados: SQL Server
- Relacionamentos com integridade referencial
- Índices otimizados para consultas frequentes
- Constraints de domínio implementadas