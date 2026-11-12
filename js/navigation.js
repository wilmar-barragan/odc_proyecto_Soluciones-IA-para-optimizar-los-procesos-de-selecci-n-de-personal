const Navigation = {
    initMenu(modules, currentIdx, onSelectCallback) {
        const grid = document.getElementById('menu-grid');
        grid.innerHTML = '';
        const quizIdx = modules.length - 1;
        
        for (let i = 1; i < modules.length; i++) {
            const mod = modules[i];
            const card = document.createElement('div');
            card.className = `menu-card ${currentIdx === i ? 'active-card' : ''}`;
            
            if (i === 1) {
                card.innerHTML = `<div class="card-num">INICIO</div><div class="card-title">Introducción</div>`;
            } else if (i === quizIdx) {
                card.innerHTML = `<div class="card-num">EVALUACIÓN</div><div class="card-title">Cuestionario ODC</div>`;
            } else if (i === quizIdx - 1) {
                card.innerHTML = `<div class="card-num">ANEXO</div><div class="card-title">Referencias</div>`;
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
        const quizIdx = totalModules - 1;

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
            } else if (index === quizIdx - 1) {
                indicator.textContent = `REFERENCIAS`;
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
            document.getElementById('mod-body').innerHTML = contentHTML;

            const missingFile = document.getElementById('missing-file-name');
            if(missingFile) missingFile.textContent = `Falta el archivo: ${modData.avatarVideo}`;

            this.handleVideoLoad('video-module', modData.avatarVideo, 'placeholder-module');
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

        video.load();
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                const playBtn = video.parentElement.querySelector('.btn-play');
                if(playBtn) playBtn.innerHTML = '&#9208;'; // Pause
            }).catch(error => {
                if(error.name === 'NotSupportedError' || video.error) {
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
    questions: [
        {
            num: "Pregunta 1",
            title: "Eficiencia del Filtrado Semántico vs. Léxico Tradicional",
            text: "Los sistemas tradicionales de seguimiento de candidatos (ATS) basados en coincidencia exacta de palabras clave pueden llegar a descartar hasta un 15% de perfiles calificados por desajustes terminológicos o sinónimos.",
            answer: "true"
        },
        {
            num: "Pregunta 2",
            title: "Análisis de Personalidad con Expresiones Regulares",
            text: "En la fase de parsing y procesamiento de información de HVs, las expresiones regulares (RegEx) se utilizan para analizar el perfil psicológico y los rasgos de personalidad del candidato.",
            answer: "false"
        },
        {
            num: "Pregunta 3",
            title: "Condensación Extractiva de Hojas de Vida",
            text: "El uso de resúmenes de texto mediante modelos de condensación extractiva como Reduction o BART previo al filtrado de HVs ayuda a eliminar ruido informativo sin perder las competencias técnicas clave.",
            answer: "true"
        },
        {
            num: "Pregunta 4",
            title: "Proyección Vectorial en Redes Siamesas",
            text: "La arquitectura de Redes Neuronales Siamesas permite proyectar tanto la hoja de vida como la descripción del empleo en un mismo espacio vectorial para calcular su grado de alineación mediante similitud del coseno.",
            answer: "true"
        },
        {
            num: "Pregunta 5",
            title: "Redes Secuenciales para Trayectorias Profesionales",
            text: "En el análisis de trayectorias laborales complejas, las redes neuronales recurrentes GRU y LSTM superan a las cabezas con atención Transformer en la captura de dependencias a largo plazo.",
            answer: "false"
        },
        {
            num: "Pregunta 6",
            title: "Mitigación de Alucinaciones con RAG",
            text: "La integración de un módulo RAG (Retrieval-Augmented Generation) respaldado por bases de datos de conocimientos reduce las alucinaciones de los LLMs y eleva el F1-Score hasta un 92.3% en la clasificación de HVs.",
            answer: "true"
        },
        {
            num: "Pregunta 7",
            title: "Regulación de Entrevistas Automatizadas",
            text: "Los sistemas de entrevistas automatizadas con IA están autorizados por la Ley de Inteligencia Artificial de la Unión Europea para analizar libremente las microexpresiones faciales y el tono emocional del candidato.",
            answer: "false"
        },
        {
            num: "Pregunta 8",
            title: "Validación Psicométrica Multi-Agente",
            text: "La arquitectura Multi-Agente con LLMs permiten validar perfiles ocupacionales a gran escala bajo la taxonomía psicométrica RIASEC de Holland con un coeficiente de correlación intraclase (ICC) superior a 0.85.",
            answer: "true"
        },
        {
            num: "Pregunta 9",
            title: "Ceguera de Campos e Inmunidad a Sesgos",
            text: "Omitir los campos de género y raza en la hoja de vida garantiza por sí solo que los Grandes Modelos de Lenguaje (LLMs) no generen recomendaciones discriminatorias.",
            answer: "false"
        },
        {
            num: "Pregunta 10",
            title: "Principio de Control Humano",
            text: "El principio de Human-in-the-Loop (HITL) establece que la Inteligencia Artificial toma la decisión final de contratación y el reclutador humano solo firma la oferta.",
            answer: "false"
        }
    ],

    init() {
        this.currentQuestionIndex = 0;
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
    },

    render() {
        const q = this.questions[this.currentQuestionIndex];
        document.getElementById('quiz-question-num').textContent = `Pregunta ${this.currentQuestionIndex + 1} de ${this.questions.length}`;
        document.getElementById('quiz-question-title').textContent = q.title;
        document.getElementById('quiz-question-text').textContent = q.text;

        document.querySelectorAll('input[name="quiz-ans"]').forEach(radio => radio.checked = false);
        const fb = document.getElementById('quiz-feedback');
        fb.className = "quiz-feedback hidden";
        fb.textContent = "";
        
        const btnPrev = document.getElementById('quiz-btn-prev');
        const btnNext = document.getElementById('quiz-btn-next');
        
        if(this.currentQuestionIndex > 0) {
            btnPrev.style.display = "inline-block";
        } else {
            btnPrev.style.display = "none";
        }
        
        if(this.currentQuestionIndex === this.questions.length - 1) {
            btnNext.textContent = "Finalizar";
        } else {
            btnNext.innerHTML = "Siguiente &#9654;";
        }
    },

    bindEvents() {
        const radios = document.querySelectorAll('input[name="quiz-ans"]');
        radios.forEach(radio => {
            const newRadio = radio.cloneNode(true);
            radio.parentNode.replaceChild(newRadio, radio);
        });

        document.querySelectorAll('input[name="quiz-ans"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const userVal = e.target.value;
                const q = QuizManager.questions[QuizManager.currentQuestionIndex];
                const fb = document.getElementById('quiz-feedback');
                
                fb.classList.remove('hidden', 'correct', 'incorrect');

                if (userVal === q.answer) {
                    fb.classList.add('correct');
                    fb.textContent = "¡Correcto! Puedes avanzar a la siguiente pregunta.";
                } else {
                    fb.classList.add('incorrect');
                    fb.textContent = "Incorrecto. Vuelve a intentarlo hasta lograr la respuesta correcta.";
                }
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
        const q = this.questions[this.currentQuestionIndex];
        const selected = document.querySelector('input[name="quiz-ans"]:checked');
        const fb = document.getElementById('quiz-feedback');
        
        if (!selected || selected.value !== q.answer) {
            fb.classList.remove('hidden', 'correct', 'incorrect');
            fb.classList.add('incorrect');
            fb.textContent = "Debes seleccionar la respuesta correcta antes de avanzar.";
            return;
        }

        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.render();
            this.bindEvents();
        } else {
            fb.classList.remove('hidden', 'correct', 'incorrect');
            fb.classList.add('correct');
            fb.textContent = "¡Felicidades! Has completado el cuestionario del ODC de manera exitosa.";
            document.getElementById('quiz-btn-next').style.display = "none";
        }
    },

    prevSubQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.render();
            this.bindEvents();
            document.getElementById('quiz-btn-next').style.display = "inline-block";
        }
    }
};
