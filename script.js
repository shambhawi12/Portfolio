
const h = document.querySelector("#h");
const b = document.body;
let zoom = -9; // starting zoom (vw)
let startDist = 0;
let isPinching = false;

// Handle rotation based on pointer
function base(e) {
    if (isPinching) return; // prevent rotation while pinching

    var x = e.pageX / window.innerWidth - 0.5;
    var y = e.pageY / window.innerHeight - 0.5;

    h.style.transform = `
        perspective(90vw)
        rotateX(${ y * 10  + 75}deg)
        rotateZ(${ -x * 25  + 45}deg)
        translateZ(${zoom}vw)
    `;
}

b.addEventListener("pointermove", base);

// Touch event handlers for pinch
function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

b.addEventListener("touchstart", (e) => {
    if (e.touches.length === 2) {
        startDist = getDistance(e.touches);
        isPinching = true;
    }
});

b.addEventListener("touchmove", (e) => {
    if (e.touches.length === 2 && isPinching) {
        const newDist = getDistance(e.touches);
        const diff = newDist - startDist;

        // Adjust zoom based on pinch distance
        zoom += diff * 0.01;
        zoom = Math.max(-20, Math.min(0, zoom)); // clamp between -20vw and 0vw
        startDist = newDist;

        // Update transform manually during pinch
        h.style.transform = `
            perspective(90vw)
            rotateX(75deg)
            rotateZ(45deg)
            translateZ(${zoom}vw)
        `;
    }
});

b.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) {
        isPinching = false;
    }
});

// Click to redirect
document.getElementById("tvBox").addEventListener("click", function () {
    window.location.href = "index2.html";
});




