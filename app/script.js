const object = document.getElementById("moving-object");

function update() {
    const newPos = Math.floor(Math.random() * (90 - 5 + 1) + 5);
    object.style.top = `${newPos}vh`;

    // resets animation
    object.style.animation = 'none';
    object.offsetWidth;
    object.style.animation = 'moveAcross 5s linear';
}

object.addEventListener('animationend', update); 