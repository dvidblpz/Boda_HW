/**
 * ============================================================
 * INVITACIÓN DE BODA HALLOWEEN
 * Jennifer & David
 *
 * JavaScript principal.
 *
 * Funciones:
 * - Pantalla de bienvenida
 * - Música
 * - Contador
 * - Google Maps / Waze
 * - Bola de cristal
 * - Lista del ritual
 * - Galería / Lightbox
 * - Último hechizo
 * - Confirmación WhatsApp
 * - Animaciones
 * - Protección contra copia y atajos comunes
 * ============================================================
 */

"use strict";


/* ============================================================
   CONFIGURACIÓN CENTRAL
============================================================ */

const weddingConfig = {

    couple: {
        bride: "Jennifer",
        groom: "David"
    },

    date: "2026-10-31T18:00:00",

    rsvpDeadline: "15 de octubre de 2026",

    whatsapp: {
        phone: "528112345678",

        message:
            "Hola Jennifer y David, confirmo mi asistencia a su boda."
    },

    church: {
        name: "Iglesia de Santa Luna",

        address:
            "Calle de los Suspiros #666, Centro de Monterrey, Nuevo León",

        latitude: "25.6866",

        longitude: "-100.3161"
    },

    venue: {
        name: "Castillo de la Luna",

        address:
            "Camino de la Luna #666, Monterrey, Nuevo León",

        latitude: "25.6750",

        longitude: "-100.3100"
    }

};


/* ============================================================
   MENSAJES DE LA BOLA DE CRISTAL
============================================================ */

const crystalMessages = [

    "La luna anuncia una noche que recordarán para siempre.",

    "Dos almas se encontraron y decidieron escribir el mismo destino.",

    "El verdadero hechizo será una vida compartida.",

    "Esta noche guarda un secreto: ustedes son parte de la magia.",

    "Las estrellas dicen que este capítulo apenas comienza.",

    "La fortuna anuncia risas, abrazos y recuerdos que durarán toda la vida.",

    "Cuando el amor encuentra su camino, ni siquiera la oscuridad puede detenerlo."

];


/* ============================================================
   VARIABLES GLOBALES
============================================================ */

let currentSpell = null;

let toastTimeout = null;

let crystalLastIndex = -1;


/* ============================================================
   INICIALIZACIÓN
============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    initializeInvitation
);


/**
 * Inicializa todos los componentes de la invitación.
 */
function initializeInvitation() {

    setupWelcomeScreen();

    setupMusicControls();

    setupCountdown();

    setupNavigationLinks();

    setupCrystalBall();

    setupSpell();

    setupGalleryLightbox();

    setupRevealAnimations();

    setupRsvp();

    setupPrivacyProtection();

}


/* ============================================================
   PANTALLA DE BIENVENIDA
============================================================ */

/**
 * Configura la apertura de la invitación.
 */
function setupWelcomeScreen() {

    const welcomeScreen =
        document.getElementById("welcomeScreen");

    const openInvitation =
        document.getElementById("openInvitation");

    if (!welcomeScreen || !openInvitation) {
        return;
    }

    openInvitation.addEventListener(
        "click",
        async () => {

            welcomeScreen.classList.add("hidden");

            document.body.classList.remove("no-scroll");

            await playMusic();

        }
    );

}


/* ============================================================
   MÚSICA
============================================================ */

/**
 * Configura los controles de música.
 */
function setupMusicControls() {

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const musicButton =
        document.getElementById("musicButton");

    if (!backgroundMusic || !musicButton) {
        return;
    }

    backgroundMusic.volume = 0.35;

    musicButton.addEventListener(
        "click",
        async () => {

            if (backgroundMusic.paused) {

                await playMusic();

            } else {

                pauseMusic();

            }

        }
    );

    backgroundMusic.addEventListener(
        "error",
        () => {

            console.error(
                "No se pudo cargar ./music/halloween.mp3"
            );

            showToast(
                "No se encontró el archivo de música."
            );

        }
    );

    backgroundMusic.addEventListener(
        "canplaythrough",
        () => {

            console.log(
                "✓ Música cargada correctamente."
            );

        }
    );

    updateMusicButton(false);

}


