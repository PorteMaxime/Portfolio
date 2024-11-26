const container = document.getElementById("magic-mouse-container"),
      persistentGlow = document.getElementById("persistent-glow");

const config = {
    glowDuration: 75,
    maximumGlowPointSpacing: 10
};

const px = value => `${value}px`;

const createGlowPoint = position => {
    const glow = document.createElement("div");
    glow.className = "glow-point";
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