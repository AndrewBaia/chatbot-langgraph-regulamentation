# 📋 LangGraph Chatbot - Brazilian Public Procurement Analyzer

An intelligent chatbot built with LangGraph for analyzing Brazilian public procurement regulations, specialized in Federal Law 14.133/2021 and State Decree 1.525/2022 from Mato Grosso State.

## 🎯 Key Features

- **Specialized Analysis**: Expert in DFD (Demand Formalization Document), ETP (Preliminary Technical Study), and TR (Terms of Reference)
- **Intelligent Search**: Uses Tavily to search official legislation sources
- **Modern Interface**: React frontend with PrimeReact for an elegant user experience
- **RESTful API**: FastAPI backend with automatic documentation
- **Real-time Processing**: Analysis with progress streaming

## 🏗️ Architecture

### Backend (Python)
- **FastAPI**: Modern and fast REST API
- **LangGraph**: Framework for building AI agents
- **LangChain**: Integration with language models
- **Tavily**: Web search specialized in official sources
- **Ollama**: Local language models (Llama 3.1, DeepSeek R1)

### Frontend (React)
- **React 18**: Modern user interface
- **PrimeReact**: Professional UI components
- **Axios**: HTTP client for API communication
- **CSS Gradients**: Modern and responsive design

## 🚀 Installation and Setup

### Prerequisites
- Python 3.11+
- Node.js 16+
- Ollama (for local models)
- API Keys: Tavily, OpenAI (optional)

### 1. Backend Configuration

```bash
# Install Python dependencies
pip install -r backend/requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env file with your API keys

# Start the backend
python start_backend.py
```

### 2. Frontend Configuration

```bash
# Install Node.js dependencies
cd frontend
npm install

# Start the frontend
npm start
# or on Windows:
start_frontend.bat
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📚 Usage

### Example Questions

1. "How to create a Demand Formalization Document (DFD)?"
2. "What are the requirements for a Preliminary Technical Study (ETP)?"
3. "How to structure a Terms of Reference (TR) for consumer goods?"
4. "What are the bidding modalities provided in Law 14.133/2021?"
5. "How does the integrated contracting process work?"

### Analysis Flow

1. **Query Generation**: System creates specific queries based on the question
2. **Web Search**: Searches information in official sources (planalto.gov.br, sefaz.mt.gov.br)
3. **Synthesis**: Processes and summarizes found information
4. **Final Analysis**: Generates technical response with citations and references

## 🔧 Configuration

### Environment Variables

```env
# AI Models
OPENAI_API_KEY=your_openai_key
TAVILY_API_KEY=your_tavily_key
PERPLEXITY_API_KEY=your_perplexity_key
OPENPERPLEX_API_KEY=your_openperplex_key

# Ollama Configuration
OLLAMA_BASE_URL=http://localhost:11434
```

### Supported Models

- **Llama 3.1 8B**: Main model for analysis
- **DeepSeek R1 8B**: Reasoning model
- **GPT-4**: Alternative via OpenAI (optional)

## 📁 Project Structure

```
chatbot-langgraph-regulamentation/
├── backend/
│   ├── main.py              # FastAPI main application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styling
│   │   └── index.js        # Entry point
│   ├── public/
│   │   └── index.html      # HTML template
│   └── package.json        # Node.js dependencies
├── perplexity.py           # Main LangGraph application
├── schemas.py              # Pydantic models
├── prompts.py              # AI prompts
├── utils.py                # Utility functions
├── start_backend.py        # Startup script
├── start_frontend.bat      # Windows script
└── pyproject.toml          # Poetry configuration
```

## 🎨 Interface

The interface offers:

- **Responsive Design**: Works on desktop and mobile
- **Real-time Progress**: Progress bar during analysis
- **Interactive Examples**: Clickable chips with common questions
- **Official References**: Direct links to legislation
- **Analysis Process**: Visualization of AI reasoning

## 🔍 Information Sources

- **Federal Law 14.133/2021**: New Brazilian Procurement Law
- **State Decree 1.525/2022**: Mato Grosso State Regulation
- **Official Websites**: planalto.gov.br, sefaz.mt.gov.br, gov.br

## 🛠️ Technical Stack

### Backend Technologies
- **Python 3.11+**: Core programming language
- **FastAPI**: Modern web framework for building APIs
- **LangGraph**: Framework for building stateful, multi-actor applications with LLMs
- **LangChain**: Framework for developing applications powered by language models
- **Pydantic**: Data validation using Python type annotations
- **Uvicorn**: ASGI server implementation

### Frontend Technologies
- **React 18**: JavaScript library for building user interfaces
- **PrimeReact**: Rich UI component library
- **Axios**: Promise-based HTTP client
- **CSS3**: Modern styling with gradients and animations

### AI/ML Technologies
- **Ollama**: Local LLM deployment and management
- **Tavily**: AI-powered search API
- **OpenAI API**: GPT models integration
- **LangSmith**: LLM application monitoring and debugging

## 🎯 Business Value

This project demonstrates:

- **Complex AI Agent Architecture**: Multi-step reasoning with LangGraph
- **Real-world Application**: Solving actual business problems in public procurement
- **Full-stack Development**: Complete web application with modern technologies
- **API Design**: RESTful API with comprehensive documentation
- **User Experience**: Intuitive interface with real-time feedback
- **Scalable Architecture**: Modular design for easy maintenance and extension

## 🚀 Deployment Ready

The application is production-ready with:

- **Docker Support**: Containerized deployment
- **Environment Configuration**: Secure API key management
- **Error Handling**: Comprehensive error management
- **Logging**: Structured logging for monitoring
- **API Documentation**: Auto-generated OpenAPI/Swagger docs

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## 👨‍💻 Author

**Andrew Baía** - [GitHub](https://github.com/AndrewBaia)

## 🙏 Acknowledgments

- LangChain/LangGraph for the agent framework
- PrimeReact for the UI components
- Tavily for specialized web search
- Ollama for local language models

---

**⚠️ Legal Disclaimer**: This system is a support tool and does not replace consultation with official legislation. Always consult primary sources for specific questions.