/**
 * Reproduce la música.
 *
 * @returns {Promise<boolean>}
 */
async function playMusic() {

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    if (!backgroundMusic) {
        return false;
    }

    try {

        await backgroundMusic.play();

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

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.pause();

    updateMusicButton(false);

}


/**
 * Actualiza visualmente el botón de música.
 *
 * @param {boolean} isPlaying
 */
function updateMusicButton(isPlaying) {

    const musicButton =
        document.getElementById("musicButton");

    if (!musicButton) {
        return;
    }

    musicButton.textContent =
        isPlaying ? "🔊" : "🔇";

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


/* ============================================================
   CONTADOR
============================================================ */

/**
 * Configura el contador regresivo.
 */
function setupCountdown() {

    const targetDate =
        new Date(
            weddingConfig.date
        ).getTime();

    if (Number.isNaN(targetDate)) {

        console.error(
            "La fecha configurada no es válida."
        );

        return;
    }

    updateCountdown(targetDate);

    window.setInterval(
        () => updateCountdown(targetDate),
        1000
    );

}


/**
 * Actualiza los valores del contador.
 *
 * @param {number} targetDate
 */
function updateCountdown(targetDate) {

    const now =
        Date.now();

    const difference =
        targetDate - now;

    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
                24
        );

    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
                60
        );

    const seconds =
        Math.floor(
            (difference / 1000) %
                60
        );

    daysElement.textContent =
        padNumber(days);

    hoursElement.textContent =
        padNumber(hours);

    minutesElement.textContent =
        padNumber(minutes);

    secondsElement.textContent =
        padNumber(seconds);

}


/**
 * Agrega un cero delante de valores menores a 10.
 *
 * @param {number} value
 * @returns {string}
 */
function padNumber(value) {

    return String(value).padStart(
        2,
        "0"
    );

}


/* ============================================================
   MAPAS
============================================================ */

/**
 * Configura los enlaces de Google Maps y Waze.
 */
function setupNavigationLinks() {

    const churchGoogleMaps =
        document.getElementById(
            "churchGoogleMaps"
        );

    const churchWaze =
        document.getElementById(
            "churchWaze"
        );

    const venueGoogleMaps =
        document.getElementById(
            "venueGoogleMaps"
        );

    const venueWaze =
        document.getElementById(
            "venueWaze"
        );


    if (churchGoogleMaps) {

        churchGoogleMaps.href =
            createGoogleMapsUrl(
                weddingConfig.church.latitude,
                weddingConfig.church.longitude
            );

    }


    if (churchWaze) {

        churchWaze.href =
            createWazeUrl(
                weddingConfig.church.latitude,
                weddingConfig.church.longitude
            );

    }


    if (venueGoogleMaps) {

        venueGoogleMaps.href =
            createGoogleMapsUrl(
                weddingConfig.venue.latitude,
                weddingConfig.venue.longitude
            );

    }


    if (venueWaze) {

        venueWaze.href =
            createWazeUrl(
                weddingConfig.venue.latitude,
                weddingConfig.venue.longitude
            );

    }

}


/**
 * Crea URL de Google Maps.
 *
 * @param {string} latitude
 * @param {string} longitude
 * @returns {string}
 */
function createGoogleMapsUrl(
    latitude,
    longitude
) {

    const destination =
        `${latitude},${longitude}`;

    return (
        "https://www.google.com/maps/dir/" +
        "?api=1" +
        "&destination=" +
        encodeURIComponent(destination) +
        "&travelmode=driving" +
        "&dir_action=navigate"
    );

}


/**
 * Crea URL de Waze.
 *
 * @param {string} latitude
 * @param {string} longitude
 * @returns {string}
 */
function createWazeUrl(
    latitude,
    longitude
) {

    const coordinates =
        `${latitude},${longitude}`;

    return (
        "https://www.waze.com/ul" +
        "?ll=" +
        encodeURIComponent(coordinates) +
        "&navigate=yes"
    );

}


