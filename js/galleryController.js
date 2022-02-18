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

function renderMyGifs() {
    var strHtml = gChartsData.map((savedChart, index) => {
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
    // onclick="onImgClick('${savedChart.name}')
}
function onImgClick(shapeName, index, galleryType) {
    if (galleryType === "mygifs") {
        gChart = gChartsData[index];
        toggleEditor(true);
        toggleGallery(false);
        createChart(shapeName);
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
}
function toggleEditor(isShow) {
    const elEditor = document.querySelector(".editor-container");
    elEditor.style.display = isShow ? "flex" : "none";
}

function toggleGallery(isShow) {
    const elGallery = document.querySelector(".general-page");
    elGallery.style.display = isShow ? "grid" : "none";
}
