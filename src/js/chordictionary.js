/**Chordictionary v0.1.0-beta.4, @license MIT, (c) 2019 Hubert Fauconnier + contributors*/

import { NOTES } from "./notes.js";
import * as CHORD from "./chords.js";
import * as TUNING from "./tuning.js";
import * as TAB from "./tab.js";
import { Instrument } from "./instrument.js";

const isValidTab = TAB.isValid;
const isValidTuning = TUNING.isValid;
const parseTuning = TUNING.parse;
const parseTab = TAB.parse;
const parseChord = CHORD.parse;
const tuning = TUNING.GET;
const notes = NOTES;

export { 
    Instrument,
    isValidTab, 
    isValidTuning,
    parseTuning,
    parseTab,
    parseChord,
    tuning,
    notes
};
