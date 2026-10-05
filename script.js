/**
 * ============================================================
 * INVITACIÓN DE BODA HALLOWEEN
 * Jennifer & David
 *
 * Archivo:
 * script.js
 *
 * Responsabilidades:
 *
 * 1. Configuración de la boda.
 * 2. Enlaces de Google Maps.
 * 3. Enlaces de Waze.
 * 4. WhatsApp RSVP.
 * 5. Cuenta regresiva.
 * 6. Control de música.
 * 7. Lightbox.
 * 8. Animaciones.
 * ============================================================
 */


/* ============================================================
   CONFIGURACIÓN GENERAL
   ============================================================ */

/**
 * IMPORTANTE:
 *
 * Esta sección es la única que deberás modificar cuando
 * tengas los datos reales de Jennifer y David.
 */

const weddingConfig = {

    couple: {
        bride: "Jennifer",
        groom: "David"
    },

    date: "2026-10-31T19:30:00",

    rsvpDeadline:
        "15 de octubre de 2026",

    whatsapp: {
        phone: "528112345678",
        message:
            "Hola Jennifer y David, confirmo mi asistencia a su boda."
    },

    church: {

        name:
            "Iglesia de Santa Luna",

        address:
            "Calle de los Suspiros #666, Centro de Monterrey, Nuevo León",

        /*
         * Coordenadas FICTICIAS.
         *
         * Cámbialas por las coordenadas reales
         * de la iglesia.
         */

        latitude: "25.6866",

        longitude: "-100.3161"

    },

    venue: {

        name:
            "Castillo de la Luna",

        address:
            "Camino de la Luna #666, Monterrey, Nuevo León",

        /*
         * Coordenadas FICTICIAS.
         *
         * Cámbialas por las coordenadas reales
         * del salón.
         */

        latitude: "25.6750",

        longitude: "-100.3100"

    }

};


/* ============================================================
   FUNCIONES AUXILIARES
   ============================================================ */


/**
 * Codifica texto para utilizarlo
 * correctamente dentro de una URL.
 *
 * @param {string} value
 * @returns {string}
 */

function encodeUrl(value) {

    return encodeURIComponent(value);

}


/**
 * Construye un enlace de Google Maps
 * utilizando la ubicación actual como origen.
 *
 * Google Maps admite este formato sin necesidad
 * de una API Key para este tipo de enlace.
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
        encodeUrl(
            `${latitude},${longitude}`
        ) +
        "&travelmode=driving" +
        "&dir_action=navigate"
    );

}


/**
 * Construye un enlace para Waze.
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
        encodeUrl(
            `${latitude},${longitude}`
        ) +
        "&navigate=yes"
    );

}


/**
 * Construye el enlace de WhatsApp
 * para confirmar asistencia.
 *
 * @returns {string}
 */

function createWhatsAppUrl() {

    return (
        "https://wa.me/" +
        weddingConfig.whatsapp.phone +
        "?text=" +
        encodeUrl(
            weddingConfig.whatsapp.message
        )
    );

}


/* ============================================================
   CONFIGURACIÓN DE MAPAS
   ============================================================ */


/**
 * Configura los botones de navegación
 * de la iglesia.
 */

function configureChurchMaps() {

    const googleButton =
        document.getElementById(
            "churchGoogleMaps"
        );

    const wazeButton =
        document.getElementById(
            "churchWaze"
        );


    googleButton.href =
        createGoogleMapsUrl(
            weddingConfig.church.latitude,
            weddingConfig.church.longitude
        );


    wazeButton.href =
        createWazeUrl(
            weddingConfig.church.latitude,
            weddingConfig.church.longitude
        );

}


/**
 * Configura los botones de navegación
 * del salón.
 */

function configureVenueMaps() {

    const googleButton =
        document.getElementById(
            "venueGoogleMaps"
        );

    const wazeButton =
        document.getElementById(
            "venueWaze"
        );


    googleButton.href =
        createGoogleMapsUrl(
            weddingConfig.venue.latitude,
            weddingConfig.venue.longitude
        );


    wazeButton.href =
        createWazeUrl(
            weddingConfig.venue.latitude,
            weddingConfig.venue.longitude
        );

}


/* ============================================================
   CONFIGURACIÓN WHATSAPP
   ============================================================ */

function configureWhatsApp() {

    const button =
        document.getElementById(
            "whatsappButton"
        );


    button.href =
        createWhatsAppUrl();

}


/* ============================================================
   PANTALLA DE BIENVENIDA
   ============================================================ */

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );

const openInvitation =
    document.getElementById(
        "openInvitation"
    );


const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


/**
 * Abre la invitación.
 *
 * También intenta iniciar la música,
 * aprovechando la interacción del usuario
 * para evitar el bloqueo de autoplay.
 */

openInvitation.addEventListener(
    "click",
    async () => {

        welcomeScreen.classList.add(
            "hidden"
        );

        document.body.classList.remove(
            "no-scroll"
        );


        try {

            await backgroundMusic.play();

            updateMusicButton(true);

        } catch (error) {

            console.warn(
                "El navegador bloqueó la reproducción.",
                error
            );

            updateMusicButton(false);

        }

    }
);


