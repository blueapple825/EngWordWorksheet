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
        let popup = window.open("", "_blank");
        popup.document.open();
        popup.document.write("<html><head><title>영단어 학습지</title><link href='worksheet.css' rel='stylesheet' type='text/css' /></head><body onload='window.print();close();'>");
        let pageCount = content.filter(line => line == "===").length;
        let lineNumber = 0;
        for(let i = 0; i < pageCount; i++) {
            popup.document.write("<div class='page'>")
            popup.document.write(`
                <center><h1>${filterXSS(content[lineNumber])}</h1></center>
                <div class="wordlist">
                    <div class="wordlist-left">
            `)
            popup.document.write("<p class='instruction'>주어진 영단어를 우리말로 바꾸시오.</p>");
            lineNumber+=2;
            while(content[lineNumber] != "---") {
                word = content[lineNumber];
                popup.document.write(`
                    <div class="wordlist-item">
                        <p>${filterXSS(word)}</p>
                        <div class="wordlist-item-answer"></div>
                    </div>
                `);
                lineNumber++;
            }
            lineNumber++;
            popup.document.write("</div>")
            popup.document.write("<div class='wordlist-right'>")
            popup.document.write("<p class='instruction'>주어진 단어를 영단어로 바꾸시오.</p>");
            while(content[lineNumber] != "===") {
                word = content[lineNumber];
                popup.document.write(`
                    <div class="wordlist-item">
                        <p>${filterXSS(word)}</p>
                        <div class="wordlist-item-answer"></div>
                    </div>
                `);
                lineNumber++;
            }
            lineNumber++;
            popup.document.write("</div></div>")
            popup.document.write("</div>")
        }
        popup.document.write("</body></html>");
        popup.document.close();
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
