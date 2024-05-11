const bodyElement = document.querySelector("body");
let mousePos = [0, 0];
let bgGradientPos = [0, 0];
let lastFrameTime = performance.now();

bodyElement.addEventListener("mousemove",function(e){
    mousePos[0] = e.pageX;
    mousePos[1] = e.pageY;
})

function backgroundAnimation() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - lastFrameTime) / (1000 / 60);
    lastFrameTime = currentTime;

    const x = mousePos[0] / window.innerWidth * 100;
    const y = mousePos[1] / window.innerHeight * 100;
    bgGradientPos[0] += (x - bgGradientPos[0]) / 20 * deltaTime;
    bgGradientPos[1] += (y - bgGradientPos[1]) / 20 * deltaTime;
    bodyElement.style.background = `radial-gradient(circle at ${bgGradientPos[0]}% ${bgGradientPos[1]}%, #003, #001)`;
    requestAnimationFrame(backgroundAnimation);
}

backgroundAnimation()
