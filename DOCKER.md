# 🐳 Docker - Gestão de Produção

## Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado

## 🚀 Como usar

### Construir e iniciar os containers

```bash
docker-compose up -d
```

### Verificar status dos containers

```bash
docker-compose ps
```

### Ver logs

```bash
# Todos os logs
docker-compose logs -f

# Logs específicos
docker-compose logs -f app
```

### Parar os containers

```bash
docker-compose down
```

### Parar e remover volumes (apaga o banco de dados)

```bash
docker-compose down -v
```

## 🔧 Build manual

### Construir a imagem

```bash
docker build -t gestao-obras .
```

### Executar o container

```bash
docker run -d \
  -p 3000:3000 \
  -p 5000:5000 \
  -v $(pwd)/server/data:/app/server/data \
  --name gestao-obras \
  gestao-obras
```

## 🌐 Acessar a aplicação

Após iniciar os containers:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📊 Persistência de dados

O banco de dados SQLite é persistido no volume `./server/data`, garantindo que os dados não sejam perdidos quando o container for reiniciado.

## 🛠️ Desenvolvimento

Para desenvolvimento local, continue usando os comandos npm:

```bash
# Frontend
npm run dev

# Backend
npm run server:dev
```

Os containers Docker são recomendados para produção e testes de integração.

## 📝 Notas

- O container usa Node.js 20 Alpine para menor tamanho
- Multi-stage build otimiza o tamanho final da imagem
- O frontend é servido como arquivos estáticos após o build
- O backend roda na porta 5000
- O frontend é servido na porta 3000
