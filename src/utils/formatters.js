/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param {number|string} val - Valor a ser formatado
 * @returns {string} Valor formatado como moeda
 */
export const formatCurrency = (val) => {
  return Number(val || 0).toLocaleString("pt-BR", { 
    style: "currency", 
    currency: "BRL" 
  });
};

/**
 * Formata uma data no formato ISO (YYYY-MM-DD) para DD/MM/YYYY
 * @param {string} dateString - Data no formato ISO
 * @returns {string} Data formatada ou "-" se inválida
 */
export const formatDate = (dateString) => {
  const [year, month, day] = String(dateString || "").split("-");
  if (!year || !month || !day) return "-";
  return `${day}/${month}/${year}`;
};

/**
 * Formata um mês no formato ISO (YYYY-MM) para "Mês de Ano"
 * @param {string} isoMonth - Mês no formato ISO
 * @returns {string} Mês formatado por extenso
 */
export const formatMonthYear = (isoMonth) => {
  if (!isoMonth) return "";
  const [year, month] = isoMonth.split("-");
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
  const monthName = date.toLocaleString("pt-BR", { month: "long" });
  return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} de ${year}`;
};
