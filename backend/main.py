from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import asyncio
import json
from datetime import datetime

# Importar as funções do nosso sistema de análise
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from perplexity import graph, LicitationAnalysisState

app = FastAPI(title="Analisador de Licitações API", version="1.0.0")

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],  # URLs do React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisRequest(BaseModel):
    question: str

class AnalysisResponse(BaseModel):
    question: str
    analysis: str
    references: str
    thinking_process: str
    timestamp: str
    status: str

class QueryResult(BaseModel):
    title: str
    url: str
    resume: str

class AnalysisStep(BaseModel):
    step: str
    message: str
    timestamp: str

@app.get("/")
async def root():
    return {"message": "Analisador de Licitações API - Lei 14.133/2021"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_licitation(request: AnalysisRequest):
    """
    Analisa uma pergunta sobre licitações usando a Lei 14.133/2021 e Decreto 1.525/2022
    """
    try:
        # Executar o grafo de análise
        result = graph.invoke({"user_input": request.question})
        
        # Extrair a resposta final
        final_response = result.get("final_response", "")
        
        # Separar o processo de pensamento da resposta final (se disponível)
        thinking_process = ""
        analysis = final_response
        
        if "</think>" in final_response:
            parts = final_response.split("</think>")
            thinking_process = parts[0].replace("<think>", "").strip()
            analysis = parts[1].strip() if len(parts) > 1 else final_response
        
        # Extrair referências (se houver)
        references = ""
        if "References:" in analysis:
            parts = analysis.split("References:")
            analysis = parts[0].strip()
            references = parts[1].strip() if len(parts) > 1 else ""
        
        return AnalysisResponse(
            question=request.question,
            analysis=analysis,
            references=references,
            thinking_process=thinking_process,
            timestamp=datetime.now().isoformat(),
            status="completed"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na análise: {str(e)}")

@app.post("/analyze/stream")
async def analyze_licitation_stream(request: AnalysisRequest):
    """
    Analisa uma pergunta sobre licitações com streaming de progresso
    """
    try:
        steps = []
        
        # Simular streaming do processo de análise
        async def stream_analysis():
            steps.append(AnalysisStep(
                step="build_queries",
                message="🔍 Gerando consultas específicas sobre licitações...",
                timestamp=datetime.now().isoformat()
            ))
            yield {"type": "step", "data": steps[-1].dict()}
            
            await asyncio.sleep(1)  # Simular processamento
            
            steps.append(AnalysisStep(
                step="search",
                message="📋 Buscando informações na legislação oficial...",
                timestamp=datetime.now().isoformat()
            ))
            yield {"type": "step", "data": steps[-1].dict()}
            
            await asyncio.sleep(2)  # Simular processamento
            
            steps.append(AnalysisStep(
                step="analysis",
                message="✍️ Elaborando análise técnica...",
                timestamp=datetime.now().isoformat()
            ))
            yield {"type": "step", "data": steps[-1].dict()}
            
            await asyncio.sleep(1)  # Simular processamento
            
            # Executar análise real
            result = graph.invoke({"user_input": request.question})
            final_response = result.get("final_response", "")
            
            # Processar resposta
            thinking_process = ""
            analysis = final_response
            
            if "</think>" in final_response:
                parts = final_response.split("</think>")
                thinking_process = parts[0].replace("<think>", "").strip()
                analysis = parts[1].strip() if len(parts) > 1 else final_response
            
            references = ""
            if "References:" in analysis:
                parts = analysis.split("References:")
                analysis = parts[0].strip()
                references = parts[1].strip() if len(parts) > 1 else ""
            
            yield {"type": "result", "data": {
                "question": request.question,
                "analysis": analysis,
                "references": references,
                "thinking_process": thinking_process,
                "timestamp": datetime.now().isoformat(),
                "status": "completed"
            }}
        
        return stream_analysis()
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na análise: {str(e)}")

@app.get("/examples")
async def get_example_questions():
    """
    Retorna exemplos de perguntas sobre licitações
    """
    return {
        "examples": [
            "Como elaborar um Documento de Formalização de Demanda (DFD)?",
            "Quais são os requisitos para um Estudo Técnico Preliminar (ETP)?",
            "Como estruturar um Termo de Referência (TR) para bens de consumo?",
            "Quais são as modalidades de licitação previstas na Lei 14.133/2021?",
            "Como funciona o processo de contratação integrada?",
            "Quais são os critérios de julgamento permitidos?",
            "Como elaborar especificações técnicas detalhadas?",
            "Quais documentos são obrigatórios no processo licitatório?"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)