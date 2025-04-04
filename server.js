require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Obter credenciais da API do ambiente
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

// Middleware para processar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Rota para fazer proxy das requisições à API
app.post('/api', async (req, res) => {
    try {
        const { endpoint, data } = req.body;
        
        // Validar endpoint
        if (!endpoint) {
            return res.status(400).json({ error: 'Endpoint não especificado' });
        }

        // Preparar parâmetros para a API
        const apiParams = {
            key: API_KEY,
            action: endpoint,
            ...data
        };

        console.log('Enviando requisição para a API:', endpoint);
        
        // Fazer requisição à API SMMStone
        const response = await axios.post(API_URL, apiParams);
        
        // Retornar a resposta da API
        return res.json(response.data);
    } catch (error) {
        console.error('Erro na requisição à API:', error.message);
        
        // Verificar se o erro tem uma resposta da API
        if (error.response && error.response.data) {
            return res.status(error.response.status || 500).json(error.response.data);
        }
        
        // Retornar erro genérico
        return res.status(500).json({ error: 'Erro ao comunicar com a API' });
    }
});

// Rota para a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de verificação de saúde para a Vercel
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Middleware para lidar com rotas não encontradas
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor (não será usado na Vercel, mas é útil para desenvolvimento local)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

// Exportar a aplicação para a Vercel
module.exports = app; 