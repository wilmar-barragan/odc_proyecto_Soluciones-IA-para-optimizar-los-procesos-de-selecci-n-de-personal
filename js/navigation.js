const Navigation = {
    initMenu(modules, currentIdx, onSelectCallback) {
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = '';
        
        for (let i = 1; i < modules.length; i++) {
            const mod = modules[i];
            const card = document.createElement('div');
            card.className = `menu-card ${currentIdx === i ? 'active-card' : ''}`;
            
            if (i === 1) {
                card.innerHTML = `<div class="card-num">INICIO</div><div class="card-title">Introducción</div>`;
            } else if (mod.category === "EVALUACIÓN DE APRENDIZAJE") {
                card.innerHTML = `<div class="card-num">EVALUACIÓN</div><div class="card-title">Cuestionario ODC</div>`;
            } else if (mod.category === "METADATOS") {
                card.innerHTML = `<div class="card-num">FICHA TÉCNICA</div><div class="card-title">Metadatos del ODC</div>`;
            } else if (mod.category === "BIBLIOGRAFÍA") {
                card.innerHTML = `<div class="card-num">ANEXO</div><div class="card-title">Referencias</div>`;
            } else if (mod.category === "CONCLUSIONES") {
                card.innerHTML = `<div class="card-num">MÓDULO 12</div><div class="card-title">${mod.title}</div>`;
            } else {
                let modNum = i - 1;
                card.innerHTML = `<div class="card-num">MÓDULO ${modNum < 10 ? '0'+modNum : modNum}</div><div class="card-title">${mod.title}</div>`;
            }
            
            card.addEventListener('click', () => onSelectCallback(i));
            grid.appendChild(card);
        }
    },

    updateView(index, totalModules, data) {
        const viewCover = document.getElementById('view-cover');
        const viewModule = document.getElementById('view-module');
        const viewQuiz = document.getElementById('view-quiz');
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        const indicator = document.getElementById('progress-indicator');
        const quizIdx = data.findIndex(m => m.category === "EVALUACIÓN DE APRENDIZAJE");
        const metaIdx = data.findIndex(m => m.category === "METADATOS");
        const refIdx = data.findIndex(m => m.category === "BIBLIOGRAFÍA");
        const conclIdx = data.findIndex(m => m.category === "CONCLUSIONES");

        btnPrev.disabled = index === 0;
        btnNext.disabled = index === totalModules - 1;

        viewCover.classList.remove('fade-in');
        viewModule.classList.remove('fade-in');
        viewQuiz.classList.remove('fade-in');
        void viewCover.offsetWidth;
        void viewModule.offsetWidth;
        void viewQuiz.offsetWidth;

        document.getElementById('upload-cover').value = '';
        const uploadMod = document.getElementById('upload-module');
        if(uploadMod) uploadMod.value = '';

        if (index === 0) {
            viewModule.classList.add('hidden');
            viewQuiz.classList.add('hidden');
            viewCover.classList.remove('hidden');
            viewCover.classList.add('fade-in');
            indicator.textContent = "PORTADA";
            const coverPanel = document.querySelector(".cover-left-panel");
            if (coverPanel) coverPanel.scrollTop = 0;
            this.handleVideoLoad('video-cover', 'assets/avatars/portada.mp4', 'placeholder-cover');
            this.pauseVideo('video-module');
            
        } else if (index === quizIdx) {
            viewCover.classList.add('hidden');
            viewModule.classList.add('hidden');
            viewQuiz.classList.remove('hidden');
            viewQuiz.classList.add('fade-in');
            indicator.textContent = `CUESTIONARIO / EVALUACIÓN`;
            QuizManager.init();
            this.pauseVideo('video-cover');
            this.pauseVideo('video-module');
            
        } else {
            const modData = data[index];
            viewCover.classList.add('hidden');
            viewQuiz.classList.add('hidden');
            viewModule.classList.remove('hidden');
            viewModule.classList.add('fade-in');
            
            if (index === 1) {
                indicator.textContent = `INTRODUCCIÓN`;
            } else if (index === metaIdx) {
                indicator.textContent = `METADATOS`;
            } else if (index === refIdx) {
                indicator.textContent = `REFERENCIAS`;
            } else if (index === conclIdx) {
                indicator.textContent = `MÓDULO 12 / 12`;
            } else {
                let modNum = index - 1;
                indicator.textContent = `MÓDULO ${modNum < 10 ? '0'+modNum : modNum} / 12`;
            }
            
            const catElem = document.getElementById('mod-category');
            const titleElem = document.getElementById('mod-title');
            const headerContainer = document.getElementById('mod-header-container');
            
            if(modData.headerStyle === "left") {
                headerContainer.style.textAlign = "left";
            } else {
                headerContainer.style.textAlign = "center";
            }
            
            catElem.textContent = modData.category;
            catElem.style.display = modData.category ? 'inline-block' : 'none';
            
            titleElem.textContent = modData.title;
            titleElem.style.display = modData.title ? 'block' : 'none';
            
            let contentHTML = '';
            if (modData.section) {
                let centerClass = modData.headerStyle === "center" ? "center" : "";
                contentHTML += `<span class="orange-label ${centerClass}">${modData.section}</span>`;
            }
            contentHTML += modData.content;
            if (modData.quizQuestion) {
                contentHTML += `
                    <div class="module-quiz-trigger-bar">
                        <button type="button" class="glow-btn module-quiz-trigger-btn" onclick="window.triggerCurrentModuleQuiz()">
                            &#10067; Responder pregunta del módulo
                        </button>
                    </div>
                `;
            }
            const modBodyEl = document.getElementById('mod-body');
            modBodyEl.innerHTML = contentHTML;
            modBodyEl.scrollTop = 0;

            const avatarPanel = document.getElementById('module-avatar-panel');
            const leftPanel = document.getElementById('module-left-panel');

            if (modData.hideAvatar) {
                if (avatarPanel) avatarPanel.style.display = 'none';
                if (leftPanel) leftPanel.classList.add('full-width-panel');
                this.pauseVideo('video-module');
            } else {
                if (avatarPanel) avatarPanel.style.display = '';
                if (leftPanel) leftPanel.classList.remove('full-width-panel');
                const missingFile = document.getElementById('missing-file-name');
                if(missingFile) missingFile.textContent = `Falta el archivo: ${modData.avatarVideo}`;
                this.handleVideoLoad('video-module', modData.avatarVideo, 'placeholder-module');
            }

            this.pauseVideo('video-cover');
        }
    },

    handleVideoLoad(videoId, src, placeholderId) {
        const video = document.getElementById(videoId);
        const placeholder = document.getElementById(placeholderId);
        if(!video || !placeholder) return;
        
        video.src = src;
        video.style.opacity = '1';
        placeholder.style.display = 'none';

        video.onerror = () => {
            console.warn(`Video no encontrado localmente: ${src}`);
            placeholder.style.display = 'flex';
            video.style.opacity = '0';
        };

        const playBtn = video.parentElement.querySelector('.btn-play');
        if (playBtn) playBtn.innerHTML = '&#9654;'; // Reset to Play until playback starts

        video.load();
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (playBtn) playBtn.innerHTML = '&#9208;'; // Pause
            }).catch(error => {
                if (playBtn) playBtn.innerHTML = '&#9654;'; // Play
                if (error.name === 'NotSupportedError' || video.error) {
                    placeholder.style.display = 'flex';
                    video.style.opacity = '0';
                }
            });
        }
    },

    pauseVideo(videoId) {
        const video = document.getElementById(videoId);
        if(video) {
            video.pause();
            const playBtn = video.parentElement.querySelector('.btn-play');
            if(playBtn) playBtn.innerHTML = '&#9654;'; // Play
        }
    }
};

