var gTrans = {
    msg0: {
        en: "Create New Chart ",
        es: "Mis Cosas Por Hacer",
        he: "צור גרף חדש ",
    },
    mainTitle: {
        en: "My Chart Maker",
        es: "ES My Chart Maker",
        he: "מחולל הגרפים שלי ",
    },
    sort: {
        en: "sort",
        es: "ES sort",
        he: "מיון לפי  ",
    },
    search: {
        en: "Search",
        es: "ES Search",
        he: "חיפוש  ",
    },
    sortbyname: {
        en: "Name",
        es: "ES name",
        he: "שם  ",
    },
    sortbytime: {
        en: "Time Created",
        es: "ES Time Created",
        he: "זמן שנוצר   ",
    },
    myGifBtn: {
        en: "My Gallery",
        es: "ES My Gallery",
        he: "הגלריה שלי ",
    },
    editorPlay: {
        en: "Play",
        es: "ES Play",
        he: "נגן",
    },
    editorAddPram: {
        en: "Add Term",
        es: "ES Add Term",
        he: "הוסף משתנה ",
    },
    editorTheme: {
        en: "Theme Selection",
        es: "ES Theme Selection",
        he: "בחירת סוג דרף",
    },
};
var gCurrLang = "en";

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN";

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans.en;

    return txt;
}

function setLang(lang) {
    gCurrLang = lang;
}

function doTrans() {
    var els = document.querySelectorAll("[data-trans]");
    els.forEach((el) => {
        // console.dir(el)
        var transKey = el.dataset.trans;
        var txt = getTrans(transKey);
        if (el.nodeName === "INPUT") {
            // el.setAttribute('placeholder', txt)
            //THE SAME!
            el.placeholder = txt;
        } else el.innerText = txt;
    });
}
function onSetLang(lang) {
    setLang(lang);
    if (lang === "he") document.body.classList.add("rtl");
    else document.body.classList.remove("rtl");
    doTrans();
    // render();
}
