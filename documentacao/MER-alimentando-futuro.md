# MER - Modelo Entidade-Relacionamento (BR Modelo)

## Entidades

### USUARIOS
- id_usuario (PK)
- nome
- email
- telefone
- senha
- tipo_perfil
- data_cadastro

### HORTAS
- id_horta (PK)
- id_usuario (FK)
- nome
- tipo_cultivo
- tamanho
- status
- data_criacao

### COLHEITAS
- id_colheita (PK)
- id_horta (FK)
- quantidade
- data_colheita

## Relacionamentos
- USUARIOS (1) --- (N) HORTAS
- HORTAS (1) --- (N) COLHEITAS

## Observações
- Chaves primárias destacadas como (PK)
- Chaves estrangeiras destacadas como (FK)
- Cardinalidades representadas conforme padrão BR Modelo
- Para visualização gráfica, consulte o arquivo `MER-alimentando-futuro.drawio`
