/**
 * =========================================================
 * INVITACIÓN DE BODA HALLOWEEN
 * Jennifer & David
 *
 * Funciones:
 *
 * - Música
 * - Cuenta regresiva
 * - Google Maps
 * - Waze
 * - RSVP
 * - Galería
 * - Animaciones
 * - Bola de cristal
 * - Lista del ritual
 * - El último hechizo
 *
 * =========================================================
 */

"use strict";


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const weddingConfig = {

    couple: {

        bride: "Jennifer",

        groom: "David"
    },


    /*
     * Hora de inicio de la ceremonia.
     */
    date: "2026-10-31T18:00:00",


    rsvpDeadline:
        "15 de octubre de 2026",


    whatsapp: {

        /*
         * CAMBIAR POR EL WHATSAPP REAL.
         *
         * Formato:
         *
         * 52 + lada + número
         *
         * Sin +, espacios ni guiones.
         */

        phone:
            "528112345678",

        message:
            "Hola Jennifer y David, confirmo mi asistencia a su boda."
    },


    church: {

        name:
            "Iglesia de Santa Luna",

        address:
            "Calle de los Suspiros #666, Centro de Monterrey, Nuevo León",

        latitude:
            "25.6866",

        longitude:
            "-100.3161"
    },


    venue: {

        name:
            "Castillo de la Luna",

        address:
            "Camino de la Luna #666, Monterrey, Nuevo León",

        latitude:
            "25.6750",

        longitude:
            "-100.3100"
    },


    spell: {

        maxMessageLength:
            500,

        title:
            "🔮 EL ÚLTIMO HECHIZO",

        date:
            "31 de octubre de 2026"
    }

};


/* =========================================================
   ELEMENTOS DOM
   ========================================================= */

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


    /* Countdown */

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
        ),


    /* Ubicaciones */

    churchGoogleMaps:
        document.getElementById(
            "churchGoogleMaps"
        ),

    churchWaze:
        document.getElementById(
            "churchWaze"
        ),

    venueGoogleMaps:
        document.getElementById(
            "venueGoogleMaps"
        ),

    venueWaze:
        document.getElementById(
            "venueWaze"
        ),


    /* RSVP */

    whatsappButton:
        document.getElementById(
            "whatsappButton"
        ),


    /* Bola de cristal */

    crystalBall:
        document.getElementById(
            "crystalBall"
        ),

    crystalPrediction:
        document.getElementById(
            "crystalPrediction"
        ),


    /* Hechizo */

    spellForm:
        document.getElementById(
            "spellForm"
        ),

    guestName:
        document.getElementById(
            "guestName"
        ),

    spellMessage:
        document.getElementById(
            "spellMessage"
        ),

    characterCount:
        document.getElementById(
            "characterCount"
        ),

    spellError:
        document.getElementById(
            "spellError"
        ),

    spellOverlay:
        document.getElementById(
            "spellOverlay"
        ),

    sendSpellButton:
        document.getElementById(
            "sendSpellButton"
        ),

    closeSpellButton:
        document.getElementById(
            "closeSpellButton"
        ),


    /* Lightbox */

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


/* =========================================================
   MÚSICA
   ========================================================= */

/**
 * Actualiza el botón de música.
 *
 * @param {boolean} isPlaying
 */
