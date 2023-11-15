import { NOTES } from "./notes";

/**
* @const {Array} | List of diatonic intervals
* Helps us convert semitones into diatonic intervals
* https://en.wikipedia.org/wiki/Interval_(music)
*/
export const DIATONIC = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7", "8", "b9", "9", "b10", "10", "11", "#11", "12", "b13", "13", "#13", "14"];

/** Get the number of ascending semitones between two notes firstNote and se secondNote.
* @param {String} firstNote | Required | a note
* @param {String} secondNote | Required | another note
* @return {int}	The number of ascending semitones between the two notes
*/
export function get(firstNote, secondNote) {
    let interval = NOTES.indexOf(secondNote) - NOTES.indexOf(firstNote);
    // When an octave is reached (0), the numbers begin again at 12
    if (interval < 0) {
        interval = (NOTES.length) + interval;
    }
    return interval;
}