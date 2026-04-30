document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons
    lucide.createIcons();

    // Preloader - Robust Handling
    const preloader = document.querySelector('.preloader');
    const hidePreloader = () => {
        if (!preloader) return;
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
            }, 800);
        }, 500);
    };

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader);
    }

    // Fallback: hide preloader after 5 seconds anyway
    setTimeout(hidePreloader, 5000);

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-item, .stat, .pillar, .testimonial-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
            cursorOutline.style.borderColor = 'var(--accent-gold)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
            cursorOutline.style.borderColor = 'rgba(212, 175, 55, 0.3)';
        });
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const hideMenu = () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        closeMenu.addEventListener('click', hideMenu);
        mobileLinks.forEach(link => link.addEventListener('click', hideMenu));
    }

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const position = btn.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
            btn.style.transition = 'transform 0.1s ease-out';
        });

        btn.addEventListener('mouseleave', function() {
            btn.style.transform = 'translate(0px, 0px)';
            btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // Simple Tilt Effect
    const tiltElements = document.querySelectorAll('.tilt');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * -10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Calendly Integration
    const calendlyBtns = document.querySelectorAll('.calendly-trigger');
    calendlyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof Calendly !== 'undefined') {
                Calendly.initPopupWidget({ url: 'https://calendly.com/soufelipemorais/30min' });
            } else {
                alert('O agendador está carregando. Por favor, tente novamente em instantes ou chame no WhatsApp.');
            }
        });
    });

    // Number Animation
    const animateNumbers = (el) => {
        const target = parseInt(el.innerText.replace(/\D/g, ''));
        const suffix = el.innerText.replace(/[0-9]/g, '');
        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        
        const update = () => {
            current += step;
            if (current < target) {
                el.innerText = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            } else {
                el.innerText = target + suffix;
            }
        };
        update();
    };

    // Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate numbers if element contains stat-number
                const stats = entry.target.querySelectorAll('.stat-number, .trust-item strong');
                stats.forEach(stat => {
                    if (!stat.dataset.animated) {
                        animateNumbers(stat);
                        stat.dataset.animated = "true";
                    }
                });
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));



    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // Project Data for Modals
    const projectData = {
        'cmplace': {
            title: 'CM Place',
            img: 'cmplace_hero.png',
            challenge: 'A CM Place precisava de uma presença digital que refletisse o luxo e a exclusividade de seus produtos Apple. O site antigo era genérico e não convertia leads qualificados.',
            solution: 'Desenvolvemos uma interface editorial minimalista, com foco em fotografia de alto padrão e micro-interações que guiam o usuário pelo funil de desejo.',
            result: 'Aumento de 200% na taxa de conversão e um posicionamento de mercado 100% alinhado ao público de alto ticket.'
        },
        'vitalle': {
            title: 'Clínica Vitalle',
            img: 'project1.png',
            challenge: 'A clínica tinha dificuldades em converter visitantes do tráfego pago em agendamentos reais. A jornada do paciente era confusa.',
            solution: 'Reestruturamos a Landing Page focando na autoridade médica e na facilidade de agendamento via WhatsApp em menos de 3 cliques.',
            result: '+70% de agendamentos no primeiro mês e redução de 40% no custo por lead.'
        }
    };

    // Modal Logic
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImg = document.getElementById('modal-img');
    const modalChallenge = document.getElementById('modal-challenge');
    const modalSolution = document.getElementById('modal-solution');
    const modalResult = document.getElementById('modal-result');
    const closeModal = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    const openProjectModal = (projectId) => {
        const data = projectData[projectId];
        if (!data) return;

        modalTitle.innerText = data.title;
        modalImg.src = data.img;
        modalChallenge.innerText = data.challenge;
        modalSolution.innerText = data.solution;
        modalResult.innerText = data.result;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const hideProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    document.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            if (projectId) openProjectModal(projectId);
        });
    });

    if (closeModal) closeModal.addEventListener('click', hideProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', hideProjectModal);

    // Scrollspy Logic
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const scrollSpy = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);

    // Form Handling (AJAX)
    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('success-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    successModal.classList.add('active');
                    contactForm.reset();
                } else {
                    alert('Erro ao enviar mensagem. Por favor, tente novamente.');
                }
            } catch (error) {
                alert('Erro na conexão. Verifique sua internet.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Modal Close buttons for Success Modal
    document.querySelectorAll('#success-modal .modal-close, #success-modal .modal-close-btn, #success-modal .modal-overlay').forEach(btn => {
        btn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = body.getAttribute('data-theme') === 'dark' ? 'rgba(5, 5, 5, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            nav.style.background = body.getAttribute('data-theme') === 'dark' ? 'rgba(5, 5, 5, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Parallax Effect for Project Images
    window.addEventListener('scroll', () => {
        const projectImages = document.querySelectorAll('.project-item img');
        projectImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const shift = (window.innerHeight - rect.top) * 0.05;
                img.style.transform = `scale(1.1) translateY(${shift - 20}px)`;
            }
        });
    });
});
