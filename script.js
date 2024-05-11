const bodyElement = document.querySelector("body");
const fileInput = document.getElementById("fileUpload");
let mousePos = [0, 0];
let bgGradientPos = [0, 0];
let lastFrameTime = performance.now();

bodyElement.addEventListener("mousemove",function(e){
    mousePos[0] = e.pageX;
    mousePos[1] = e.pageY;
})

fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const content = reader.result.replace(/\r/g, "").split("\n");
        console.log(content);
    }
    reader.readAsText(selectedFile);
};

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
