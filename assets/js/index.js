// --- 1. Afficher l'année automatiquement dans le footer ---
document.addEventListener("DOMContentLoaded", function () {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// --- 2. Compteur simple (pas de librairie, juste un interval) ---
function animateCounter(el) {
    let target = parseInt(el.getAttribute("data-counter"));
    let count = 0;
    let step = Math.ceil(target / 100); // vitesse

    let interval = setInterval(() => {
        count += step;
        if (count >= target) {
            count = target;
            clearInterval(interval);
        }
        el.textContent = count;
    }, 30); // toutes les 30ms
}

document.querySelectorAll("[data-counter]").forEach(el => {
    animateCounter(el);
});

// --- 3. Afficher le texte des bulles dans la section "Schéma animé" ---
const bulleTip = document.getElementById("bulleTip");
document.querySelectorAll(".bulle").forEach(bulle => {
    bulle.addEventListener("mouseenter", () => {
        bulleTip.textContent = bulle.getAttribute("data-label");
    });
    bulle.addEventListener("mouseleave", () => {
        bulleTip.textContent = "";
    });
});

// Animation du lien actif au scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Supprime la classe active sur tous les liens
            navLinks.forEach(link => link.classList.remove("active"));

            // Ajoute la classe active au lien correspondant
            const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (currentLink) currentLink.classList.add("active");
        }
    });
});

// Animation du Hero
const bg = document.querySelector(".hero-bg-image");
let scrollY = 0;
let zoom = 1;
let direction = 1;

function animate() {
    // --- Zoom automatique continu (effet de respiration) ---
    zoom += 0.0001 * direction; // vitesse et direction du zoom
    if (zoom > 1.08 || zoom < 1.00) direction *= -1; // inverse le sens (inspire/expire)

    // --- Effet de parallaxe fluide ---
    const offset = window.scrollY * 0.3; // vitesse du mouvement
    const translate = offset * 0.5; // ajustement vertical fluide

    bg.style.transform = `scale(${zoom}) translateY(${translate}px)`;

    requestAnimationFrame(animate);
}
animate();