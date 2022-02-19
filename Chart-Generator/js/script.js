"use strict";

function init() {
    // renderHeder();
    doTrans();
    toggleEditor(false);
    renderGallery();
    renderMyGifs();
    // resizeCanvas();
}

var gBarWidth = 40;
var gCtx;
var gCanvas;

function renderChartBars() {
    renderTerms(gChart.valueType);
}

//Draws the bars according to the terms
function drawBars() {
    gCtx.save();
    renderChartBars();
}

// function reset() {
//     gCtx.restore();
// }

function deleteTermsDrawing() {
    //    gCtx.fillrect
    // gCtx.fillColor = "white";
    // gCtx.fillStyle = "#ffffff";
    // gCtx.fillRect(
    gCtx.clearRect(
        gChart.axisesStart.x,
        gChart.axisesStart.y - gChart.chartHeight,
        gChart.chartWidth,
        gChart.chartHeight
    );
}

// 250, 50;
function deleteTitleDrawing() {
    gCtx.fillStyle = "#00ff00";
    // gCtx.strokeStyle = "green";
    gCtx.clearRect(
        // gCtx.rect(
        gChart.axisesStart.x,
        0,
        gChart.chartWidth,
        100
    );

    gCtx.stroke();
}

function onPlayClicked() {
    deleteTermsDrawing();
    let currentPercent = 1;
    const id = setInterval(() => {
        currentPercent++;
        deleteTermsDrawing();
        renderChart(currentPercent);
        if (currentPercent >= 100) {
            clearInterval(id);
        }
    }, 10);
}

function numsCalk() {
    let termCounter = 0;
    let termTotal = 0; //2000
    gChart.terms.forEach((term) => {
        termCounter++;
        console.log("termCounter", termCounter);
        termTotal += term.value;
        console.log("term.value", term.value, "termTotal", termTotal);
    });
    let unit = 100 / termTotal;
    // 500 500 600 400
    gChart.terms.forEach((term) => {
        term.value = term.value * unit;
    });

    // return unit;
}
