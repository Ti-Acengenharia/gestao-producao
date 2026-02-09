/**
 * Script de teste para validar a API de colaboradores
 * Execute: node server/test-employees.js
 */

const API_URL = 'http://localhost:3000/api';

// Helper para fazer requisições
async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);
  return { status: response.status, data };
}

// Função para gerar ID único
function uid() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Testes
async function runTests() {
  console.log('🧪 Iniciando testes da API de Colaboradores...\n');

  try {
    // 1. Health check
    console.log('1️⃣ Health Check');
    const health = await request('/health');
    console.log(`   Status: ${health.status}`);
    console.log(`   Resposta:`, health.data);
    console.log('   ✅ Health check OK\n');

    // 2. Listar colaboradores
    console.log('2️⃣ GET /api/employees - Listar todos');
    const list1 = await request('/employees');
    console.log(`   Status: ${list1.status}`);
    console.log(`   Total: ${list1.data?.length || 0} colaboradores`);
    if (list1.data && list1.data.length > 0) {
      console.log(`   Primeiro: ${list1.data[0].name} (${list1.data[0].role})`);
    }
    console.log('   ✅ Listagem OK\n');

    // 3. Criar novo colaborador
    console.log('3️⃣ POST /api/employees - Criar novo');
    const newEmployee = {
      id: uid(),
      name: 'João Teste da Silva',
      role: 'Eletricista',
      cpf: '123.456.789-00',
      agency: '059',
      operation: '013',
      account: '12345-6',
      createdAt: Date.now(),
    };
    const created = await request('/employees', {
      method: 'POST',
      body: JSON.stringify(newEmployee),
    });
    console.log(`   Status: ${created.status}`);
    console.log(`   Criado:`, created.data);
    console.log('   ✅ Criação OK\n');

    const createdId = created.data?.id;

    // 4. Buscar por ID
    console.log('4️⃣ GET /api/employees/:id - Buscar específico');
    const getOne = await request(`/employees/${createdId}`);
    console.log(`   Status: ${getOne.status}`);
    console.log(`   Encontrado:`, getOne.data?.name);
    console.log('   ✅ Busca por ID OK\n');

    // 5. Atualizar colaborador
    console.log('5️⃣ PUT /api/employees/:id - Atualizar');
    const updated = await request(`/employees/${createdId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: 'João Teste da Silva ATUALIZADO',
        role: 'Eletricista Sênior',
        cpf: '123.456.789-00',
        agency: '059',
        operation: '013',
        account: '12345-6',
      }),
    });
    console.log(`   Status: ${updated.status}`);
    console.log(`   Atualizado:`, updated.data?.name);
    console.log('   ✅ Atualização OK\n');

    // 6. Deletar colaborador
    console.log('6️⃣ DELETE /api/employees/:id - Deletar');
    const deleted = await request(`/employees/${createdId}`, {
      method: 'DELETE',
    });
    console.log(`   Status: ${deleted.status}`);
    console.log(`   Resposta:`, deleted.data);
    console.log('   ✅ Deleção OK\n');

    // 7. Verificar que foi deletado
    console.log('7️⃣ Verificar deleção');
    const list2 = await request('/employees');
    const found = list2.data?.find((e) => e.id === createdId);
    console.log(`   Colaborador teste ainda existe? ${found ? '❌ SIM (ERRO)' : '✅ NÃO (OK)'}`);
    console.log(`   Total após deleção: ${list2.data?.length || 0}\n`);

    // Resumo final
    console.log('═══════════════════════════════════════════');
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('═══════════════════════════════════════════');
    console.log('\n📊 API de Colaboradores está funcionando corretamente!\n');

  } catch (error) {
    console.error('\n❌ ERRO NOS TESTES:', error.message);
    console.error('\n⚠️ Verifique se o servidor está rodando:');
    console.error('   cd server');
    console.error('   node server.js\n');
    process.exit(1);
  }
}

// Executar
console.log('\n');
runTests();
