# DER - Diagrama Entidade-Relacionamento (BR Modelo)

## Tabelas

### USUARIOS
- id_usuario: BIGINT (PK)
- nome: VARCHAR(100) NOT NULL
- email: VARCHAR(150) UNIQUE
- telefone: VARCHAR(20)
- senha: VARCHAR(255) NOT NULL
- tipo_perfil: ENUM('USER','ADMIN')
- data_cadastro: DATETIME

### HORTAS
- id_horta: BIGINT (PK)
- id_usuario: BIGINT (FK)
- nome: VARCHAR(100) NOT NULL
- tipo_cultivo: VARCHAR(50)
- tamanho: DECIMAL(5,2)
- status: VARCHAR(20)
- data_criacao: DATETIME

### COLHEITAS
- id_colheita: BIGINT (PK)
- id_horta: BIGINT (FK)
- quantidade: INT
- data_colheita: DATETIME

## Relacionamentos
- USUARIOS (1) --- (N) HORTAS
  - id_usuario (PK) → id_usuario (FK)
- HORTAS (1) --- (N) COLHEITAS
  - id_horta (PK) → id_horta (FK)

## Observações
- Segue padrão BR Modelo: entidades/tabelas em maiúsculo, atributos detalhados, chaves destacadas, cardinalidades explícitas.
- Para visualização gráfica, consulte o arquivo `DER-alimentando-futuro.drawio`.
