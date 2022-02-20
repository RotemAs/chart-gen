"use strict";
const BAR_IMG = "assets/gallery/barC.png";
const BALOON_IMG = "./assets/gallery/circals.svg";

var gKeyWordsMap = { new: 0 };
// var gGallery = [];
var gifsSortedData = [];

function renderSearch(val) {
    // console.log("renderSearch", val);
    renderMyGifs(val, "filter");
}

function renderSort(val) {
    // console.log("renderSort", val);
    if (val === "byName") {
        renderMyGifs(val, "sort");
    }
}

function getSortBySearchGif(searchWord) {
    let lowerCaseWord = searchWord.toLowerCase();

    if (gKeyWordsMap[lowerCaseWord] !== undefined) {
        gKeyWordsMap[lowerCaseWord]++;
    }

    gifsData = gChartsData.filter((gif) => {
        let words = gif.keywords;
        return words.some((word) => word.includes(lowerCaseWord));
    });
    return gifsData;
}

// function getSortBySearchGifSort(searchWord) {
//     let lowerCaseWord = searchWord.toLowerCase();

//     if (gKeyWordsMap[lowerCaseWord] !== undefined) {
//         gKeyWordsMap[lowerCaseWord]++;
//     }

//     let gifsData = gChartsData.sort((gif) => {
//         let words = gif.keywords;
//         return words.some((word) => word.includes(lowerCaseWord));
//     });
//     return gifsData;
// }
