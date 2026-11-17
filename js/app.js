document.addEventListener('DOMContentLoaded', () => {
    let currentModuleIndex = 0;
    const totalModules = modulesData.length;
    const quizIndex = modulesData.findIndex(m => m.category === "EVALUACIÓN DE APRENDIZAJE");
    const completedPopups = {};
    let pendingAdvanceAfterPopup = false;

    const btnMenu = document.getElementById('btn-menu');
    const btnCloseMenu = document.getElementById('btn-close-menu');
    const modalMenu = document.getElementById('menu-modal');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    // Pop-up Quiz elements
    const popupModal = document.getElementById('module-quiz-modal');
    const btnClosePopup = document.getElementById('btn-close-popup-quiz');
    const popupBadge = document.getElementById('popup-quiz-badge');
    const popupTitle = document.getElementById('popup-quiz-title');
    const popupText = document.getElementById('popup-quiz-text');
    const popupFeedback = document.getElementById('popup-quiz-feedback');
    const popupJustificationBox = document.getElementById('popup-quiz-justification-box');
    const popupJustificationText = document.getElementById('popup-quiz-justification-text');
    const popupHint = document.getElementById('popup-quiz-hint');

    function initApp() {
        Navigation.updateView(currentModuleIndex, totalModules, modulesData);
    }

    function openModulePopupQuiz(modData, advanceOnClose = true) {
        if (!modData || !modData.quizQuestion) return;
        pendingAdvanceAfterPopup = advanceOnClose;

        popupBadge.textContent = `PREGUNTA DE VALIDACIÓN · ${modData.title.toUpperCase()}`;
        popupTitle.textContent = modData.quizQuestion.title;
        popupText.textContent = modData.quizQuestion.text;

        // Reset state
        document.querySelectorAll('input[name="popup-quiz-ans"]').forEach(r => {
            r.checked = false;
        });
        popupFeedback.className = 'quiz-feedback hidden';
        popupFeedback.textContent = '';
        popupJustificationBox.classList.add('hidden');
        popupJustificationText.textContent = modData.quizQuestion.justification || '';

        if (completedPopups[currentModuleIndex]) {
            btnClosePopup.classList.remove('hidden');
            if (modData.quizQuestion.justification) {
                popupJustificationBox.classList.remove('hidden');
            }
            popupHint.textContent = 'Ya superaste esta validación. Puedes cerrar con la (X) para continuar.';
        } else {
            btnClosePopup.classList.add('hidden');
            popupHint.textContent = 'Selecciona la respuesta correcta para habilitar la (X) de cierre y continuar al siguiente módulo.';
        }

        popupModal.classList.remove('hidden');
    }

    function closeModulePopupQuiz() {
        if (!completedPopups[currentModuleIndex]) return;
        popupModal.classList.add('hidden');
        if (pendingAdvanceAfterPopup) {
            pendingAdvanceAfterPopup = false;
            advanceModuleDirectly();
        }
    }

    function advanceModuleDirectly() {
        if (currentModuleIndex < totalModules - 1) {
            currentModuleIndex++;
            Navigation.updateView(currentModuleIndex, totalModules, modulesData);
        }
    }

    // Bind radio inputs inside the pop-up modal
    document.querySelectorAll('input[name="popup-quiz-ans"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const modData = modulesData[currentModuleIndex];
            if (!modData || !modData.quizQuestion) return;

            const userVal = e.target.value;
            popupFeedback.classList.remove('hidden', 'correct', 'incorrect');

            if (userVal === modData.quizQuestion.answer) {
                completedPopups[currentModuleIndex] = true;
                popupFeedback.classList.add('correct');
                popupFeedback.textContent = '¡Correcto! Haz clic en la X superior derecha para cerrar y continuar con el siguiente módulo.';
                if (modData.quizQuestion.justification) {
                    popupJustificationText.textContent = modData.quizQuestion.justification;
                    popupJustificationBox.classList.remove('hidden');
                }
                btnClosePopup.classList.remove('hidden');
                popupHint.textContent = 'Validación completada. Presiona la (X) para avanzar.';
            } else {
                popupFeedback.classList.add('incorrect');
                popupFeedback.textContent = 'Incorrecto. Revisa el contenido del módulo e inténtalo nuevamente.';
                if (!completedPopups[currentModuleIndex]) {
                    popupJustificationBox.classList.add('hidden');
                    btnClosePopup.classList.add('hidden');
                }
            }
        });
    });

    if (btnClosePopup) {
        btnClosePopup.addEventListener('click', closeModulePopupQuiz);
    }

    function goNext() {
        // Ignore if pop-up is currently open
        if (popupModal && !popupModal.classList.contains('hidden')) {
            return;
        }

        if (currentModuleIndex === quizIndex) {
            if (!QuizManager.isQuizCompleted()) {
                QuizManager.nextSubQuestion();
                return;
            }
            if (QuizManager.hasNextSubQuestion()) {
                QuizManager.nextSubQuestion();
                return;
            }
        }

        const currentMod = modulesData[currentModuleIndex];
        if (currentMod && currentMod.quizQuestion && !completedPopups[currentModuleIndex]) {
            openModulePopupQuiz(currentMod, true);
            return;
        }

        advanceModuleDirectly();
    }

    function goPrev() {
        if (popupModal && !popupModal.classList.contains('hidden')) {
            return;
        }

        if (currentModuleIndex === quizIndex) {
            if (QuizManager.hasPrevSubQuestion()) {
                QuizManager.prevSubQuestion();
                return;
            }
        }
        if (currentModuleIndex > 0) {
            currentModuleIndex--;
            Navigation.updateView(currentModuleIndex, totalModules, modulesData);
        }
    }

    function goToModule(index) {
        if (index > quizIndex && !QuizManager.isQuizCompleted()) {
            closeMenu();
            currentModuleIndex = quizIndex;
            Navigation.updateView(currentModuleIndex, totalModules, modulesData);
            if (quizWarningModal) quizWarningModal.classList.remove('hidden');
            return;
        }
        currentModuleIndex = index;
        Navigation.updateView(currentModuleIndex, totalModules, modulesData);
        closeMenu();
    }

    function openMenu() {
        Navigation.initMenu(modulesData, currentModuleIndex, goToModule);
        modalMenu.classList.remove('hidden');
    }

    function closeMenu() {
        modalMenu.classList.add('hidden');
    }

    btnNext.addEventListener('click', goNext);
    btnPrev.addEventListener('click', goPrev);
    btnMenu.addEventListener('click', openMenu);
    btnCloseMenu.addEventListener('click', closeMenu);
    modalMenu.addEventListener('click', (e) => { if (e.target === modalMenu) closeMenu(); });

    const quizWarningModal = document.getElementById('quiz-exit-warning-modal');
    const btnStayInQuiz = document.getElementById('btn-stay-in-quiz');
    const btnCancelQuizExitX = document.getElementById('btn-cancel-quiz-exit-x');
    const btnConfirmQuizExit = document.getElementById('btn-confirm-quiz-exit');

    function closeQuizWarningModal() {
        if (quizWarningModal) quizWarningModal.classList.add('hidden');
    }

    if (btnStayInQuiz) btnStayInQuiz.addEventListener('click', closeQuizWarningModal);
    if (btnCancelQuizExitX) btnCancelQuizExitX.addEventListener('click', closeQuizWarningModal);

    if (btnConfirmQuizExit) {
        btnConfirmQuizExit.addEventListener('click', () => {
            closeQuizWarningModal();
            QuizManager.resetQuiz();
            // Regresa al inicio o reinicia el circuito de evaluación bloqueando el avance hasta completarlo
            goToModule(0);
        });
    }

    const quizCloseBtn = document.getElementById('quiz-close-btn');
    if (quizCloseBtn) {
        quizCloseBtn.addEventListener('click', () => {
            if (QuizManager.isQuizCompleted()) {
                const conclIdx = modulesData.findIndex(m => m.category === "CONCLUSIONES");
                goToModule(conclIdx !== -1 ? conclIdx : 0);
            } else {
                if (quizWarningModal) quizWarningModal.classList.remove('hidden');
            }
        });
    }

    const quizContinueMod12Btn = document.getElementById('quiz-btn-continue-mod12');
    if (quizContinueMod12Btn) {
        quizContinueMod12Btn.addEventListener('click', () => {
            if (!QuizManager.isQuizCompleted()) return;
            const conclIdx = modulesData.findIndex(m => m.category === "CONCLUSIONES");
            goToModule(conclIdx !== -1 ? conclIdx : 0);
        });
    }

    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            const video = document.getElementById(btnEl.dataset.target);
            if (video && video.src) {
                if (video.paused) {
                    video.play().then(() => {
                        btnEl.innerHTML = '&#9208;'; // Pause icon
                    }).catch(err => console.warn('Playback prevented:', err));
                } else {
                    video.pause();
                    btnEl.innerHTML = '&#9654;'; // Play icon
                }
            }
        });
    });

    document.querySelectorAll('.btn-mute').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            const video = document.getElementById(btnEl.dataset.target);
            const slider = btnEl.parentElement.querySelector('.vol-slider');
            video.muted = !video.muted;
            btnEl.innerHTML = video.muted ? '&#128263;' : '&#128266;'; // Mute : Sound

            if (video.muted) {
                slider.value = 0;
            } else {
                if (video.volume === 0) video.volume = 1;
                slider.value = video.volume;
            }
        });
    });

    document.querySelectorAll('.vol-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const sliderEl = e.currentTarget;
            const video = document.getElementById(sliderEl.dataset.target);
            video.volume = parseFloat(sliderEl.value);

            const muteBtn = sliderEl.parentElement.querySelector('.btn-mute');
            if (video.volume > 0) {
                video.muted = false;
                muteBtn.innerHTML = '&#128266;';
            } else {
                video.muted = true;
                muteBtn.innerHTML = '&#128263;';
            }
        });
    });

    document.querySelectorAll('.file-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const inputEl = e.currentTarget;
                const videoId = inputEl.id === 'upload-cover' ? 'video-cover' : 'video-module';
                const video = document.getElementById(videoId);
                const placeholder = inputEl.closest('.avatar-placeholder');

                const fileURL = URL.createObjectURL(file);
                video.src = fileURL;

                placeholder.style.display = 'none';
                video.style.opacity = '1';

                video.load();
                video.play().then(() => {
                    const playBtn = video.parentElement.querySelector('.btn-play');
                    if (playBtn) playBtn.innerHTML = '&#9208;';
                }).catch(err => console.warn('Autoplay prevented:', err));
            }
        });
    });

    if (quizWarningModal) {
        quizWarningModal.addEventListener('click', (e) => {
            if (e.target === quizWarningModal) closeQuizWarningModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (quizWarningModal && !quizWarningModal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeQuizWarningModal();
            return;
        }
        if (popupModal && !popupModal.classList.contains('hidden')) {
            if (e.key === 'Escape' && completedPopups[currentModuleIndex]) {
                closeModulePopupQuiz();
            }
            return;
        }
        if (e.key === 'ArrowRight') goNext();
        else if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'Escape') closeMenu();
    });

    // Expose helper so a button inside module view can also open the module's question
    window.triggerCurrentModuleQuiz = () => {
        const currentMod = modulesData[currentModuleIndex];
        if (currentMod && currentMod.quizQuestion) {
            openModulePopupQuiz(currentMod, false);
        }
    };

    initApp();
});