const QuizManager = {
    currentQuestionIndex: 0,
    answeredCorrectly: {},
    questions: [
        {
            num: "Pregunta 1",
            title: "Pregunta 1",
            text: "Los sistemas tradicionales ATS basados en palabras clave exactas descartan hasta un 15% de candidatos idóneos por discrepancias terminológicas.",
            answer: "true",
            justification: "Los algoritmos léxicos sufren de rigidez sintáctica, mientras que los modelos semánticos SBERT/DeBERTa elevan la concordancia a valores superiores a 0.88 (Ajjam & Al-Raweshidy, 2026)."
        },
        {
            num: "Pregunta 2",
            title: "Pregunta 2",
            text: "Las Expresiones Regulares (RegEx) se utilizan en el parsing de CVs para medir los rasgos de personalidad Big Five.",
            answer: "false",
            justification: "RegEx se emplea para la extracción determinista de datos de contacto; el perfilamiento psicológico se realiza mediante clasificadores LLM y modelos psicométricos (Myneni & Quadhari, 2025)."
        },
        {
            num: "Pregunta 3",
            title: "Pregunta 3",
            text: "Los resúmenes extractivos de CVs (TextRank/SBERT) mantienen una precisión superior al 93.8% sin generar alucinaciones.",
            answer: "true",
            justification: "La condensación extractiva conserva las oraciones y competencias originales del texto sin inventar información (El-Deeb, Abdelmoez, & El-Bendary, 2025)."
        },
        {
            num: "Pregunta 4",
            title: "Pregunta 4",
            text: "Las Redes Neuronales Siamesas proyectan el CV y la vacante en un espacio vectorial común de 768 dimensiones.",
            answer: "true",
            justification: "Las dos ramas gemelas comparten pesos para calcular la similitud coseno mediante funciones Triplet Loss (Vyshotravka & Smelyakov, 2025)."
        },
        {
            num: "Pregunta 5",
            title: "Pregunta 5",
            text: "Las redes recurrentes LSTM superan a las cabezas Transformer en la captura de dependencias temporales en carreras profesionales.",
            answer: "false",
            justification: "Las evaluaciones demuestran que las cabezas Transformer superan a GRU y LSTM con un MRR de 0.979 y 87.20% de exactitud en Top-100 (Łępicki & Kurek, 2025)."
        },
        {
            num: "Pregunta 6",
            title: "Pregunta 6",
            text: "La integración RAG reduce alucinaciones y eleva el F1-Score al 92.3% en la clasificación de candidatos.",
            answer: "true",
            justification: "La recuperación aumentada inyecta contexto normalizado desde bases de conocimiento estructuradas (Chafi, Kabil, & Kamouss, 2026)."
        },
        {
            num: "Pregunta 7",
            title: "Pregunta 7",
            text: "La ley EU AI Act autoriza el análisis de microexpresiones faciales y tono emocional en entrevistas automatizadas.",
            answer: "false",
            justification: "La normativa europea prohíbe el análisis biométrico emocional en selección; los sistemas éticos analizan únicamente el texto semántico (El-Deeb, Abdelmoez, & El-Bendary, 2025)."
        },
        {
            num: "Pregunta 8",
            title: "Pregunta 8",
            text: "El perfilamiento Multi-Agente con LangGraph valida ocupaciones bajo el modelo RIASEC con un ICC entre 0.87 y 0.98.",
            answer: "true",
            justification: "La orquestación de agentes expertos (Psicólogo, Reclutador, Árbitro) alcanza alta estabilidad psicométrica (Han, Luo, Ji, & Kong, 2026)."
        },
        {
            num: "Pregunta 9",
            title: "Pregunta 9",
            text: "Omitir el género y nombre en un CV elimina por completo los sesgos de los modelos de lenguaje.",
            answer: "false",
            justification: "Los LLMs mantienen sesgos implícitos por variables sustitutas, requiriendo un Bias-Corrective Memory Pool con 96.2% de bloqueo (Gelling, Urman, & Hannak, 2025; Xu et al., 2026)."
        },
        {
            num: "Pregunta 10",
            title: "Pregunta 10",
            text: "El principio Human-in-the-Loop establece que la IA toma la decisión final de contratación.",
            answer: "false",
            justification: "HITL establece que la IA actúa como copiloto explicable (XAI), reservando la decisión final exclusivamente al profesional humano (Dutta, Chatterjee, & Sarkar, 2026)."
        }
    ],

    isQuizCompleted() {
        for (let i = 0; i < this.questions.length; i++) {
            if (!this.answeredCorrectly[i]) return false;
        }
        return true;
    },

    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.answeredCorrectly = {};
    },

    updateNavigationLocks() {
        const currentSolved = !!this.answeredCorrectly[this.currentQuestionIndex];
        const allSolved = this.isQuizCompleted();

        const btnNext = document.getElementById('quiz-btn-next');
        const continueBtn = document.getElementById('quiz-btn-continue-mod12');
        const headerBtnNext = document.getElementById('btn-next');

        if (btnNext) {
            btnNext.disabled = !currentSolved;
        }
        if (continueBtn) {
            continueBtn.disabled = !allSolved;
        }
        if (headerBtnNext) {
            headerBtnNext.disabled = !currentSolved;
        }
    },

    init() {
        if (!this.isQuizCompleted()) {
            this.currentQuestionIndex = 0;
            this.answeredCorrectly = {};
        }
        this.render();
        this.bindEvents();
        
        const btnNext = document.getElementById('quiz-btn-next');
        const btnPrev = document.getElementById('quiz-btn-prev');
        
        const newBtnNext = btnNext.cloneNode(true);
        btnNext.parentNode.replaceChild(newBtnNext, btnNext);
        const newBtnPrev = btnPrev.cloneNode(true);
        btnPrev.parentNode.replaceChild(newBtnPrev, btnPrev);
        
        document.getElementById('quiz-btn-next').addEventListener('click', () => this.nextSubQuestion());
        document.getElementById('quiz-btn-prev').addEventListener('click', () => this.prevSubQuestion());
        const quizPanelEl = document.querySelector('.quiz-full-panel');
        if (quizPanelEl) quizPanelEl.scrollTop = 0;
        this.updateNavigationLocks();
    },

    render() {
        const q = this.questions[this.currentQuestionIndex];
        const alreadySolved = !!this.answeredCorrectly[this.currentQuestionIndex];

        document.getElementById('quiz-question-num').textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${this.questions.length}`;
        document.getElementById('quiz-question-title').textContent = q.title;
        document.getElementById('quiz-question-text').textContent = q.text;

        document.querySelectorAll('input[name="quiz-ans"]').forEach(radio => {
            radio.checked = alreadySolved && radio.value === q.answer;
        });

        const fb = document.getElementById('quiz-feedback');
        const justBox = document.getElementById('quiz-justification-box');
        const justText = document.getElementById('quiz-justification-text');

        if (alreadySolved) {
            fb.className = "quiz-feedback correct";
            fb.textContent = this.isQuizCompleted()
                ? "¡Felicidades! Has completado todas las preguntas correctamente. Ya puedes continuar al Módulo 12."
                : "¡Correcto! Puedes avanzar a la siguiente pregunta.";
            if (justBox && justText) {
                justText.textContent = q.justification || "";
                justBox.classList.remove('hidden');
            }
        } else {
            fb.className = "quiz-feedback hidden";
            fb.textContent = "";
            if (justBox && justText) {
                justBox.classList.add('hidden');
                justText.textContent = q.justification || "";
            }
        }
        
        const btnPrev = document.getElementById('quiz-btn-prev');
        const btnNext = document.getElementById('quiz-btn-next');
        
        if (this.currentQuestionIndex > 0) {
            btnPrev.style.display = "inline-block";
        } else {
            btnPrev.style.display = "none";
        }
        
        if (this.currentQuestionIndex === this.questions.length - 1) {
            btnNext.style.display = "none";
        } else {
            btnNext.style.display = "inline-block";
            btnNext.innerHTML = "Siguiente &#9654;";
        }

        const quizPanelEl = document.querySelector('.quiz-full-panel');
        if (quizPanelEl) quizPanelEl.scrollTop = 0;
        this.updateNavigationLocks();
    },

    bindEvents() {
        const radios = document.querySelectorAll('input[name="quiz-ans"]');
        radios.forEach(radio => {
            const newRadio = radio.cloneNode(true);
            radio.parentNode.replaceChild(newRadio, radio);
        });

        const q = this.questions[this.currentQuestionIndex];
        const alreadySolved = !!this.answeredCorrectly[this.currentQuestionIndex];
        document.querySelectorAll('input[name="quiz-ans"]').forEach(radio => {
            if (alreadySolved && radio.value === q.answer) {
                radio.checked = true;
            }
            radio.addEventListener('change', (e) => {
                const userVal = e.target.value;
                const currentQ = QuizManager.questions[QuizManager.currentQuestionIndex];
                const fb = document.getElementById('quiz-feedback');
                const justBox = document.getElementById('quiz-justification-box');
                const justText = document.getElementById('quiz-justification-text');
                
                fb.classList.remove('hidden', 'correct', 'incorrect');

                if (userVal === currentQ.answer) {
                    QuizManager.answeredCorrectly[QuizManager.currentQuestionIndex] = true;
                    fb.classList.add('correct');
                    if (QuizManager.isQuizCompleted()) {
                        fb.textContent = "¡Felicidades! Has completado todas las preguntas correctamente. Ya puedes continuar al Módulo 12.";
                    } else {
                        fb.textContent = "¡Correcto! Puedes avanzar a la siguiente pregunta.";
                    }
                    if (justBox && justText && currentQ.justification) {
                        justText.textContent = currentQ.justification;
                        justBox.classList.remove('hidden');
                    }
                } else {
                    QuizManager.answeredCorrectly[QuizManager.currentQuestionIndex] = false;
                    fb.classList.add('incorrect');
                    fb.textContent = "Incorrecto. Vuelve a intentarlo hasta lograr la respuesta correcta.";
                    if (justBox) {
                        justBox.classList.add('hidden');
                    }
                }

                QuizManager.updateNavigationLocks();
            });
        });
    },

    hasNextSubQuestion() {
        return this.currentQuestionIndex < this.questions.length - 1;
    },

    hasPrevSubQuestion() {
        return this.currentQuestionIndex > 0;
    },

    nextSubQuestion() {
        const fb = document.getElementById('quiz-feedback');
        
        if (!this.answeredCorrectly[this.currentQuestionIndex]) {
            fb.classList.remove('hidden', 'correct', 'incorrect');
            fb.classList.add('incorrect');
            fb.textContent = "Debes seleccionar la respuesta correcta antes de avanzar.";
            const quizPanelEl = document.querySelector('.quiz-full-panel');
        if (quizPanelEl) quizPanelEl.scrollTop = 0;
        this.updateNavigationLocks();
            return;
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.render();
            this.bindEvents();
        } else if (this.isQuizCompleted()) {
            fb.classList.remove('hidden', 'correct', 'incorrect');
            fb.classList.add('correct');
            fb.textContent = "¡Felicidades! Has completado todas las preguntas correctamente. Haz clic en 'Continuar al Módulo 12' o en la X superior.";
            const quizPanelEl = document.querySelector('.quiz-full-panel');
        if (quizPanelEl) quizPanelEl.scrollTop = 0;
        this.updateNavigationLocks();
        }
    },

    prevSubQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.render();
            this.bindEvents();
        }
    }
};
