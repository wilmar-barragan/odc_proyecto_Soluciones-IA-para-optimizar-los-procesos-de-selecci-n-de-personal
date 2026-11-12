document.addEventListener('DOMContentLoaded', () => {
    let currentModuleIndex = 0;
    const totalModules = modulesData.length;
    const quizIndex = totalModules - 1; 

    const btnMenu = document.getElementById('btn-menu');
    const btnCloseMenu = document.getElementById('btn-close-menu');
    const modalMenu = document.getElementById('menu-modal');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    function initApp() { Navigation.updateView(currentModuleIndex, totalModules, modulesData); }

    function goNext() { 
        if (currentModuleIndex === quizIndex) {
            if (QuizManager.hasNextSubQuestion()) {
                QuizManager.nextSubQuestion();
            }
            return; 
        }
        if (currentModuleIndex < totalModules - 1) { 
            currentModuleIndex++; 
            Navigation.updateView(currentModuleIndex, totalModules, modulesData); 
        } 
    }
    
    function goPrev() { 
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
        currentModuleIndex = index; 
        Navigation.updateView(currentModuleIndex, totalModules, modulesData); 
        closeMenu(); 
    }
    
    function openMenu() { Navigation.initMenu(modulesData, currentModuleIndex, goToModule); modalMenu.classList.remove('hidden'); }
    function closeMenu() { modalMenu.classList.add('hidden'); }

    btnNext.addEventListener('click', goNext);
    btnPrev.addEventListener('click', goPrev);
    btnMenu.addEventListener('click', openMenu);
    btnCloseMenu.addEventListener('click', closeMenu);
    modalMenu.addEventListener('click', (e) => { if (e.target === modalMenu) closeMenu(); });

    const quizCloseBtn = document.getElementById('quiz-close-btn');
    if (quizCloseBtn) {
        quizCloseBtn.addEventListener('click', () => {
            goToModule(0); 
        });
    }

    document.querySelectorAll('.btn-play').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            const video = document.getElementById(btnEl.dataset.target);
            if(video && video.src) {
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
            
            if(video.muted) {
                slider.value = 0;
            } else {
                if(video.volume === 0) video.volume = 1;
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
            if(video.volume > 0) {
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
                    if(playBtn) playBtn.innerHTML = '&#9208;';
                }).catch(err => console.warn('Autoplay prevented:', err));
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goNext();
        else if (e.key === 'ArrowLeft') goPrev();
        else if (e.key === 'Escape') closeMenu();
    });

    initApp();
});
