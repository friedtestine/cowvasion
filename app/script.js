function spawn() {
    let object = document.createElement('div');
    object.classList.add('moving-box');
    document.body.appendChild(object);

    object.addEventListener('animationend', () => update(object));

    update(object);
}

function update(object) {
    const newPos = Math.floor(Math.random() * (90 - 5 + 1) + 5);
    object.style.top = `${newPos}vh`;

    const duration = Math.random() * 10 + 2;

    // resets animation
    object.style.animation = 'none';
    object.offsetWidth;
    object.style.animation = `moveAcross ${duration}s linear`;
}

for (let i = 0; i < 100; i++) {
    spawn();
}
