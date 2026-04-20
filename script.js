/* ========== CURSOR CUSTOMIZADO ========== */

const cursor = document.createElement('div');
cursor.id = 'cursor-custom';
cursor.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background-color: var(--cor-principal);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
    will-change: transform;
`;
document.body.appendChild(cursor);

/* Esconde cursor nativo */
document.body.style.cursor = 'none';

/* Movimento suave */
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

/* Expande em itens clicáveis */
const clickableSelectors = 'a, button, [role="button"], input, textarea, select, label, [onclick]';

document.addEventListener('mouseover', (e) => {
    if (e.target.closest(clickableSelectors)) {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        e.target.closest(clickableSelectors).style.cursor = 'none';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest(clickableSelectors)) {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
    }
});

/* Esconde ao sair da janela */
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
});
