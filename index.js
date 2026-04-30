document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons
    lucide.createIcons();

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
            }, 800);
        }, 1000);
    });

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
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-item, .stat, .pillar');
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

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
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
                    window.location.href = 'thanks.html';
                } else {
                    alert('Ops! Ocorreu um erro ao enviar sua mensagem. Tente novamente ou use o WhatsApp.');
                }
            } catch (error) {
                alert('Erro de conexão. Verifique sua internet e tente novamente.');
            }
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.8)';
            nav.style.boxShadow = 'none';
        }
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