function updateMusicButton(isPlaying) {

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
 * @returns {Promise<boolean>}
 */
async function playMusic() {

    try {

        elements.backgroundMusic.volume =
            0.35;


        await elements.backgroundMusic.play();


        updateMusicButton(true);


        return true;

    } catch (error) {

        console.error(
            "No se pudo reproducir la música:",
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


/**
 * Inicializa música.
 */
function initializeMusic() {

    elements.openInvitation.addEventListener(
        "click",
        async () => {

            elements.welcomeScreen.classList.add(
                "hidden"
            );


            document.body.classList.remove(
                "no-scroll"
            );


            await playMusic();
        }
    );


    elements.musicButton.addEventListener(
        "click",
        async () => {

            if (
                elements.backgroundMusic.paused
            ) {

                await playMusic();

            } else {

                pauseMusic();

            }

        }
    );


    elements.backgroundMusic.addEventListener(
        "error",
        () => {

            console.error(
                "No se pudo cargar halloween.mp3"
            );

            console.error(
                "Ruta esperada: ./music/halloween.mp3"
            );
        }
    );


    updateMusicButton(false);
}


/* =========================================================
   CUENTA REGRESIVA
   ========================================================= */

/**
 * Actualiza la cuenta regresiva.
 */
function updateCountdown() {

    const targetDate =
        new Date(
            weddingConfig.date
        );


    const currentDate =
        new Date();


    const difference =
        targetDate.getTime()
        -
        currentDate.getTime();


    if (difference <= 0) {

        elements.days.textContent =
            "00";

        elements.hours.textContent =
            "00";

        elements.minutes.textContent =
            "00";

        elements.seconds.textContent =
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
            (totalSeconds % 86400) /
            3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) /
            60
        );


    const seconds =
        totalSeconds % 60;


    elements.days.textContent =
        String(days).padStart(2, "0");


    elements.hours.textContent =
        String(hours).padStart(2, "0");


    elements.minutes.textContent =
        String(minutes).padStart(2, "0");


    elements.seconds.textContent =
        String(seconds).padStart(2, "0");
}


/**
 * Inicializa contador.
 */
function initializeCountdown() {

    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );
}


/* =========================================================
   BOLA DE CRISTAL
   ========================================================= */

/**
 * Predicciones disponibles.
 */
const crystalPredictions = [

    "Esta noche alguien terminará bailando mucho más de lo que imaginaba. 🕺",

    "La bola ve una noche llena de risas, abrazos y buenos recuerdos. 🥂",

    "Un brindis está escrito en tu destino. Y probablemente no será el último. 🍷",

    "La luna predice que esta noche conocerás un recuerdo que guardarás para siempre. 🌙",

    "Veo música, amigos y una pista de baile esperando por ti. 💃",

    "La bola revela que Jennifer y David estarán rodeados de las personas que más quieren. ❤️",

    "Tu destino esta noche es sencillo: disfrutar, celebrar y ser feliz. ✨",

    "Hay un hechizo muy poderoso esta noche... se llama amor. 🔮"
];


/**
 * Obtiene una predicción aleatoria.
 *
 * @returns {string}
 */
function getRandomPrediction() {

    const randomIndex =
        Math.floor(
            Math.random() *
            crystalPredictions.length
        );


    return crystalPredictions[
        randomIndex
    ];
}


/**
 * Consulta la bola de cristal.
 */
function consultCrystalBall() {

    const prediction =
        getRandomPrediction();


    elements.crystalPrediction.classList.remove(
        "prediction-active"
    );


    /*
     * Permite reiniciar la animación
     * del navegador.
     */

    void elements.crystalPrediction.offsetWidth;


    elements.crystalPrediction.textContent =
        prediction;


    elements.crystalPrediction.classList.add(
        "prediction-active"
    );
}


/**
 * Inicializa la bola.
 */
function initializeCrystalBall() {

    elements.crystalBall.addEventListener(
        "click",
        consultCrystalBall
    );
}


/* =========================================================
   GOOGLE MAPS
   ========================================================= */

/**
 * Crea URL de Google Maps.
 *
 * @param {string} latitude
 * @param {string} longitude
 *
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


/* =========================================================
   WAZE
   ========================================================= */

/**
 * Crea URL de Waze.
 *
 * @param {string} latitude
 * @param {string} longitude
 *
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


/**
 * Inicializa botones de ubicación.
 */
function initializeLocations() {

    elements.churchGoogleMaps.href =
        createGoogleMapsUrl(
            weddingConfig.church.latitude,
            weddingConfig.church.longitude
        );


    elements.churchWaze.href =
        createWazeUrl(
            weddingConfig.church.latitude,
            weddingConfig.church.longitude
        );


    elements.venueGoogleMaps.href =
        createGoogleMapsUrl(
            weddingConfig.venue.latitude,
            weddingConfig.venue.longitude
        );


    elements.venueWaze.href =
        createWazeUrl(
            weddingConfig.venue.latitude,
            weddingConfig.venue.longitude
        );
}


/* =========================================================
   RSVP
   ========================================================= */

/**
 * Crea enlace de WhatsApp.
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


/**
 * Inicializa RSVP.
 */
function initializeRsvp() {

    elements.whatsappButton.href =
        createWhatsAppUrl();
}


/* =========================================================
   ANIMACIONES
   ========================================================= */

/**
 * Inicializa animaciones al hacer scroll.
 */
function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

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
        element => {

            observer.observe(
                element
            );

        }
    );
}


/* =========================================================
   GALERÍA
   ========================================================= */

/**
 * Abre lightbox.
 *
 * @param {string} imageUrl
 * @param {string} altText
 */
function openLightbox(
    imageUrl,
    altText
) {

    elements.lightboxImage.src =
        imageUrl;


    elements.lightboxImage.alt =
        altText;


    elements.lightbox.classList.add(
        "active"
    );


    elements.lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );
}


/**
 * Cierra lightbox.
 */
function closeLightbox() {

    elements.lightbox.classList.remove(
        "active"
    );


    elements.lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );


    elements.lightboxImage.src =
        "";
}


/**
 * Inicializa galería.
 */
function initializeGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(
        item => {

            item.addEventListener(
                "click",
                () => {

                    const image =
                        item.querySelector(
                            "img"
                        );


                    openLightbox(
                        item.dataset.image,
                        image.alt
                    );

                }
            );

        }
    );


    elements.closeLightbox.addEventListener(
        "click",
        closeLightbox
    );


    elements.lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elements.lightbox
            ) {

                closeLightbox();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                elements.lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();
            }

        }
    );
}


