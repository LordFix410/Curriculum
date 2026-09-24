/* ============================================================
   ANIMACIONES.CSS
   Portafolio: Jair Abdiel Carcúz López

   Acompaña a script/animaciones.js. Cárgalo al FINAL:

     <link rel="stylesheet" href="css/style.css">
     <link rel="stylesheet" href="css/tipografia.css">
     <link rel="stylesheet" href="css/animaciones.css">

   Todo lo "oculto hasta que aparece" depende de la clase .js-anim,
   que agrega el JS. Si el JS no carga, o el usuario tiene activado
   "reducir movimiento", la página se ve completa y sin animaciones.

   NO toca el visor de certificados (.cert-modal*).
============================================================ */

:root {
    --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}


/* ============================================================
   1. BARRA DE PROGRESO DE LECTURA
============================================================ */

.scroll-progress {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 3px;

    z-index: 10001;

    background: linear-gradient(90deg, #60a5fa, #67e8f9, #a78bfa);

    transform: scaleX(0);
    transform-origin: left;

    pointer-events: none;
    will-change: transform;
}


/* ============================================================
   2. REVELADO AL HACER SCROLL
   (usa keyframes, así no pisa los hover/transition existentes)
============================================================ */

.js-anim .anim-reveal {
    opacity: 0;
}

.js-anim .anim-reveal.anim-in {
    opacity: 1;

    animation: revealUp 0.9s var(--ease-out) backwards;
    animation-delay: var(--d, 0ms);
}

.js-anim .anim-reveal.anim-scale.anim-in {
    animation-name: revealScale;
    animation-duration: 1.2s;
}

@keyframes revealUp {
    from {
        opacity: 0;
        transform: translate3d(0, 28px, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes revealScale {
    from {
        opacity: 0;
        transform: translate3d(0, 40px, 0) scale(0.96);
    }

    to {
        opacity: 1;
        transform: none;
    }
}


/* ============================================================
   3. TÍTULO DEL HERO — palabra por palabra
============================================================ */

.hero h1 .word {
    display: inline-block;

    vertical-align: top;

    /* margen extra para no recortar tildes ni letras como g, y, p */
    padding: 0.05em 0.06em 0.16em 0;
    margin-bottom: -0.16em;

    overflow: hidden;
}

.js-anim .hero h1 .word-inner {
    display: inline-block;

    transform: translateY(105%);

    animation: wordUp 0.95s var(--ease-out) forwards;
    animation-delay: calc(180ms + var(--i, 0) * 85ms);
}

@keyframes wordUp {
    to {
        transform: translateY(0);
    }
}


/* ============================================================
   4. HERO — PROFUNDIDAD CON EL MOUSE (solo escritorio)
   El JS actualiza --tx y --ty (de -1 a 1) en .hero-photo-shell
============================================================ */

.hero-photo {
    transform:
        perspective(900px)
        rotateY(calc(var(--tx, 0) * 6deg))
        rotateX(calc(var(--ty, 0) * -5deg));

    will-change: transform;
}

.hero-photo-decoration {
    transform:
        rotate(3deg)
        translate3d(
            calc(var(--tx, 0) * -14px),
            calc(var(--ty, 0) * -10px),
            0
        );
}

/* "translate" es independiente de "transform", no rompe heroFloat */

.hero-floating-top {
    translate:
        calc(var(--tx, 0) * -16px)
        calc(var(--ty, 0) * -12px);
}

.hero-floating-bottom {
    translate:
        calc(var(--tx, 0) * 18px)
        calc(var(--ty, 0) * 14px);
}

.hero-orb {
    will-change: transform;
}


/* ============================================================
   5. HEADER — se oculta al bajar y reaparece al subir
============================================================ */

.header {
    transition:
        background 0.3s ease,
        border-color 0.3s ease,
        box-shadow 0.3s ease,
        transform 0.45s var(--ease-out);
}

.header.header-hidden {
    transform: translateY(-100%);
}


/* ============================================================
   6. LUZ QUE SIGUE AL CURSOR (tecnologías y proyecto principal)
============================================================ */

.tech-item:hover {
    background-image:
        radial-gradient(
            380px circle at var(--mx, 50%) var(--my, 50%),
            var(--tech-glow),
            transparent 65%
        );
}

.project-main:hover {
    background:
        radial-gradient(
            520px circle at var(--mx, 50%) var(--my, 50%),
            rgba(251, 113, 133, 0.09),
            transparent 60%
        ),
        linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.025),
            rgba(255, 255, 255, 0.005)
        );
}


/* ============================================================
   7. BARRAS DE PROGRESO (Formación en curso)
============================================================ */

.learning-progress-bar > div {
    transition: width 1.5s var(--ease-out);
}

.js-anim .learning-progress-bar.arm > div {
    width: 0;
}

.about-fact-number,
.certifications-summary strong,
.learning-progress-top strong,
.learning-subcourse > span {
    font-variant-numeric: tabular-nums;
}


/* ============================================================
   8. LÍNEA DE TIEMPO (Formación académica)
============================================================ */

.js-anim .education-timeline::before {
    transform: scaleY(0);
    transform-origin: top;

    transition: transform 1.6s var(--ease-out);
}

.js-anim .education-timeline.is-in::before {
    transform: scaleY(1);
}


/* ============================================================
   9. FOCO VISIBLE PARA TECLADO (accesibilidad)
============================================================ */

.header a:focus-visible,
.header button:focus-visible,
main a:focus-visible,
.footer a:focus-visible,
.btn-top:focus-visible {
    outline: 2px solid #67e8f9;
    outline-offset: 3px;
    border-radius: 6px;
}


/* ============================================================
   10. REDUCIR MOVIMIENTO
============================================================ */

@media (prefers-reduced-motion: reduce) {

    .scroll-progress {
        display: none;
    }

    .header {
        transition: none;
    }
}