/* ============================================================
   BOLA DE CRISTAL
============================================================ */

/**
 * Configura la bola de cristal.
 */
function setupCrystalBall() {

    const crystalBall =
        document.getElementById(
            "crystalBall"
        );

    const crystalButton =
        document.getElementById(
            "consultCrystalButton"
        );

    const crystalMessage =
        document.getElementById(
            "crystalMessage"
        );

    if (
        !crystalBall ||
        !crystalButton ||
        !crystalMessage
    ) {
        return;
    }


    crystalButton.addEventListener(
        "click",
        () => {

            let randomIndex =
                Math.floor(
                    Math.random() *
                    crystalMessages.length
                );

            /*
             * Evita repetir inmediatamente
             * el mismo mensaje.
             */
            while (
                randomIndex === crystalLastIndex &&
                crystalMessages.length > 1
            ) {

                randomIndex =
                    Math.floor(
                        Math.random() *
                        crystalMessages.length
                    );

            }

            crystalLastIndex =
                randomIndex;


            crystalBall
                .querySelector(".crystal-orb")
                ?.classList
                .remove("is-reading");


            /*
             * Fuerza el navegador a recalcular
             * la animación para poder repetirla.
             */
            void crystalBall.offsetWidth;


            crystalBall
                .querySelector(".crystal-orb")
                ?.classList
                .add("is-reading");


            crystalMessage.classList.remove(
                "is-visible"
            );


            window.setTimeout(
                () => {

                    crystalMessage.textContent =
                        crystalMessages[
                            randomIndex
                        ];

                    crystalMessage.classList.add(
                        "is-visible"
                    );

                },
                450
            );

        }
    );

}


/* ============================================================
   ÚLTIMO HECHIZO
============================================================ */

/**
 * Configura el formulario del último hechizo.
 */
function setupSpell() {

    const messageInput =
        document.getElementById(
            "spellMessage"
        );

    const guestNameInput =
        document.getElementById(
            "spellGuestName"
        );

    const counter =
        document.getElementById(
            "spellCounter"
        );

    const castButton =
        document.getElementById(
            "castSpellButton"
        );

    const deliverButton =
        document.getElementById(
            "deliverSpellButton"
        );

    if (
        !messageInput ||
        !guestNameInput ||
        !counter ||
        !castButton ||
        !deliverButton
    ) {
        return;
    }


    /*
     * Contador de caracteres.
     */
    messageInput.addEventListener(
        "input",
        () => {

            counter.textContent =
                String(
                    messageInput.value.length
                );

        }
    );


    /*
     * Lanzar hechizo.
     */
    castButton.addEventListener(
        "click",
        () => {

            const message =
                messageInput.value.trim();

            const guestName =
                guestNameInput.value.trim();


            if (!message) {

                showToast(
                    "✨ Escribe un mensaje antes de lanzar el hechizo."
                );

                messageInput.focus();

                return;
            }


            if (message.length > 500) {

                showToast(
                    "El mensaje no puede superar los 500 caracteres."
                );

                return;
            }


            if (guestName.length > 80) {

                showToast(
                    "El nombre no puede superar los 80 caracteres."
                );

                return;
            }


            currentSpell = {

                guestName:
                    guestName || "Un invitado especial",

                message

            };


            showSpellAnimation();


            window.setTimeout(
                () => {

                    hideSpellAnimation();

                    showSpellResult();

                },
                1800
            );

        }
    );


    /*
     * Entregar el hechizo por WhatsApp.
     */
    deliverButton.addEventListener(
        "click",
        deliverSpell
    );

}


/**
 * Muestra la animación del hechizo.
 */
function showSpellAnimation() {

    const overlay =
        document.getElementById(
            "spellOverlay"
        );

    if (!overlay) {
        return;
    }

    overlay.classList.add("active");

    overlay.setAttribute(
        "aria-hidden",
        "false"
    );

}


