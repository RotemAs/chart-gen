"use strict";
var testCounterBar = 0;
var testCounterB = 0;
function init() {
    doTrans();
    toggleEditor(false);
    renderGallery();
    renderMyGifs();
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
    // clearCanvas();
    let currentPercent = 1;
    const id = setInterval(() => {
        currentPercent++;
        // deleteTermsDrawing();
        clearCanvas();
        renderChartEditor(currentPercent);
        if (currentPercent >= 100) {
            clearInterval(id);
        }
    }, 10);
}

function numsCalk() {
    if (gChart.valueType == "percent") return;
    console.log("Test");
    let termCounter = 0;
    let termTotal = 0; //2000
    gChart.terms.forEach((term) => {
        termCounter++;
        // console.log("termCounter", termCounter);
        termTotal += term.value;
        // console.log("term.value", term.value, "termTotal", termTotal);
    });
    let unit = 100 / termTotal;
    // 500 500 600 400
    gChart.terms.forEach((term) => {
        term.value = term.descriptionValue * unit;
        console.log(
            "term.value",
            term.value,
            "term.descriptionValue",
            term.descriptionValue,
            "\n termTotal",
            termTotal,
            "unit",
            unit
        );
    });

    // return unit;
}

// servise
var gSortBy = "name";

function setSort(list, sortBy = "name") {
    gifsSortedData = gChartsData;
    gSortBy = sortBy;
    console.log("setSort");
    switch (gSortBy) {
        case "name":
            // key = sortBy
            var comparison = 0;
            list.sort(function (chart1, chart2) {
                if (chart1.name > chart2.name) {
                    comparison = 1;
                } else if (chart1.name < chart2.name) {
                    comparison = -1;
                }

                return comparison;
            });
            break;
        case "date":
            console.log("date");
            break;
    }
}

function OnMySavedCharts() {
    // let el = document.querySelector(".creat-charts-gallery");
    // el.style.display = "none";
}
