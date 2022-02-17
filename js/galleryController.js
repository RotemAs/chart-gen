"use strict";
// for start need to present two sample charts.
function renderGallery() {
    // crate new chert

    var strHtml = SHAPES.map((shape) => {
        return `
        <div>
        <img class="gallery-img ${shape.name}" src="${shape.imgUrl}" onclick="onImgClick('${shape.name}')">
        <div class="chart-title chart-title-${shape.name}">${shape.msg}</div>
        </div>
        `;
    });
    const elGallery = document.querySelector(".gallery-container");
    strHtml = strHtml.join("");
    elGallery.innerHTML = strHtml;

    ///load from storage saved carts  //
}

function onImgClick(shapeName) {
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

function onTitleClick() {
    toggleEditor(false);
    toggleGallery(true);
}
function toggleEditor(isShow) {
    const elEditor = document.querySelector(".editor-container");
    elEditor.style.display = isShow ? "flex" : "none";
}

function toggleGallery(isShow) {
    const elGallery = document.querySelector(".creat-charts-gallery");
    elGallery.style.display = isShow ? "block" : "none";
}
