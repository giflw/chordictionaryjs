import { _describe, _it } from "./support/jasmine-defs.js";

import { chords } from "./chords.js";
import {
    Instrument,
    tuning,
    isValidTab,
    isValidTuning,
    notes as _notes,
    parseTuning,
    parseTab,
    parseChord
} from "../src/js/chordictionary.js";

import chai from "chai";
import { WORDING } from "../src/js/wordings.js";

chai.config.showDiff = true;

const assert = chai.assert;

var guitar = new Instrument(tuning.guitar.standard.join(""), 24, 5, 4);


_describe("chordictionary tests", () => {
    _it("chordictionary.isValidTab()", () => {
        assert.ok(isValidTab("x32010") === true, "x32010 is a valid tab.");
        assert.ok(isValidTab("911111099") === true, "911111099 is a valid tab (['9','11','11','10','9','9']).");
        assert.ok(isValidTab("x3201A") === false, "x3201A is not a valid tab.");
        assert.ok(isValidTab("x 3 2 0 1 0") === true, "'x 3 2 0 1 0' is a valid tab.");
        assert.ok(isValidTab("x 3 2 0 1 A") === false, "'x 3 2 0 1 A' is not a valid tab.");
    });

    _it("chordictionary.isValidTuning()", () => {
        assert.ok(isValidTuning("EADGBE") === true, "EADGBE is a valid tuning.");
        assert.ok(isValidTuning("D#G#C#F#A#D#") === true, "D# G# C# F# A# D# is a valid tuning.");
        assert.ok(isValidTuning("EbAbDbGbBbEb") === true, "Eb Ab Db Gb Bb Eb is a valid tuning.");
        assert.ok(isValidTuning("DA#DGA#D") === true, "DADGA#D is a valid tuning.");
        assert.ok(isValidTuning("EADGB2") === false, "EADGB2 is not a valid tuning.");
        assert.ok(isValidTuning("E A D G B E") === true, "'E A D G B E' is a valid tuning.");
        assert.ok(isValidTuning("E A D G B 2") === false, "'E A D G B 2' is not a valid tuning.");
    });

    _it("chordictionary.tuning", () => {
        assert.deepEqual(tuning.guitar.standard, ["E", "A", "D", "G", "B", "E"], "Guitar standard tuning is EADGBE.");
        assert.deepEqual(tuning.guitar.halfstepdown, ["D#", "G#", "C#", "F#", "A#", "D#"], "Guitar half-step down tuning is D#G#C#F#A#D#.");
        assert.deepEqual(tuning.guitar.open_g, ["G", "G", "D", "G", "B", "D"], "Guitar Open G tuning is GGDGBD.");
        assert.deepEqual(tuning.bass.standard, ["E", "A", "D", "G"], "Bass standard tuning is EADG.");
    });

    _it("chordictionary.notes", () => {
        assert.deepEqual(_notes, ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], "Found all 12 notes.");
    });

    _it("chordictionary.parseTuning", () => {
        assert.deepEqual(parseTuning("EADGBE"), ["E", "A", "D", "G", "B", "E"], "Parsing standard tuning.");
        assert.deepEqual(parseTuning("D#G#C#F#A#D#"), ["D#", "G#", "C#", "F#", "A#", "D#"], "Parsing tuning with sharps.");
        assert.deepEqual(parseTuning("eadgbe"), ["E", "A", "D", "G", "B", "E"], "Parsing standard tuning lowercase.");
        //assert.deepEqual(chordictionary.parseTuning("EbAbDbGbBbEb"), ["D#", "G#", "C#", "F#", "A#", "D#"], 'Parsing half-step down tuning with flats.');
        assert.ok(parseTuning("EADGBE2") === false, "EADGBE2 returns false as it cannot contains numbers.");
        assert.deepEqual(parseTuning("E A D G B E"), ["E", "A", "D", "G", "B", "E"], "Parsing standard tuning (spaced tab).");
        assert.ok(parseTuning("E A D G B E 2") === false, "'E A D G B E 2' returns false as it cannot contains numbers.");
    });

    _it("chordictionary.parseTab", () => {
        assert.deepEqual(parseTab("X32010"), ["x", "3", "2", "0", "1", "0"], "Parsing X32010.");
        assert.deepEqual(parseTab("x32010"), ["x", "3", "2", "0", "1", "0"], "Parsing x32010 (lowercase).");
        assert.deepEqual(parseTab("81010988"), ["8", "10", "10", "9", "8", "8"], "Parsing 81010988.");
        assert.deepEqual(parseTab("101212111010"), ["10", "12", "12", "11", "10", "10"], "Parsing 81010988.");
        assert.deepEqual(parseTab("X 3 2 0 1 0"), ["x", "3", "2", "0", "1", "0"], "Parsing 'X 3 2 0 1 0'.");
        assert.throws(() => parseTab("ABC123"), WORDING.invalidTab, "ABC123 throws an error as tab can only contains numbers or X.");
        assert.throws(() => parseTab("A B C 1 2 3"), WORDING.invalidTab, "'A B C 1 2 3' throws an error as tab can only contains numbers or X.");
    });

    _it("chordictionary.parseChord", () => {
        assert.deepEqual(parseChord("C"), ["C", ""], "Parsing C.");
        assert.deepEqual(parseChord("Cmin"), ["C", "min"], "Parsing Cm.");
        assert.deepEqual(parseChord("Cm"), ["C", "m"], "Parsing Cmin.");
        assert.deepEqual(parseChord("C#min7"), ["C#", "min7"], "Parsing C#min7.");
        assert.deepEqual(parseChord("C#m7"), ["C#", "m7"], "Parsing C#m7.");
        assert.deepEqual(parseChord("Cm9(Maj7)"), ["C", "m9(Maj7)"], "Parsing Cm9(Maj7).");
        assert.deepEqual(parseChord("Cm9(M7)"), ["C", "m9(M7)"], "Parsing Cm9(M7).");
        assert.deepEqual(parseChord("Cm9(7+)"), ["C", "m9(7+)"], "Parsing Cm9(7+).");
    });

    _it("guitar.getChordInfo() with " + chords.length + " chords", () => {
        for (let i = 0; i < chords.length; i++) {
            let raw_results = guitar.getChordInfo(chords[i].tab);
            let results = transform(raw_results);
            assert.ok(results.tab === chords[i].tab, "Testing tab " + chords[i].tab);
            assert.ok(results.notes === chords[i].notes, "Testing notes " + chords[i].notes);
            //console.log(chords[i][1].map(x => results[1].includes(x)));
            assert.includeMembers(results.names, chords[i].names, "Testing chord name(s) " + chords[i].names.join());
            //DELTE ME: assert.ok(chords[i].names.map(x => results.names.includes(x)).every(x => x === true), "Testing chord name(s) " + chords[i].names.join());
            //assert.deepEqual(results, chords[i], "getChordInfo(\"" + chords[i][0] + "\")");
        }
    });

    // transform the result obj into a proper array for testing
    function transform(results) {
        try {
            let names = [];
            let formula = [];
            let tab = results.tab.join("");
            let notes = results.notes.join("");

            for (let i = 0; i < results.chords.length; i++) {
                names.push(results.chords[i].name);
                formula.push(results.chords[i].formula);
            }
            return { tab, names, notes };
        }
        catch (e) {
            console.log(e);
        }
    }
});
