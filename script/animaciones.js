/* ============================================================
   ANIMACIONES.JS
   Portafolio: Jair Abdiel Carcúz López

   Cárgalo DESPUÉS de script/script.js, al final del <body>:

     <script src="script/script.js"></script>
     <script src="script/animaciones.js"></script>

   Todo aquí es aditivo: si algo falla o un elemento no existe,
   simplemente se salta esa parte. No modifica el visor de
   certificados ni el menú móvil (eso lo maneja script.js).

   Todo está envuelto en una función autoejecutable para no
   chocar con las variables globales de script.js.
============================================================ */

(function () {

    "use strict";


    /* ============================================================
       0. PREFERENCIAS DEL USUARIO
    ============================================================ */

    const prefiereMenosMovimiento =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const tieneMousePreciso =
        window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;

    const raiz = document.documentElement;


    /*
        Si el usuario pide menos movimiento,
        dejamos la página funcional y estática,
        y no activamos nada de lo de abajo.
    */

    if (!prefiereMenosMovimiento) {

        raiz.classList.add("js-anim");

    }


    /* ============================================================
       AYUDANTE: limitar la frecuencia con requestAnimationFrame
    ============================================================ */

    function limitarConFrame(funcion) {

        let ocupado = false;

        return function (...argumentos) {

            if (ocupado) {
                return;
            }

            ocupado = true;

            window.requestAnimationFrame(() => {

                funcion.apply(this, argumentos);

                ocupado = false;

            });

        };

    }


    /* ============================================================
       1. BARRA DE PROGRESO DE LECTURA
    ============================================================ */

    function iniciarBarraProgreso() {

        const barra = document.createElement("div");

        barra.className = "scroll-progress";

        document.body.appendChild(barra);


        const actualizar = limitarConFrame(() => {

            const alturaTotal =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const avance =
                alturaTotal > 0
                    ? window.scrollY / alturaTotal
                    : 0;

            barra.style.transform =
                `scaleX(${Math.min(Math.max(avance, 0), 1)})`;

        });


        window.addEventListener(
            "scroll",
            actualizar,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            actualizar
        );


        actualizar();

    }


    /* ============================================================
       2. REVELADO AL HACER SCROLL
    ============================================================ */

    function prepararGrupoRevelado(
        selector,
        { paso = 90, maxRetraso = 4, escala = false } = {}
    ) {

        const elementos =
            document.querySelectorAll(selector);

        elementos.forEach((elemento, indice) => {

            elemento.classList.add("anim-reveal");

            if (escala) {

                elemento.classList.add("anim-scale");

            }

            const retraso =
                Math.min(indice, maxRetraso) * paso;

            elemento.style.setProperty(
                "--d",
                `${retraso}ms`
            );

        });

        return Array.from(elementos);

    }


    function iniciarRevelado() {

        const grupos = [

            prepararGrupoRevelado(".about-heading"),
            prepararGrupoRevelado(".about-main"),
            prepararGrupoRevelado(".about-side"),

            prepararGrupoRevelado(".tech-heading"),
            prepararGrupoRevelado(".tech-item", { paso: 80, maxRetraso: 5 }),

            prepararGrupoRevelado(".experience-heading"),
            prepararGrupoRevelado(".experience-item", { paso: 110, maxRetraso: 3 }),

            prepararGrupoRevelado(".projects-heading"),
            prepararGrupoRevelado(".project-main", { escala: true }),
            prepararGrupoRevelado(".project-row", { paso: 90, maxRetraso: 5 }),

            prepararGrupoRevelado(".certifications-heading"),
            prepararGrupoRevelado(".certifications-summary"),
            prepararGrupoRevelado(".cert-item", { paso: 55, maxRetraso: 8 }),

            prepararGrupoRevelado(".learning-heading"),
            prepararGrupoRevelado(".learning-overview-main"),
            prepararGrupoRevelado(".learning-provider"),
            prepararGrupoRevelado(".learning-row", { paso: 90, maxRetraso: 5 }),

            prepararGrupoRevelado(".education-heading"),
            prepararGrupoRevelado(".education-item", { paso: 130, maxRetraso: 3 }),

            prepararGrupoRevelado(".documentation-main"),
            prepararGrupoRevelado(".documentation-panel"),

            prepararGrupoRevelado(".contact-intro"),
            prepararGrupoRevelado(".contact-main"),
            prepararGrupoRevelado(".contact-links"),
            prepararGrupoRevelado(".contact-availability")

        ];

        const elementos = grupos.flat();


        if (
            elementos.length === 0 ||
            !("IntersectionObserver" in window)
        ) {

            elementos.forEach(elemento => {

                elemento.classList.add("anim-in");

            });

            return;

        }


        const observador = new IntersectionObserver(

            (entradas, obs) => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("anim-in");

                        obs.unobserve(entrada.target);

                    }

                });

            },

            {

                threshold: 0.12,

                rootMargin: "0px 0px -60px 0px"

            }

        );


        elementos.forEach(elemento => {

            observador.observe(elemento);

        });

    }


    /* ============================================================
       3. ENTRADA DEL HERO (al cargar, no al hacer scroll)
    ============================================================ */

    function iniciarEntradaHero() {

        const contenido =
            document.querySelector(".hero-content");

        const visual =
            document.querySelector(".hero-visual");

        [contenido, visual].forEach((elemento, indice) => {

            if (!elemento) {
                return;
            }

            elemento.classList.add("anim-reveal");

            elemento.style.setProperty(
                "--d",
                `${140 + indice * 160}ms`
            );

            /*
                Un pequeño respiro de un frame para que el
                navegador registre el estado inicial antes
                de animar.
            */

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    elemento.classList.add("anim-in");

                });

            });

        });

    }


    /* ============================================================
       4. TÍTULO DEL HERO, PALABRA POR PALABRA
    ============================================================ */

    function envolverPalabra(texto, indice) {

        const palabra = document.createElement("span");
        palabra.className = "word";

        const interior = document.createElement("span");
        interior.className = "word-inner";
        interior.style.setProperty("--i", indice);
        interior.textContent = texto;

        palabra.appendChild(interior);

        return palabra;

    }


    function iniciarTituloHero() {

        const titulo =
            document.querySelector(".hero h1");

        if (!titulo || titulo.dataset.dividido === "si") {
            return;
        }


        const nodosOriginales =
            Array.from(titulo.childNodes);

        const fragmento =
            document.createDocumentFragment();

        let contador = 0;


        nodosOriginales.forEach(nodo => {

            if (nodo.nodeType === Node.TEXT_NODE) {

                const partes =
                    nodo.textContent.split(/(\s+)/);

                partes.forEach(parte => {

                    if (parte.trim() === "") {

                        if (parte !== "") {

                            fragmento.appendChild(
                                document.createTextNode(parte)
                            );

                        }

                        return;

                    }

                    fragmento.appendChild(
                        envolverPalabra(parte, contador)
                    );

                    contador += 1;

                });

            }
            else if (nodo.nodeType === Node.ELEMENT_NODE) {

                /*
                    Elementos como el <span> con el gradiente
                    de color se tratan como una sola "palabra"
                    para no romper su efecto de degradado.
                */

                const envoltorio = document.createElement("span");
                envoltorio.className = "word";

                const interior = document.createElement("span");
                interior.className = "word-inner";
                interior.style.setProperty("--i", contador);

                interior.appendChild(nodo);

                envoltorio.appendChild(interior);
                fragmento.appendChild(envoltorio);

                contador += 1;

            }

        });


        titulo.innerHTML = "";
        titulo.appendChild(fragmento);
        titulo.dataset.dividido = "si";

    }


    /* ============================================================
       5. FOTO DEL HERO — LEVE PROFUNDIDAD CON EL MOUSE
    ============================================================ */

    function iniciarParalajeHero() {

        if (!tieneMousePreciso) {
            return;
        }

        const zonaHero =
            document.querySelector(".hero");

        const contenedorFoto =
            document.querySelector(".hero-photo-shell");

        if (!zonaHero || !contenedorFoto) {
            return;
        }


        const actualizar = limitarConFrame((x, y) => {

            const limites =
                contenedorFoto.getBoundingClientRect();

            const centroX =
                limites.left + limites.width / 2;

            const centroY =
                limites.top + limites.height / 2;

            const desplazamientoX =
                Math.max(
                    -1,
                    Math.min(1, (x - centroX) / (limites.width / 1.4))
                );

            const desplazamientoY =
                Math.max(
                    -1,
                    Math.min(1, (y - centroY) / (limites.height / 1.4))
                );

            contenedorFoto.style.setProperty("--tx", desplazamientoX.toFixed(3));
            contenedorFoto.style.setProperty("--ty", desplazamientoY.toFixed(3));

        });


        zonaHero.addEventListener(
            "mousemove",
            evento => actualizar(evento.clientX, evento.clientY)
        );

        zonaHero.addEventListener(
            "mouseleave",
            () => {

                contenedorFoto.style.setProperty("--tx", 0);
                contenedorFoto.style.setProperty("--ty", 0);

            }
        );

    }


    /* ============================================================
       6. ORBES DEL FONDO — PARALAJE SUAVE AL HACER SCROLL
    ============================================================ */

    function iniciarParalajeOrbes() {

        const orbes =
            document.querySelectorAll(".hero-orb");

        if (orbes.length === 0) {
            return;
        }


        const actualizar = limitarConFrame(() => {

            const desplazamiento = window.scrollY * 0.12;

            orbes.forEach((orbe, indice) => {

                const factor =
                    indice % 2 === 0 ? 1 : -1;

                orbe.style.transform =
                    `translate3d(0, ${desplazamiento * factor}px, 0)`;

            });

        });


        window.addEventListener(
            "scroll",
            actualizar,
            { passive: true }
        );

        actualizar();

    }


    /* ============================================================
       7. ENCABEZADO INTELIGENTE
       Se oculta al bajar, reaparece al subir o cerca del tope.
    ============================================================ */

    function iniciarEncabezadoInteligente() {

        const encabezado =
            document.querySelector(".header");

        if (!encabezado) {
            return;
        }


        let ultimaPosicion = window.scrollY;


        const actualizar = limitarConFrame(() => {

            const posicionActual = window.scrollY;

            const bajando =
                posicionActual > ultimaPosicion;

            const pasoUmbral =
                Math.abs(posicionActual - ultimaPosicion) > 4;


            if (posicionActual < 120) {

                encabezado.classList.remove("header-hidden");

            }
            else if (pasoUmbral) {

                encabezado.classList.toggle(
                    "header-hidden",
                    bajando
                );

            }


            ultimaPosicion = posicionActual;

        });


        window.addEventListener(
            "scroll",
            actualizar,
            { passive: true }
        );

    }


    /* ============================================================
       8. LUZ QUE SIGUE AL CURSOR
       (tarjetas de tecnología y el proyecto principal)
    ============================================================ */

    function iniciarLuzCursor() {

        if (!tieneMousePreciso) {
            return;
        }

        const objetivos =
            document.querySelectorAll(".tech-item, .project-main");

        objetivos.forEach(objetivo => {

            objetivo.addEventListener("mousemove", evento => {

                const limites =
                    objetivo.getBoundingClientRect();

                const x =
                    ((evento.clientX - limites.left) / limites.width) * 100;

                const y =
                    ((evento.clientY - limites.top) / limites.height) * 100;

                objetivo.style.setProperty("--mx", `${x}%`);
                objetivo.style.setProperty("--my", `${y}%`);

            });

        });

    }


    /* ============================================================
       9. BARRAS DE PROGRESO Y LÍNEA DE TIEMPO
       (se activan solo cuando entran en pantalla)
    ============================================================ */

    function iniciarBarrasYLinea() {

        const barras =
            document.querySelectorAll(".learning-progress-bar");

        barras.forEach(barra => {

            barra.classList.add("arm");

        });


        const linea =
            document.querySelector(".education-timeline");


        if (!("IntersectionObserver" in window)) {

            barras.forEach(barra => barra.classList.remove("arm"));

            if (linea) {
                linea.classList.add("is-in");
            }

            return;

        }


        const observadorBarras = new IntersectionObserver(

            (entradas, obs) => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.remove("arm");

                        obs.unobserve(entrada.target);

                    }

                });

            },

            { threshold: 0.4 }

        );

        barras.forEach(barra => {

            observadorBarras.observe(barra);

        });


        if (linea) {

            const observadorLinea = new IntersectionObserver(

                (entradas, obs) => {

                    entradas.forEach(entrada => {

                        if (entrada.isIntersecting) {

                            entrada.target.classList.add("is-in");

                            obs.unobserve(entrada.target);

                        }

                    });

                },

                { threshold: 0.15 }

            );

            observadorLinea.observe(linea);

        }

    }


    /* ============================================================
       10. NÚMEROS QUE CUENTAN AL APARECER
    ============================================================ */

    function animarNumero(elemento) {

        const textoOriginal = elemento.textContent.trim();

        const coincidencia =
            textoOriginal.match(/\d+/);

        if (!coincidencia) {
            return;
        }

        const numeroFinal =
            parseInt(coincidencia[0], 10);

        const prefijo =
            textoOriginal.slice(0, coincidencia.index);

        const sufijo =
            textoOriginal.slice(
                coincidencia.index + coincidencia[0].length
            );

        const cantidadDigitos =
            coincidencia[0].length;

        const duracion = 1100;
        const inicio = performance.now();


        function cuadro(ahora) {

            const avance =
                Math.min((ahora - inicio) / duracion, 1);

            /* easeOutCubic: arranca rápido, frena suave */

            const suavizado =
                1 - Math.pow(1 - avance, 3);

            const valorActual =
                Math.round(numeroFinal * suavizado);

            elemento.textContent =
                prefijo +
                String(valorActual).padStart(cantidadDigitos, "0") +
                sufijo;


            if (avance < 1) {

                requestAnimationFrame(cuadro);

            }
            else {

                /* Garantizamos el texto exacto original al final */

                elemento.textContent = textoOriginal;

            }

        }


        requestAnimationFrame(cuadro);

    }


    function iniciarContadores() {

        const objetivos =
            document.querySelectorAll(

                ".about-fact-number, " +
                ".certifications-summary strong, " +
                ".learning-progress-top strong, " +
                ".learning-subcourse > span"

            );

        if (
            objetivos.length === 0 ||
            !("IntersectionObserver" in window)
        ) {
            return;
        }


        const observador = new IntersectionObserver(

            (entradas, obs) => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        animarNumero(entrada.target);

                        obs.unobserve(entrada.target);

                    }

                });

            },

            { threshold: 0.6 }

        );


        objetivos.forEach(objetivo => {

            observador.observe(objetivo);

        });

    }


    /* ============================================================
       11. CURSOR PERSONALIZADO
    ============================================================ */

    function iniciarCursorPersonalizado() {

        if (!tieneMousePreciso) {
            return;
        }

        const punto = document.createElement("div");
        punto.className = "cursor-dot";

        const anillo = document.createElement("div");
        anillo.className = "cursor-ring";

        document.body.appendChild(punto);
        document.body.appendChild(anillo);

        raiz.classList.add("has-custom-cursor");


        let posicionAnilloX = window.innerWidth / 2;
        let posicionAnilloY = window.innerHeight / 2;

        let objetivoX = posicionAnilloX;
        let objetivoY = posicionAnilloY;


        document.addEventListener("mousemove", evento => {

            objetivoX = evento.clientX;
            objetivoY = evento.clientY;

            punto.style.transform =
                `translate3d(${objetivoX}px, ${objetivoY}px, 0) translate(-50%, -50%)`;

        });


        /*
            El anillo persigue al punto con un poco de
            retraso, para que se sienta suave y no clavado
            al pixel del mouse.
        */

        function seguir() {

            posicionAnilloX +=
                (objetivoX - posicionAnilloX) * 0.18;

            posicionAnilloY +=
                (objetivoY - posicionAnilloY) * 0.18;

            anillo.style.transform =
                `translate3d(${posicionAnilloX}px, ${posicionAnilloY}px, 0) translate(-50%, -50%)`;

            requestAnimationFrame(seguir);

        }

        requestAnimationFrame(seguir);


        /* Crece un poco sobre elementos interactivos */

        const interactivos =
            document.querySelectorAll(

                "a, button, .btn, [role='button'], " +
                ".hero-stack span, .cert-item, .tech-item"

            );

        interactivos.forEach(elemento => {

            elemento.addEventListener("mouseenter", () => {

                anillo.classList.add("is-active");

            });

            elemento.addEventListener("mouseleave", () => {

                anillo.classList.remove("is-active");

            });

        });


        /* Se oculta si el mouse sale de la ventana */

        document.addEventListener("mouseleave", () => {

            punto.style.opacity = "0";
            anillo.style.opacity = "0";

        });

        document.addEventListener("mouseenter", () => {

            punto.style.opacity = "";
            anillo.style.opacity = "";

        });

    }


    /* ============================================================
       12. BOTONES MAGNÉTICOS
    ============================================================ */

    function iniciarBotonesMagneticos() {

        if (!tieneMousePreciso) {
            return;
        }

        const objetivos =
            document.querySelectorAll(

                ".btn, .nav-contact, .project-link-primary"

            );

        objetivos.forEach(objetivo => {

            objetivo.classList.add("magnetic");


            objetivo.addEventListener("mousemove", evento => {

                const limites =
                    objetivo.getBoundingClientRect();

                const relativoX =
                    evento.clientX - (limites.left + limites.width / 2);

                const relativoY =
                    evento.clientY - (limites.top + limites.height / 2);

                /*
                    Movimiento sutil: una fracción pequeña
                    del desplazamiento real del mouse.
                */

                objetivo.style.transform =
                    `translate(${relativoX * 0.22}px, ${relativoY * 0.28}px)`;

            });


            objetivo.addEventListener("mouseleave", () => {

                objetivo.style.transform = "translate(0, 0)";

            });

        });

    }


    /* ============================================================
       PUESTA EN MARCHA
    ============================================================ */

    function iniciarTodo() {

        iniciarBarraProgreso();

        iniciarEntradaHero();


        if (!prefiereMenosMovimiento) {

            iniciarTituloHero();
            iniciarRevelado();
            iniciarParalajeHero();
            iniciarParalajeOrbes();
            iniciarEncabezadoInteligente();
            iniciarLuzCursor();
            iniciarBarrasYLinea();
            iniciarContadores();
            iniciarCursorPersonalizado();
            iniciarBotonesMagneticos();

        }
        else {

            /*
                Con "menos movimiento" activado, igual
                mostramos los contenidos sin animarlos.
            */

            document
                .querySelectorAll(".anim-reveal")
                .forEach(elemento => {

                    elemento.classList.add("anim-in");

                });

        }

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            iniciarTodo
        );

    }
    else {

        iniciarTodo();

    }


})();
