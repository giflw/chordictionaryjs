import * as chordictionary from "@scripts/main.js";

let myInstrument = new chordictionary.Instrument("EADGBE", 24, 7, 4);
let chordLayout = myInstrument.getChordLayout("XX0232", { name: "C Major", notes:["x", "C", "E", "G", "C", "E"] });
document.querySelector(".chords").innerHTML = chordLayout;