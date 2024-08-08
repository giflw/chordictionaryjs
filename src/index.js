import { Instrument, tuning } from "./main.js";

let instrument = new Instrument(tuning.ukulele.standard, 5, 5, 4);
document.querySelectorAll(".chords > *").forEach( el => {
    const name = el.innerText.split("=")[0].trim();
    let tab = el.innerText.split("=")[1]?.trim();
    if (!tab) {
        let tabs = instrument.getChordsList(name).named(name);
        
        tabs.sort((a, b) => {
            let ax = a.tab.filter(f => f == "x").length;
            let bx = b.tab.filter(f => f == "x").length;
            const byXCount = ax > bx ? 1 : (ax < bx ? -1 : 0);
            ax = a.tab.map((el, idx) => el == "x" ? idx : 0).reduce((p, c) => p + c);
            bx = b.tab.map((el, idx) => el == "x" ? idx : 0).reduce((p, c) => p + c);
            const byXCountAndXString = byXCount != 0 ? byXCount : (ax > bx ? 1 : (ax < bx ? -1: 0));
            ax = a.tab.map((el, idx) => el == "x" ? idx : el).reduce((p, c) => p + c);
            bx = b.tab.map((el, idx) => el == "x" ? idx : el).reduce((p, c) => p + c);
            const byXCountAndXStringAndHandProcimity = byXCountAndXString != 0 ? byXCountAndXString : (ax > bx ? 1 : (ax < bx ? -1: 0));
            return byXCountAndXStringAndHandProcimity;
        });
        tabs = tabs.filter( tab => {
            const freqs = tab.tab.reduce(function (acc, curr) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
            }, {0: 0, x: 0});
            // probably impossible bars
            if (freqs[1] > 2 && freqs[0] > 0 && (freqs["x"] == 0 || tab.tab[0] != "x")) {
                return false;
            }
            if (freqs[0] == 0 && freqs[1] >= 2) {
                return true;
            }
            if (tab.tab.filter(f => f != "x" && f != 0).length <= 4) {
                return true;
            }
            return false;
        });
        tab = tabs[0]?.tab;
    }
    if (tab?.length > 0) {
        el.innerHTML = instrument.getChordLayout( tab, instrument.getChordInfo(tab).first());
        // el.innerHTML = name + " | " + tab + " | " + JSON.stringify(instrument.getChordInfo(tab).first())
    }
});
