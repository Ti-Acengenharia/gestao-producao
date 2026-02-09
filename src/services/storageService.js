/**
 * Serviço de persistência usando localStorage
 * Gerencia leitura e escrita de dados da aplicação
 */

/**
 * Lê e parseia dados JSON do localStorage com tratamento de erro
 * @param {string} key - Chave do localStorage
 * @returns {any|null} Dados parseados ou null se não existir/corrompido
 */
export const readJSON = (key) => {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Falha ao parsear localStorage["${key}"] — removendo chave.`, err);
    localStorage.removeItem(key);
    return null;
  }
};

/**
 * Salva dados no localStorage como JSON
 * @param {string} key - Chave do localStorage
 * @param {any} data - Dados a serem salvos
 */
export const writeJSON = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Erro ao salvar no localStorage["${key}"]`, err);
  }
};

/**
 * Remove uma chave do localStorage
 * @param {string} key - Chave a ser removida
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Erro ao remover localStorage["${key}"]`, err);
  }
};

/**
 * Limpa todo o localStorage
 */
export const clearAll = () => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("Erro ao limpar localStorage", err);
  }
};

// Chaves do localStorage
export const STORAGE_KEYS = {
  AGREEMENTS: "agreements",
  EMPLOYEES: "employees",
  PRODUCTION: "production",
};
