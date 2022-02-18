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
                    <button name="play" onclick="onPlayClicked();" >▶️</button>
                    <label for="play">play</label>
                    </div>
                    <div>
                    <button onclick="onUpdateValueType('percent')" >%</button>
                    <button onclick="onUpdateValueType('number')" >123</button>
                    </div>
                    <div>
                    <a class"save-to-computer" name:"save-to-computer"  href="#" onclick="downloadCanvas(this)" download="myphoto">🖬*</a>
                    
                    <button onclick="onSaveToGal()">🖬🖬</button>
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
    <button>add param</button>
    <div>
    <button class="theam-select">theam select</button>
    </div>
    `;

    const elParams = document.querySelector(".data-area");
    elParams.innerHTML = strHtml;

    setChartNameEventListener();
    // setChartTermsEventListener();
}

function onSaveToGal() {
    gChartsData.push(gChart);
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
    renderTerms();
}

function setChartNameEventListener() {
    let nameInputElem = document.getElementById("canvas-name");
    nameInputElem.addEventListener("input", function () {
        gChart.title = nameInputElem.value;
        drawChartName();
        // clearCanvas();
        // renderTerms();
    });
}

function onCharTitle(el) {
    console.log("e", el);
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

function saveToDownCanvas() {
    console.log("saveCanvas() is on  ");
    let dataURL = gCanvas.toDataURL();
}

function saveToGallery() {
    saveToStorage(CHARTS_KEY, gChart);
}

// function loadFromGallery() {
//     crrCart = loadFromStorage(CHARTS_KEY)

// }

function renderTerms(animationHeightPercent) {
    // console.log("type", type);
    let termMaxHeight = (gChart.termMaxHeight * animationHeightPercent) / 100;

    switch (gChart.theme) {
        case "bars":
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
                    console.log("gCtx.fillStyle", gCtx.fillStyle);
                    gCtx.stroke();
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
                    gCtx.stroke();
                });
            }

            break;
        case "baloons":
            console.log("switch baloons");
            // gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
            drawAxisSystem();
            drawChartName();
            renderCircals();
            break;
    }
}

function renderCircals(animationMaxHeight) {
    let termMaxHeight = gChart.termMaxHeight * animationMaxHeight;

    gChart.terms.forEach((term, idx) => {
        let xStartCalc = gChart.chartWidth / gChart.maxTermsInChart;
        console.log(xStartCalc);
        term.x = 10 + idx * xStartCalc + term.value;
        term.y =
            gChart.valueType == "number"
                ? gCanvas.height - term.value
                : gCanvas.height - (termMaxHeight * term.value) / 100;

        let aixNursemaidsY = gChart.axisesStart.y - gChart.chartHeight;
        console.log("aixNursemaidsY", aixNursemaidsY);
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

        gCtx.beginPath();
        gCtx.moveTo(term.x + gChart.axisesStart.x, gCanvas.height - 50);
        gCtx.lineTo(term.x + gChart.axisesStart.x, term.y - aixNursemaidsY);
        gCtx.strokeStyle = term.color;
        gCtx.stroke();
    });
}

function saveCanvas() {
    console.log("saveCanvas() is on  ");
    let dataURL = gCanvas.toDataURL();
}

function resizeCanvas() {
    var elContainer = document.querySelector(".canvas-erea");
    gCanvas.width = elContainer.offsetWidth;
    // gCanvas.height = elContainer.offsetHeight;
    console.log("elContainer", elContainer.offsetWidth);
    renderChartEditor();
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = `${gChart.title}`;
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