/**
 * Oculta la animación del hechizo.
 */
function hideSpellAnimation() {

    const overlay =
        document.getElementById(
            "spellOverlay"
        );

    if (!overlay) {
        return;
    }

    overlay.classList.remove("active");

    overlay.setAttribute(
        "aria-hidden",
        "true"
    );

}


/**
 * Muestra el resultado del hechizo.
 */
function showSpellResult() {

    const result =
        document.getElementById(
            "spellResult"
        );

    if (!result) {
        return;
    }

    result.hidden = false;

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/**
 * Envía el hechizo mediante WhatsApp.
 */
function deliverSpell() {

    if (!currentSpell) {

        showToast(
            "Primero debes lanzar el hechizo."
        );

        return;
    }


    const message = [

        "🔮 EL ÚLTIMO HECHIZO",

        "",

        "💍 Jennifer & David",

        "",

        `👤 ${currentSpell.guestName}`,

        "",

        "✨ Mensaje:",

        `"${currentSpell.message}"`,

        "",

        "🕯️ 31 de octubre de 2026"

    ].join("\n");


    const url =
        "https://wa.me/" +
        weddingConfig.whatsapp.phone +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* ============================================================
   GALERÍA / LIGHTBOX
============================================================ */

/**
 * Configura la galería.
 */
function setupGalleryLightbox() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const closeButton =
        document.getElementById(
            "closeLightbox"
        );


    if (
        !galleryItems.length ||
        !lightbox ||
        !lightboxImage ||
        !closeButton
    ) {
        return;
    }


    galleryItems.forEach(
        (item) => {

            const image =
                item.querySelector(
                    ".gallery-image"
                );

            if (!image) {
                return;
            }


            item.addEventListener(
                "click",
                () => {

                    lightboxImage.src =
                        image.currentSrc ||
                        image.src;

                    lightboxImage.alt =
                        image.alt;

                    lightbox.classList.add(
                        "active"
                    );

                    lightbox.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.classList.add(
                        "no-scroll"
                    );

                }
            );

        }
    );


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();

            }

        }
    );

}


/**
 * Cierra el lightbox.
 */
function closeLightbox() {

    const lightbox =
        document.getElementById(
            "lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove(
        "active"
    );

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );


    if (lightboxImage) {

        window.setTimeout(
            () => {

                lightboxImage.src = "";

            },
            300
        );

    }

}


/* ============================================================
   ANIMACIONES DE APARICIÓN
============================================================ */

/**
 * Configura IntersectionObserver
 * para las animaciones de entrada.
 */
function setupRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) {
        return;
    }


    /*
     * Fallback para navegadores
     * sin IntersectionObserver.
     */
    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (
                entries,
                currentObserver
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        currentObserver.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}


/* ============================================================
   RSVP
============================================================ */

/**
 * Configura el botón de confirmación.
 */
