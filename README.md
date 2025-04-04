# Integração com API SMM Stone

Este projeto demonstra a integração com a API v2 da SMM Stone para serviços de mídia social.

## Configuração Local

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure o arquivo `.env` com suas credenciais:
   ```
   API_URL=https://smmstone.com/api/v2
   API_KEY=sua-chave-api
   ```
4. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```

## Implantação na Vercel

### Pré-requisitos
- Conta na [Vercel](https://vercel.com)
- [Vercel CLI](https://vercel.com/cli) instalado (opcional)

### Configuração das Variáveis de Ambiente

Antes de implantar, você precisa configurar as variáveis de ambiente na Vercel:

1. Na interface da Vercel, vá para seu projeto
2. Acesse a aba "Settings" > "Environment Variables"
3. Adicione as seguintes variáveis:
   - `API_URL`: URL da API SMM Stone
   - `API_KEY`: Sua chave de API

### Implantação

#### Usando o Git

1. Faça push do projeto para um repositório Git (GitHub, GitLab, Bitbucket)
2. Na Vercel, importe o projeto a partir do repositório
3. Selecione as configurações desejadas e clique em "Deploy"

#### Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login (se ainda não estiver logado)
vercel login

# Implantar
vercel
```

## Funcionalidades Implementadas

- **Consulta de Saldo**: Verificar o saldo disponível na sua conta
- **Lista de Serviços**: Obter todos os serviços disponíveis
- **Criação de Pedidos**: Criar novos pedidos para serviços específicos
- **Verificação de Status**: Consultar o status de pedidos existentes

## Estrutura do Projeto

- `/public` - Arquivos estáticos (HTML, CSS, JavaScript do frontend)
- `server.js` - Servidor Express que atua como proxy para a API
- `vercel.json` - Configuração para implantação na Vercel

## Documentação da API

Para mais informações sobre a API SMM Stone, consulte a documentação oficial em [smmstone.com](https://smmstone.com/). 