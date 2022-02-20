"use strict";

var testCounterB = 1;
var testCounterBar = 1;

const CHARTS_KEY = "cart-data";
const MAX_TERMS = 4;

var gValueType = "percent";
var SHAPES = [
    {
        id: "1",
        name: "bars",
        msg: "new chart - bar ",
        namePlaceHolder: `New Chart bars ${testCounterBar} `,
        imgUrl: "assets/gallery/barC.png",
    },
    {
        id: "2",
        name: "baloons",
        msg: "new chart - baloons ",
        namePlaceHolder: `New Chart baloons ${testCounterB} `,
        imgUrl: `assets/gallery/circals.svg`,
    },
];

var gChart;
var gShape = "bars";
var crrCharType;

function createChart(chartType) {
    gCanvas = document.getElementById("canvas");
    gCtx = gCanvas.getContext("2d");
    let canvasWidth = gCanvas.getAttribute("width");
    let canvasHeight = gCanvas.getAttribute("height");

    crrCharType = SHAPES.find((shape) => shape.name === chartType);

    gChart = {
        theme: crrCharType.name,
        title: crrCharType.namePlaceHolder,
        style: {
            font: "Arial",
            fontSize: "45px",
            backgroundColor: "transparent",
        },
        chartWidth: canvasWidth - 100,
        chartHeight: canvasHeight - 100,
        termMaxHeight: canvasHeight - 130,
        maxTermsInChart: 4,
        axisesStart: { x: 50, y: canvasHeight - 50 },
        valueType: gValueType,
        terms: [
            {
                label: "New Term 1",
                value: 50,
                color: "pink",
                descriptionValue: 50,
            },
            {
                label: "New Term 2",
                value: 35,
                color: "green",
                descriptionValue: 35,
            },
        ],
        keywords: ["test1", crrCharType.namePlaceHolder],
        created: new Date(),
        termsCounter: 2,
    };
}

function saveStat() {
    gChartsData.push(gChart);
    testCounterBar++;
    testCounterB++;
}

function saveToGallery() {
    saveToStorage(CHARTS_KEY, gChart);
}

function saveCanvas() {
    // console.log("saveCanvas() is on  ");
    let dataURL = gCanvas.toDataURL();
}
function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    elLink.download = `${gChart.title}`;
}
