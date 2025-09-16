import React, { useState } from 'react';
import { PrimeReactProvider } from 'primereact/api';
import { Menubar } from 'primereact/menubar';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Message } from 'primereact/message';
import { Divider } from 'primereact/divider';
import { Chip } from 'primereact/chip';
import { Tag } from 'primereact/tag';
import { Panel } from 'primereact/panel';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Badge } from 'primereact/badge';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import axios from 'axios';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  const [question, setQuestion] = useState('Como elaborar um Documento de Formalização de Demanda (DFD)?');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [examples] = useState([
    "Como elaborar um Documento de Formalização de Demanda (DFD)?",
    "Quais são os requisitos para um Estudo Técnico Preliminar (ETP)?",
    "Como estruturar um Termo de Referência (TR) para bens de consumo?",
    "Quais são as modalidades de licitação previstas na Lei 14.133/2021?",
    "Como funciona o processo de contratação integrada?",
    "Quais são os critérios de julgamento permitidos?",
    "Como elaborar especificações técnicas detalhadas?",
    "Quais documentos são obrigatórios no processo licitatório?"
  ]);
  
  const toast = useRef(null);

  const showSuccess = (message) => {
    toast.current.show({ severity: 'success', summary: 'Sucesso', detail: message, life: 3000 });
  };

  const showError = (message) => {
    toast.current.show({ severity: 'error', summary: 'Erro', detail: message, life: 3000 });
  };

  const analyzeQuestion = async () => {
    if (!question.trim()) {
      showError('Por favor, digite uma pergunta sobre licitações.');
      return;
    }

    setIsAnalyzing(true);
    setProgress(0);
    setAnalysis(null);
    setCurrentStep('Iniciando análise...');

    try {
      const response = await axios.post('/analyze', {
        question: question.trim()
      });

      // Simular progresso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simular etapas
      const steps = [
        '🔍 Gerando consultas específicas sobre licitações...',
        '📋 Buscando informações na legislação oficial...',
        '✍️ Elaborando análise técnica...',
        '📊 Finalizando análise...'
      ];

      let stepIndex = 0;
      const stepInterval = setInterval(() => {
        if (stepIndex < steps.length) {
          setCurrentStep(steps[stepIndex]);
          stepIndex++;
        } else {
          clearInterval(stepInterval);
        }
      }, 500);

      // Aguardar resposta
      setTimeout(() => {
        clearInterval(progressInterval);
        clearInterval(stepInterval);
        setProgress(100);
        setCurrentStep('Análise concluída!');
        setAnalysis(response.data);
        showSuccess('Análise concluída com sucesso!');
        setIsAnalyzing(false);
      }, 3000);

    } catch (error) {
      setIsAnalyzing(false);
      setProgress(0);
      setCurrentStep('');
      showError('Erro ao analisar a pergunta. Tente novamente.');
      console.error('Erro:', error);
    }
  };

  const selectExample = (example) => {
    setQuestion(example);
  };

  const menubarItems = [
    {
      label: 'Início',
      icon: 'pi pi-home',
      command: () => {
        setAnalysis(null);
        setQuestion('Como elaborar um Documento de Formalização de Demanda (DFD)?');
      }
    },
    {
      label: 'Sobre',
      icon: 'pi pi-info-circle',
      command: () => {
        showSuccess('Analisador de Licitações - Lei 14.133/2021 e Decreto 1.525/2022');
      }
    }
  ];

  const startItem = (
    <div className="flex align-items-center">
      <i className="pi pi-file-text text-2xl text-primary mr-2"></i>
      <span className="text-xl font-bold text-primary">Analisador de Licitações</span>
    </div>
  );

  return (
    <PrimeReactProvider>
      <div className="App">
        <Toast ref={toast} />
        
        <Menubar model={menubarItems} start={startItem} className="mb-3" />
        
        <div className="container mx-auto px-4">
          <div className="grid">
            <div className="col-12">
              <Card className="mb-4">
                <div className="text-center mb-4">
                  <h1 className="text-3xl font-bold text-primary mb-2">
                    📋 Analisador de Licitações
                  </h1>
                  <h2 className="text-xl text-600 mb-3">
                    Lei Federal 14.133/2021 e Decreto Estadual 1.525/2022
                  </h2>
                  <Tag value="Especialista em DFD, ETP e TR" severity="info" className="text-sm" />
                </div>

                <div className="field mb-4">
                  <label htmlFor="question" className="block text-900 font-medium mb-2">
                    Qual sua dúvida sobre licitações?
                  </label>
                  <InputText
                    id="question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Digite sua pergunta sobre licitações..."
                    className="w-full"
                    disabled={isAnalyzing}
                    onKeyPress={(e) => e.key === 'Enter' && analyzeQuestion()}
                  />
                </div>

                <div className="flex justify-content-center mb-4">
                  <Button
                    label="Analisar"
                    icon="pi pi-search"
                    onClick={analyzeQuestion}
                    loading={isAnalyzing}
                    disabled={isAnalyzing}
                    className="p-button-lg"
                  />
                </div>

                {isAnalyzing && (
                  <div className="mb-4">
                    <div className="flex align-items-center justify-content-between mb-2">
                      <span className="text-sm text-600">Progresso da análise</span>
                      <span className="text-sm text-600">{progress}%</span>
                    </div>
                    <ProgressBar value={progress} className="mb-2" />
                    <div className="text-center">
                      <Message severity="info" text={currentStep} className="w-full" />
                    </div>
                  </div>
                )}
              </Card>
            </div>

            <div className="col-12 md:col-6">
              <Card title="💡 Exemplos de Perguntas" className="h-full">
                <div className="flex flex-wrap gap-2">
                  {examples.map((example, index) => (
                    <Chip
                      key={index}
                      label={example}
                      className="cursor-pointer"
                      onClick={() => selectExample(example)}
                      tooltip={example}
                      tooltipOptions={{ position: 'top' }}
                    />
                  ))}
                </div>
              </Card>
            </div>

            <div className="col-12 md:col-6">
              <Card title="📚 Fontes Oficiais" className="h-full">
                <div className="flex flex-column gap-3">
                  <div className="flex align-items-center">
                    <i className="pi pi-external-link text-primary mr-2"></i>
                    <a 
                      href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Lei Federal 14.133/2021
                    </a>
                  </div>
                  <div className="flex align-items-center">
                    <i className="pi pi-external-link text-primary mr-2"></i>
                    <a 
                      href="https://app1.sefaz.mt.gov.br/Sistema/legislacao/legislacaotribut.nsf/07fa81bed2760c6b84256710004d3940/9153dee470c201df0425892e00462579?OpenDocument" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Decreto Estadual 1.525/2022
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {analysis && (
              <div className="col-12">
                <Card title="📋 Análise Técnica" className="mt-4">
                  <div className="mb-4">
                    <Tag value="Análise Concluída" severity="success" className="mr-2" />
                    <span className="text-sm text-600">
                      {new Date(analysis.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-900 mb-2">Pergunta:</h4>
                    <p className="text-700 text-lg">{analysis.question}</p>
                  </div>

                  <Divider />

                  <div className="mb-4">
                    <h4 className="text-900 mb-3">Resposta:</h4>
                    <div className="text-700 line-height-3">
                      {analysis.analysis.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-3">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {analysis.references && (
                    <>
                      <Divider />
                      <div className="mb-4">
                        <h4 className="text-900 mb-3">Referências:</h4>
                        <div className="text-700">
                          {analysis.references.split('\n').map((ref, index) => (
                            <p key={index} className="mb-2">
                              {ref}
                            </p>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {analysis.thinking_process && (
                    <>
                      <Divider />
                      <Panel header="🧠 Processo de Análise" toggleable collapsed>
                        <ScrollPanel style={{ height: '200px' }}>
                          <div className="text-700 text-sm">
                            {analysis.thinking_process.split('\n').map((line, index) => (
                              <p key={index} className="mb-2">
                                {line}
                              </p>
                            ))}
                          </div>
                        </ScrollPanel>
                      </Panel>
                    </>
                  )}

                  <Divider />
                  <div className="text-center mt-4">
                    <Message 
                      severity="info" 
                      text="💡 Esta análise é baseada na Lei Federal 14.133/2021 e no Decreto Estadual 1.525/2022. Para questões específicas, consulte sempre a legislação oficial." 
                      className="w-full" 
                    />
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrimeReactProvider>
  );
}

export default App;