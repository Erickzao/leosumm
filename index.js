require('dotenv').config();
const axios = require('axios');

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Função para fazer requisições à API
async function smmstoneAPI(action, params = {}) {
  try {
    const response = await axios.post(API_URL, {
      key: API_KEY,
      action,
      ...params
    });
    
    return response.data;
  } catch (error) {
    console.error('Erro na requisição:', error.message);
    if (error.response) {
      console.error('Resposta do servidor:', error.response.data);
    }
    throw error;
  }
}

// Exemplo: obter saldo da conta
async function getBalance() {
  try {
    const result = await smmstoneAPI('balance');
    console.log('Saldo da conta:', result);
    return result;
  } catch (error) {
    console.error('Erro ao obter saldo:', error.message);
  }
}

// Exemplo: obter serviços disponíveis
async function getServices() {
  try {
    const result = await smmstoneAPI('services');
    console.log('Serviços disponíveis:', result);
    return result;
  } catch (error) {
    console.error('Erro ao obter serviços:', error.message);
  }
}

// Exemplo: criar um novo pedido
async function createOrder(service, link, quantity) {
  try {
    const result = await smmstoneAPI('add', {
      service,
      link,
      quantity
    });
    console.log('Pedido criado:', result);
    return result;
  } catch (error) {
    console.error('Erro ao criar pedido:', error.message);
  }
}

// Exemplo: verificar status de um pedido
async function checkOrderStatus(orderId) {
  try {
    const result = await smmstoneAPI('status', { order: orderId });
    console.log('Status do pedido:', result);
    return result;
  } catch (error) {
    console.error('Erro ao verificar status do pedido:', error.message);
  }
}

// Executar os testes
async function runTests() {
  console.log('Testando API smmstone...');
  
  // Teste de saldo
  await getBalance();
  
  // Teste de serviços disponíveis
  await getServices();
  
  // Descomente e ajuste os parâmetros para testar criação de pedido
  // await createOrder(1, 'https://exemplo.com/perfil', 100);
  
  // Descomente e ajuste o ID para testar verificação de status
  // await checkOrderStatus(123456);
}

// Iniciar os testes
runTests(); 