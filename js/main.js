// Main Application JavaScript
// Nour Beyond Packaging

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // MOBILE MENU TOGGLE
    // =========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const headerRight = document.getElementById('headerRight');
    const menuOverlay = document.getElementById('menuOverlay');

    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        headerRight.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        headerRight.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            if (headerRight.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                closeMobileMenu();
            }
        });
    });

    // Close menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    });

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
        logoUpload.addEventListener('change', function (e) {
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
        anchor.addEventListener('click', function (e) {
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
    // =========================================
    // GALLERY CINEMATIC FOCUS
    // =========================================
    const galleryScroller = document.querySelector('.gallery-scroller');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function updateGalleryFocus() {
        if (!galleryScroller) return;

        const scrollerRect = galleryScroller.getBoundingClientRect();
        const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;

        let closestItem = null;
        let minDistance = Infinity;

        galleryItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = itemRect.left + itemRect.width / 2;
            const distance = Math.abs(scrollerCenter - itemCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestItem = item;
            }
        });

        galleryItems.forEach(item => {
            if (item === closestItem) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    if (galleryScroller) {
        galleryScroller.addEventListener('scroll', () => {
            requestAnimationFrame(updateGalleryFocus);
        });

        // Initial call
        updateGalleryFocus();

        // Update on resize
        window.addEventListener('resize', updateGalleryFocus);

        // =========================================
        // DYNAMIC 3D TILT EFFECT & GLARE
        // =========================================
        galleryItems.forEach(item => {
            // Create glare element
            const glare = document.createElement('div');
            glare.className = 'glare-effect';
            glare.style.cssText = `
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%);
                pointer-events: none;
                opacity: 0;
                mix-blend-mode: overlay;
                transition: opacity 0.3s;
                z-index: 2;
            `;
            item.appendChild(glare);

            item.addEventListener('mousemove', (e) => {
                if (!item.classList.contains('active')) return;

                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation (Smoother & subtler: +/- 5deg)
                const xPct = (x / rect.width) - 0.5;
                const yPct = (y / rect.height) - 0.5;

                const rotateX = yPct * -10; // Reduced intensity for professionalism
                const rotateY = xPct * 10;

                item.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                // Glare follows mouse
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 60%)`;
            });

            item.addEventListener('mouseleave', () => {
                if (item.classList.contains('active')) {
                    item.style.transform = ''; // Reverts to CSS active state
                    glare.style.opacity = '0';
                }
            });
        });
    }

    // =========================================
    // GALLERY LIGHTBOX
    // =========================================
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImg = document.getElementById('galleryModalImage');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    // Get all images
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentImageIndex = 0;

    function showImage(index) {
        if (index >= galleryImages.length) { currentImageIndex = 0; }
        else if (index < 0) { currentImageIndex = galleryImages.length - 1; }
        else { currentImageIndex = index; }

        galleryModalImg.src = galleryImages[currentImageIndex].src;
    }

    if (galleryModal && galleryModalImg) {
        // Open Modal
        galleryImages.forEach((img, index) => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function () {
                galleryModal.style.display = 'block';
                currentImageIndex = index;
                showImage(currentImageIndex);
                document.body.style.overflow = 'hidden'; // Disable scroll
            });
        });

        // Navigation Buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent closing modal
                showImage(currentImageIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent closing modal
                showImage(currentImageIndex + 1);
            });
        }

        // Close Modal Function
        function closeGalleryModal() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = ''; // Enable scroll
        }

        // Close on X click
        if (closeModal) {
            closeModal.addEventListener('click', closeGalleryModal);
        }

        // Close on backdrop click
        galleryModal.addEventListener('click', function (e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (galleryModal.style.display === 'block') {
                if (e.key === 'Escape') {
                    closeGalleryModal();
                } else if (e.key === 'ArrowLeft') {
                    showImage(currentImageIndex - 1);
                } else if (e.key === 'ArrowRight') {
                    showImage(currentImageIndex + 1);
                }
            }
        });
    }


    // =========================================
    // AUTO-SCROLL GALLERY
    // =========================================
    if (galleryScroller) {
        let isScrolling = true;
        let scrollSpeed = 0.5; // Adjust speed (lower is slower/smoother)
        let scrollDirection = 1; // 1 for forward, -1 for backward

        function autoScroll() {
            if (isScrolling) {
                // Disable snapping while auto-scrolling for smoothness
                galleryScroller.style.scrollSnapType = 'none';

                // Robust RTL detection
                const isRTL = document.body.dir === 'rtl' || document.documentElement.dir === 'rtl';

                // Logic for LTR and RTL directions
                if (!isRTL) {
                    // LTR Logic: Visual forward is Right (scrollLeft increases)
                    const maxScroll = galleryScroller.scrollWidth - galleryScroller.clientWidth;
                    if (galleryScroller.scrollLeft >= maxScroll - 1) {
                        scrollDirection = -1; // Bounce back
                    } else if (galleryScroller.scrollLeft <= 0) {
                        scrollDirection = 1; // Move right
                    }
                    galleryScroller.scrollLeft += scrollSpeed * scrollDirection;
                } else {
                    // RTL Logic: Visual forward is Left
                    // Modern browsers: 0 is right, -maxScroll is left
                    const maxScroll = galleryScroller.scrollWidth - galleryScroller.clientWidth;
                    const currentAbsScroll = Math.abs(galleryScroller.scrollLeft);

                    if (currentAbsScroll >= maxScroll - 1) {
                        scrollDirection = -1; // Bounce back (move right)
                    } else if (currentAbsScroll <= 0) {
                        scrollDirection = 1; // Forward to left
                    }

                    // In RTL, decreasing scrollLeft (moving away from 0 towards negative) moves it visually left
                    galleryScroller.scrollLeft -= scrollSpeed * scrollDirection;
                }
            } else {
                // Re-enable snapping when user interacts (if they drag/swipe)
                galleryScroller.style.scrollSnapType = 'x mandatory';
            }
            requestAnimationFrame(autoScroll);
        }

        // Start the loop
        requestAnimationFrame(autoScroll);

        // Pause on interaction
        galleryScroller.addEventListener('mouseenter', () => isScrolling = false);
        galleryScroller.addEventListener('mouseleave', () => isScrolling = true);
        galleryScroller.addEventListener('touchstart', () => isScrolling = false);
        galleryScroller.addEventListener('touchend', () => {
            setTimeout(() => isScrolling = true, 2000); // Resume after 2s
        });
    }

});
