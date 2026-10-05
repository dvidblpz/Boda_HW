/* ============================================================
   JENNIFER & DAVID
   Sistema interactivo de invitación

   Funcionalidades:

   - Configuración
   - Música
   - Contador
   - Invitación personalizada
   - Google Maps
   - Waze
   - WhatsApp
   - Animaciones
   - Partículas
   - Misiones
   - Oráculo
   - Galería
   - RSVP
   - Protección de contenido
   ============================================================ */

"use strict";


/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

const weddingConfig = {

    couple: {

        bride: "Jennifer",

        groom: "David"

    },


    weddingDate:
        "2026-10-31T18:00:00",


    whatsapp: {

        phone:
            "528112345678"

    },


    church: {

        latitude:
            "25.6866",

        longitude:
            "-100.3161"

    },


    venue: {

        latitude:
            "25.6750",

        longitude:
            "-100.3100"

    }

};


/* ============================================================
   ELEMENTOS
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

    guestName:
        document.getElementById(
            "guestName"
        ),

    countdown: {

        days:
            document.getElementById("days"),

        hours:
            document.getElementById("hours"),

        minutes:
            document.getElementById("minutes"),

        seconds:
            document.getElementById("seconds")

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

    oracleButton:
        document.getElementById(
            "oracleButton"
        ),

    oracleResult:
        document.getElementById(
            "oracleResult"
        ),

    songButton:
        document.getElementById(
            "songButton"
        ),

    equalizer:
        document.querySelector(
            ".equalizer"
        ),

    guestInput:
        document.getElementById(
            "guestInput"
        ),

    guestCount:
        document.getElementById(
            "guestCount"
        ),

    confirmAttendance:
        document.getElementById(
            "confirmAttendance"
        ),

    declineAttendance:
        document.getElementById(
            "declineAttendance"
        ),

    rsvpMessage:
        document.getElementById(
            "rsvpMessage"
        ),

    missionComplete:
        document.getElementById(
            "missionComplete"
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
        ),

    particles:
        document.getElementById(
            "particles"
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

        elements.equalizer.classList.add(
            "active"
        );

        return true;

    } catch (error) {

        console.error(
            "No se pudo reproducir el audio:",
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

    elements.equalizer.classList.remove(
        "active"
    );

}


/* ============================================================
   APERTURA
   ============================================================ */

elements.openInvitation.addEventListener(
    "click",
    async function () {

        elements.welcomeScreen.classList.add(
            "hidden"
        );

        document.body.classList.remove(
            "no-scroll"
        );

        await playMusic();

    }
);


/* ============================================================
   CONTROL DE MÚSICA
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
   BOTÓN NUESTRA CANCIÓN
   ============================================================ */

elements.songButton.addEventListener(
    "click",
    async function () {

        if (
            elements.backgroundMusic.paused
        ) {

            const success =
                await playMusic();

            if (success) {

                elements.songButton.textContent =
                    "❚❚ Pausar nuestra canción";

            }

        } else {

            pauseMusic();

            elements.songButton.textContent =
                "▶ Reproducir nuestra canción";

        }

    }
);


/* ============================================================
   CONTADOR
   ============================================================ */

/**
 * Actualiza la cuenta regresiva.
 */

