/* ============================================================
   PORTAFOLIO PROFESIONAL
   JAIR ABDIEL CARCÚZ LÓPEZ

   Funciones:
   - Menú móvil
   - Navegación
   - Botón volver arriba
   - Animaciones al hacer scroll
   - Sección activa en navegación
============================================================ */


/* ============================================================
   ELEMENTOS
============================================================ */

const btnMenu =
    document.getElementById("btnMenu");

const navLinks =
    document.getElementById("navLinks");

const btnTop =
    document.getElementById("btnTop");

const enlacesNavegacion =
    document.querySelectorAll(
        ".nav-links a[href^='#']"
    );


/* ============================================================
   MENÚ MÓVIL
============================================================ */

if (
    btnMenu &&
    navLinks
) {

    btnMenu.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const abierto =
                navLinks.classList.toggle(
                    "abierto"
                );


            /* Cambiar icono */

            const icono =
                btnMenu.querySelector(
                    ".material-symbols-outlined"
                );

            if (icono) {

                icono.textContent =
                    abierto
                        ? "close"
                        : "menu";

            }

        }
    );

}


/* ============================================================
   CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
============================================================ */

enlacesNavegacion.forEach(
    enlace => {

        enlace.addEventListener(
            "click",
            () => {

                cerrarMenu();

            }
        );

    }
);


/* ============================================================
   CERRAR MENÚ AL TOCAR FUERA
============================================================ */

document.addEventListener(
    "click",
    (event) => {

        if (
            !event.target.closest(".nav")
        ) {

            cerrarMenu();

        }

    }
);


/* ============================================================
   CERRAR MENÚ CON ESCAPE
============================================================ */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            cerrarMenu();

        }

    }
);


/* ============================================================
   FUNCIÓN CERRAR MENÚ
============================================================ */

function cerrarMenu() {

    if (!navLinks) {
        return;
    }


    navLinks.classList.remove(
        "abierto"
    );


    if (btnMenu) {

        const icono =
            btnMenu.querySelector(
                ".material-symbols-outlined"
            );

        if (icono) {

            icono.textContent =
                "menu";

        }

    }

}


/* ============================================================
   CORREGIR MENÚ AL CAMBIAR TAMAÑO DE VENTANA
============================================================ */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 760
        ) {

            cerrarMenu();

        }

    }
);


/* ============================================================
   BOTÓN VOLVER ARRIBA
============================================================ */

function actualizarBotonArriba() {

    if (!btnTop) {
        return;
    }


    if (
        window.scrollY > 500
    ) {

        btnTop.classList.add(
            "visible"
        );

    }
    else {

        btnTop.classList.remove(
            "visible"
        );

    }

}


window.addEventListener(
    "scroll",
    actualizarBotonArriba,
    {
        passive: true
    }
);


actualizarBotonArriba();


/* ============================================================
   VOLVER ARRIBA
============================================================ */

if (btnTop) {

    btnTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* ============================================================
   ANIMACIONES AL HACER SCROLL
============================================================ */

const elementosAnimados =
    document.querySelectorAll(`

        .documentation-card,
        
        .section-heading,

        .about-text,

        .stat-card,

        .tech-card,

        .timeline-item,

        .project-card,

        .learning-intro,

        .learning-card,

        .learning-note,

        .cert-card,

        .cert-note,

        .education-card,

        .contact-card

    `);


/* ============================================================
   INTERSECTION OBSERVER
============================================================ */

if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(

            (entradas, observador) => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .classList.add(
                                    "visible"
                                );


                            /*
                                Dejamos de observarlo
                                para que la animación
                                ocurra una sola vez.
                            */

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },

            {

                threshold: 0.10,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );


    elementosAnimados.forEach(
        elemento => {

            observer.observe(
                elemento
            );

        }
    );

}
else {

    /*
        Navegadores antiguos:
        mostrar todo directamente.
    */

    elementosAnimados.forEach(
        elemento => {

            elemento.classList.add(
                "visible"
            );

        }
    );

}


/* ============================================================
   PEQUEÑO RETARDO ESCALONADO EN TARJETAS
============================================================ */

function aplicarRetardos(
    selector
) {

    const elementos =
        document.querySelectorAll(
            selector
        );


    elementos.forEach(
        (elemento, indice) => {

            /*
                Máximo 4 posiciones para
                evitar animaciones demasiado
                lentas.
            */

            const posicion =
                indice % 4;


            elemento.style.transitionDelay =
                `${posicion * 70}ms`;

        }
    );

}


aplicarRetardos(
    ".tech-card"
);

aplicarRetardos(
    ".project-card"
);

aplicarRetardos(
    ".learning-card"
);

aplicarRetardos(
    ".cert-card"
);

aplicarRetardos(
    ".education-card"
);


/* ============================================================
   SECCIÓN ACTIVA EN EL MENÚ
============================================================ */

const secciones =
    document.querySelectorAll(
        "section[id]"
    );


