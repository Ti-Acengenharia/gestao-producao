# 🌐 Acesso via Rede Local

O projeto está configurado para ser acessível via rede local (LAN).

## 📍 Endereços de Acesso

### Local (nesta máquina):
- **Frontend:** http://localhost:5175
- **Backend:** http://localhost:3000/api

### Rede (outros dispositivos):
- **Frontend:** http://10.252.0.12:5175
- **Backend:** http://10.252.0.12:3000/api

> ⚠️ **Nota:** O IP `10.252.0.12` pode mudar dependendo da sua rede. Verifique o IP ao iniciar os servidores.

## 📱 Como Acessar de Outros Dispositivos

### Pré-requisitos:
1. ✅ Ambos os dispositivos devem estar na **mesma rede Wi-Fi/LAN**
2. ✅ Firewall do Windows pode precisar de permissão para Node.js

### Passos:
1. **No seu celular/tablet/outro PC:**
   - Conecte-se à mesma rede Wi-Fi
   - Abra o navegador
   - Digite: `http://10.252.0.12:5175`
   - A aplicação deve carregar normalmente!

2. **Teste de conectividade:**
   - Se não carregar, teste: `http://10.252.0.12:3000/api/health`
   - Deve retornar: `{"status":"ok","message":"API rodando!"}`

## 🛡️ Configurar Firewall do Windows

Se outros dispositivos não conseguirem acessar, configure o firewall:

### Opção 1: Permitir Node.js (Recomendado)
1. Quando o Windows perguntar "Permitir acesso do Node.js?", clique em **Permitir**
2. Se não aparecer, continue para Opção 2

### Opção 2: Regra Manual
1. Abra **Windows Defender Firewall**
2. Clique em **Configurações Avançadas**
3. Selecione **Regras de Entrada**
4. Clique em **Nova Regra...**
5. Configure:
   - Tipo: **Porta**
   - Protocolo: **TCP**
   - Portas específicas: **3000, 5175**
   - Ação: **Permitir conexão**
   - Perfil: Marque **Domínio, Privado, Público**
   - Nome: `Gestão de Obras - Dev Server`
6. Clique em **Concluir**

### Opção 3: PowerShell (Rápido)
Execute como Administrador:
```powershell
# Permitir porta 3000 (Backend)
New-NetFirewallRule -DisplayName "Backend Node.js - Port 3000" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow

# Permitir porta 5175 (Frontend Vite)
New-NetFirewallRule -DisplayName "Frontend Vite - Port 5175" -Direction Inbound -LocalPort 5175 -Protocol TCP -Action Allow
```

## 🔍 Descobrir seu IP

Se precisar descobrir o IP da sua máquina:

### Windows:
```powershell
ipconfig
```
Procure por "Endereço IPv4" na interface ativa (geralmente `Ethernet` ou `Wi-Fi`)

### Ou use Node.js:
```javascript
const os = require('os');
const networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);
```

## 📱 Testando no Celular

1. **Conecte seu celular na mesma rede Wi-Fi**
2. **Abra o navegador (Chrome/Safari)**
3. **Digite:** `http://10.252.0.12:5175`
4. **A aplicação deve funcionar normalmente!**

### Funcionalidades testadas com sucesso:
- ✅ Navegação entre páginas
- ✅ CRUD de colaboradores
- ✅ CRUD de acordos/serviços
- ✅ CRUD de produção
- ✅ Geração de relatórios
- ✅ Sincronização com banco SQLite

## ⚠️ Problemas Comuns

### "Não consigo acessar"
- ✔️ Verifique se ambos estão na mesma rede
- ✔️ Confirme o IP correto: `ipconfig` no PowerShell
- ✔️ Teste o backend: `http://10.252.0.12:3000/api/health`
- ✔️ Verifique o firewall do Windows
- ✔️ Reinicie os servidores

### "Backend não responde"
- ✔️ Verifique se `node server.js` está rodando
- ✔️ Porta 3000 pode estar bloqueada pelo firewall
- ✔️ Teste localmente primeiro: `http://localhost:3000/api/health`

### "Frontend carrega mas não busca dados"
- ✔️ Verifique o console do navegador (F12)
- ✔️ Erro de CORS? Backend já tem CORS habilitado
- ✔️ Erro de conexão? Backend pode estar offline
- ✔️ Verifique se ambos estão rodando

## 🔐 Segurança

### ⚠️ IMPORTANTE:
- **NÃO exponha em redes públicas** (cafés, aeroportos, etc)
- **Use apenas em sua rede doméstica/escritório**
- **Para produção:** Configure HTTPS, autenticação JWT, e hospede em servidor seguro
- **Dados sensíveis:** CPFs e informações bancárias devem ser criptografados em produção

### Boas práticas:
- ✅ Use apenas em redes privadas confiáveis
- ✅ Desabilite após o desenvolvimento
- ✅ Não compartilhe o IP publicamente
- ✅ Considere VPN para acesso remoto seguro

## 🚀 Iniciar Servidores

### Backend:
```bash
cd server
node server.js
```

### Frontend:
```bash
node node_modules/vite/bin/vite.js
```

Ambos serão expostos automaticamente na rede!

## 📊 Status Atual

- ✅ Frontend exposto em: **10.252.0.12:5175**
- ✅ Backend exposto em: **10.252.0.12:3000**
- ✅ CORS habilitado para requisições cross-origin
- ✅ API configurada dinamicamente (detecta hostname)
- ✅ Banco SQLite compartilhado entre todos os acessos

---

**Desenvolvido para:** Gestão de Obras  
**Última atualização:** Fevereiro 2026
