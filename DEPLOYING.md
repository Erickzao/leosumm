# Guia de Implantação na Vercel

Este guia mostra como implantar o projeto de integração com a API SMMStone na plataforma Vercel.

## Pré-requisitos

1. Conta na [Vercel](https://vercel.com)
2. Conta no GitHub, GitLab ou Bitbucket (opcional, mas recomendado)

## Opção 1: Implantação via Repositório Git (Recomendado)

### Passo 1: Prepare seu repositório

1. Crie um repositório no GitHub, GitLab ou Bitbucket
2. Faça push do projeto para o repositório:

```bash
git init
git add .
git commit -m "Primeiro commit"
git remote add origin <URL_DO_SEU_REPOSITORIO>
git push -u origin main
```

### Passo 2: Conecte à Vercel

1. Faça login na [Vercel](https://vercel.com)
2. Clique em "Add New" > "Project"
3. Importe seu repositório
4. Configure as variáveis de ambiente:
   - `API_URL`: `https://smmstone.com/api/v2`
   - `API_KEY`: `sua_chave_api_aqui`
5. Clique em "Deploy"

A Vercel irá automaticamente detectar que é um projeto Node.js e configurá-lo corretamente.

## Opção 2: Implantação via Vercel CLI

### Passo 1: Instale e configure a Vercel CLI

```bash
# Instale a CLI globalmente
npm install -g vercel

# Faça login na sua conta Vercel
vercel login
```

### Passo 2: Configure o projeto localmente

Certifique-se de que você tem as variáveis de ambiente configuradas corretamente:

1. Crie um arquivo `.vercel/.env.local` com o seguinte conteúdo:
   ```
   API_URL=https://smmstone.com/api/v2
   API_KEY=sua_chave_api_aqui
   ```

### Passo 3: Implante o projeto

Na pasta raiz do projeto, execute:

```bash
vercel
```

Siga as instruções interativas. Ao ser perguntado sobre as variáveis de ambiente, confirme que deseja usar as existentes.

## Verificando a implantação

1. Após a implantação, você receberá uma URL onde o aplicativo está hospedado
2. Visite a URL para verificar se o aplicativo está funcionando corretamente
3. Teste a funcionalidade "Criar Ordem" para confirmar que a integração com a API está funcionando

## Solução de problemas

### Erro: "Failed to load services"

Se você vir este erro, verifique:
1. As variáveis de ambiente estão configuradas corretamente
2. A chave da API está válida
3. O endpoint da API está acessível

### Logs de erro

Para ver os logs de erro na Vercel:
1. Acesse o painel da Vercel
2. Selecione seu projeto
3. Vá para a aba "Deployments"
4. Selecione a implantação
5. Clique em "Functions Logs"

## Configurando domínio personalizado

1. No painel da Vercel, vá para as configurações do projeto
2. Clique em "Domains"
3. Adicione seu domínio personalizado
4. Siga as instruções para configurar os registros DNS 