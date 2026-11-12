const modulesData = [
    { id: 0, title: "Portada" },
    {
        id: 1,
        category: "",
        title: "Introducción",
        headerStyle: "center",
        section: "Una vista rápida, aplicada y ambiental del propósito del ODC.",
        content: `
            <div class="intro-card">
                <div class="intro-icon">&#128101;</div>
                <h3 class="intro-card-title">Grupo objetivo</h3>
                <p class="intro-card-text">Estudiantes de educación superior y profesionales interesados en modelos que hagan uso de IA para optimizar los procesos de selección de personal entre ofertas de trabajo y perfiles de candidatos.</p>
            </div>
            <div class="intro-card">
                <div class="intro-icon">&#127919;</div>
                <h3 class="intro-card-title">Resultado Esperado de Aprendizaje (REA)</h3>
                <p class="intro-card-text">El participante podrá comprender la aplicación de modelos de IA, NLP y arquitecturas de lenguaje y como se pueden optimizar estas actividades agilizando los procesos de selección de talento humano.</p>
            </div>
            <div class="intro-card">
                <div class="intro-icon">&#128161;</div>
                <h3 class="intro-card-title">CADI al que le apunta el ODC</h3>
                <p class="intro-card-text">Aprendizaje, conocimiento, tecnologías, comunicación y digitalización.</p>
            </div>
            <div class="intro-card">
                <div class="intro-icon">&#9881;&#65039;</div>
                <h3 class="intro-card-title">Metodología</h3>
                <p class="intro-card-text">Se abordarán temas como métodos de emparejamiento a través de coincidencias semánticas dinámicas, extracción de habilidades implícitas que el individuo no escribió pero que la solución IA podría deducir, normalización de datos, análisis psicométrico conductual, selección de candidato, y consolidación de datos.</p>
            </div>
            <div class="intro-card">
                <div class="intro-icon">&#128221;</div>
                <h3 class="intro-card-title">Evaluación</h3>
                <p class="intro-card-text">El participante realizará cuestionarios, resolviendo preguntas de verdadero o falso, con lo que se validará su comprensión sobre los temas abordados respecto a las soluciones que ofrecen los modelos de IA para realizar matching entre ofertas de trabajo y perfiles de candidatos.</p>
            </div>
        `,
        avatarVideo: `assets/avatars/introduccion.mp4`
    },
    {
        id: 2,
        category: "PROCESAMIENTO MASIVO",
        title: "Módulo 01: Flujo Laboral",
        headerStyle: "left",
        section: "",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Problema común:</span> cuando se usa un filtro de palabras muy estricto, se puede llegar a eliminar hasta un 15% de candidatos adecuados solo por diferencias en la forma de expresar las cosas y este proceso tarda en promedio <span class="mod1-bold">42 días.</span>
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Nueva solución:</span> Al aplicar tecnologías que entienden el significado de las palabras como SBERT o DeBERTa, el tiempo de selección se reduce a <span class="mod1-bold">menos de 10 días,</span> pudiendo analizar grandes cantidades de currículos.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Resultado clave:</span> Esta técnica tiene una precisión para encontrar candidatos adecuados <span class="mod1-bold">del 88%,</span> mucho mejor que menos del 17% que logra los filtros de palabras tradicionales.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo1.jpg" alt="Flujo Laboral Optimizado" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 1.mp4`
    },
    {
        id: 3,
        category: "ESTRUCTURACIÓN DE DATOS",
        title: "Módulo 02: Ingesta y Parsing Multi-Formato",
        headerStyle: "left",
        section: "Ingesta: Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Captura de Datos Segura:</span> identificación precisa de información sensible como correos electrónicos, teléfonos, empresas y cargos mediante métodos determinados con <span class="mod1-bold">RegEx y SpaCy NER.</span>
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Procesamiento con módulos locales (SLMs):</span> implementación de LLaMA 3 y Phi-3 en infraestructura propia para convertir currículums en formatos JSON estandarizados, garantizando la confidencialidad y eliminando riesgos de fuga de información.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Confiabilidad técnica:</span> se alcanza un <span class="mod1-bold">96.8%</span> de exactitud en la identificación de competencias técnicas y certificaciones profesionales.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo2.jpg" alt="Ingesta y Parsing Multi-Formato" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 2.mp4`
    },
    {
        id: 4,
        category: "INTELIGENCIA DE MERCADO",
        title: "Módulo 03: Crawling del Mercado y Ofertas",
        headerStyle: "left",
        section: "Puntos Clave y Métricas Operativas:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">• Monitoreo Continuo:</span> Scrapers inteligentes que identifican tendencias salariales y demanda de competencias en tiempo real.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">• Estandarización de Ofertas:</span> Generación de descripciones de cargo alineadas automáticamente con taxonomías globales (ESCO y O*NET).
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">• Eficiencia Operativa:</span> Reducción del <span class="mod1-bold">70%</span> en el tiempo de elaboración y publicación de nuevas vacantes.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo3.jpg" alt="Crawling del Mercado y Ofertas" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 3.mp4`
    },
    {
        id: 5,
        category: "BÚSQUEDA VECTORIAL RAG",
        title: "Módulo 04: Filtrado Semántico Continuo",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Arquitectura RAG y FAISS:</span> indexación avanzada de currículos en espacios vectoriales densos, lo que permite una recuperación de información mediante algoritmos k-NN en cuestión de milisegundos.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Eficacia validada:</span> Al procesar una base de 50.000 currículums, el sistema RAG demuestra una precisión del <span class="mod1-bold">94.2%</span> y un puntaje F1 (F1-Score) del <span class="mod1-bold">92.3%</span>
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Latencia mínima:</span> capacidad de respuesta excepcional, con un tiempo de consulta de apenas <span class="mod1-bold">0.45 segundos</span> para la evaluación de cada 10.000 perfiles.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo4.jpg" alt="Filtrado Semántico Continuo" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 4.mp4`
    },
    {
        id: 6,
        category: "REDES SIAMESAS",
        title: "Módulo 05: Matching de Alta Precisión",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Arquitectura de redes gemelas:</span> implementación de redes Transformer con pesos compartidos diseñadas para calcular la distancia coseno y medir la afinidad exacta entre los currículums y las vacantes.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Optimización de funciones de pérdida:</span> ajuste de modelo mediante Triplet Loss y MSELoss aplicado a vectores densos de 768 dimensiones, garantizando una representación matemática precisa de los datos.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Validación con expertos:</span> el sistema alcanza un <span class="mod1-bold">89.4%</span> de concordancia con los criterios de reclutadores senior, logrando además una reducción del <span class="mod1-bold">41%</span> en la tasa de falsos positivos.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo5.jpg" alt="Matching de Alta Precisión" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 5.mp4`
    },
    {
        id: 7,
        category: "EVALUACIÓN ADAPTATIVA",
        title: "Módulo 06: Entrevistas Automatizadas",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Entrevistas con agentes virtuales:</span> implementación de avatares y agentes de voz para entrevistas adaptativas, evaluando el contenido semántico en tiempo real mediante tecnología RAG.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Cumplimiento normativo:</span> gobernanza estricta centrada exclusivamente en el análisis de contenido textual y verbal, garantizando la desactivación total de cualquier evaluación biométrica facial o emocional.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Experiencia del candidato:</span> logrando una puntuación de satisfacción del usuario CSAT del <span class="mod1-bold">91%</span> en procesos de preselección disponibles las 24 horas del día, los 7 días de la semana.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo6.jpg" alt="Entrevistas Automatizadas" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 6.mp4`
    },
    {
        id: 8,
        category: "TAXONOMÍA RIASEC & BIG FIVE",
        title: "Módulo 07: Perfilamiento Multi Agente",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Orquestación multi agente con LangGraph:</span> colaboración coordinada de tres agentes autónomos (Psicólogo, especialista en RR.HH. y árbitro) para la elaboración integral y precisa de perfiles.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Rigor en la validación psicométrica:</span> evaluaciones respaldadas en 1.636 ocupaciones distintas, alcanzando un coeficiente de correlación intraclase (ICC) de entre <span class="mod1-bold">0.87 y 0.98</span>, lo que garantiza una alta fiabilidad estadística.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Enfoque de evaluación holística:</span> síntesis equilibrada que contempla las habilidades blandas, la motivación vocacional y la compatibilidad con la cultura organizacional.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo7.jpg" alt="Perfilamiento Multi Agente" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 7.mp4`
    },
    {
        id: 9,
        category: "GRAPH RAG & NEO4J",
        title: "Módulo 08: Grafos Ocupacionales",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Modelado temporal de conocimiento:</span> implementación de un grafo de conocimiento temporal (TKG-IR) en Neo4j para interconectar de manera dinámica y estructurada las habilidades, experiencias empresariales y títulos académicos.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Desarrollo de ruta de carrera:</span> sistema de recomendación adaptativa para la movilidad interna, alcanzando una alta precisión en la identificación de trayectorias profesionales ideales.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Eficiencia y ahorro organizacional:</span> reducción del <span class="mod1-bold">55%</span> en los costos de adquisición de talento, logrado a través de la optimización de estrategias de promoción y desarrollo interno.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo8.jpg" alt="Grafos Ocupacionales" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 8.mp4`
    },
    {
        id: 10,
        category: "EQUIDAD ALGORÍTMICA",
        title: "Módulo 09: Gobernanza y Anti sesgos",
        headerStyle: "left",
        section: "Métricas y puntos operativos clave",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Auditoria mediante perturbación:</span> ejecución de pruebas continuas que modifican variables sensibles, como nombres y géneros, para identificar y mitigar sesgos inherentes en los modelos de lenguaje.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Mecanismos de corrección activa:</span> Implementación de un bias-corrective memory pool (la cual es el pool de memoria correctiva de sesgos junto con Inferencia Bayesiana de Ensambles (EBI)) para neutralizar desviaciones algorítmicas.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Alta tasa de efectividad:</span> logro de un bloqueo exitoso del <span class="mod1-bold">96.2%</span> en la propagación de sesgos de índole sociodemográfico, garantizando procesos de IA más equitativos y confiables.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo9.jpg" alt="Gobernanza y Anti sesgos" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 9.mp4`
    },
    {
        id: 11,
        category: "TRANSPARENCIA ALGORÍTMICA",
        title: "Módulo 10: Explicabilidad (XAI) & HITL",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Transparencia y Explicabilidad:</span> generación de justificaciones claras y auditables para cada decisión, utilizando técnicas avanzadas como la atribución SHAP, LIME y el Proceso de Análisis Jerárquico (AHP).
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Enfoque centrado en el humano (HITL):</span> el sistema opera estrictamente como un asistente de recomendación, preservando la autoridad y la decisión final de contratación en los profesionales de recursos humanos.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Fortalecimiento de la confianza organizacional:</span> incremento del <span class="mod1-bold">83%</span> en la tasa de adopción y validación de la herramienta por parte de gerentes de área y auditores de RR.HH.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo10.jpg" alt="Explicabilidad (XAI) & HITL" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 10.mp4`
    },
    {
        id: 12,
        category: "ANALÍTICA PREDICTIVA",
        title: "Módulo 11: Onboarding y Retención",
        headerStyle: "left",
        section: "Aspectos fundamentales e indicadores de rendimiento:",
        content: `
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Inducción estratégica y personalizada:</span> desarrollo de planes de incorporación a la medida diseñados específicamente para cerrar las brechas de competencias detectadas durante la fase de selección.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Aceleración de rendimiento:</span> optimización del ciclo de adaptación, logrando una mejora del <span class="mod1-bold">38%</span> en el tiempo necesario para que el nuevo talento alcance su productividad.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">Aprendizaje activo:</span> implementación de modelos predictivos de retención que se nutren y ajustan de manera continua gracias a la retroalimentación constante sobre el desempeño.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo11.jpg" alt="Onboarding y Retención" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 11.mp4`
    },
    {
        id: 13,
        category: "CONCLUSIONES",
        title: "Módulo 12: Conclusiones",
        headerStyle: "left",
        section: "",
        content: `
            <div class="mod1-text-block" style="margin-bottom: 0.9rem;">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">1. Superación del Filtrado Léxico Tradicional:</span> Los métodos basados en coincidencia exacta de palabras clave sufren escasez de coincidencia y descartan hasta un 15% de candidatos idóneos. La vectorización contextual (SBERT, DeBERTa) eleva la precisión de ranking (Precision@10) a cifras superiores al 0.88 y 0.94.
                </p>
            </div>
            <div class="mod1-text-block" style="margin-bottom: 0.9rem;">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">2. Superioridad de las Cabezas Transformer en Redes Siamesas:</span> La cabeza Transformer en redes Siamesas supera a GRU y LSTM al capturar la cronología completa de la experiencia profesional, logrando un MRR de 0.979 y un 87.20% de exactitud en Top-100.
                </p>
            </div>
            <div class="mod1-text-block" style="margin-bottom: 0.9rem;">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">3. Aumento de Precisión mediante RAG y Taxonomías Normalizadas:</span> La integración de Generación Aumentada por Recuperación (RAG) con taxonomías (ESCO / O*NET) incrementa la precisión en un +2.5% absoluto y eleva el F1-Score a un 92.3%, mitigando alucinaciones.
                </p>
            </div>
            <div class="mod1-text-block" style="margin-bottom: 0.9rem;">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">4. Viabilidad de Modelos Ligeros (SLMs) e Inferencia Zero-Shot:</span> Es posible lograr rendimiento de nivel de modelo masivo (70B) en infraestructura local mediante Small Language Models (Llama 3, Phi-3) con Inferencia Bayesiana de Ensamble (EBI) o prompts estructurados Zero-Shot.
                </p>
            </div>
            <div class="mod1-text-block">
                <p class="mod1-paragraph">
                    <span class="mod1-highlight">5. Gobernanza Algorítmica, Explicabilidad (XAI) e Interacción Humana (HITL):</span> Para cumplir con la normativa ética (EU AI Act), los sistemas deben integrar capas de explicabilidad (SHAP, LIME, AHP) y asegurar que la decisión final de contratación sea 100% humana.
                </p>
            </div>
            <div class="mod1-image-container">
                <img src="assets/images/modulo12.jpg" alt="Conclusiones" class="mod1-image">
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 12.mp4`
    },
    {
        id: 14,
        category: "BIBLIOGRAFÍA",
        title: "Referencias",
        headerStyle: "left",
        section: "Fuentes de consulta y validación científica:",
        content: `
            <div class="mod1-text-block">
                <ul class="references-list">
                    <li class="reference-item">Ajjam, M.-H., & Al-Raweshidy, H. S. (2026). AI-driven semantic similarity-based job matching framework for recruitment systems. <i>Information Sciences</i>, 724, Article 122728. https://doi.org/10.1016/j.ins.2025.122728</li>
                    <li class="reference-item">Alqudah, N., Abuein, Q. Q., & Shatnawi, M. Q. (2025). AI-driven hyper-personalization and transfer learning for precision recruitment. <i>IAES International Journal of Artificial Intelligence (IJ-AI)</i>, 14(5), 4271–4278.</li>
                    <li class="reference-item">Bevara, R. V. K., et al. (2025). Resume2Vec: Transforming Applicant Tracking Systems with Intelligent Resume Embeddings for Precise Candidate Matching. <i>Electronics</i>, 14(4), Article 794.</li>
                    <li class="reference-item">Chafi, S., Kabil, M., & Kamouss, A. (2026). Hybrid Pipelines for Intelligent Human Resources Text Classification: LLMs, RAG, and Generative AI. <i>Journal of Computer Science</i>, 22(4), 1387–1395.</li>
                    <li class="reference-item">Dutta, S., Chatterjee, M., & Sarkar, D. (2026). Explainable hybrid AI for job recommendation. <i>Invention Disclosure</i>, 6, Article 100018.</li>
                    <li class="reference-item">El-Deeb, R. H., Abdelmoez, W., & El-Bendary, N. (2025). Enhancing E-Recruitment Recommendations Through Text Summarization Techniques. <i>Information</i>, 16(4), Article 333.</li>
                    <li class="reference-item">Gauhl, D., Kakkanattu, K., Mukkattu, M., & Hanne, T. (2025). Integrating Large Language Models with near Real-Time Web Crawling for Enhanced Job Recommendation Systems. <i>Computers</i>, 14(9), Article 387.</li>
                    <li class="reference-item">Han, Y., Luo, X., Ji, F., & Kong, X. (2026). Multi-Agent LLMs for Occupational Profiling: Psychometric Validation on 1636 Chinese Occupations. <i>Behavioral Sciences</i>, 16(6), Article 1064.</li>
                    <li class="reference-item">Kurek, J., et al. (2024). Zero-Shot Recommendation AI Models for Efficient Job–Candidate Matching in Recruitment Process. <i>Applied Sciences</i>, 14(6), Article 2601.</li>
                    <li class="reference-item">Gelling, J., Urman, A., & Hannak, A. (2025). Auditing the bias of conversational Al systems in occupational recomendations... <i>Journal of Computational Social Science</i>.</li>
                    <li class="reference-item">Picki, M., et al. (2025). Comparative Evaluation of Sequential Neural Network... <i>Applied Sciences</i>, 15(11), Article 5988.</li>
                    <li class="reference-item">Maree, M. (2025). Illuminating Summarization Efficacy: A Qualitative Analysis of Resume Condensation for Job Category Classification. <i>International Journal of Advance Soft Computing Applications</i>, 17(3), 276–285.</li>
                    <li class="reference-item">Myneni, M. B., & Quadhari, F. S. (2025). Hybrid Transformer-Based Resume Parsing and Job Matching Using TextRank, SBERT, and DeBERTa. <i>SSRG International Journal of Electronics and Communication Engineering</i>.</li>
                    <li class="reference-item">Rahman, S., Nur, F. N., & Afridi, A. S. (2025). JoTPaRS: A Job Title Prediction and Recommendation System for IT Professionals. <i>Advances in Artificial Intelligence and Machine Learning</i>.</li>
                    <li class="reference-item">Sato, H.-T., et al. (2025). Ensemble Bayesian Inference Leveraging Small Language Models... <i>Open Access Journal of AI and Machine Learning</i>.</li>
                    <li class="reference-item">Skondras, P., Zervas, P., & Tzimas, G. (2025). Zero-Shot Resume–Job Matching with LLMs via Structured Prompting and Semantic Embeddings. <i>Electronics</i>.</li>
                    <li class="reference-item">Vyshotravka, D. (2025). Smart Application for Recruiting Based on Natural Language Processing Methods... <i>IJISA</i>.</li>
                    <li class="reference-item">Xu, Y., et al. (2026). Adaptive talent aligner: A large language model with dynamic hierarchical analysis and bias-corrective memory pool... <i>Information Processing & Management</i>.</li>
                    <li class="reference-item">Chairoon, W., Srivatanakul, S., & Pornsakulvanich, V. (2025). Digital Workforce Matching... <i>Journal of Current Science and Technology</i>.</li>
                    <li class="reference-item">Chnaida, N., et al. (2025). How to optimize recruitment with artificial intelligence: A case study on resume analysis and matching with Shneider Al Recruit. <i>Proceedings on Engineering Sciences</i>.</li>
                </ul>
            </div>
        `,
        avatarVideo: `assets/avatars/modulo 13.mp4`
    },
    {
        id: 15,
        category: "EVALUACIÓN DE APRENDIZAJE",
        title: "Cuestionario Interactivo ODC",
        headerStyle: "left",
        section: "",
        content: "",
        avatarVideo: ""
    }
];
