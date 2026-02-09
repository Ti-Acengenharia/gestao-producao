/**
 * Serviço de API para comunicação com o backend
 * Centraliza as requisições HTTP para todos os recursos
 */

// URL da API - usa o hostname atual (funciona em localhost e rede local)
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;
  const port = 3000;
  return `http://${hostname}:${port}/api`;
};

const API_BASE_URL = getApiBaseUrl();

// Helper para fazer requisições HTTP
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Erro na requisição',
      }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    // Retornar corpo da resposta ou null para DELETE
    return response.status === 204 ? null : await response.json();
  } catch (error) {
    console.error('Erro na API:', error);
    throw error;
  }
};

// ================= API DE COLABORADORES =================

export const employeesAPI = {
  // GET /api/employees - Listar todos
  getAll: async () => {
    return await fetchAPI('/employees');
  },

  // GET /api/employees/:id - Buscar por ID
  getById: async (id) => {
    return await fetchAPI(`/employees/${id}`);
  },

  // POST /api/employees - Criar novo
  create: async (employeeData) => {
    return await fetchAPI('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData),
    });
  },

  // PUT /api/employees/:id - Atualizar
  update: async (id, employeeData) => {
    return await fetchAPI(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData),
    });
  },

  // DELETE /api/employees/:id - Deletar
  delete: async (id) => {
    return await fetchAPI(`/employees/${id}`, {
      method: 'DELETE',
    });
  },
};

// ================= API DE ACORDOS/SERVIÇOS =================

export const agreementsAPI = {
  getAll: async () => {
    return await fetchAPI('/agreements');
  },

  getById: async (id) => {
    return await fetchAPI(`/agreements/${id}`);
  },

  create: async (agreementData) => {
    return await fetchAPI('/agreements', {
      method: 'POST',
      body: JSON.stringify(agreementData),
    });
  },

  update: async (id, agreementData) => {
    return await fetchAPI(`/agreements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(agreementData),
    });
  },

  delete: async (id) => {
    return await fetchAPI(`/agreements/${id}`, {
      method: 'DELETE',
    });
  },
};

// ================= API DE PRODUÇÃO =================

export const productionAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.month) params.append('month', filters.month);
    if (filters.project) params.append('project', filters.project);

    const query = params.toString();
    return await fetchAPI(`/production${query ? '?' + query : ''}`);
  },

  getById: async (id) => {
    return await fetchAPI(`/production/${id}`);
  },

  create: async (productionData) => {
    return await fetchAPI('/production', {
      method: 'POST',
      body: JSON.stringify(productionData),
    });
  },

  delete: async (id) => {
    return await fetchAPI(`/production/${id}`, {
      method: 'DELETE',
    });
  },

  getSummary: async (month, project) => {
    return await fetchAPI(
      `/production/summary?month=${month}&project=${project}`
    );
  },

  getTotal: async (month, project) => {
    return await fetchAPI(`/production/total?month=${month}&project=${project}`);
  },
};

// ================= HEALTH CHECK =================

export const healthAPI = {
  check: async () => {
    return await fetchAPI('/health');
  },
};
