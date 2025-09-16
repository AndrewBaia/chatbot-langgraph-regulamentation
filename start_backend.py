#!/usr/bin/env python3
"""
Script para iniciar o backend do Analisador de Licitações
"""
import sys
import os

# Adicionar o diretório atual ao path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    import uvicorn
    from backend.main import app
    
    print("🚀 Iniciando Analisador de Licitações - Backend")
    print("📋 API disponível em: http://localhost:8000")
    print("📚 Documentação em: http://localhost:8000/docs")
    print("🔄 Pressione Ctrl+C para parar")
    print("-" * 50)
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
    
except ImportError as e:
    print(f"❌ Erro de importação: {e}")
    print("💡 Instale as dependências com: pip install fastapi uvicorn")
except Exception as e:
    print(f"❌ Erro ao iniciar: {e}")