function updateCountdown() {

    const targetDate =
        new Date(
            weddingConfig.weddingDate
        );

    const now =
        new Date();

    const difference =
        targetDate.getTime()
        -
        now.getTime();


    if (
        difference <= 0
    ) {

        Object.values(
            elements.countdown
        ).forEach(
            element => {
                element.textContent = "00";
            }
        );

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
            (totalSeconds % 86400) / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const seconds =
        totalSeconds % 60;


    elements.countdown.days.textContent =
        String(days).padStart(2, "0");


    elements.countdown.hours.textContent =
        String(hours).padStart(2, "0");


    elements.countdown.minutes.textContent =
        String(minutes).padStart(2, "0");


    elements.countdown.seconds.textContent =
        String(seconds).padStart(2, "0");

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
 * Genera enlace de Google Maps.
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
 * Genera enlace de Waze.
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
   ASIGNACIÓN DE MAPAS
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
   INVITADO PERSONALIZADO
   ============================================================ */

/**
 * Obtiene el nombre desde la URL.
 *
 * Ejemplo:
 *
 * index.html?guest=David
 */

function loadGuestName() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const guest =
        params.get("guest");


    if (
        guest &&
        guest.trim().length > 0
    ) {

        const cleanGuest =
            guest
                .trim()
                .substring(0, 60);


        elements.guestName.textContent =
            cleanGuest;

        elements.guestInput.value =
            cleanGuest;

    }

}


loadGuestName();


/* ============================================================
   PARTÍCULAS
   ============================================================ */

/**
 * Genera partículas ambientales.
 */

function createParticles() {

    const fragment =
        document.createDocumentFragment();


    for (
        let index = 0;
        index < 35;
        index++
    ) {

        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.animationDuration =
            `${8 + Math.random() * 15}s`;


        particle.style.animationDelay =
            `${Math.random() * 10}s`;


        fragment.appendChild(
            particle
        );

    }


    elements.particles.appendChild(
        fragment
    );

}


createParticles();


/* ============================================================
   ANIMACIONES REVEAL
   ============================================================ */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


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
            threshold: 0.12
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


/* ============================================================
   MISIÓN
   ============================================================ */

const missionItems =
    document.querySelectorAll(
        ".mission-item"
    );


missionItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function () {

                item.classList.toggle(
                    "completed"
                );


                const completed =
                    document.querySelectorAll(
                        ".mission-item.completed"
                    ).length;


                if (
                    completed ===
                    missionItems.length
                ) {

                    elements.missionComplete.classList.add(
                        "show"
                    );

                } else {

                    elements.missionComplete.classList.remove(
                        "show"
                    );

                }

            }
        );

    }
);


/* ============================================================
   ORÁCULO
   ============================================================ */

const oracleMessages = [

    "🔮 El destino dice que esta noche terminarás bailando.",

    "🕯️ Una copa brindará por una nueva historia.",

    "🦇 El oráculo predice una noche difícil de olvidar.",

    "❤️ Alguien te invitará a bailar antes de medianoche.",

    "🎃 Tu misión es disfrutar cada momento.",

    "🥂 Esta noche brindarás por Jennifer y David.",

    "✨ Una fotografía capturará uno de tus mejores recuerdos.",

    "🌙 La noche será larga. La fiesta será aún más larga."

];


elements.oracleButton.addEventListener(
    "click",
    function () {

        elements.oracleResult.style.opacity =
            "0";


        setTimeout(
            function () {

                const randomIndex =
                    Math.floor(
                        Math.random()
                        *
                        oracleMessages.length
                    );


                elements.oracleResult.textContent =
                    oracleMessages[
                        randomIndex
                    ];


                elements.oracleResult.style.opacity =
                    "1";

            },
            300
        );

    }
);


/* ============================================================
   LIGHTBOX
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
 * Cierra la galería.
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
   RSVP
   ============================================================ */

/**
 * Limpia y limita el nombre del invitado.
 *
 * @returns {string}
 */

function getGuestName() {

    return elements.guestInput.value
        .trim()
        .replace(
            /\s+/g,
            " "
        )
        .substring(
            0,
            60
        );

}


/**
 * Crea un enlace de WhatsApp.
 *
 * @param {string} message
 * @returns {string}
 */

function createWhatsAppUrl(
    message
) {

    return (
        "https://wa.me/" +
        weddingConfig.whatsapp.phone +
        "?text=" +
        encodeURIComponent(
            message
        )
    );

}


/**
 * Confirma asistencia.
 */

