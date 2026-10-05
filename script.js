/* ============================================================
   INVITACIÓN DE BODA
   Jennifer & David

   Funcionalidades:

   - Configuración de la boda
   - Música de fondo
   - Contador regresivo
   - Google Maps
   - Waze
   - WhatsApp
   - Animaciones
   - Galería
   - Lightbox
   - Protección contra copia
   - Protección visual al perder el foco
   - Bloqueo de combinaciones comunes
   ============================================================ */

"use strict";


/* ============================================================
   CONFIGURACIÓN PRINCIPAL
   ============================================================ */

const weddingConfig = {

    couple: {

        bride: "Jennifer",

        groom: "David"

    },


    /*
     * Fecha de la ceremonia.
     *
     * IMPORTANTE:
     * Reemplaza esta fecha por la fecha real.
     */

    weddingDate:
        "2026-10-31T18:00:00",


    /*
     * Número de WhatsApp.
     *
     * Formato:
     * código de país + número
     *
     * Ejemplo México:
     * 52 + número
     */

    whatsapp: {

        phone:
            "528112345678",

        message:
            "Hola Jennifer y David, confirmo mi asistencia a su boda."

    },


    /*
     * Ubicación de la iglesia.
     *
     * Actualmente son coordenadas ficticias.
     */

    church: {

        latitude:
            "25.6866",

        longitude:
            "-100.3161"

    },


    /*
     * Ubicación del salón.
     */

    venue: {

        latitude:
            "25.6750",

        longitude:
            "-100.3100"

    }

};


/* ============================================================
   ELEMENTOS DEL DOM
   ============================================================ */

const elements = {

    welcomeScreen:
        document.getElementById(
            "welcomeScreen"
        ),

    openInvitation:
        document.getElementById(
            "openInvitation"
        ),

    backgroundMusic:
        document.getElementById(
            "backgroundMusic"
        ),

    musicButton:
        document.getElementById(
            "musicButton"
        ),

    countdown: {

        days:
            document.getElementById(
                "days"
            ),

        hours:
            document.getElementById(
                "hours"
            ),

        minutes:
            document.getElementById(
                "minutes"
            ),

        seconds:
            document.getElementById(
                "seconds"
            )

    },

    maps: {

        churchGoogle:
            document.getElementById(
                "churchGoogleMaps"
            ),

        churchWaze:
            document.getElementById(
                "churchWaze"
            ),

        venueGoogle:
            document.getElementById(
                "venueGoogleMaps"
            ),

        venueWaze:
            document.getElementById(
                "venueWaze"
            )

    },

    whatsapp:
        document.getElementById(
            "whatsappButton"
        ),

    lightbox:
        document.getElementById(
            "lightbox"
        ),

    lightboxImage:
        document.getElementById(
            "lightboxImage"
        ),

    closeLightbox:
        document.getElementById(
            "closeLightbox"
        )

};


/* ============================================================
   MÚSICA
   ============================================================ */

/**
 * Actualiza el botón de música.
 *
 * @param {boolean} isPlaying
 */

function updateMusicButton(
    isPlaying
) {

    elements.musicButton.textContent =
        isPlaying
            ? "🔊"
            : "🔇";


    elements.musicButton.setAttribute(
        "aria-pressed",
        String(isPlaying)
    );


    elements.musicButton.setAttribute(
        "aria-label",
        isPlaying
            ? "Pausar música"
            : "Reproducir música"
    );

}


/**
 * Reproduce la música.
 *
 * La reproducción se ejecuta después
 * de una interacción del usuario para
 * cumplir las políticas de autoplay.
 *
 * @returns {Promise<boolean>}
 */

async function playMusic() {

    try {

        elements.backgroundMusic.volume =
            0.35;


        /*
         * Cargamos el recurso antes
         * de intentar reproducirlo.
         */

        elements.backgroundMusic.load();


        await elements.backgroundMusic.play();


        updateMusicButton(true);


        return true;

    } catch (error) {

        console.error(
            "No se pudo reproducir la música.",
            error
        );


        updateMusicButton(false);


        return false;

    }

}


/**
 * Pausa la música.
 */

function pauseMusic() {

    elements.backgroundMusic.pause();

    updateMusicButton(false);

}


/* ============================================================
   APERTURA DE LA INVITACIÓN
   ============================================================ */

