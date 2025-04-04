const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Verificando o projeto para deploy na Vercel...');

// Verificar arquivos necessários
const requiredFiles = [
  'server.js',
  'vercel.json',
  'package.json',
  'public/index.html',
  'public/styles.css',
  'public/app.js'
];

let missingFiles = [];

requiredFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, file))) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Arquivos necessários estão faltando:');
  missingFiles.forEach(file => console.error(`   - ${file}`));
  process.exit(1);
}

console.log('✅ Todos os arquivos necessários estão presentes');

// Verificar dependências
console.log('📦 Verificando dependências...');
try {
  execSync('npm ls express axios dotenv', { stdio: 'ignore' });
  console.log('✅ Dependências principais instaladas');
} catch (error) {
  console.error('❌ Dependências principais estão faltando, execute npm install');
  process.exit(1);
}

// Verificar arquivo .env.example
if (!fs.existsSync(path.join(__dirname, '.env.example'))) {
  console.warn('⚠️ Arquivo .env.example não encontrado. Recomendado criar para documentação.');
} else {
  console.log('✅ Arquivo .env.example encontrado');
}

// Verificar se vercel.json está configurado corretamente
const vercelConfig = require('./vercel.json');
if (!vercelConfig.builds || !vercelConfig.routes) {
  console.error('❌ vercel.json não está configurado corretamente');
  process.exit(1);
}
console.log('✅ vercel.json está configurado corretamente');

// Tudo pronto!
console.log('\n🚀 Projeto pronto para deploy na Vercel!');
console.log('\nInstruções de deploy:');
console.log('1. Certifique-se de ter configurado as variáveis de ambiente na Vercel:');
console.log('   - API_URL: URL da API SMMStone');
console.log('   - API_KEY: Sua chave de API');
console.log('\n2. Para fazer deploy, execute um dos comandos:');
console.log('   - Com Vercel CLI: vercel');
console.log('   - Ou faça push para seu repositório conectado à Vercel');

console.log('\n✨ Build concluído com sucesso!'); 