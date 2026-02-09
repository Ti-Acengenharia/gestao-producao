# Multi-stage build para aplicação fullstack

# Stage 1: Build do Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Copiar package files
COPY package*.json ./
RUN npm install

# Copiar código fonte
COPY . .

# Build da aplicação React
RUN npm run build

# Stage 2: Servidor de produção
FROM node:20-alpine AS production
WORKDIR /app

# Instalar serve para servir arquivos estáticos
RUN npm install -g serve

# Instalar dependências de produção
COPY package*.json ./
RUN npm install --production

# Copiar código do servidor
COPY server ./server

# Copiar build do frontend do stage anterior
COPY --from=frontend-builder /app/dist ./dist

# Criar diretório para o banco de dados
RUN mkdir -p /app/server/data

# Expor portas
EXPOSE 3000 5000

# Variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=5000

# Script para iniciar ambos os serviços
COPY docker-entrypoint.sh /app/
RUN chmod +x /app/docker-entrypoint.sh

CMD ["/app/docker-entrypoint.sh"]
