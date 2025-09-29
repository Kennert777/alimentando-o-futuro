# Sumário

## 1. Documentação do Projeto

### 1.1 Responsáveis pelo Projeto
- Kennert777 (owner do repositório)
- Equipe de desenvolvimento Alimentando o Futuro

### 1.2 Introdução
Plataforma completa para agricultura urbana e sustentabilidade alimentar, promovendo o cultivo colaborativo, educação ambiental e aproveitamento de alimentos.

### 1.3 Justificativa do Projeto
O projeto visa incentivar hortas urbanas, promover sustentabilidade alimentar, educação ambiental e integração comunitária, facilitando o acesso a informações, receitas e dicas para melhor aproveitamento dos alimentos.

### 1.4 Cenário Atual
**Tipo de empresa:** Projeto de tecnologia social voltado para comunidades urbanas, escolas, ONGs e cidadãos interessados em agricultura urbana.

**Ambiente tecnológico:**
- Backend em Spring Boot Java, banco SQL Server (Somee.com)
- Frontend em React + Vite, hospedado no Netlify
- Integração com Google Maps, exportação de dados em CSV

**Perfil dos profissionais:**
- Desenvolvedores fullstack, administradores de sistemas, educadores ambientais, voluntários e gestores comunitários

**Recursos de suporte tecnológico:**
- Infraestrutura cloud (Netlify, Somee.com)
- Ferramentas de desenvolvimento colaborativo (GitHub)
- Documentação técnica e diagramas (Draw.io)

**Operação do cliente:**
- Usuários acessam via web para cadastrar hortas, registrar colheitas, consultar receitas/dicas e exportar relatórios
- Administradores monitoram, aprovam e gerenciam o sistema

**Problemas gerais enfrentados:**
- Dificuldade de monitoramento centralizado
- Falta de integração entre participantes
- Baixa digitalização dos processos

### 1.5 Descrição dos Problemas
| O problema | Afeta | Cujo impacto é | Uma boa solução seria | Ambiente |
|------------|-------|---------------|----------------------|----------|
| Falta de monitoramento centralizado das hortas urbanas | Usuários, administradores, comunidade | Baixa eficiência, dados dispersos, pouca colaboração | Plataforma web para cadastro, acompanhamento e relatórios | [x] Web [ ] Mobile |
| Ausência de integração entre participantes e gestores | Usuários, administradores | Comunicação falha, decisões lentas | Sistema web com dashboards, notificações e chat | [x] Web [ ] Mobile |
| Dificuldade de acesso a receitas e dicas sustentáveis | Usuários | Baixo aproveitamento dos alimentos, desperdício | Portal web com receitas, dicas e exportação de dados | [x] Web [ ] Mobile |

### 1.6 Escopo do Projeto
**Ambiente Web:**
- Cadastro/login de usuários
- Gerenciamento de hortas urbanas (criação, edição, aprovação)
- Registro de colheitas (quantidade, data, tipo)
- Consulta e cadastro de receitas e dicas
- Dashboard com métricas em tempo real
- Exportação de relatórios em CSV
- Mapa interativo de hortas e pontos de venda
- Chatbot para dúvidas e suporte
- Validações: autenticação JWT, permissões de acesso, integridade dos dados
- Regras de negócio: pontuação, emblemas, níveis, aprovação de hortas

**Ambiente Mobile:**
- Não implementado nesta versão. Todo o escopo está focado no ambiente web, podendo ser expandido futuramente para mobile via PWA ou app dedicado.

### 1.7 Regras de Negócio
**Ambiente Web:**
- Usuários podem cadastrar hortas e registrar colheitas (L.P. + B.D.)
- Administradores aprovam hortas e monitoram o sistema (L.P. + B.D.)
- Pontuação por ações: cadastrar horta (+50), registrar colheita (+100), compartilhar dica (+25) (L.P.)
- Sistema de emblemas e níveis para engajamento (L.P.)
- Autenticação via JWT, sessões persistentes e criptografia de senhas (L.P.)
- Exportação de relatórios em CSV (L.P.)
- Controle de permissões e validações de acesso (L.P. + B.D.)
- Procedimentos internos: aprovação manual de hortas, suporte via chatbot (P.I.)

### 1.8 Requisitos Funcionais e Não Funcionais
**Ambiente Web:**
**Funcionais:**
- Cadastro/login de usuários
- Gerenciamento de hortas, colheitas, receitas e dicas
- Dashboard com métricas em tempo real
- Exportação de relatórios em CSV
- Integração com Google Maps
- Chatbot para dúvidas e suporte

**Não Funcionais:**
- Interface responsiva (mobile-first)
- Segurança: JWT, BCrypt, CORS
- Performance otimizada (React + Vite, Spring Boot)
- Deploy em Netlify e Somee.com
- Robustez e integridade dos dados
- Facilidade de uso e acessibilidade

### 1.9 Diagrama de Caso de Uso
**Ambiente Web:**
- Ver arquivo `diagrama-caso-uso.drawio` na pasta `documentacao/`
- Atores: Usuário, Administrador
- Casos de uso: Cadastrar horta, registrar colheita, consultar receitas/dicas, exportar relatório, aprovar horta, visualizar dashboard

### 1.10 Diagrama de Entidade e Relacionamento (DER)
- Após implementação do banco de dados no SQL Server, o DER foi gerado e está disponível em `DER-alimentando-futuro.drawio` na pasta `documentacao/`.
- Entidades principais: USUARIOS, HORTAS, COLHEITAS
- Relacionamentos: USUARIO (1) → (N) HORTA, HORTA (1) → (N) COLHEITA

### 1.11 Telas e Navegação / Protótipo de Alta Fidelidade do Projeto
- Tela de login/cadastro
- Dashboard do usuário
- Dashboard do administrador
- Tela de gerenciamento de hortas
- Tela de registro de colheitas
- Tela de receitas e dicas
- Mapa interativo de hortas
- Relatórios e gráficos
- Protótipo disponível nos arquivos `.drawio` da pasta `documentacao/`

### 1.12 Manual do Usuário (Web)
- Para se cadastrar, clique em "Registrar" e preencha seus dados
- Após login, acesse o dashboard para gerenciar hortas e colheitas
- Utilize o menu para navegar entre receitas, dicas e mapa
- Exporte relatórios em CSV pelo dashboard
- Em caso de dúvidas, utilize o chatbot assistente

### 1.13 Quadro Resumo
| Item                | Status/Descrição                       |
|---------------------|----------------------------------------|
| Autenticação        | JWT, sessões persistentes, BCrypt       |
| Gerenciamento       | Hortas, colheitas, receitas, dicas      |
| Relatórios          | CSV, gráficos dinâmicos                 |
| Dashboard           | Usuário e administrador                 |
| Google Maps         | Localização de hortas e pontos de venda |
| Chatbot             | Suporte e dúvidas                       |
| Interface           | Responsiva, mobile-first                |
| Deploy              | Netlify (frontend), Somee.com (backend) |