function actualizarSeccionActiva() {

    const posicionScroll =
        window.scrollY + 150;


    let seccionActual =
        "";


    secciones.forEach(
        seccion => {

            const inicio =
                seccion.offsetTop;

            const alto =
                seccion.offsetHeight;


            if (
                posicionScroll >= inicio &&
                posicionScroll <
                    inicio + alto
            ) {

                seccionActual =
                    seccion.id;

            }

        }
    );


    enlacesNavegacion.forEach(
        enlace => {

            enlace.classList.remove(
                "activo"
            );


            const destino =
                enlace.getAttribute(
                    "href"
                );


            if (
                destino ===
                `#${seccionActual}`
            ) {

                enlace.classList.add(
                    "activo"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    actualizarSeccionActiva,
    {
        passive: true
    }
);


actualizarSeccionActiva();


/* ============================================================
   ENLACES INTERNOS
   SCROLL SUAVE
============================================================ */

document.querySelectorAll(
    'a[href^="#"]'
)
.forEach(
    enlace => {

        enlace.addEventListener(
            "click",
            (event) => {

                const destino =
                    enlace.getAttribute(
                        "href"
                    );


                if (
                    !destino ||
                    destino === "#"
                ) {

                    return;

                }


                const elemento =
                    document.querySelector(
                        destino
                    );


                if (!elemento) {
                    return;
                }


                event.preventDefault();


                elemento.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);


/* ============================================================
   LOGO → INICIO
============================================================ */

const logo =
    document.querySelector(
        ".logo"
    );


if (logo) {

    logo.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });


            cerrarMenu();

        }
    );

}

/* ============================================================
   BARRAS DE PROGRESO
   FORMACIÓN EN CURSO
============================================================ */

const learningCards =
    document.querySelectorAll(
        ".learning-card"
    );


if (
    "IntersectionObserver" in window
) {

    const progressObserver =
        new IntersectionObserver(

            (entradas, observador) => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target
                                .classList.add(
                                    "progress-visible"
                                );


                            observador.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },

            {

                threshold: 0.30

            }

        );


    learningCards.forEach(
        tarjeta => {

            progressObserver.observe(
                tarjeta
            );

        }
    );

}
else {

    learningCards.forEach(
        tarjeta => {

            tarjeta.classList.add(
                "progress-visible"
            );

        }
    );

}

/* ============================================================
   VISOR DE CERTIFICADOS PDF
   ============================================================
   IMPORTANTE:
   Este es el ÚNICO visor de certificados del script.
============================================================ */


/* ============================================================
   ELEMENTOS
============================================================ */

const certCards = Array.from(
    document.querySelectorAll(
        ".cert-card[data-pdf]"
    )
);

const certModal =
    document.getElementById("certModal");

const certModalBackdrop =
    document.getElementById("certModalBackdrop");

const certModalClose =
    document.getElementById("certModalClose");

const certModalTitle =
    document.getElementById("certModalTitle");

const certModalMeta =
    document.getElementById("certModalMeta");

const certPdfFrame =
    document.getElementById("certPdfFrame");

const certMobilePreview =
document.getElementById(
    "certMobilePreview"
);

const certModalImage =
    document.getElementById(
        "certModalImage"
    );

const certPdfOpen =
    document.getElementById("certPdfOpen");

const certPdfDownload =
    document.getElementById("certPdfDownload");

const certPrev =
    document.getElementById("certPrev");

const certNext =
    document.getElementById("certNext");

const certCurrent =
    document.getElementById("certCurrent");

const certTotal =
    document.getElementById("certTotal");


/* ============================================================
   ESTADO
============================================================ */

let certIndex = 0;


/* ============================================================
   CARGAR CERTIFICADO
============================================================ */

function cargarCertificado() {

    const tarjeta = certCards[certIndex];

    if (!tarjeta) {
        return;
    }


    const titulo =
        tarjeta.dataset.title ||
        "Certificado";


    const proveedor =
        tarjeta.dataset.provider ||
        "";


    const fecha =
        tarjeta.dataset.date ||
        "";


    const pdf =
        tarjeta.dataset.pdf ||
        "";

    const imagen =
        tarjeta.dataset.image ||
        "";

    /* -----------------------------------------
       TÍTULO
    ----------------------------------------- */

    if (certModalTitle) {

        certModalTitle.textContent =
            titulo;

    }


    /* -----------------------------------------
       INFORMACIÓN
    ----------------------------------------- */

    if (certModalMeta) {

        if (
            proveedor &&
            fecha
        ) {

            certModalMeta.textContent =
                `${proveedor} · ${fecha}`;

        }
        else {

            certModalMeta.textContent =
                proveedor || fecha;

        }

    }


    /* -----------------------------------------
       PDF DENTRO DEL VISOR
    ----------------------------------------- */

    /* ========================================================
    VISTA SEGÚN DISPOSITIVO
    ======================================================== */

    const esMovil =
        window.matchMedia(
            "(max-width: 600px)"
        ).matches;


    /* --------------------------------------------------------
    TELÉFONO
    --------------------------------------------------------- */

    if (esMovil) {

        /*
            MUY IMPORTANTE:
            No cargamos el PDF en el iframe.

            Así evitamos que Chrome/Safari móvil
            intente descargarlo automáticamente.
        */

        if (certPdfFrame) {
            certPdfFrame.src = "";
        }

        if (certModalImage) {

            certModalImage.src = "";

        }

        if (certModalImage) {

            certModalImage.src =
                imagen;

            certModalImage.alt =
                `Certificado ${titulo}`;

        }

    }


    /* --------------------------------------------------------
    COMPUTADORA
    --------------------------------------------------------- */

    else {

        /*
            En computadora seguimos usando
            el visor PDF nativo.
        */

        if (certModalImage) {
            certModalImage.src = "";
        }


        if (certPdfFrame) {

            certPdfFrame.src =
                pdf;

        }

    }


    /* -----------------------------------------
       BOTÓN ABRIR PDF
    ----------------------------------------- */

    if (certPdfOpen) {

        certPdfOpen.href =
            pdf;

    }


    /* -----------------------------------------
       BOTÓN DESCARGAR
    ----------------------------------------- */

    if (certPdfDownload) {

        certPdfDownload.href =
            pdf;

        certPdfDownload.setAttribute(
            "download",
            ""
        );

    }


    /* -----------------------------------------
       CONTADOR
    ----------------------------------------- */

    if (certCurrent) {

        certCurrent.textContent =
            certIndex + 1;

    }


    if (certTotal) {

        certTotal.textContent =
            certCards.length;

    }

}


/* ============================================================
   ABRIR
============================================================ */

function abrirCertificado(index) {

    if (!certModal) {

        console.error(
            "No se encontró #certModal en el HTML."
        );

        return;

    }


    if (certCards.length === 0) {

        console.error(
            "No se encontraron tarjetas .cert-card[data-pdf]."
        );

        return;

    }


    certIndex = index;


    cargarCertificado();


    certModal.classList.add(
        "open"
    );


    certModal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


/* ============================================================
   CERRAR
============================================================ */

function cerrarCertificado() {

    if (!certModal) {
        return;
    }


    certModal.classList.remove(
        "open"
    );


    certModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );


    /*
        Limpiamos el iframe.
    */

    if (certPdfFrame) {

        certPdfFrame.src = "";

    }

    if (certModalImage) {

        certModalImage.src = "";

    }

}


/* ============================================================
   SIGUIENTE
============================================================ */

function siguienteCertificado() {

    if (certCards.length === 0) {
        return;
    }


    certIndex =
        (certIndex + 1)
        % certCards.length;


    cargarCertificado();

}


/* ============================================================
   ANTERIOR
============================================================ */

function anteriorCertificado() {

    if (certCards.length === 0) {
        return;
    }


    certIndex =
        (
            certIndex
            - 1
            + certCards.length
        )
        % certCards.length;


    cargarCertificado();

}


/* ============================================================
   EVENTOS DE LAS TARJETAS
============================================================ */

certCards.forEach(
    (tarjeta, index) => {


        /* CLICK */

        tarjeta.addEventListener(
            "click",
            () => {

                abrirCertificado(
                    index
                );

            }
        );


        /* TECLADO */

        tarjeta.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    abrirCertificado(
                        index
                    );

                }

            }
        );

    }
);


