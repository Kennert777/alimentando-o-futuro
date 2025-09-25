#!/bin/bash

echo "🔧 Testando Backend - Alimentando o Futuro"
echo "=========================================="

# Verificar se o backend está rodando
echo "📡 Verificando se o backend está rodando na porta 8080..."
if curl -s http://localhost:8080/api/usuarios > /dev/null; then
    echo "✅ Backend está rodando!"
else
    echo "❌ Backend não está rodando. Iniciando..."
    cd backend
    mvn spring-boot:run &
    BACKEND_PID=$!
    echo "⏳ Aguardando backend inicializar..."
    sleep 15
    
    if curl -s http://localhost:8080/api/usuarios > /dev/null; then
        echo "✅ Backend iniciado com sucesso!"
    else
        echo "❌ Falha ao iniciar backend"
        exit 1
    fi
fi

echo ""
echo "🧪 Testando endpoints principais..."

# Testar endpoint de usuários
echo "📋 Testando GET /api/usuarios..."
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8080/api/usuarios

# Testar endpoint de hortas
echo "🌱 Testando GET /api/hortas..."
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8080/api/hortas

# Testar endpoint de colheitas
echo "🌾 Testando GET /api/colheitas..."
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:8080/api/colheitas

echo ""
echo "✅ Testes concluídos!"
echo "🌐 Backend disponível em: http://localhost:8080"
echo "📚 API endpoints em: http://localhost:8080/api"