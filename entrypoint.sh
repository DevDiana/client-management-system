#!/bin/sh

# Iniciar json-server em background
echo "Iniciando JSON Server na porta 3000..."
json-server --watch db.json --port 3000 &

# Iniciar servidor Angular/HTTP em background
echo "Iniciando servidor HTTP na porta 4200..."
npx http-server ./dist -p 4200 -g

# Manter o container rodando
wait
