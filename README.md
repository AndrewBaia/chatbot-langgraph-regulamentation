# 📋 Chatbot LangGraph - Analisador de Licitações

Um chatbot inteligente construído com LangGraph para análise de licitações públicas, especializado na Lei Federal 14.133/2021 e no Decreto Estadual 1.525/2022 do Estado de Mato Grosso.

## 🎯 Funcionalidades

- **Análise Especializada**: Especialista em DFD (Documento de Formalização de Demanda), ETP (Estudo Técnico Preliminar) e TR (Termo de Referência)
- **Busca Inteligente**: Utiliza Tavily para buscar informações em fontes oficiais da legislação
- **Interface Moderna**: Frontend React com PrimeReact para uma experiência de usuário elegante
- **API RESTful**: Backend FastAPI com documentação automática
- **Processamento em Tempo Real**: Análise com streaming de progresso

## 🏗️ Arquitetura

### Backend (Python)
- **FastAPI**: API REST moderna e rápida
- **LangGraph**: Framework para construção de agentes de IA
- **LangChain**: Integração com modelos de linguagem
- **Tavily**: Busca web especializada em fontes oficiais
- **Ollama**: Modelos de linguagem locais (Llama 3.1, DeepSeek R1)

### Frontend (React)
- **React 18**: Interface de usuário moderna
- **PrimeReact**: Componentes UI profissionais
- **Axios**: Cliente HTTP para comunicação com a API
- **CSS Gradients**: Design moderno e responsivo

## 🚀 Instalação e Execução

### Pré-requisitos
- Python 3.11+
- Node.js 16+
- Ollama (para modelos locais)
- Chaves de API: Tavily, OpenAI (opcional)

### 1. Configuração do Backend

```bash
# Instalar dependências Python
pip install -r backend/requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas chaves de API

# Iniciar o backend
python start_backend.py
```

### 2. Configuração do Frontend

```bash
# Instalar dependências Node.js
cd frontend
npm install

# Iniciar o frontend
npm start
# ou no Windows:
start_frontend.bat
```

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Documentação API**: http://localhost:8000/docs

## 📚 Uso

### Exemplos de Perguntas

1. "Como elaborar um Documento de Formalização de Demanda (DFD)?"
2. "Quais são os requisitos para um Estudo Técnico Preliminar (ETP)?"
3. "Como estruturar um Termo de Referência (TR) para bens de consumo?"
4. "Quais são as modalidades de licitação previstas na Lei 14.133/2021?"
5. "Como funciona o processo de contratação integrada?"

### Fluxo de Análise

1. **Geração de Consultas**: O sistema cria consultas específicas baseadas na pergunta
2. **Busca Web**: Busca informações em fontes oficiais (planalto.gov.br, sefaz.mt.gov.br)
3. **Síntese**: Processa e resume as informações encontradas
4. **Análise Final**: Gera resposta técnica com citações e referências

## 🔧 Configuração

### Variáveis de Ambiente

```env
# Modelos de IA
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
PERPLEXITY_API_KEY=your_perplexity_key
OPENPERPLEX_API_KEY=your_openperplex_key

# Configurações do Ollama
OLLAMA_BASE_URL=http://localhost:11434
```

### Modelos Suportados

- **Llama 3.1 8B**: Modelo principal para análise
- **DeepSeek R1 8B**: Modelo de raciocínio
- **GPT-4**: Alternativa via OpenAI (opcional)

## 📁 Estrutura do Projeto

```
chatbot-langgraph-regulamentation/
├── backend/
│   ├── main.py              # API FastAPI
│   └── requirements.txt     # Dependências Python
├── frontend/
│   ├── src/
│   │   ├── App.js          # Componente principal
│   │   ├── App.css         # Estilos
│   │   └── index.js        # Ponto de entrada
│   ├── public/
│   │   └── index.html      # Template HTML
│   └── package.json        # Dependências Node.js
├── perplexity.py           # Aplicação LangGraph principal
├── schemas.py              # Modelos Pydantic
├── prompts.py              # Prompts de IA
├── utils.py                # Funções utilitárias
├── start_backend.py        # Script de inicialização
├── start_frontend.bat      # Script Windows
└── pyproject.toml          # Configuração Poetry
```

## 🎨 Interface

A interface oferece:

- **Design Responsivo**: Funciona em desktop e mobile
- **Progresso em Tempo Real**: Barra de progresso durante análise
- **Exemplos Interativos**: Chips clicáveis com perguntas comuns
- **Referências Oficiais**: Links diretos para legislação
- **Processo de Análise**: Visualização do raciocínio da IA

## 🔍 Fontes de Informação

- **Lei Federal 14.133/2021**: Nova Lei de Licitações
- **Decreto Estadual 1.525/2022**: Regulamentação do Estado de Mato Grosso
- **Sites Oficiais**: planalto.gov.br, sefaz.mt.gov.br, gov.br

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Autor

**Andrew Baía** - [GitHub](https://github.com/AndrewBaia)

## 🙏 Agradecimentos

- LangChain/LangGraph pela estrutura de agentes
- PrimeReact pelos componentes UI
- Tavily pela busca web especializada
- Ollama pelos modelos de linguagem locais

---

**⚠️ Aviso Legal**: Este sistema é uma ferramenta de apoio e não substitui a consulta à legislação oficial. Sempre consulte as fontes primárias para questões específicas.