"use strict";

var gChartsData = loadFromStorage(CHARTS_KEY) || [];

function renderChartEditor() {
    renderEditor();
    renderChart(100);
}

function renderChart(animationHeightPercent) {
    renderTerms(animationHeightPercent);
}

function renderEditor() {
    console.log("gChart is: ", gChart);
    var strHtml = `<input id="canvas-name" class="insert-text"    type="text"   placeholder="${gChart.title}"  />
                <div class="canvas-controls">
                    <div>
                    <button name="play"   onclick="onPlayClicked();" >▶️</button>
                    <label for="play" data-trans="editorPlay" >play</label>
                    </div>
                    <div>
                    <button onclick="onUpdateValueType('percent')" >%</button>
                    <button onclick="onUpdateValueType('number')" >123</button>
                    </div>
                    <div>
                    <a class"save-to-computer" name:"save-to-computer"  href="#" onclick="onDawnCanvas(this)" download="myphoto">🖬*</a>
                    
                    <button onclick="onSaveToGal()">🖬🖬</button>
                    <button onclick="ondrawbackimg()">back img </button>
                    <button onclick="fBupload()" class"fbDown">FB upload</button>
                    </div>
                </div>
                <div class="params area">
                    <section class="param-container">
                        `;
    for (var i = 0; i < gChart.terms.length; i++) {
        strHtml += `<div class="term term${i}">
                <input type="color"   id="gchart-input-color-${i}" onchange="setInputValue('color', ${i})" placeholder="${gChart.terms[i].color}" />
        <input type="term" placeholder="${gChart.terms[i].label}" id="gchart-input-label-${i}" onchange="setInputValue('label', ${i})"/>
        <input type="number" class="gchart-input-value" id="gchart-input-value-${i}" onchange="setInputValue('value', ${i})" placeholder="${gChart.terms[i].value}" />
        </div>
        `;
    }
    strHtml += `
    <button onclick="onAddTerm()" data-trans="editorAddPram"></button>
    <div>
    <button class="theam-select" data-trans="editorTheme" >theam select</button>
    </div>
    `;

    const elParams = document.querySelector(".data-area");
    elParams.innerHTML = strHtml;

    setChartNameEventListener();
    doTrans();
}

