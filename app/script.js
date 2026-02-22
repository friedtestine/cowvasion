function spawn() {
    let object = document.createElement('div');
    object.classList.add('moving-box');
    document.body.appendChild(object);

    object.addEventListener('animationend', () => update(object));
    // 'click' takes too long.
    object.addEventListener('mousedown', () => onClick(object));

    update(object);
}

function onClick(object){
    object.remove();
    // added spawn call to maintain count.
    spawn();
}

function update(object) {
    // prevents crash; if object was clicked while animation was ending. 
    if (!document.body.contains(object)) return;

    console.log(document.querySelectorAll('.moving-box').length);
    const newPos = Math.floor(Math.random() * (90 - 5 + 1) + 5);
    object.style.top = `${newPos}vh`;

    const duration = Math.random() * 10 + 5;

    // resets animation.
    object.style.animation = 'none';
    object.offsetWidth;
    object.style.animation = `moveAcross ${duration}s linear`;
}

// sets amount of objects spawned. run once. 
for (let i = 0; i < 20; i++) {
    spawn();
}
