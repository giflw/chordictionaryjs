import { Instrument } from "@scripts/chordictionary.js";

let instrument = new Instrument("EADGBE", 5, 5, 4);
document.querySelectorAll(".chords > *").forEach( el => {
    const name = el.innerText;
    const tab = instrument.getChordsList(name, 1, 0).chordList[0]?.tab.join("");
    el.innerHTML = tab + instrument.getChordLayout( tab, { name });
});