function fBupload() {
    document.querySelector(".fbDown").innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" 
		title="Share on Facebook" target="_blank" 
		onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}');
		return false;">
           Share   
        </a>`;
}

function ondrawbackimg() {
    let backgroundImg = new Image();
    backgroundImg.src = "assets/img/17.jpg";
    backgroundImg.onload = function () {
        gCtx.drawImage(backgroundImg, 50, 50);
        renderChartEditor();
    };
}

function onSaveToGal() {
    saveStat();
    saveToStorage(CHARTS_KEY, gChartsData);
}

function setInputValue(type, id) {
    let elem;
    clearCanvas();
    switch (type) {
        case "value":
            elem = document.getElementById(`gchart-input-value-${id}`);
            gChart.terms[id].value = +elem.value;
            break;
        case "color":
            elem = document.getElementById(`gchart-input-color-${id}`);
            gChart.terms[id].color = elem.value;
            break;
        case "label":
            elem = document.getElementById(`gchart-input-label-${id}`);
            gChart.terms[id].label = elem.value;
            break;
    }
    renderTerms(100);
}

function setChartNameEventListener() {
    let nameInputElem = document.getElementById("canvas-name");
    nameInputElem.addEventListener("input", function () {
        gChart.title = nameInputElem.value;
        deleteTitleDrawing();
        drawChartName();
        // clearCanvas();
        // renderTerms();
    });
}

function removeChartName() {
    gChart.title = "";
}

function drawChartName() {
    deleteTitleDrawing();
    if (!gChart.title) {
        return;
    }

    // gCtx.save();
    gCtx.font = `${gChart.style.fontSize} ${gChart.style.font}`;
    gCtx.textAlign = "center";
    gCtx.fillText(gChart.title, 250, 50, 300);
}

// function loadFromGallery() {
//     crrCart = loadFromStorage(CHARTS_KEY)

// }

function renderTerms(animationHeightPercent = 100) {
    // console.log("type", type);
    let termMaxHeight = (gChart.termMaxHeight * animationHeightPercent) / 100;

    switch (gChart.theme) {
        case "bars":
            console.log("renderTerms gCtx=", gCtx);
            drawAxisSystem();

            if (gChart.valueType === "percent") {
                gChart.terms.forEach((term, idx) => {
                    let xStartCalc = gChart.chartWidth / gChart.maxTermsInChart;
                    term.x = 10 + idx * xStartCalc;
                    term.y =
                        gCanvas.height - (termMaxHeight * term.value) / 100;

                    let rectSize = (termMaxHeight * term.value) / 100;
                    let aixNursemaidsY =
                        gChart.axisesStart.y - gChart.chartHeight;
                    console.log(rectSize);
                    gCtx.fillStyle = term.color;
                    gCtx.fillRect(
                        term.x + gChart.axisesStart.x,
                        term.y - aixNursemaidsY,
                        // 0,
                        // gBarWidth,
                        xStartCalc * 0.65,
                        rectSize
                    );
                    // test
                    // gCtx.fillStyle = "red";
                    // gCtx.fillRect(
                    //     term.x + gChart.axisesStart.x,
                    //     term.y - aixNursemaidsY - 50,
                    //     125 - 10,
                    //     40
                    // );
                    //term name
                    gCtx.font = `${gChart.style.fontSize * 0.8} ${
                        gChart.style.font
                    }`;
                    gCtx.textAlign = "center";
                    gCtx.fillText(
                        term.label,
                        term.x + gChart.axisesStart.x,
                        term.y - aixNursemaidsY - 20,
                        xStartCalc
                    );

                    // gCtx.stroke();
                });
            } else {
                // numbers
                gChart.terms.forEach((term, idx) => {
                    let xStartCalc = gChart.chartWidth / gChart.maxTermsInChart;
                    term.x = 10 + idx * xStartCalc;
                    term.y = term.value;

                    let rectSize = term.value;
                    let aixNursemaidsY =
                        gChart.axisesStart.y - gChart.chartHeight;
                    gCtx.fillStyle = term.color;
                    console.log("gCtx.fillStyle", gCtx.fillStyle);
                    gCtx.fillRect(
                        term.x + gChart.axisesStart.x,
                        gCanvas.height - rectSize - aixNursemaidsY,
                        xStartCalc * 0.65,
                        rectSize
                    );

                    //term name
                    gCtx.font = `${gChart.style.fontSize * 0.6} ${
                        gChart.style.font
                    }`;
                    gCtx.textAlign = "center";
                    gCtx.fillText(
                        term.label,
                        term.x + gChart.axisesStart.x + 10,
                        gCanvas.height - rectSize - aixNursemaidsY - 10,
                        xStartCalc
                    );

                    gCtx.stroke();
                });
            }

            break;
        case "baloons":
            console.log("switch baloons");
            // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
            console.log("case balloons renderTerms gCtx=", gCtx);
            drawAxisSystem();
            drawChartName();
            renderCircles();
            break;
    }
}

function renderCircles(animationMaxHeight) {
    numsCalk();
    let termMaxHeight = gChart.termMaxHeight * animationMaxHeight;

    gChart.terms.forEach((term, idx) => {
        let xStartCalc = gChart.chartWidth / gChart.maxTermsInChart;
        console.log(xStartCalc);
        term.x = 10 + idx * xStartCalc + term.value;
        term.y =
            gChart.valueType == "number"
                ? gCanvas.height - term.value
                : gCanvas.height - (gChart.termMaxHeight * term.value) / 100;

        let aixNursemaidsY = gChart.axisesStart.y - gChart.chartHeight;
        console.log("aixNursemaidsY", aixNursemaidsY);

        // drow circal
        gCtx.beginPath();
        gCtx.arc(
            term.x + gChart.axisesStart.x,
            term.y - aixNursemaidsY,
            term.value,
            0,
            2 * Math.PI
        );

        gCtx.lineWidth = 2;
        gCtx.strokeStyle = term.color;
        gCtx.stroke();
        gCtx.globalAlpha = term.value / 100;
        gCtx.fillStyle = term.color;
        gCtx.fill();
        // drow line
        gCtx.beginPath();
        gCtx.moveTo(term.x + gChart.axisesStart.x, gCanvas.height - 50);
        gCtx.lineTo(term.x + gChart.axisesStart.x, term.y - aixNursemaidsY);
        gCtx.strokeStyle = term.color;
        gCtx.stroke();
        // inner Text
        gCtx.beginPath();
        gCtx.fillRect(
            term.x + gChart.axisesStart.x,
            term.y - aixNursemaidsY,
            75,
            50
        );
        gCtx.fillStyle = "green";

        //term name
        // gCtx.font = `${gChart.style.fontSize * 0.6} ${gChart.style.font}`;
        // gCtx.textAlign = "center";
        // gCtx.fillText(
        //     term.label,
        //     term.x + gChart.axisesStart.x + 10,
        //     gCanvas.height - rectSize - aixNursemaidsY - 10,
        //     xStartCalc
        // );
    });
}

function onDawnCanvas(elLink) {
    downloadCanvas(elLink);
}

function resizeCanvas() {
    let canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth / 2;
    gChart.chartWidth = canvas.width - 100;
    renderChartEditor();
}

function drawAxisSystem() {
    gCtx.strokeStyle = "red";
    gCtx.rect(
        gChart.axisesStart.x,
        gChart.axisesStart.y - gChart.chartHeight,
        gChart.chartWidth,
        gChart.chartHeight
    );

    gCtx.stroke();
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onUpdateValueType(type) {
    gValueType = type;
    gChart.valueType = type;
    console.log(type);
    clearCanvas();
    renderChart(100);
    // createChart(crrCharType.name);
}

function onAddTerm() {
    let termNum = gChart.terms.length + 1;
    let label = "new Term " + termNum.toString();
    let newTerm = { label: label, value: 0, color: "pink" };
    gChart.terms.push(newTerm);
    renderChartEditor();
}

function onUpdateValueType(type) {
    gValueType = type;
    console.log(type);
    renderChart();
}
