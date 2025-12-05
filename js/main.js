// Main Application JavaScript
// Nour Beyond Packaging

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // DARK MODE TOGGLE
    // =========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            updateDarkModeIcon(isDark);
        });
    }
    
    function updateDarkModeIcon(isDark) {
        if (darkModeIcon) {
            if (isDark) {
                darkModeIcon.innerHTML = `
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                `;
            } else {
                darkModeIcon.innerHTML = `
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95-1.41-1.41M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41"/>
                `;
            }
        }
    }

    // =========================================
    // SCROLL PROGRESS BAR
    // =========================================
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        if (scrollProgressBar) {
            scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // =========================================
    // SCROLL TO TOP BUTTON
    // =========================================
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    function toggleScrollToTop() {
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    }
    
    window.addEventListener('scroll', toggleScrollToTop);
    toggleScrollToTop();
    
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // =========================================
    // SHARE BUTTON
    // =========================================
    const shareBtn = document.getElementById('shareBtn');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Nour Beyond Packaging',
                text: 'Check out Nour Beyond Packaging - Premium Packaging Solutions',
                url: window.location.href
            };
            
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else {
                    // Fallback: copy to clipboard
                    await navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                }
            } catch (err) {
                console.log('Share failed:', err);
            }
        });
    }

    // =========================================
    // WELCOME MODAL
    // =========================================
    const welcomeModal = document.getElementById('welcomeModal');
    const closeWelcome = document.querySelector('.welcome-close');
    
    if (welcomeModal && !sessionStorage.getItem('welcomeShown')) {
        welcomeModal.style.display = 'flex';
        sessionStorage.setItem('welcomeShown', '1');
    }
    
    if (closeWelcome) {
        closeWelcome.addEventListener('click', () => {
            if (welcomeModal) welcomeModal.style.display = 'none';
        });
    }
    
    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && welcomeModal) {
            welcomeModal.style.display = 'none';
        }
    });
    
    // Close modal on backdrop click
    if (welcomeModal) {
        welcomeModal.addEventListener('click', (e) => {
            if (e.target === welcomeModal) {
                welcomeModal.style.display = 'none';
            }
        });
    }

    // =========================================
    // FILE UPLOAD HANDLER
    // =========================================
    const logoUpload = document.getElementById('logoUpload');
    
    if (logoUpload) {
        logoUpload.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            const fileNameSpan = this.closest('.file-upload-wrapper')?.querySelector('.file-name');
            if (fileNameSpan) {
                if (fileName) {
                    fileNameSpan.textContent = fileName;
                    fileNameSpan.style.display = 'block';
                } else {
                    fileNameSpan.style.display = 'none';
                }
            }
        });
    }

    // =========================================
    // SCROLL REVEAL ANIMATION
    // =========================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 60) {
                el.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // =========================================
    // LOADING SPINNER
    // =========================================
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
        setTimeout(() => spinner.classList.add('hide'), 300);
    }

    // =========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
