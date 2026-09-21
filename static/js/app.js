const openBtn = document.getElementById("openBtn");

const gift = document.getElementById("gift");

const petals = document.getElementById("petals");

const photoSection =
    document.getElementById("photoSection");

const finalSection =
    document.getElementById("finalSection");

const yesBtn = document.getElementById("yesBtn");

const noBtn = document.getElementById("noBtn");

const answer = document.getElementById("answer");

const photo = document.getElementById("userPhoto");

const placeholder =
    document.getElementById("placeholder");

const trackedPhotos =
    document.querySelectorAll(".photo-frame img");

const detailSections = [
    gift,
    photoSection,
    finalSection
].filter(Boolean);

let detailTourTimer = null;


/* =========================
   ABRIR REGALO
========================= */

openBtn.addEventListener("click", () => {

    startDetailTour();

});


function startDetailTour() {

    if (detailTourTimer) {

        clearTimeout(detailTourTimer);

    }

    document.body.classList.remove("details-locked");

    openBtn.disabled = true;
    openBtn.querySelector("span").textContent =
        "Ejecutando...";

    showDetailSection(0);

}


function showDetailSection(index) {

    const section = detailSections[index];

    if (!section) {

        openBtn.disabled = false;
        openBtn.querySelector("span").textContent =
            "Ejecutar detalle";

        return;

    }

    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    launchFlowers(index === 0 ? 55 : 35, {
        large: true
    });

    detailTourTimer = setTimeout(() => {

        showDetailSection(index + 1);

    }, index === 0 ? 4300 : 3900);

}


/* =========================
   FLORES Y PÉTALOS
========================= */

function launchFlowers(amount = 20, options = {}) {

    const symbols = [
        "\u{1F33B}",
        "\u{1F33C}",
        "\u{1F338}",
        "\u{1F49B}"
    ];


    for (let i = 0; i < amount; i++) {

        const petal =
            document.createElement("div");


        petal.className = options.large
            ? "petals petal-bloom"
            : "petals";


        petal.textContent =
            symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
            ];


        petal.style.left =
            `${Math.random() * 100}vw`;


        const minSize = options.large ? 38 : 24;
        const sizeRange = options.large ? 56 : 30;

        petal.style.fontSize =
            `${minSize + Math.random() * sizeRange}px`;


        petal.style.animationDuration =
            `${4.8 + Math.random() * 4.6}s`;


        petal.style.animationDelay =
            `${Math.random() * 1.5}s`;


        petal.style.setProperty(
            "--drift",
            `${-120 + Math.random() * 240}px`
        );


        petals.appendChild(petal);


        setTimeout(() => {

            petal.remove();

        }, 10000);

    }

}


/* =========================
   BOTÓN SÍ
========================= */

yesBtn.addEventListener("click", () => {

    answer.textContent =
        "Aprobado por el comité de flores y sonrisas. 😌🌻";


    launchFlowers(45, {
        large: true
    });

});


/* =========================
   BOTÓN NO
========================= */

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);


noBtn.addEventListener("click", () => {

    answer.textContent =
        "JAJA, respuesta registrada como: necesita más flores. 😂";


    moveNoButton();

});


function moveNoButton() {

    const x =
        Math.random() * 180 - 90;


    const y =
        Math.random() * 80 - 40;


    noBtn.style.transform =
        `translate(${x}px, ${y}px)`;

}


/* =========================
   FOTOS
========================= */

trackedPhotos.forEach((currentPhoto) => {

    const currentPlaceholder =
        currentPhoto.parentElement.querySelector(
            ".photo-placeholder"
        );

    currentPhoto.addEventListener("error", () => {

        currentPhoto.style.display = "none";

        if (currentPlaceholder) {

            currentPlaceholder.style.display =
                "grid";

        }

    });


    currentPhoto.addEventListener("load", () => {

        if (currentPlaceholder) {

            currentPlaceholder.style.display =
                "none";

        }

    });

});