elements.openInvitation.addEventListener(
    "click",
    async function () {

        /*
         * Ocultamos la pantalla inicial.
         */

        elements.welcomeScreen.classList.add(
            "hidden"
        );


        document.body.classList.remove(
            "no-scroll"
        );


        /*
         * La reproducción ocurre
         * directamente como respuesta
         * al click del usuario.
         */

        await playMusic();

    }
);


/* ============================================================
   BOTÓN DE MÚSICA
   ============================================================ */

elements.musicButton.addEventListener(
    "click",
    async function () {

        if (
            elements.backgroundMusic.paused
        ) {

            await playMusic();

        } else {

            pauseMusic();

        }

    }
);


/* ============================================================
   ERRORES DEL AUDIO
   ============================================================ */

elements.backgroundMusic.addEventListener(
    "error",
    function () {

        console.error(
            "No se pudo cargar el archivo de música."
        );

        console.error(
            "Ruta esperada:"
        );

        console.error(
            "./music/halloween.mp3"
        );

    }
);


/* ============================================================
   VALIDACIÓN DE CARGA DEL AUDIO
   ============================================================ */

elements.backgroundMusic.addEventListener(
    "canplay",
    function () {

        console.log(
            "✓ Música disponible."
        );

    }
);


/* ============================================================
   CONTADOR REGRESIVO
   ============================================================ */

/**
 * Actualiza el contador de la boda.
 */

function updateCountdown() {

    const weddingDate =
        new Date(
            weddingConfig.weddingDate
        );

    const currentDate =
        new Date();


    const difference =
        weddingDate.getTime()
        -
        currentDate.getTime();


    /*
     * Si la fecha ya llegó,
     * mostramos ceros.
     */

    if (
        difference <= 0
    ) {

        elements.countdown.days.textContent =
            "00";

        elements.countdown.hours.textContent =
            "00";

        elements.countdown.minutes.textContent =
            "00";

        elements.countdown.seconds.textContent =
            "00";

        return;

    }


    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    const days =
        Math.floor(
            totalSeconds / 86400
        );


    const hours =
        Math.floor(
            (totalSeconds % 86400)
            / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );


    const seconds =
        totalSeconds % 60;


    elements.countdown.days.textContent =
        String(days).padStart(
            2,
            "0"
        );


    elements.countdown.hours.textContent =
        String(hours).padStart(
            2,
            "0"
        );


    elements.countdown.minutes.textContent =
        String(minutes).padStart(
            2,
            "0"
        );


    elements.countdown.seconds.textContent =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* ============================================================
   GOOGLE MAPS
   ============================================================ */

/**
 * Genera una URL de Google Maps.
 *
 * @param {string} latitude
 * @param {string} longitude
 * @returns {string}
 */

function createGoogleMapsUrl(
    latitude,
    longitude
) {

    return (
        "https://www.google.com/maps/dir/" +
        "?api=1" +
        "&destination=" +
        encodeURIComponent(
            `${latitude},${longitude}`
        ) +
        "&travelmode=driving" +
        "&dir_action=navigate"
    );

}


/* ============================================================
   WAZE
   ============================================================ */

/**
 * Genera una URL de navegación
 * para Waze.
 *
 * @param {string} latitude
 * @param {string} longitude
 * @returns {string}
 */

function createWazeUrl(
    latitude,
    longitude
) {

    return (
        "https://www.waze.com/ul" +
        "?ll=" +
        encodeURIComponent(
            `${latitude},${longitude}`
        ) +
        "&navigate=yes"
    );

}


/* ============================================================
   CONFIGURACIÓN DE MAPAS
   ============================================================ */

elements.maps.churchGoogle.href =
    createGoogleMapsUrl(
        weddingConfig.church.latitude,
        weddingConfig.church.longitude
    );


elements.maps.churchWaze.href =
    createWazeUrl(
        weddingConfig.church.latitude,
        weddingConfig.church.longitude
    );


elements.maps.venueGoogle.href =
    createGoogleMapsUrl(
        weddingConfig.venue.latitude,
        weddingConfig.venue.longitude
    );


elements.maps.venueWaze.href =
    createWazeUrl(
        weddingConfig.venue.latitude,
        weddingConfig.venue.longitude
    );


/* ============================================================
   WHATSAPP
   ============================================================ */

/**
 * Genera el enlace de WhatsApp.
 *
 * @returns {string}
 */

function createWhatsAppUrl() {

    return (
        "https://wa.me/" +
        weddingConfig.whatsapp.phone +
        "?text=" +
        encodeURIComponent(
            weddingConfig.whatsapp.message
        )
    );

}


elements.whatsapp.href =
    createWhatsAppUrl();


/* ============================================================
   ANIMACIONES REVEAL
   ============================================================ */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


/*
 * IntersectionObserver permite ejecutar
 * las animaciones solamente cuando
 * los elementos aparecen en pantalla.
 */

const revealObserver =
    new IntersectionObserver(
        function (
            entries,
            observer
        ) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


/* ============================================================
   GALERÍA / LIGHTBOX
   ============================================================ */

const galleryImages =
    document.querySelectorAll(
        ".gallery img"
    );


galleryImages.forEach(
    function (image) {

        image.addEventListener(
            "click",
            function () {

                elements.lightboxImage.src =
                    image.src;


                elements.lightbox.classList.add(
                    "active"
                );


                elements.lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }
        );

    }
);


/**
 * Cierra el lightbox.
 */

function closeLightbox() {

    elements.lightbox.classList.remove(
        "active"
    );


    elements.lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    elements.lightboxImage.src = "";

}


elements.closeLightbox.addEventListener(
    "click",
    closeLightbox
);


elements.lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            elements.lightbox
        ) {

            closeLightbox();

        }

    }
);