/* ============================================================
   CONTROL DE MÚSICA
   ============================================================ */


/**
 * Actualiza visualmente el botón
 * dependiendo del estado del audio.
 *
 * @param {boolean} isPlaying
 */

function updateMusicButton(
    isPlaying
) {

    musicButton.textContent =
        isPlaying
            ? "🔊"
            : "🔇";


    musicButton.setAttribute(
        "aria-pressed",
        String(isPlaying)
    );


    musicButton.setAttribute(
        "aria-label",
        isPlaying
            ? "Pausar música"
            : "Reproducir música"
    );

}


/**
 * Alterna reproducción y pausa.
 */

musicButton.addEventListener(
    "click",
    async () => {

        if (
            backgroundMusic.paused
        ) {

            try {

                await backgroundMusic.play();

                updateMusicButton(true);

            } catch (error) {

                console.error(
                    "No se pudo reproducir la música.",
                    error
                );

            }

        } else {

            backgroundMusic.pause();

            updateMusicButton(false);

        }

    }
);


/* ============================================================
   CUENTA REGRESIVA
   ============================================================ */

const weddingDate =
    new Date(
        weddingConfig.date
    );


/**
 * Agrega cero a la izquierda.
 *
 * @param {number} value
 * @returns {string}
 */

function padNumber(value) {

    return String(value)
        .padStart(2, "0");

}


/**
 * Actualiza la cuenta regresiva.
 */

function updateCountdown() {

    const now =
        new Date();


    const difference =
        weddingDate.getTime()
        -
        now.getTime();


    /*
     * Si la boda ya ocurrió,
     * mostramos el mensaje final.
     */

    if (
        difference <= 0
    ) {

        document.getElementById(
            "days"
        ).textContent = "00";

        document.getElementById(
            "hours"
        ).textContent = "00";

        document.getElementById(
            "minutes"
        ).textContent = "00";

        document.getElementById(
            "seconds"
        ).textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (
                1000 *
                60 *
                60 *
                24
            )
        );


    const hours =
        Math.floor(
            (
                difference /
                (
                    1000 *
                    60 *
                    60
                )
            ) % 24
        );


    const minutes =
        Math.floor(
            (
                difference /
                (
                    1000 *
                    60
                )
            ) % 60
        );


    const seconds =
        Math.floor(
            (
                difference /
                1000
            ) % 60
        );


    document.getElementById(
        "days"
    ).textContent =
        padNumber(days);


    document.getElementById(
        "hours"
    ).textContent =
        padNumber(hours);


    document.getElementById(
        "minutes"
    ).textContent =
        padNumber(minutes);


    document.getElementById(
        "seconds"
    ).textContent =
        padNumber(seconds);

}


/*
 * Primera ejecución.
 */

updateCountdown();


/*
 * Actualización cada segundo.
 */

const countdownInterval =
    setInterval(
        updateCountdown,
        1000
    );


/* ============================================================
   LIGHTBOX
   ============================================================ */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const closeLightbox =
    document.getElementById(
        "closeLightbox"
    );


const galleryItems =
    document.querySelectorAll(
        ".gallery-item"
    );


/**
 * Abre una imagen en pantalla completa.
 */

function openGalleryImage(
    imageUrl,
    imageAlt
) {

    lightboxImage.src =
        imageUrl;

    lightboxImage.alt =
        imageAlt;

    lightbox.classList.add(
        "active"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


/**
 * Cierra la galería.
 */

function closeGallery() {

    lightbox.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "no-scroll"
    );


    /*
     * Esperamos a que termine la transición
     * antes de eliminar la imagen.
     */

    setTimeout(
        () => {

            lightboxImage.src = "";

        },
        300
    );

}


/*
 * Asignamos evento a cada fotografía.
 */

galleryItems.forEach(
    (item) => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.dataset.image;

                const imageElement =
                    item.querySelector(
                        "img"
                    );


                openGalleryImage(
                    image,
                    imageElement.alt
                );

            }
        );

    }
);


/*
 * Cerrar botón.
 */

closeLightbox.addEventListener(
    "click",
    closeGallery
);


/*
 * Cerrar haciendo click
 * fuera de la imagen.
 */

lightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target === lightbox
        ) {

            closeGallery();

        }

    }
);


/*
 * Cerrar con ESC.
 */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
            &&
            lightbox.classList.contains(
                "active"
            )
        ) {

            closeGallery();

        }

    }
);


/* ============================================================
   ANIMACIONES AL HACER SCROLL
   ============================================================ */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


/**
 * IntersectionObserver es más eficiente
 * que revisar continuamente el scroll.
 */

const revealObserver =
    new IntersectionObserver(
        (
            entries,
            observer
        ) => {

            entries.forEach(
                (entry) => {

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
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* ============================================================
   INICIALIZACIÓN
   ============================================================ */


/**
 * Ejecuta toda la configuración
 * cuando el DOM está disponible.
 */

function initializeInvitation() {

    configureChurchMaps();

    configureVenueMaps();

    configureWhatsApp();

    /*
     * Bloqueamos el scroll mientras
     * está abierta la pantalla inicial.
     */

    document.body.classList.add(
        "no-scroll"
    );

}


/*
 * Inicializamos.
 */

initializeInvitation();