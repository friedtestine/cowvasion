const shardImages = [
    'assets/sprites/parts.webp',
    'assets/sprites/parts2.webp',
    'assets/sprites/parts3.webp',
];

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

function spawn() {
    let object = document.createElement('div');
    object.classList.add('moving-box');
    document.body.appendChild(object);

    object.addEventListener('animationend', (e) => {
        if (e.animationName == 'moveAcross') {
            update(object);
        }
    });
    // 'pointerdown' handles mouse, finger, and stylus.
    object.addEventListener('pointerdown', () => onClick(object));

    update(object);
}

function onClick(object) {
    const rect = object.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const speed = 300;

    shardImages.forEach((src) => {
        const shard = document.createElement('img');
        shard.src = src;
        shard.classList.add('shard');

        shard.style.left = `${centerX}px`;
        shard.style.top = `${centerY}px`;

        const angle = Math.random() * Math.PI * 2;
        const distance = 2000;

        const destinationX = Math.cos(angle) * distance;
        const destinationY = Math.sin(angle) * distance;

        shard.style.setProperty('--tx', `${destinationX}px`);
        shard.style.setProperty('--ty', `${destinationY}px`);
        shard.style.setProperty('--r', `${Math.random() * 720}deg`);

        const duration = distance / (speed + (Math.random() * 200));
        shard.style.animation = `explosion ${duration}s linear forwards`;

        document.body.appendChild(shard);
        shard.addEventListener('animationend', () => shard.remove());
    });

    const bloodCount = 20;
    for (let i = 0; i < bloodCount; i++) {
        createBlood(centerX, centerY);
    }
    
    object.remove();
    playSound("assets/sounds/squelch.mp3");
    // added spawn call to maintain count.
    spawn();
}

function createBlood(x, y) {
    const drop = document.createElement('div');
    drop.classList.add('blood-drop');

    drop.style.left = `${x}px`;
    drop.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 400 + Math.random() * 600;
    const speed = 600 + Math.random() * 200;

    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const duration = distance / speed;

    drop.style.setProperty('--tx', `${tx}px`);
    drop.style.setProperty('--ty', `${ty}px`);

    const delay = Math.random() * 0.1;
    drop.style.animation = `blood ${duration}s linear ${delay}s forwards`;

    document.body.appendChild(drop);
    drop.addEventListener('animationend', () => drop.remove());
}

function update(object) {
    // check object count
    console.log(document.querySelectorAll('.moving-box').length);

    // prevents crash; if object was clicked while animation was ending. 
    if (!document.body.contains(object)) return;

    const newPos = Math.floor(Math.random() * (90 - 5 + 1) + 5);
    object.style.top = `${newPos}vh`;

    const duration = Math.random() * 10 + 5;

    // resets animation.
    object.style.animation = 'none';
    object.offsetWidth;
    // add both animations so none is overwritten.
    object.style.animation = `moveAcross ${duration}s linear, sprite-play 0.5s steps(4) infinite`;
}

// sets amount of objects spawned. run once. 
for (let i = 0; i < 20; i++) {
    spawn();
}