/* ============================================================
   BOTÓN CERRAR
============================================================ */

if (certModalClose) {

    certModalClose.addEventListener(
        "click",
        cerrarCertificado
    );

}


/* ============================================================
   CLICK FUERA DEL VISOR
============================================================ */

if (certModalBackdrop) {

    certModalBackdrop.addEventListener(
        "click",
        cerrarCertificado
    );

}


/* ============================================================
   SIGUIENTE
============================================================ */

if (certNext) {

    certNext.addEventListener(
        "click",
        siguienteCertificado
    );

}


/* ============================================================
   ANTERIOR
============================================================ */

if (certPrev) {

    certPrev.addEventListener(
        "click",
        anteriorCertificado
    );

}


/* ============================================================
   TECLADO
============================================================ */

document.addEventListener(
    "keydown",
    event => {

        /*
            Solo hacemos algo si
            el visor está abierto.
        */

        if (
            !certModal ||
            !certModal.classList.contains(
                "open"
            )
        ) {

            return;

        }


        /* ESC = CERRAR */

        if (
            event.key === "Escape"
        ) {

            cerrarCertificado();

            return;

        }


        /* FLECHA DERECHA */

        if (
            event.key === "ArrowRight"
        ) {

            siguienteCertificado();

            return;

        }


        /* FLECHA IZQUIERDA */

        if (
            event.key === "ArrowLeft"
        ) {

            anteriorCertificado();

        }

    }
);


/* ============================================================
   COMPROBACIÓN
============================================================ */

console.log(
    "Visor PDF cargado:",
    certCards.length,
    "certificaciones encontradas."
);