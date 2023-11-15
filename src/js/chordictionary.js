/**Chordictionary v0.1.0-beta.4, @license MIT, (c) 2019 Hubert Fauconnier + contributors*/

import "@styles/main.scss";

import { NOTES } from "./notes";
import * as CHORD from "./chords";
import * as TUNING from "./tuning";
import * as TAB from "./tab";
import { Instrument } from "./instrument";

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