/* ============================================================
   PROTECCIÓN CONTRA COPIADO
   ============================================================ */

/*
 * Bloqueamos el menú contextual.
 */

document.addEventListener(
    "contextmenu",
    function (event) {

        event.preventDefault();

    }
);


/*
 * Bloqueamos copiar.
 */

document.addEventListener(
    "copy",
    function (event) {

        event.preventDefault();

    }
);


/*
 * Bloqueamos cortar.
 */

document.addEventListener(
    "cut",
    function (event) {

        event.preventDefault();

    }
);


/*
 * Bloqueamos selección.
 */

document.addEventListener(
    "selectstart",
    function (event) {

        event.preventDefault();

    }
);


/*
 * Bloqueamos arrastrar imágenes.
 */

document.addEventListener(
    "dragstart",
    function (event) {

        if (
            event.target.tagName ===
            "IMG"
        ) {

            event.preventDefault();

        }

    }
);


/* ============================================================
   PROTECCIÓN DE TECLADO
   ============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key.toLowerCase();


        /*
         * Ctrl + C
         */

        if (
            event.ctrlKey &&
            key === "c"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + X
         */

        if (
            event.ctrlKey &&
            key === "x"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + U
         *
         * Ver código fuente.
         */

        if (
            event.ctrlKey &&
            key === "u"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + S
         */

        if (
            event.ctrlKey &&
            key === "s"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + P
         */

        if (
            event.ctrlKey &&
            key === "p"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + Shift + I
         *
         * DevTools.
         */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "i"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + Shift + J
         */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "j"
        ) {

            event.preventDefault();

        }


        /*
         * Ctrl + Shift + C
         */

        if (
            event.ctrlKey &&
            event.shiftKey &&
            key === "c"
        ) {

            event.preventDefault();

        }


        /*
         * F12
         */

        if (
            event.key === "F12"
        ) {

            event.preventDefault();

        }

    }
);


/* ============================================================
   PROTECCIÓN CONTRA PÉRDIDA DE VISIBILIDAD
   ============================================================ */

/*
 * Cuando el usuario cambia de pestaña,
 * minimiza el navegador o pierde visibilidad,
 * ocultamos visualmente la invitación.
 *
 * IMPORTANTE:
 * Esto NO impide una captura de pantalla.
 * Solamente reduce la exposición del contenido.
 */

document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            document.body.classList.add(
                "protected-view"
            );

        } else {

            document.body.classList.remove(
                "protected-view"
            );

        }

    }
);


/* ============================================================
   PROTECCIÓN AL PERDER EL FOCO
   ============================================================ */

window.addEventListener(
    "blur",
    function () {

        document.body.classList.add(
            "protected-view"
        );

    }
);


window.addEventListener(
    "focus",
    function () {

        document.body.classList.remove(
            "protected-view"
        );

    }
);


/* ============================================================
   BLOQUEO DE IMPRESIÓN
   ============================================================ */

window.addEventListener(
    "beforeprint",
    function () {

        document.body.classList.add(
            "protected-view"
        );

    }
);


/* ============================================================
   MENSAJE DE INICIO
   ============================================================ */

console.log(
    "Jennifer & David — Invitación cargada correctamente."
);

console.log(
    "Sistema de protección activado."
);
