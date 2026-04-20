/* ═══════════════════════════════════════════
   CURSOR CUSTOMIZADO COM LAG
═══════════════════════════════════════════ */
(function () {
    const cursor = document.createElement('div');
    cursor.id = 'cursor-custom';
    Object.assign(cursor.style, {
        position: 'fixed', top: '0', left: '0',
        width: '12px', height: '12px',
        backgroundColor: '#FF4E02',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '99999',
        willChange: 'transform',
        transition: 'width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
        transform: 'translate(-50%, -50%)',
    });
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let curX = 0, curY = 0;
    const lag = 0.1; // 0–1: menor = mais lag

    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    function tick() {
        curX += (mouseX - curX) * lag;
        curY += (mouseY - curY) * lag;
        cursor.style.left = curX + 'px';
        cursor.style.top  = curY + 'px';
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    const clickable = 'a, button, [role="button"], input, textarea, select, label, [onclick]';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(clickable)) {
            cursor.style.width = '24px'; cursor.style.height = '24px';
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(clickable)) {
            cursor.style.width = '12px'; cursor.style.height = '12px';
        }
    });
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
})();


/* ═══════════════════════════════════════════
   HERO CANVAS — linhas orgânicas animadas
═══════════════════════════════════════════ */
(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, lines = [];

    function resize() {
        W = canvas.width  = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
        buildLines();
    }

    function buildLines() {
        lines = [];
        const count = 7;
        for (let i = 0; i < count; i++) {
            lines.push({
                y: H * (i / (count - 1)) * 0.9 + H * 0.05,
                amplitude: 30 + Math.random() * 50,
                frequency: 0.003 + Math.random() * 0.003,
                speed: 0.0003 + Math.random() * 0.0004,
                phase: Math.random() * Math.PI * 2,
                opacity: 0.08 + Math.random() * 0.12,
            });
        }
    }

    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, W, H);
        lines.forEach(l => {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(28,28,28,${l.opacity})`;
            ctx.lineWidth = 1;
            for (let x = 0; x <= W; x += 4) {
                const y = l.y + Math.sin(x * l.frequency + t * l.speed * 1000 + l.phase) * l.amplitude
                              + Math.sin(x * l.frequency * 2.3 + t * l.speed * 800) * (l.amplitude * 0.3);
                x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
        });
        t++;
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();


/* ═══════════════════════════════════════════
   HERO — WORD SPLIT ANIMATION
═══════════════════════════════════════════ */
(function () {
    const h1 = document.querySelector('.hero-bg h1');
    if (!h1) return;
    const words = h1.textContent.trim().split(/\s+/);
    h1.innerHTML = words.map((w, i) =>
        `<span class="hero-word" style="animation-delay:${i * 80}ms">${w}</span>`
    ).join(' ');
})();


/* ═══════════════════════════════════════════
   DETALHE — MARQUEE DUPLICAÇÃO
═══════════════════════════════════════════ */
(function () {
    const track = document.querySelector('.detalhe .container');
    if (!track) return;
    const clone = track.cloneNode(true);
    track.parentElement.appendChild(clone);
    // total width = two tracks, animation runs translateX(-50%)
    const wrap = track.parentElement;
    wrap.style.display = 'flex';
    wrap.style.width = 'max-content';
    wrap.style.animation = 'marquee 20s linear infinite';
})();


/* ═══════════════════════════════════════════
   NAVBAR — scroll blur
═══════════════════════════════════════════ */
(function () {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.style.backgroundColor = 'rgba(245,240,232,0.85)';
            header.style.backdropFilter = 'blur(12px)';
            header.style.webkitBackdropFilter = 'blur(12px)';
        } else {
            header.style.backgroundColor = 'var(--cor-neutra-claro)';
            header.style.backdropFilter = 'none';
            header.style.webkitBackdropFilter = 'none';
        }
    }, { passive: true });
})();


/* ═══════════════════════════════════════════
   MOBILE MENU
═══════════════════════════════════════════ */
(function () {
    const btn = document.getElementById('menu-toggle');
    const overlay = document.getElementById('mobile-menu');
    if (!btn || !overlay) return;

    btn.addEventListener('click', () => {
        const open = overlay.classList.toggle('open');
        btn.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            overlay.classList.remove('open');
            btn.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();


/* ═══════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
═══════════════════════════════════════════ */
(function () {
    const targets = document.querySelectorAll(
        '.card-dor1, .card-dor2, .card-dor3,' +
        '.card-servicos-bg,' +
        '.projeto-1, .projeto-2, .projeto-3,' +
        '.passo-1, .passo-2, .passo-3, .passo-4, .passo-5,' +
        '.sobre h1, .sobre .font-body, .sobre .button, .sobre-skills,' +
        '.contato > h1, .contato > .font-body, .contatos > div'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    targets.forEach(el => observer.observe(el));
})();
