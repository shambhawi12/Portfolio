const h = document.querySelector("#h");
const b = document.body;

function base(e) {
  let x, y;

  if (e.touches) {
    // Touch event
    x = e.touches[0].clientX / window.innerWidth - 0.5;
    y = e.touches[0].clientY / window.innerHeight - 0.5;
  } else {
    // Pointer or mouse
    x = e.pageX / window.innerWidth - 0.5;
    y = e.pageY / window.innerHeight - 0.5;
  }

  h.style.transform = `
    perspective(90vw)
    rotateX(${y * 10 + 75}deg)
    rotateZ(${-x * 25 + 45}deg)
    translateZ(-9vw)
  `;
}

// Desktop & pointer support
b.addEventListener("pointermove", base);
// Mobile & touch support
b.addEventListener("touchmove", base);


b.addEventListener("pointermove", base);

  document.getElementById("tvBox").addEventListener("click", function () {
    window.location.href = "index2.html";
  });


