"use strict";
// for start need to present two sample charts.
function renderGallery() {
    // crate new chert

    var strHtml = SHAPES.map((shape) => {
        return `
        <div>
        <img class="gallery-img ${shape.name}" src="${shape.imgUrl}" onclick="onImgClick('${shape.name}','0','new-shape')">
        <div class="chart-title chart-title-${shape.name}">${shape.msg}</div>
        </div>
        `;
    });
    const elGallery = document.querySelector(".gallery-container");
    strHtml = strHtml.join("");
    elGallery.innerHTML = strHtml;

    ///load from storage saved carts  //
}
//"byName"
function renderMyGifs(searchWord = "", sortType = "sort") {
    let gifsData;
    if (!searchWord) gifsData = gChartsData;
    else if (sortType === "sort") gifsData = getSortBySearchGifSort(searchWord);
    else gifsData = getSortBySearchGif(searchWord);
    var strHtml = gifsData.map((savedChart, index) => {
        return `
       <div onc>
        <img class="saved-gallery-img saved-gallery-img-${savedChart.theme}" src="./assets/gallery/circals.svg" onclick="onImgClick('${savedChart.theme}','${index}','mygifs') " >
        <div class="saved-chart-title saved-chart-title-${savedChart.theme}">${savedChart.title}</div>
        </div>
        `;
    });
    const elGallery = document.querySelector(".saved-charts-gallery");
    strHtml = strHtml.join("");
    elGallery.innerHTML = strHtml;
}

function loadChart(index) {
    gChart = gChartsData[index];
    gCanvas = document.getElementById("canvas");
    gCtx = gCanvas.getContext("2d");

    renderChartEditor();
}

function onImgClick(shapeName, index, galleryType) {
    if (galleryType === "mygifs") {
        gChart = gChartsData[index];
        toggleEditor(true);
        toggleGallery(false);
        // doTrans();
        // createChart(shapeName)
        loadChart(index);
        renderChartEditor();
    } else {
        console.log("onImgClick shapeName:", shapeName);
        switch (shapeName) {
            case "bars":
                console.log("switch bars");
                toggleEditor(true);
                toggleGallery(false);
                createChart(shapeName);
                // drawBars();
                renderChartEditor();

                break;
            case "baloons":
                toggleEditor(true);
                toggleGallery(false);
                createChart(shapeName);
                // drawAxisSystem();
                // renderCircals();
                renderChartEditor();

                break;
        }
    }
}

function onTitleClick() {
    toggleEditor(false);
    toggleGallery(true);
    clearCanvas();
    renderMyGifs();
}
function toggleEditor(isShow) {
    const elEditor = document.querySelector(".editor-container");
    elEditor.style.display = isShow ? "flex" : "none";
}

function toggleGallery(isShow) {
    const elGallery = document.querySelector(".general-page");
    elGallery.style.display = isShow ? "grid" : "none";
}
