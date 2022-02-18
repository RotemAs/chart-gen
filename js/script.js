"use strict";

function init() {
    renderGallery();
    toggleEditor(false);
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

function reset() {
    gCtx.restore();
}

function deleteTermsDrawing() {
    gCtx.clearRect(
        gChart.axisesStart.x,
        gChart.axisesStart.y - gChart.chartHeight,
        gChart.chartWidth,
        gChart.chartHeight
    );
}

// 250, 50;
function deleteTitleDrawing() {
    gCtx.strokeStyle = "green";
    gCtx.clearRect(
        // gCtx.rect(
            gChart.axisesStart.x, 0, gChart.chartWidth, 100);

    gCtx.stroke();
}

function onPlayClicked() {
    deleteTermsDrawing();
    let currentPercent = 1;
    const id = setInterval(() => {
        currentPercent++;
        renderChart(currentPercent);
        if (currentPercent >= 100) {
            clearInterval(id);
        }
    }, 10);
}

// function OnCnavasChenge(canvasType) {
//     switch (gShape) {
//         case "bars":
//             console.log("test100");
//             drawAxisSystem();
//             drawBars();
//             break;
//         case "baloons":
//             drawAxisSystem();
//             drawCircals();
//     }

// drawAxisSystem(
//     gChart.axisesStart.x,
//     gChart.axisesStart.y,
//     gChart.chartWidth,
//     gChart.chartHeight
// );

// console.log("TTTgCanvas", gCanvas, " \n gCtx", gCtx);
// drawCircals();
// drawBars();
// }
