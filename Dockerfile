# Estágio 1: Build
FROM node:22-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código-fonte
COPY . .

# Build da aplicação Angular
RUN npm run build

# Estágio 2: Servir
FROM node:22-alpine

WORKDIR /app

# Instalar json-server globalmente
RUN npm install -g json-server

# Copiar arquivos necessários
COPY package*.json ./
COPY db.json ./
COPY --from=build /app/dist/client-control-frontend/browser /app/dist

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Expor porta 4200 (frontend) e 3000 (API)
EXPOSE 4200 3000

# Script de inicialização
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

CMD ["./entrypoint.sh"]