function setupRsvp() {

    const whatsappButton =
        document.getElementById(
            "whatsappButton"
        );

    if (!whatsappButton) {
        return;
    }


    whatsappButton.addEventListener(
        "click",
        () => {

            const url =
                createRsvpWhatsAppUrl();

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/**
 * Genera el enlace de WhatsApp.
 *
 * @returns {string}
 */
function createRsvpWhatsAppUrl() {

    return (
        "https://wa.me/" +
        weddingConfig.whatsapp.phone +
        "?text=" +
        encodeURIComponent(
            weddingConfig.whatsapp.message
        )
    );

}


/* ============================================================
   TOAST
============================================================ */

/**
 * Muestra un mensaje temporal.
 *
 * @param {string} message
 */
function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    if (!toast) {
        return;
    }


    window.clearTimeout(
        toastTimeout
    );


    toast.textContent =
        message;


    toast.classList.add(
        "visible"
    );


    toastTimeout =
        window.setTimeout(
            () => {

                toast.classList.remove(
                    "visible"
                );

            },
            3000
        );

}


/* ============================================================
   PROTECCIÓN CONTRA COPIA
============================================================ */

/**
 * Implementa medidas de disuasión contra:
 *
 * - Copiar
 * - Cortar
 * - Menú contextual
 * - Arrastrar imágenes
 * - Selección de texto
 * - Algunos atajos del navegador
 *
 * IMPORTANTE:
 * Esto NO puede impedir al 100% una captura de pantalla.
 * El sistema operativo puede capturar cualquier contenido
 * que se esté mostrando en pantalla.
 */
function setupPrivacyProtection() {

    const blockedEvents = [

        "copy",
        "cut",
        "contextmenu",
        "dragstart",
        "selectstart"

    ];


    blockedEvents.forEach(
        (eventName) => {

            document.addEventListener(
                eventName,
                (event) => {

                    /*
                     * Permitimos escribir normalmente
                     * dentro de inputs y textarea.
                     */
                    if (
                        event.target.matches(
                            "input, textarea"
                        )
                    ) {
                        return;
                    }


                    event.preventDefault();

                    showToast(
                        "🔮 Esta invitación es privada."
                    );

                },
                {
                    passive: false
                }
            );

        }
    );


    /*
     * Bloqueo de atajos comunes.
     */
    document.addEventListener(
        "keydown",
        handleProtectedKeyboardShortcut,
        true
    );


    /*
     * Evita arrastrar imágenes.
     */
    document.querySelectorAll("img")
        .forEach(
            (image) => {

                image.setAttribute(
                    "draggable",
                    "false"
                );

            }
        );


    /*
     * Escudo cuando el documento pierde visibilidad.
     */
    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                showPrivacyShield();

            } else {

                hidePrivacyShield();

            }

        }
    );

}


/**
 * Maneja atajos de teclado comunes.
 *
 * @param {KeyboardEvent} event
 */
function handleProtectedKeyboardShortcut(
    event
) {

    const key =
        event.key.toLowerCase();

    const modifier =
        event.ctrlKey ||
        event.metaKey;


    /*
     * No interferir con campos de formulario.
     */
    if (
        event.target.matches(
            "input, textarea"
        )
    ) {

        /*
         * Aun así bloqueamos F12.
         */
        if (
            key !== "f12"
        ) {
            return;
        }

    }


    const blockedShortcut =

        (
            modifier &&
            [
                "c",
                "x",
                "u",
                "s",
                "p"
            ].includes(key)
        )

        ||

        key === "f12"

        ||

        (
            modifier &&
            event.shiftKey &&
            [
                "i",
                "j",
                "c"
            ].includes(key)
        )

        ||

        key === "printscreen";


    if (!blockedShortcut) {
        return;
    }


    event.preventDefault();

    event.stopPropagation();


    showPrivacyShield();


    window.setTimeout(
        hidePrivacyShield,
        1500
    );

}


/* ============================================================
   ESCUDO DE PRIVACIDAD
============================================================ */

/**
 * Muestra el escudo de privacidad.
 */
function showPrivacyShield() {

    const shield =
        document.getElementById(
            "privacyShield"
        );

    if (!shield) {
        return;
    }

    shield.classList.add(
        "active"
    );

    shield.setAttribute(
        "aria-hidden",
        "false"
    );

}


/**
 * Oculta el escudo de privacidad.
 */
function hidePrivacyShield() {

    const shield =
        document.getElementById(
            "privacyShield"
        );

    if (!shield) {
        return;
    }

    shield.classList.remove(
        "active"
    );

    shield.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* ============================================================
   MANEJO DE ERRORES DE IMÁGENES
============================================================ */

/*
 * Si una imagen externa llegara a fallar,
 * no dejamos un icono roto sin control.
 */
document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .querySelectorAll(
                ".gallery-image"
            )
            .forEach(
                (image) => {

                    image.addEventListener(
                        "error",
                        () => {

                            image.style.display =
                                "none";

                            const parent =
                                image.closest(
                                    ".gallery-item"
                                );

                            if (parent) {

                                parent.classList.add(
                                    "image-error"
                                );

                            }

                        }
                    );

                }
            );

    }
);