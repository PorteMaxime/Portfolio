var primaryMouseButtonDown = false;

function setPrimaryButtonState(e) {
  var flags = e.buttons !== undefined ? e.buttons : e.which;
  primaryMouseButtonDown = (flags & 1) === 1;
  
    if (primaryMouseButtonDown == false) {
        document.documentElement.style.setProperty('--persistent-glow-size', '0.8rem');
    } else {
        document.documentElement.style.setProperty('--persistent-glow-size', '1.2rem');
    }
}

document.addEventListener("mousedown", setPrimaryButtonState);
document.addEventListener("mousemove", setPrimaryButtonState);
document.addEventListener("mouseup", setPrimaryButtonState);

const container = document.getElementById("magic-mouse-container"),
    persistentGlow = document.getElementById("persistent-glow"),
    navbar = document.getElementById("navbar"),
    toggleNavbar = document.getElementById("toggle-navbar");

const config = {
    glowDuration: 75,
    maximumGlowPointSpacing: 5
};

const px = value => `${value}px`;

const createGlowPoint = position => {
    const glow = document.createElement("div");
    if (primaryMouseButtonDown == false) {
        glow.className = "glow-point";
    } else {
        glow.className = "glow-point-down";
    }
    glow.style.left = px(position.x);
    glow.style.top = px(position.y);
    container.appendChild(glow);
    setTimeout(() => container.removeChild(glow), config.glowDuration);
};

const determinePointQuantity = distance => Math.max(
    Math.floor(distance / config.maximumGlowPointSpacing),
    1
);

const createGlow = (last, current) => {
    const distance = Math.hypot(current.x - last.x, current.y - last.y),
          quantity = determinePointQuantity(distance);

    const dx = (current.x - last.x) / quantity,
          dy = (current.y - last.y) / quantity;

    Array.from({ length: quantity }).forEach((_, index) => {
        const x = last.x + dx * index,
              y = last.y + dy * index;
        createGlowPoint({ x, y });
    });
};

let lastPosition = { x: 0, y: 0 };

const movePersistentGlow = position => {
    persistentGlow.style.left = px(position.x);
    persistentGlow.style.top = px(position.y);
};

window.onmousemove = e => {
    const currentPosition = { x: e.clientX, y: e.clientY };
    movePersistentGlow(currentPosition);
    createGlow(lastPosition, currentPosition);
    lastPosition = currentPosition;
};

// Navbar toggle logic
let navbarVisible = false;
toggleNavbar.addEventListener("click", () => {
    if (navbarVisible) {
        navbar.style.top = "-120px"; // Hide navbar
    } else {
        navbar.style.top = "0"; // Show navbar
    }
    navbarVisible = !navbarVisible;
});

// Fonction pour fermer la navbar si on clique en dehors
document.addEventListener("click", (event) => {
    if (navbarVisible && !navbar.contains(event.target) && !toggleNavbar.contains(event.target)) {
        navbar.style.top = "-120px"; // Cache la navbar
        navbarVisible = false;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSectionId = link.getAttribute('data-section');
            const targetSection = document.getElementById(targetSectionId);

            // Ajoute la classe fade-out à la section active
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                // Ajoute fade-out à la section active
                activeSection.classList.add('fade-out');

                // Attends la fin de l'animation fade-out avant de changer de section
                activeSection.addEventListener('animationend', () => {
                    activeSection.classList.remove('active', 'fade-out');

                    // Affiche la nouvelle section avec l'animation fade-in
                    targetSection.classList.add('active', 'fade-in');

                    // Supprime la classe fade-in après l'animation
                    targetSection.addEventListener('animationend', () => {
                        targetSection.classList.remove('fade-in');
                    }, { once: true });
                }, { once: true });
            } else {
                // Si aucune section active, active directement la nouvelle
                targetSection.classList.add('active', 'fade-in');
                targetSection.addEventListener('animationend', () => {
                    targetSection.classList.remove('fade-in');
                }, { once: true });
            }
        });
    });
});