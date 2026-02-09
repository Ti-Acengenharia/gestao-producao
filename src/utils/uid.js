/**
 * Gera um identificador único (UID)
 * Usa crypto.randomUUID se disponível, caso contrário gera baseado em timestamp
 * @returns {string} Identificador único
 */
export function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
