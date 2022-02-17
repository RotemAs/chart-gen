"use strict";
console.log("test100");
// var crrthem =
// var crrChart;
const CHARTS_KEY = "cart-data";
var gValueType = "percent";

// "percent"  - "number"/ value;
// const SHAPES = [bars,balloons]
var SHAPES = [
    {
        id: "1",
        name: "bars",
        msg: "new chart - bar ",
        namePlaceHolder: "New Chart",
        imgUrl: "assets/gallery/barC.png",
    },
    {
        id: "2",
        name: "baloons",
        msg: "new chart - baloons ",
        namePlaceHolder: "New Chart",
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

    var chart = {
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
                label: "Puk",
                value: 50,
                color: "pink",
            },
            { label: "Muk", value: 35, color: "green" },
        ],
    };

    gChart = chart;
}

function addTerm() {}

function updateTerm(idx, term) {}
function removeTerm(idx) {}