elements.confirmAttendance.addEventListener(
    "click",
    function () {

        const name =
            getGuestName();


        const companions =
            elements.guestCount.value;


        if (
            name.length < 2
        ) {

            elements.rsvpMessage.textContent =
                "Por favor escribe tu nombre.";

            elements.guestInput.focus();

            return;

        }


        const message =
            `Hola Jennifer y David. Soy ${name} y confirmo mi asistencia a su boda del 31 de octubre de 2026. Acompañantes: ${companions}.`;


        const whatsappUrl =
            createWhatsAppUrl(
                message
            );


        elements.rsvpMessage.textContent =
            "🎃 Preparando tu confirmación...";


        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/**
 * Rechazo de invitación.
 */

elements.declineAttendance.addEventListener(
    "click",
    function () {

        const name =
            getGuestName();


        if (
            name.length < 2
        ) {

            elements.rsvpMessage.textContent =
                "Por favor escribe tu nombre.";

            elements.guestInput.focus();

            return;

        }


        const message =
            `Hola Jennifer y David. Soy ${name}. Lamentablemente no podré acompañarlos el 31 de octubre de 2026, pero les deseo una hermosa celebración.`;


        const whatsappUrl =
            createWhatsAppUrl(
                message
            );


        elements.rsvpMessage.textContent =
            "🥀 Preparando mensaje...";


        window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer"
        );

    }
);


/* ============================================================
   PROTECCIÓN CONTRA COPIA
   ============================================================ */

document.addEventListener(
    "contextmenu",
    function (event) {

        event.preventDefault();

    }
);


document.addEventListener(
    "copy",
    function (event) {

        event.preventDefault();

    }
);


document.addEventListener(
    "cut",
    function (event) {

        event.preventDefault();

    }
);


document.addEventListener(
    "selectstart",
    function (event) {

        event.preventDefault();

    }
);


document.addEventListener(
    "dragstart",
    function (event) {

        event.preventDefault();

    }
);


/* ============================================================
   BLOQUEO DE ATAJOS COMUNES
   ============================================================ */

document.addEventListener(
    "keydown",
    function (event) {

        const key =
            event.key.toLowerCase();


        const blockedShortcuts = [

            event.ctrlKey && key === "c",

            event.ctrlKey && key === "x",

            event.ctrlKey && key === "u",

            event.ctrlKey && key === "s",

            event.ctrlKey && key === "p",

            event.ctrlKey &&
            event.shiftKey &&
            key === "i",

            event.ctrlKey &&
            event.shiftKey &&
            key === "j",

            event.ctrlKey &&
            event.shiftKey &&
            key === "c",

            event.key === "F12"

        ];


        if (
            blockedShortcuts.some(
                Boolean
            )
        ) {

            event.preventDefault();

        }

    }
);


/* ============================================================
   PROTECCIÓN VISUAL
   ============================================================ */

function enableProtectedView() {

    document.body.classList.add(
        "protected-view"
    );

}


function disableProtectedView() {

    document.body.classList.remove(
        "protected-view"
    );

}


document.addEventListener(
    "visibilitychange",
    function () {

        if (
            document.hidden
        ) {

            enableProtectedView();

        } else {

            disableProtectedView();

        }

    }
);


window.addEventListener(
    "blur",
    enableProtectedView
);


window.addEventListener(
    "focus",
    disableProtectedView
);


/* ============================================================
   PREVENIR IMPRESIÓN
   ============================================================ */

window.addEventListener(
    "beforeprint",
    enableProtectedView
);


/* ============================================================
   ERROR DE AUDIO
   ============================================================ */

elements.backgroundMusic.addEventListener(
    "error",
    function () {

        console.error(
            "No se pudo cargar ./music/halloween.mp3"
        );

    }
);


/* ============================================================
   INICIO
   ============================================================ */

console.log(
    "Jennifer & David — Invitación 2.0"
);

console.log(
    "Sistema interactivo cargado correctamente."
);