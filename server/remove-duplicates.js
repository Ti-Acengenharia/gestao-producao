/**
 * Script para remover duplicatas da tabela agreements
 * Execute: node server/remove-duplicates.js
 */

const db = require('./database');

console.log('🔍 Analisando duplicatas na tabela agreements...\n');

// Buscar todas as duplicatas
const duplicates = db.prepare(`
  SELECT name, unit, price, COUNT(*) as count
  FROM agreements
  GROUP BY name, unit, price
  HAVING COUNT(*) > 1
  ORDER BY count DESC, name
`).all();

console.log(`📊 Encontradas ${duplicates.length} grupos de registros duplicados:\n`);

if (duplicates.length === 0) {
  console.log('✅ Nenhuma duplicata encontrada! Banco já está limpo.\n');
  process.exit(0);
}

// Mostrar resumo das duplicatas
duplicates.forEach((dup, index) => {
  console.log(`${index + 1}. "${dup.name}" (${dup.unit}) - ${dup.count}x duplicado`);
});

console.log('\n🗑️ Removendo duplicatas...\n');

let totalRemoved = 0;

// Para cada grupo de duplicatas, manter apenas o mais antigo (menor createdAt)
db.transaction(() => {
  duplicates.forEach((dup) => {
    // Buscar todos os IDs deste grupo duplicado
    const rows = db.prepare(`
      SELECT id, createdAt
      FROM agreements
      WHERE name = ? AND unit = ? AND price = ?
      ORDER BY createdAt ASC
    `).all(dup.name, dup.unit, dup.price);

    // Manter o primeiro (mais antigo), deletar os outros
    const [keep, ...remove] = rows;

    if (remove.length > 0) {
      const idsToRemove = remove.map(r => r.id);
      const placeholders = idsToRemove.map(() => '?').join(',');
      
      const result = db.prepare(`
        DELETE FROM agreements
        WHERE id IN (${placeholders})
      `).run(...idsToRemove);

      totalRemoved += result.changes;
      console.log(`  ✓ "${dup.name}" - removidas ${result.changes} duplicatas`);
    }
  });
})();

console.log(`\n✅ Concluído! Total de duplicatas removidas: ${totalRemoved}\n`);

// Verificar resultado final
const totalAgreements = db.prepare('SELECT COUNT(*) as count FROM agreements').get();
console.log(`📦 Total de acordos após limpeza: ${totalAgreements.count}\n`);

// Listar alguns exemplos para confirmar
console.log('📋 Amostra de acordos (primeiros 10):');
const sample = db.prepare('SELECT name, unit, price FROM agreements ORDER BY name LIMIT 10').all();
sample.forEach((row, idx) => {
  console.log(`   ${idx + 1}. ${row.name} (${row.unit}) - R$ ${row.price.toFixed(2)}`);
});

console.log('\n✨ Banco de dados limpo!\n');
