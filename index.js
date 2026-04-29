// Initialize Lucide icons
lucide.createIcons();

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
});

// Subtle Parallax for Project Images
window.addEventListener('scroll', () => {
    const projectImages = document.querySelectorAll('.project-item img');
    projectImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const speed = 0.1;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yPos = (window.innerHeight - rect.top) * speed;
            img.style.transform = `scale(1.1) translateY(${yPos - 20}px)`;
        }
    });
});

// Button Micro-interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    });
});
