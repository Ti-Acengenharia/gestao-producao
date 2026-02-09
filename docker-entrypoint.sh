#!/bin/sh

# Iniciar o servidor backend em background
cd /app/server
node server.js &

# Servir o frontend com serve
cd /app
serve -s dist -l 3000

# Manter o container rodando
wait
