# Client Control System 🚗

Um sistema completo de controle de clientes e suas respectivas placas de carro, desenvolvido com **Angular** no frontend e **JSON Server** como API REST.

## 📋 Requisitos Atendidos

✅ **Base de Dados**: Estrutura com ID, Nome, Telefone, CPF e Placa do Carro
✅ **API REST**: Endpoints completos (GET, POST, PUT, DELETE) via JSON Server
✅ **Docker & Docker Compose**: Containerização da aplicação
✅ **Framework**: Angular 21 com Material Design
✅ **Boas Práticas**: Código limpo, componentes reutilizáveis, serviços injetáveis
✅ **Repositório Git**: Versionamento com git

## 🛠 Tecnologias Utilizadas

- **Frontend**: Angular 21
- **UI Framework**: Angular Material
- **API**: JSON Server (REST)
- **Linguagem**: TypeScript
- **Containerização**: Docker & Docker Compose
- **Node.js**: v22 (Alpine)

## 🚀 Como Executar

### Opção 1: Com Docker Compose (Recomendado)

```bash
# Clone o repositório
git clone <seu-repositorio>
cd client-control-frontend

# Inicie com docker-compose
docker-compose up --build
```

A aplicação estará disponível em:

- **Frontend**: http://localhost:4200
- **API**: http://localhost:3000

### Opção 2: Modo Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Terminal 1: Inicie o JSON Server (API)
npm run api

# Terminal 2: Inicie o Angular
npm start
```

Acesse:

- **Frontend**: http://localhost:4200
- **API**: http://localhost:3000

## 📊 Estrutura da Base de Dados

```json
{
  "clients": [
    {
      "id": 1,
      "nome": "Diana Prince",
      "telefone": "11988887777",
      "cpf": "123.456.789-00",
      "placa": "AAA-0A00"
    }
  ]
}
```

## 🔌 Endpoints da API REST

### 📖 Listar todos os clientes

```bash
GET /clients
```

### 👤 Obter cliente específico

```bash
GET /clients/:id
```

### ➕ Criar novo cliente

```bash
POST /clients
Content-Type: application/json

{
  "nome": "João Silva",
  "telefone": "21987654321",
  "cpf": "987.654.321-00",
  "placa": "BBB-1B11"
}
```

### ✏️ Atualizar cliente

```bash
PUT /clients/:id
Content-Type: application/json

{
  "nome": "João S.",
  "telefone": "21987654321",
  "cpf": "987.654.321-00",
  "placa": "BBB-1B11"
}
```

### 🗑️ Deletar cliente

```bash
DELETE /clients/:id
```

## 📁 Estrutura do Projeto

```
client-control-frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   │   └── client.model.ts
│   │   │   └── services/
│   │   │       └── client.service.ts
│   │   ├── features/
│   │   │   ├── clients/
│   │   │   │   ├── client-form/
│   │   │   │   └── client-list/
│   │   │   └── pages/
│   │   ├── app.ts
│   │   ├── app.routes.ts
│   │   └── app.config.ts
│   ├── main.ts
│   ├── index.html
│   └── styles.scss
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── entrypoint.sh
├── db.json
├── package.json
└── README.md
```

## 🏗️ Arquitetura

### Padrões Implementados

- **Service Pattern**: Serviços para lógica de negócio
- **Dependency Injection**: Uso do `inject()` do Angular
- **Reactive Programming**: RxJS com `pipe()` e operadores
- **Component Pattern**: Componentes reutilizáveis
- **Material Design**: UI seguindo Material Design

### Model: Client

```typescript
interface Client {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
  placa: string;
}
```

## 🐳 Docker

### Build

```bash
docker build -t client-control:latest .
```

### Run

```bash
docker run -p 4200:4200 -p 3000:3000 client-control:latest
```

### Com Docker Compose

```bash
docker-compose up
docker-compose down
```

## 📝 Boas Práticas Implementadas

✅ **TypeScript Strict Mode**: Tipagem forte
✅ **Separation of Concerns**: Componentes, serviços e modelos separados
✅ **Error Handling**: Tratamento de erros com feedback ao usuário
✅ **Reactive Forms**: RxJS para estado e dados
✅ **Environment Files**: Configuração via variáveis
✅ **Código Limpo**: Names descritivos, funções pequenas
✅ **Comments**: Documentação onde necessário
✅ **DRY Principle**: Reutilização de código

## 🧪 Testes

```bash
# Executar testes
npm test

# Com watch mode
npm run test -- --watch
```

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos compilados estarão em `dist/client-control-frontend/browser/`

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz (opcional):

```
API_URL=http://localhost:3000
NODE_ENV=development
```

## 📞 API Base URL

A API está configurada para `http://localhost:3000` no arquivo:
`src/app/core/services/client.service.ts`

## 🐛 Troubleshooting

### Porta 3000 em uso

```bash
# Windows
taskkill /F /IM node.exe

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Porta 4200 em uso

```bash
# Use outra porta
ng serve --port 4300
```

### Container não inicia

```bash
docker-compose logs
docker-compose ps
```

## 👨‍💻 Desenvolvedor

Desenvolvido como solução para desafio técnico de controle de clientes.

## 📄 Licença

MIT

---

**Nota**: Esta aplicação é um exemplo educacional e deve ter validações adicionais em um ambiente de produção.
