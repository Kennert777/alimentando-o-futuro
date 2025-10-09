#!/bin/bash

echo "🚀 Iniciando Alimentando o Futuro - Ambiente de Desenvolvimento"
echo "================================================================"

# Verificar se o backend está rodando
echo "📡 Verificando backend..."
if curl -s http://localhost:8080/api/ping > /dev/null; then
    echo "✅ Backend já está rodando na porta 8080"
else
    echo "🔄 Iniciando backend..."
    cd backend
    mvn spring-boot:run > backend.log 2>&1 &
    BACKEND_PID=$!
    echo "Backend iniciado com PID: $BACKEND_PID"
    cd ..
    
    # Aguardar backend inicializar
    echo "⏳ Aguardando backend inicializar..."
    for i in {1..30}; do
        if curl -s http://localhost:8080/api/ping > /dev/null; then
            echo "✅ Backend inicializado com sucesso!"
            break
        fi
        sleep 2
        echo "Tentativa $i/30..."
    done
fi

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd frontend
npm install
echo "🌐 Frontend será iniciado em http://localhost:5173"
echo "📱 Backend disponível em http://localhost:8080"
echo ""
echo "🎯 Endpoints disponíveis:"
echo "   - GET  http://localhost:8080/api/usuarios"
echo "   - GET  http://localhost:8080/api/hortas"
echo "   - GET  http://localhost:8080/api/colheitas"
echo ""
npm run dev