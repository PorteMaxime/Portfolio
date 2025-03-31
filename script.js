var primaryMouseButtonDown = false;

for(const text of document.querySelectorAll(".bouncing-letters")) {
    const letters = text.textContent.split("");

    text.innerHTML = "";

    letters.forEach((letter, index) => {
        const span = document.createElement("span");

        span.className = "modal-action-text-letter";

        span.style.animationDelay = `${index * 150}ms`;
        span.style.animationDuration = `${(letters.length * 200) + 2000}ms`;

        if (letter == " ") {
            letter = '&nbsp;'
        }
        span.innerHTML = letter;

        text.appendChild(span);
    });
}

var persistentGlowRGBUp = '220 220 220';
var persistentGlowRGBDown = '100 100 100';

function setPrimaryButtonState(e) {
  var flags = e.buttons !== undefined ? e.buttons : e.which;
  primaryMouseButtonDown = (flags & 1) === 1;
  
    if (primaryMouseButtonDown == false) {
        document.documentElement.style.setProperty('--persistent-glow-color', 'rgb('+persistentGlowRGBUp+')');
    } else {
        document.documentElement.style.setProperty('--persistent-glow-color', 'rgb('+persistentGlowRGBDown+')');
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
        navbar.style.top = "-155px";
    } else {
        navbar.style.top = "0";
    }
    navbarVisible = !navbarVisible;
});

// Fonction pour fermer la navbar si on clique en dehors
document.addEventListener("click", (event) => {
    if (navbarVisible && !navbar.contains(event.target) && !toggleNavbar.contains(event.target)) {
        navbar.style.top = "-155px";
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

            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
               
                activeSection.classList.add('fade-out');

                activeSection.addEventListener('animationend', () => {
                    activeSection.classList.remove('active', 'fade-out');

                    targetSection.classList.add('active', 'fade-in');

                    targetSection.addEventListener('animationend', () => {
                        targetSection.classList.remove('fade-in');
                    }, { once: true });
                }, { once: true });
            } else {
               
                targetSection.classList.add('active', 'fade-in');
                targetSection.addEventListener('animationend', () => {
                    targetSection.classList.remove('fade-in');
                }, { once: true });
            }
        });
    });
});

// Récupérer toutes les cartes
const cards = document.querySelectorAll('.card');

// Vérifier si les boutons ont déjà été générés
// if (document.getElementById('filter-div').children.length === 0) {
   
//     const uniqueCategories = new Set();
//     cards.forEach(card => {
//         const categories = Array.from(card.querySelectorAll('.catégorie-carte')).map(el => el.textContent.trim());
//         categories.forEach(category => uniqueCategories.add(category));
//     });

//     const filterButtonsContainer = document.getElementById('filter-div');
//     uniqueCategories.forEach(category => {
//         const button = document.createElement('button');
//         button.classList.add('filter-btn');
//         button.setAttribute('data-category', category);
//         button.textContent = category;
//         filterButtonsContainer.appendChild(button);
//     });
// }

// Suivre les catégories sélectionnées
let activeFilters = new Set();

// Ajouter le comportement des boutons
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        if (button.classList.contains('active')) {
            activeFilters.delete(category); 
        } else {
            activeFilters.add(category); 
        }

        button.classList.toggle('active');

        cards.forEach(card => {
            // console.log(Array.from(card.querySelectorAll('[data-category]')).map(el => el.textContent.trim()));
            const categories = Array.from(card.querySelectorAll('[data-category]')).map(el => el.getAttribute('data-category').trim());
            console.log(categories);
            // const categories = Array.from(card.querySelectorAll('.catégorie-carte')).map(el => el.textContent.trim());

            const matchesAllFilters = Array.from(activeFilters).every(filter => categories.includes(filter));
            console.log(matchesAllFilters);

            if (matchesAllFilters || activeFilters.size === 0) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const popups = document.querySelectorAll('.popup');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Associer chaque carte à son popup
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const popupId = card.getAttribute('data-id');
            const popup = document.getElementById(popupId);

            if (popup) {
                popup.classList.add('show');
                popup.classList.remove('hide');
            }
        });
    });

    // Fermer les popups lorsqu'on clique sur le bouton "X"
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            popup.classList.add('hide');
            popup.classList.remove('show');
        });
    });

    // Fermer les popups si on clique en dehors
    window.addEventListener('click', (event) => {
        popups.forEach(popup => {
            if (event.target === popup) {
                popup.classList.add('hide');
                popup.classList.remove('show');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const popups = document.querySelectorAll('.popup');

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.target.id === 'section-Projets' && mutation.target.classList.contains('active')) {
                popups.forEach(popup => {
                    popup.classList.remove('show', 'hide');
                });
            }
        });
    });

    // Observer les changements de classes sur les sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section, { attributes: true, attributeFilter: ['class'] });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "./icones fond/user-solid.svg",
        "./icones fond/wand-sparkles-solid.svg",
        "./icones fond/book-solid.svg",
        "./icones fond/pen-solid.svg",
        "./icones fond/folder-regular.svg",
        "./icones fond/python-brands-solid.svg",
        "./icones fond/stack-overflow-brands-solid.svg",
        "./icones fond/file-solid.svg",
        "./icones fond/magnifying-glass-solid.svg",
        "./icones fond/briefcase-solid.svg",
        "./icones fond/star-regular.svg",
    ];

    const container = document.getElementById("images-pattern");
    container.innerHTML = ""; // Vider le contenu existant avant d'ajouter les images

    const spacingX = 120; // Espacement horizontal entre les images


    const cols = 20; // Nombre de colonnes nécessaires
    const rows = 9; // Nombre de lignes nécessaires

    for (let row = 0; row < rows; row++) {
        // Choisir l'image selon l'ordre dans le tableau, en répétant les images
        const imageIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[imageIndex];

        for (let col = 0; col < cols + 1; col++) {
            const img = document.createElement("img");
            img.src = randomImage; // Utiliser la même image pour toute la ligne
            img.classList.add("pattern-image");

            // Placer les images en diagonale vers la droite (en fonction du row)
            img.style.left = `${col * 6 + (row % 2 * 3)}%`;
            img.style.top = `${row * 11}%`; // Décalage par ligne

            container.appendChild(img);
        }
    }
});
