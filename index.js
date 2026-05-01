const cur = document.getElementById('cur');
const ring = document.getElementById('ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { 
    mx = e.clientX; 
    my = e.clientY; 
});

(function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    if (cur && ring) {
        cur.style.left = mx + 'px'; 
        cur.style.top = my + 'px';
        ring.style.left = rx + 'px'; 
        ring.style.top = ry + 'px';
    }
    requestAnimationFrame(loop);
})();

const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { 
        if(e.isIntersecting) {
            e.target.classList.add('on'); 
        }
    });
}, { threshold: 0.08 });

reveals.forEach(r => obs.observe(r));
