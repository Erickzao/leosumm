document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const categorySelect = document.getElementById('category');
    const serviceSelect = document.getElementById('service');
    const serviceContainer = document.getElementById('service-container');
    const quantityInput = document.getElementById('quantity');
    const telegramLinkInput = document.getElementById('telegram-link');
    const createOrderBtn = document.getElementById('create-order');
    const errorMessage = document.getElementById('error-message');

    // Estado da aplicação
    let categories = [];
    let services = [];
    let selectedService = null;

    // Inicialmente esconde a mensagem de erro
    errorMessage.classList.add('hidden');

    // Função para fazer requisições à API
    async function apiRequest(endpoint, data = {}) {
        try {
            const response = await fetch('/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    endpoint,
                    data
                }),
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            showError('Erro ao comunicar com o servidor. Por favor, tente novamente.');
            return null;
        }
    }

    // Função para mostrar mensagem de erro
    function showError(message) {
        errorMessage.querySelector('span').textContent = message;
        errorMessage.classList.remove('hidden');
    }

    // Função para esconder mensagem de erro
    function hideError() {
        errorMessage.classList.add('hidden');
    }

    // Carregar serviços disponíveis
    async function loadServices() {
        try {
            hideError();
            const result = await apiRequest('services');
            
            if (!result || !result.length) {
                showError('Failed to load services. Please try again later.');
                return;
            }

            services = result;
            
            // Extrair categorias únicas
            const uniqueCategories = [...new Set(services.map(service => service.category))];
            categories = uniqueCategories.sort();

            // Preencher o select de categorias
            categorySelect.innerHTML = '<option value="" selected disabled>Selecione a Categoria</option>';
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
            showError('Failed to load services. Please try again later.');
        }
    }

    // Função para filtrar serviços por categoria
    function filterServicesByCategory(category) {
        return services.filter(service => service.category === category);
    }

    // Evento de mudança na categoria
    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        if (!selectedCategory) return;
        
        const filteredServices = filterServicesByCategory(selectedCategory);
        
        // Preencher o select de serviços
        serviceSelect.innerHTML = '<option value="" selected disabled>Selecione o Serviço</option>';
        filteredServices.forEach(service => {
            const option = document.createElement('option');
            option.value = service.service;
            option.textContent = `${service.name} - $${service.rate}`;
            serviceSelect.appendChild(option);
        });
        
        // Mostrar o container de serviços
        serviceContainer.style.display = 'block';
    });

    // Evento de mudança no serviço
    serviceSelect.addEventListener('change', function() {
        const serviceId = this.value;
        if (!serviceId) return;
        
        selectedService = services.find(service => service.service === serviceId);
        
        // Atualizar quantidade mínima e máxima
        if (selectedService) {
            quantityInput.min = selectedService.min;
            quantityInput.max = selectedService.max;
            quantityInput.value = selectedService.min;
        }
    });

    // Evento de clique no botão de criar ordem
    createOrderBtn.addEventListener('click', async () => {
        if (!selectedService) {
            showError('Por favor, selecione um serviço.');
            return;
        }

        const quantity = parseInt(quantityInput.value);
        const telegramLink = telegramLinkInput.value.trim();

        // Validação
        if (!telegramLink) {
            showError('Por favor, insira o link do Telegram.');
            return;
        }

        if (quantity < selectedService.min || quantity > selectedService.max) {
            showError(`A quantidade deve estar entre ${selectedService.min} e ${selectedService.max}.`);
            return;
        }

        try {
            hideError();
            createOrderBtn.disabled = true;
            createOrderBtn.textContent = 'Processando...';

            const result = await apiRequest('add', {
                service: selectedService.service,
                link: telegramLink,
                quantity
            });

            if (result && result.order) {
                alert(`Pedido criado com sucesso! ID: ${result.order}`);
                // Resetar formulário
                categorySelect.selectedIndex = 0;
                serviceContainer.style.display = 'none';
                quantityInput.value = 1;
                telegramLinkInput.value = '';
                selectedService = null;
            } else {
                showError(result.error || 'Erro ao criar pedido. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            showError('Erro ao criar pedido. Por favor, tente novamente.');
        } finally {
            createOrderBtn.disabled = false;
            createOrderBtn.textContent = 'Criar Ordem';
        }
    });

    // Carregar serviços ao iniciar
    loadServices();
}); 