"use strict";

function init() {
    renderGallery();
    toggleEditor(false);
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
