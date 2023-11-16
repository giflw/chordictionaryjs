const d = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], T = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7", "8", "b9", "9", "b10", "10", "11", "#11", "12", "b13", "13", "#13", "14"];
function q(n, e) {
  let i = d.indexOf(e) - d.indexOf(n);
  return i < 0 && (i = d.length + i), i;
}
const N = {
  croppedChordLayout: "Number of frets does not allow full display of the chord.",
  failedToConvertTabIntoNotes: "Could not convert the tab into notes.",
  failedToCalculateFormula: "Could not calculate the formulas.",
  invalidTab: 'The tab should only be composed of "x" and numbers from 1 to 9.',
  invalidTuning: "The tuning doesn't seem right. It should only be composed of 1 or more letters from A to G.",
  invalidChordName: "The chord name doesn't seem right. A valid chord name could be Amin, C, Gsus4...",
  noMatch: "The tab didn't match any known chord."
}, P = [
  { formula: "1-3-5", integer: "0-4-7", name: "Major", suffix: "" },
  { formula: "1-3-5#", integer: "0-4-8", name: "Augmented", suffix: "aug" },
  { formula: "1-b3-b5", integer: "0-3-6", name: "Diminished", suffix: "dim" },
  { formula: "1-b3-5", integer: "0-3-7", name: "Minor", suffix: "m" },
  { formula: "1-b3-5-9", integer: "0-2-3-7", name: "Minor, added ninth", suffix: "m(add9)" },
  { formula: "1-3-4-5", integer: "0-4-5-7", name: "Added fourth", suffix: "add4" },
  { formula: "1-4-5", integer: "0-5-7", name: "Suspended fourth", suffix: "sus4" },
  { formula: "1-2-5", integer: "0-2-7", name: "Suspended second", suffix: "sus2" },
  { formula: "1-3-5-9", integer: "0-2-4-7", name: "Added ninth", suffix: "add9" },
  { formula: "1-3-b7", integer: "0-4-10", name: "Seventh", suffix: "7" },
  { formula: "1-3-5-b7", integer: "0-4-7-10", name: "Dominant seventh", suffix: "7" },
  { formula: "1-3-5-7", integer: "0-4-7-11", name: "Major seventh", suffix: "Maj7" },
  { formula: "1-b3-5-7", integer: "0-3-7-11", name: "Minor, major seventh", suffix: "m(Maj7)" },
  { formula: "1-b3-5-b7", integer: "0-3-7-10", name: "Minor seventh", suffix: "m7" },
  { formula: "1-b3-b5-b7", integer: "0-3-6-10", name: "Minor seventh, flat fifth", suffix: "m7b5" },
  { formula: "1-3-6", integer: "0-4-9", name: "Sixth", suffix: "6" },
  { formula: "1-b3-5-6", integer: "0-3-7-9", name: "Minor sixth", suffix: "m6" },
  { formula: "1-b3-5-b6", integer: "0-3-7-8", name: "Minor, flat sixth", suffix: "mb6" },
  { formula: "1-b3-5-6-9", integer: "0-2-3-7-9", name: "Minor sixth, added ninth", suffix: "m6/9" },
  { formula: "1-3-5-6", integer: "0-4-7-9", name: "Major Sixth", suffix: "Maj6" },
  { formula: "1-3-5-6-9", integer: "0-2-4-7-9", name: "Sixth, added ninth", suffix: "6/9" },
  { formula: "1-3-5-7-9", integer: "0-2-4-7-11", name: "Major ninth", suffix: "Maj9" },
  { formula: "1-b3-5-b7-9", integer: "0-2-3-7-10", name: "Minor ninth", suffix: "m9" },
  { formula: "1-b3-5-7-9", integer: "0-2-3-7-11", name: "Minor ninth, major seventh", suffix: "m9(Maj7)" },
  { formula: "1-b3-b5-b7-9", integer: "0-2-3-6-10", name: "Minor ninth flat fifth", suffix: "m9b5" },
  { formula: "1-3-5-7-9-11", integer: "0-4-5-11", name: "Major eleventh (no fifth, no ninth)", suffix: "Maj11" },
  { formula: "1-3-5-7-9-11", integer: "0-4-5-7-11", name: "Major eleventh (no ninth)", suffix: "Maj11" },
  { formula: "1-3-5-7-9-11", integer: "0-2-4-5-7-11", name: "Major eleventh", suffix: "Maj11" },
  { formula: "1-b3-5-b7-9-11-13", integer: "0-2-3-4-6-7-10", name: "Minor thirteen", suffix: "m13" },
  { formula: "1-3-5-b7-#11", integer: "0-4-6-7-10", name: "Seventh, sharp eleventh", suffix: "7#11" },
  { formula: "1-3-5-7-#11", integer: "0-4-6-7-11", name: "Major seventh, sharp eleventh", suffix: "Maj7#11" },
  { formula: "1-3-5-7-9-13", integer: "0-2-4-7-9-11", name: "Major thirteen", suffix: "Maj13" },
  { formula: "1", integer: "0", name: "Single note", suffix: "" },
  { formula: "1-5", integer: "0-7", name: "Power chord", suffix: "5" }
], k = {
  powerchord: ["5", "5 (powerchord)"],
  major: ["", "Major"],
  minor: ["m", "Minor"],
  sharp5: ["#5", "Sharp 5th"],
  sharp11: ["#11", "Sharp 11th"],
  aug5: ["aug", "Augmented"],
  // +5
  dim5: ["dim", "Diminished"],
  // -5
  flat5: ["b5", "Flat 5th"],
  flat9: ["b9", "Flat 9th"],
  doubleflat5: ["bb5", "Double Flat 5th"],
  sus2: ["sus2", "Suspended 2nd"],
  sus4: ["sus4", "Suspended 4th"],
  b6: ["b6", "Flat 6th"],
  add2: ["add2", "Added 2nd"],
  add4: ["add4", "Added 4th"],
  addflat5: ["addb5", "Added Flat 5th"],
  add9: ["add9", "Added 9th"],
  major9: ["Maj9", "Major 9"],
  nine: ["9", "9th"],
  six: ["6", "6th"],
  sixnine: ["6/9", "Six Added Ninth"],
  seven: ["7", "7th"],
  major7: ["Maj7", "Major 7th"],
  eleven: ["11", "11th"],
  thirteen: ["13", "13th"]
};
function R(n, e, i) {
  let t, r, l = {};
  for (let u = 0; u < n.length; u++)
    if (!isNaN(n[u])) {
      r = n[u] + d.indexOf(i[u]), r > d.length - 1 && (r = r - d.length);
      for (let s = 0; s < e.length; s++)
        l[d[r]] ? d[r] === d[s] && l[d[r]]++ : l[d[r]] = 1;
    }
  for (let u = 0; u < e.length; u++)
    if (e[u] in l)
      t = !0;
    else {
      t = !1;
      break;
    }
  return t;
}
function F(n) {
  let e, i;
  try {
    if (typeof n != "string")
      throw N.invalidChordName;
    return n.search("#") === -1 ? (e = n.charAt(0), i = n.slice(1)) : (e = n.slice(0, 2).toUpperCase(), i = n.slice(2)), [e, i];
  } catch {
    return !1;
  }
}
function B(n) {
  let e = n.map((s) => T[s]).filter((s) => s !== void 0), i = e.filter((s) => ["2"].includes(s)).length, t = {
    seven: e.some((s) => ["b7", "7"].includes(s)),
    third: e.some((s) => ["b3", "3"].includes(s)),
    fifth: e.some((s) => ["b5", "5", "#5"].includes(s)),
    majorNinth: e.includes("2") && !(!e.some((s) => ["b3", "3"].includes(s)) && i < 2)
  }, r = [
    { name: "powerchord", check: e.includes("5") && e.every((s) => ["1", "5"].includes(s)) },
    { name: "major", check: e.includes("3") && !e.some((s) => ["6", "4"].includes(s) || t.seven || t.majorNinth) },
    { name: "minor", check: e.includes("b3") },
    { name: "aug5", check: e.includes("#5") && e.includes("3") && !e.includes("5") },
    { name: "dim5", check: e.includes("b5") && e.includes("b3") && !e.includes("5") && !t.seven && !t.majorNinth },
    { name: "seven", check: e.includes("b7") && !e.some((s) => ["6", "b9", "9"].includes(s) || t.majorNinth) },
    { name: "major7", check: e.includes("7") && !e.some((s) => ["6", "4"].includes(s) || t.majorNinth) },
    { name: "major9", check: t.majorNinth && e.includes("7") && !e.includes("6") },
    { name: "six", check: e.includes("6") && !t.seven },
    { name: "nine", check: t.majorNinth && e.includes("b7") },
    { name: "eleven", check: e.includes("4") && t.seven && !e.includes("6") },
    { name: "thirteen", check: e.includes("6") && t.seven },
    { name: "add2", check: t.majorNinth && t.third && !t.seven && !e.includes("6") },
    { name: "add4", check: t.third && e.includes("4") && !t.seven },
    { name: "add9", check: t.majorNinth && t.third && !t.seven },
    { name: "sus2", check: e.includes("2") && !t.third },
    { name: "sus4", check: e.includes("4") && !t.third && !t.seven },
    { name: "sharp5", check: e.includes("#5") && !e.some((s) => ["5", "3"].includes(s)) },
    { name: "flat5", check: e.includes("b5") && !e.some((s) => ["5"].includes(s)) },
    { name: "addflat5", check: ["5", "b5"].every((s) => e.includes(s)) && !t.seven },
    { name: "sharp11", check: ["5", "b5"].every((s) => e.includes(s)) && t.seven },
    { name: "flat9", check: e.includes("b2") && t.third },
    { name: "b6", check: e.includes("#5") && e.includes("5") },
    { name: "doubleflat5", check: e.includes("4") && t.third && !t.fifth && !t.seven }
  ], l = {
    add2: "add9",
    seven: "eleven",
    nine: "eleven",
    minor: "dim5",
    flat5: "dim5",
    major: "aug5"
  }, u = r.filter((s) => s.check).map((s) => s.name);
  return u.length > 0 ? (u = u.filter((s) => !u.includes(l[s])), ["six", "add9"].every((s) => u.includes(s)) && (u.splice(u.indexOf("six"), 1), u[u.indexOf("add9")] = "sixnine"), {
    semitones: n,
    formula: e,
    qualityS: u.map((s) => k[s][0]),
    qualityL: u.map((s) => k[s][1])
  }) : !1;
}
function D(n) {
  return new RegExp("^[ #a-g]+$", "i").test(n);
}
function I(n) {
  n = n.trim();
  let e = [], i = new RegExp("^[ a-g]+$", "i"), t = new RegExp("^[ #a-g]+$", "i");
  if (n.includes(" ") && t.test(n))
    return n.split(" ");
  if (i.test(n))
    return n.toUpperCase().split("");
  if (t.test(n)) {
    n = n.toUpperCase();
    for (let r = 0; r < n.length; r++)
      n.charAt(r) !== "#" && (n.charAt(r + 1) !== "#" ? e.push(n.slice(r, r + 1)) : (e.push(n.slice(r, r + 2)), r++));
    return e;
  } else
    return !1;
}
const $ = {
  guitar: {
    standard: ["E", "A", "D", "G", "B", "E"],
    halfstepdown: ["D#", "G#", "C#", "F#", "A#", "D#"],
    drop_d: ["D", "A", "D", "G", "B", "E"],
    d_modal: ["D", "A", "D", "G", "A", "D"],
    open_g: ["G", "G", "D", "G", "B", "D"]
  },
  bass: {
    standard: ["E", "A", "D", "G"],
    drop_d: ["C", "A", "D", "G"]
  },
  ukulele: {
    standard: ["G", "C", "E", "A"]
  },
  violin: {
    standard: ["G", "D", "A", "E"]
  }
};
function V(n) {
  let e = [], i = [];
  for (let t = 0; t < n.length; t++) {
    let r = n[t].filter((l) => l != null).join("");
    e.includes(r) ? i.push(t) : e.push(r);
  }
  return i;
}
function _(n, e) {
  if (typeof n == "object") {
    typeof e == "string" && (e = e.toLowerCase());
    for (let i = 0; i < n.length; i++)
      for (let t in n[i]) {
        if (n[i][t] === e)
          return n[i];
        if (typeof n[i][t] == "string" && n[i][t].toLowerCase() === e)
          return n[i];
      }
    throw "Couldn't find " + e + " in " + n;
  } else
    throw n + " is not an object.";
}
function A(n, e) {
  let i = !1;
  if (!Array.isArray(n))
    throw n + " is not an array.";
  if (typeof e > "u")
    throw "Missing parameter.";
  switch (e) {
    case "min":
      if (i = Math.min.apply(Math, n), isNaN(i)) {
        for (let t = 0; t < n.length; t++)
          if (!isNaN(n[t]))
            if (isNaN(i)) {
              i = n[t];
              continue;
            } else if (n[t] < i)
              i = n[t];
            else
              continue;
      } else
        return i;
      break;
    case "max":
      if (i = Math.max.apply(Math, n), isNaN(i)) {
        for (let t = 0; t < n.length; t++)
          if (!isNaN(n[t]))
            if (isNaN(i)) {
              i = n[t];
              continue;
            } else if (n[t] > i)
              i = n[t];
            else
              continue;
      } else
        return i;
      break;
    default:
      i = U(n.join(""), e);
      break;
  }
  return i;
}
function U(n, e, i) {
  if (n += "", e += "", e.length <= 0)
    return n.length + 1;
  let t = 0, r = 1, l = i ? 1 : e.length;
  for (; r >= 0; )
    r = n.indexOf(e, r), r >= 0 && (++t, r += l);
  return t;
}
function C(n) {
  return new RegExp("^[ x0-9]*$", "i").test(n);
}
function O(n, e) {
  if (n = n.toLowerCase().trim(), e = e || "EADGBE", !C(n))
    throw N.invalidTab;
  let i = [];
  if (n.includes(" ")) {
    if (n = n.split(" "), n.length <= e.length)
      return n;
    throw N.invalidTab;
  } else {
    if (n.length <= e.length)
      return n.split("");
    if (n.length === e.length * 2) {
      for (let t = 0; t < n.length; t++)
        t % 2 || i.push(n.slice(t, t + 2));
      return i;
    } else if (n.length > e.length)
      if (A(n.split(""), "max") > 1) {
        for (let t = 0; t < n.length; t++)
          n.charAt(t).search(/[x02-9]/i) !== -1 || n.charAt(t) === 1 && n.charAt(t + 1).search(/x/i) !== -1 ? i.push(n.slice(t, t + 1)) : n.charAt(t + 1).search(/x/i) === -1 && (i.push(n.slice(t, t + 2)), t++);
        return i;
      } else
        throw N.invalidTab;
    else
      return !1;
  }
}
function H(n, e) {
  let i, t, r = [];
  for (let l = 0; l < n.length; l++)
    isNaN(n[l]) ? r.push("x") : (t = e[l], i = parseInt(n[l]) + d.indexOf(t), i > d.length - 1 && (i = i - d.length), r.push(d[i]));
  return r;
}
function W(n) {
  let e = [];
  for (let t = 0; t < n.length; t++) {
    var i = [];
    if (!(!n[t] || n[t].toLowerCase() === "x")) {
      for (let r = 0; r < n.length; r++) {
        if (!n[r] || n[r].toLowerCase() === "x") {
          i.push(null);
          continue;
        }
        let l = q(n[t], n[r]);
        i.push(l);
      }
      i.includes(0) && e.push(i);
    }
  }
  return e;
}
/**Chordictionary v0.1.0-beta.4, @license MIT, (c) 2019 Hubert Fauconnier + contributors*/
class Y {
  /** Constructor class
  * @param {String} tuning | Required | The instrument tuning
  * @param {Int} fretNumber | Required | The instrument frets number
  * @param {Int} fretsToDisplay | Optional | The number of frets to be displayed when printing a chord, default 0 (auto-resize)
  * @param {Int} maxSpan | Optional | The maximum number of frets that can be played in one chord, default 5
  */
  constructor(e, i, t, r) {
    try {
      if (D(e))
        this.tuning = I(e);
      else
        throw N.invalidTuning;
      this.fretNumber = i, this.fretsToDisplay = isNaN(t) ? 0 : t + 1, this.maxSpan = isNaN(r) ? 4 : r;
    } catch (l) {
      return console.error(l), !1;
    }
    return this;
  }
  /** This function aims to identify the maximum information about a chord, based on its tab notation and the instrument tuning
  * @param {String} tab | Required | The chord tab
  * @return {Object}
  */
  getChordInfo(e) {
    let i = [], t = [], r = [], l = {
      // Will contain every chord information to be returned
      error: "",
      tab: [],
      notes: "",
      tuning: this.tuning,
      chords: []
    };
    l.first = () => l.chords.length > 0 ? l.chords[0] : {}, l.named = (a) => l.chords.filter((o) => o.name == a), l.isNamed = (a) => l.named(a).length > 0, typeof e == "object" && (e = e != null && e.tab ? e.tab : e, Array.isArray(e) && (e = e.join(" ")));
    try {
      if (C(e))
        e = O(e), l.tab = e;
      else
        throw N.invalidTab;
    } catch (a) {
      return l.error = a, l;
    }
    try {
      i = H(e, this.tuning), l.notes = [...i];
    } catch {
      return l.error = N.failedToConvertTabIntoNotes, l;
    }
    try {
      t = W(i);
    } catch {
      return l.error = N.failedToCalculateFormula, l;
    }
    if (t.length > 0) {
      let a = V([...t]);
      t = t.filter((o, p) => !a.includes(p));
    } else
      throw N.noMatch;
    try {
      for (let a = 0; a < t.length; a++) {
        let o = B([...t][a]);
        if (o) {
          var u = [...new Set(t[a])].filter((p) => !isNaN(p) && p !== null && p !== void 0).sort((p, c) => p - c).map((p) => T[p]);
          r.push({
            formula: u,
            semitones: o.semitones,
            quality: o.qualityL,
            suffix: o.qualityS
          });
        }
      }
    } catch (a) {
      return l.error = a, l;
    }
    r.sort((a, o) => a.quality.length - o.quality.length);
    for (let a of r) {
      var s = a.semitones.map((o) => T[o]).map((o) => o === void 0 ? null : o), b = i.filter((o) => o !== "x")[0], v = i[a.semitones.indexOf(0)], g = v + a.suffix.join("");
      l.chords.push({
        name: v !== b ? g + "/" + b : g,
        pitch: v,
        formula: a.formula,
        intervals: s,
        semitones: a.semitones,
        notes: [...i],
        quality: a.quality.join(" "),
        suffix: a.suffix.join("")
      });
    }
    return l;
  }
  /** Return a list of tabs corresponding to a given chord
  * @param {String} chordName | Required | The chord name (e.g: Amin, G, Csus4)
  * @param {int} limit | Optional | The number of chords to return
  * @param {int} offset | Optional | Offset to skip a given number of chords
  * @return {Array} | A list of tabs
  */
  getChordsList(e, i, t) {
    t = t || 0;
    let r = [], l, u, s = [], b, v, g = {
      error: "",
      chordList: [],
      offset: 0
    };
    g.first = () => g.chordList.length > 0 ? g.chordList[0] : {}, g.named = (f) => g.chordList.filter((h) => this.getChordInfo(h.tab).isNamed(f));
    const a = {
      // FIXME: rootIsLowestNote prevents a standard D chord to be tagged
      basic: {
        rootBelow4thFret: !0,
        noMuteAfterFirstNote: !0,
        rootIsLowestNote: !0,
        splittedChord: !1,
        openString: !0
      },
      powerchord: {
        frettedNotes: [2, 3],
        rootIsLowestNote: !0,
        rootOnLowestFret: !0,
        splittedChord: !1,
        openString: !1
      },
      // FIXME: chordAnatomy.rootIsLowestNote && chordAnatomy.rootOnLowestFret ==> Prevent some valid bar chords to be tagged..
      bar: {
        rootIsLowestNote: !0,
        rootOnLowestFret: !0,
        barredString: [3, 6],
        noMuteAfterFirstNote: !0,
        splittedChord: !1,
        openString: !1
      }
    };
    try {
      if (typeof e == "string")
        e = F(e), b = e[0], l = e[1], r.push(b), v = d.indexOf(b);
      else
        throw N.invalidChordName;
      u = _(P, l), s = u.integer.split("-");
    } catch {
      return g.error = N.invalidChordName, g;
    }
    for (let f = 1; f < s.length; f++) {
      let h = parseInt(s[f]) + parseInt(v);
      h > d.length - 1 && (h = h - d.length), r.push(d[h]);
    }
    let o = [], p, c = 0;
    for (c = 0; c < this.tuning.length; c++) {
      o[c] = [], o[c].push("x");
      for (let f = 0; f < r.length; f++)
        p = d.indexOf(r[f]) - d.indexOf(this.tuning[c]), p < 0 && (p = d.length + p), o[c].push(p), p + 12 < this.fretNumber && o[c].push(p + 12);
    }
    let m = [];
    for (c = 0; c < this.tuning.length; c++) {
      let f = m.length;
      for (let h = 0; h < o[c].length; h++)
        if (m[h])
          for (let x = 0; x < f; x++)
            if (h === 0)
              m[x].push(o[c][h]);
            else {
              let j = m[x].slice(0);
              j.pop(), j.push(o[c][h]), m.push(j);
            }
        else
          m[h] = [o[c][h]];
    }
    let w = [], G = (f, h) => {
      for (let x in f)
        if (Object.prototype.hasOwnProperty.call(h, x)) {
          if (typeof f[x] == "object") {
            let j = f[x][0], S = f[x][1];
            if (h[x] < j || h[x] > S)
              return !1;
          } else if (h[x] !== f[x])
            return !1;
        } else
          return !1;
      return !0;
    };
    try {
      for (let f = t; f < m.length; f++) {
        if (R(m[f], r, this.tuning) && A(m[f], "max") - A(m[f], "min") < this.maxSpan) {
          let h = {
            openString: !1,
            frettedNotes: 0
          }, x = m[f].join(""), j = /[0-9]+[x]+[0-9]+/gi, S = /[0-9]+[x]+/gi;
          j.test(x) ? h.splittedChord = !0 : h.splittedChord = !1, S.test(x) ? h.noMuteAfterFirstNote = !1 : h.noMuteAfterFirstNote = !0;
          for (let y = 0; y < m[f].length; y++) {
            let M = m[f][y];
            if (!isNaN(M)) {
              let E = M + d.indexOf(this.tuning[y]);
              M === 0 && (h.openString = !0), v === E && (h.frettedNotes === 0 && (h.rootIsLowestNote = !0), h.rootBelow4thFret = M <= 4, h.rootOnLowestFret = A(m[f], "min") >= M), (M > 0 && y < m[f].length - 1 && M === m[f][y - 1] || A(m[f], M) >= 3) && (h.barredString = isNaN(h.barredString) ? 1 : h.barredString + 1), h.frettedNotes++;
            }
          }
          let L = {
            tab: m[f],
            tag: []
          };
          Object.getOwnPropertyNames(a).forEach((y) => {
            G(a[y], h) && L.tag.indexOf(y) && L.tag.push(y);
          }), w.push(L);
        }
        if (i > 0 && i < m[f].length && w.length === i) {
          t = f + 1;
          break;
        }
      }
    } catch (f) {
      console.error(f);
    }
    return g.chordList = w, g.offset = t, g;
  }
  /** Converts a tab notation into its graphic representation
  * @param {String} tab | Required | The tab notation
  * @param {Object} options | Optional | the easiest way is to pass a chord Object (e.g. getChordInfo("X32010").chords[0])
  * @return {String}
  */
  getChordLayout(e, i) {
    let t, r, l = this.fretsToDisplay;
    i = typeof i == "object" ? i : {}, e = Array.isArray(e) ? e.join(" ") : e;
    try {
      C(e) ? t = O(e) : t = [0, 0, 0, 0, 0, 0];
    } catch {
      return !1;
    }
    let u = i.notes ? i.notes : t, s = i.name ? i.name : t.join(" "), b = [];
    for (let o = 0; o < t.length; o++)
      isNaN(t[o]) === !1 && b.push(t[o]);
    let v = Math.abs(Math.max.apply(Math, b)), g = Math.abs(Math.min.apply(Math, b)), a = 1;
    v >= l && (a = g > 0 ? g : 1), a === 1 && v > 5 && (a = v - l + 2);
    try {
      if (l === 0)
        l = v - a + 2;
      else if (v - a + 1 > l - 1)
        throw l = v - a + 2, N.croppedChordLayout;
    } catch (o) {
      console.error(o);
    }
    r = '<table class="chord">';
    for (let o = 0; o < l; o++) {
      let p = o + a - 1;
      a === 1 && o === 0 && (r += "<thead>"), p % 2 && p > 0 ? r += '<tr><th class="fret-number">' + p + "</th>" : r += "<tr><th></th>";
      for (let c = 0; c < this.tuning.length; c++) {
        let m = parseInt(t[c]);
        o === 0 ? m === 0 ? r += '<th><div class="dot open">' + u[c] + "</div></th>" : Number.isNaN(m) ? r += '<th><div class="x"></div></th>' : r += "<th></th>" : m === a + o - 1 ? r += '<td><div class="dot plain">' + u[c] + "</div></td>" : r += "<td></td>";
      }
      a === 1 && o === 0 ? r += "<tr></thead>" : r += "</tr>";
    }
    return r += '<caption align="bottom">' + s + "</caption>", r += "</table>", r;
  }
}
/**Chordictionary v0.1.0-beta.4, @license MIT, (c) 2019 Hubert Fauconnier + contributors*/
const z = C, J = D, K = I, Q = O, X = F, Z = $, ee = d;
export {
  Y as Instrument,
  z as isValidTab,
  J as isValidTuning,
  ee as notes,
  X as parseChord,
  Q as parseTab,
  K as parseTuning,
  Z as tuning
};