/* =========================================================
   ÚLTIMO HECHIZO
   ========================================================= */

/**
 * Limpia texto introducido por usuario.
 *
 * No usamos innerHTML con datos del usuario.
 *
 * @param {string} value
 *
 * @returns {string}
 */
function sanitizeUserText(value) {

    return value
        .replace(/\s+/g, " ")
        .trim();
}


/**
 * Muestra error.
 *
 * @param {string} message
 */
function showSpellError(message) {

    elements.spellError.textContent =
        message;


    elements.spellError.hidden =
        false;
}


/**
 * Limpia error.
 */
function clearSpellError() {

    elements.spellError.textContent =
        "";


    elements.spellError.hidden =
        true;
}


/**
 * Actualiza contador de caracteres.
 */
function updateCharacterCounter() {

    const length =
        elements.spellMessage.value.length;


    elements.characterCount.textContent =
        length;
}


/**
 * Valida formulario.
 *
 * @returns {Object}
 */
function validateSpellForm() {

    clearSpellError();


    const guestName =
        sanitizeUserText(
            elements.guestName.value
        );


    const message =
        sanitizeUserText(
            elements.spellMessage.value
        );


    if (!message) {

        showSpellError(
            "Escribe un mensaje antes de lanzar el hechizo."
        );


        elements.spellMessage.focus();


        return {
            isValid: false
        };
    }


    if (
        message.length >
        weddingConfig.spell.maxMessageLength
    ) {

        showSpellError(
            `El mensaje no puede superar los ${weddingConfig.spell.maxMessageLength} caracteres.`
        );


        elements.spellMessage.focus();


        return {
            isValid: false
        };
    }


    return {

        isValid: true,

        guestName,

        message
    };
}


/*
 * Almacenamos solamente durante la sesión.
 *
 * No utilizamos localStorage porque el mensaje
 * no necesita quedar guardado en el dispositivo
 * del invitado.
 */
let currentSpell = null;


/**
 * Abre animación.
 */
function openSpellAnimation() {

    elements.spellOverlay.classList.add(
        "active"
    );


    elements.spellOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );
}


/**
 * Cierra animación.
 */
function closeSpellAnimation() {

    elements.spellOverlay.classList.remove(
        "active"
    );


    elements.spellOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );
}


/**
 * Genera mensaje para WhatsApp.
 *
 * @returns {string}
 */
function createSpellWhatsAppMessage() {

    if (!currentSpell) {

        return "";
    }


    const guestLine =
        currentSpell.guestName
            ? `👤 ${currentSpell.guestName}`
            : "👤 Invitado especial";


    return [

        weddingConfig.spell.title,

        "",

        `💍 ${weddingConfig.couple.bride} & ${weddingConfig.couple.groom}`,

        "",

        guestLine,

        "",

        "✨ Mensaje:",

        `"${currentSpell.message}"`,

        "",

        `🕯️ ${weddingConfig.spell.date}`,

        "",

        "Mensaje enviado desde la invitación digital."

    ].join("\n");
}


/**
 * Envía hechizo a WhatsApp.
 */
function sendSpellToWhatsApp() {

    const message =
        createSpellWhatsAppMessage();


    if (!message) {

        return;
    }


    const whatsappUrl =
        "https://wa.me/" +
        weddingConfig.whatsapp.phone +
        "?text=" +
        encodeURIComponent(
            message
        );


    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );
}


/**
 * Inicializa formulario del hechizo.
 */
function initializeSpell() {

    elements.spellMessage.addEventListener(
        "input",
        updateCharacterCounter
    );


    elements.spellForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const result =
                validateSpellForm();


            if (!result.isValid) {

                return;
            }


            currentSpell = {

                guestName:
                    result.guestName,

                message:
                    result.message

            };


            openSpellAnimation();
        }
    );


    elements.sendSpellButton.addEventListener(
        "click",
        sendSpellToWhatsApp
    );


    elements.closeSpellButton.addEventListener(
        "click",
        closeSpellAnimation
    );


    elements.spellOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                elements.spellOverlay
            ) {

                closeSpellAnimation();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                elements.spellOverlay.classList.contains(
                    "active"
                )
            ) {

                closeSpellAnimation();
            }

        }
    );


    updateCharacterCounter();
}


/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

/**
 * Inicializa toda la invitación.
 */
function initializeApplication() {

    initializeMusic();

    initializeCountdown();

    initializeCrystalBall();

    initializeLocations();

    initializeRsvp();

    initializeRevealAnimations();

    initializeGallery();

    initializeSpell();


    console.log(
        "✓ Invitación Jennifer & David inicializada."
    );
}


/* =========================================================
   ARRANQUE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);