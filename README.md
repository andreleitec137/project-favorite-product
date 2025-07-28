# AiqFome Favorites API 

    Este projeto implementa uma API RESTful para gerenciar clientes e esses clientes gerenciar seus produtos favoritos.

# Estrutura e Tecnologias

    Node.js + TypeScript

    NestJS como framework de aplicação

    TypeORM para acesso a banco de dados (PostgreSQL)

    Docker & Docker Compose para containerização e orquestração

    Arquitetura Hexagonal (Ports & Adapters) para:
        Isolar regras de negócio (domínio) de detalhes de infraestrutura
        Facilitar troca de banco de dados ou de implementações externas
        Aumentar escalabilidade e testabilidade

# Como rodar o projeto

## 1. Pré-requisitos

    Docker e Docker Compose instalados

    Porta 5432 livre (Postgres)

    .env na raiz configurado com:

    DATABASE_URL=postgres://postgres:postgres@postgres:5432/nestdb
    JWT_SECRET=sua_chave_secreta
    PRODUCT_URL='https://fakestoreapi.com/products'

## 2. Build e inicialização dos containers

### 1.Na raiz do projeto
        docker-compose build
        docker-compose up -d
        docker-compose up migrate

        Isso irá:

        Subir o container Postgres em localhost:5432
        Subir o container app NestJS em localhost:3000
        Executar as migrations no container de migração

### 2. Criar usuário administrador inicial
        Usei uma CLI interna para criar o primeiro usuário que irá gerar o token JWT.

        # Dentro do container ap rode: 
        docker-compose exec nest npm run create-user-cli -- --email=admin@aiqfome.com --password=123456

        Isso cria um usuário com role admin e imprime o token JWT no console.

### 3. Consumir a API

    Acesse POST /auth/login com JSON { "email": "admin@aiqfome.com", "password": "SuperSenha123" } para obter access_token.

    Em Authorization: Bearer <token>, você pode então:

    Clientes: CRUD em /customers

    Após criar o cliente, esse cliente pode então: 

    Favoritos:

    GET /customers/products/favorites listar favoritos

    POST /customers/products/:id/favorite adicionar

    DELETE /customers/products/:id/unfavorite remover

## 3. Observações

    Validações: usei class-validator para DTOs e ValidationPipe global.
    Auth: JWT com @nestjs/jwt, rotas protegidas por JwtAuthGuard e controladas por RolesGuard.
    Migrations: todas armazenadas em src/infrastructure/database/typeorm/**/migrations e executadas automaticamente.


