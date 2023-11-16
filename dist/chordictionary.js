const d = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"], T = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "#5", "6", "b7", "7", "8", "b9", "9", "b10", "10", "11", "#11", "12", "b13", "13", "#13", "14"];
function q(n, t) {
  let i = d.indexOf(t) - d.indexOf(n);
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
  { formula: "1-b3-5", integer: "0-3-7", name: "Minor", suffix: "min" },
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
], F = {
  powerchord: ["5", "5 (powerchord)"],
  major: ["Maj", "Major"],
  minor: ["min", "Minor"],
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
function R(n, t, i) {
  let e, r, l = {};
  for (let u = 0; u < n.length; u++)
    if (!isNaN(n[u])) {
      r = n[u] + d.indexOf(i[u]), r > d.length - 1 && (r = r - d.length);
      for (let s = 0; s < t.length; s++)
        l[d[r]] ? d[r] === d[s] && l[d[r]]++ : l[d[r]] = 1;
    }
  for (let u = 0; u < t.length; u++)
    if (t[u] in l)
      e = !0;
    else {
      e = !1;
      break;
    }
  return e;
}
function L(n) {
  let t, i;
  try {
    if (typeof n != "string")
      throw N.invalidChordName;
    return n.search("#") === -1 ? (t = n.charAt(0), i = n.slice(1)) : (t = n.slice(0, 2).toUpperCase(), i = n.slice(2)), [t, i];
  } catch {
    return !1;
  }
}
function B(n) {
  let t = n.map((s) => T[s]).filter((s) => s !== void 0), i = t.filter((s) => ["2"].includes(s)).length, e = {
    seven: t.some((s) => ["b7", "7"].includes(s)),
    third: t.some((s) => ["b3", "3"].includes(s)),
    fifth: t.some((s) => ["b5", "5", "#5"].includes(s)),
    majorNinth: t.includes("2") && !(!t.some((s) => ["b3", "3"].includes(s)) && i < 2)
  }, r = [
    { name: "powerchord", check: t.includes("5") && t.every((s) => ["1", "5"].includes(s)) },
    { name: "major", check: t.includes("3") && !t.some((s) => ["6", "4"].includes(s) || e.seven || e.majorNinth) },
    { name: "minor", check: t.includes("b3") },
    { name: "aug5", check: t.includes("#5") && t.includes("3") && !t.includes("5") },
    { name: "dim5", check: t.includes("b5") && t.includes("b3") && !t.includes("5") && !e.seven && !e.majorNinth },
    { name: "seven", check: t.includes("b7") && !t.some((s) => ["6", "b9", "9"].includes(s) || e.majorNinth) },
    { name: "major7", check: t.includes("7") && !t.some((s) => ["6", "4"].includes(s) || e.majorNinth) },
    { name: "major9", check: e.majorNinth && t.includes("7") && !t.includes("6") },
    { name: "six", check: t.includes("6") && !e.seven },
    { name: "nine", check: e.majorNinth && t.includes("b7") },
    { name: "eleven", check: t.includes("4") && e.seven && !t.includes("6") },
    { name: "thirteen", check: t.includes("6") && e.seven },
    { name: "add2", check: e.majorNinth && e.third && !e.seven && !t.includes("6") },
    { name: "add4", check: e.third && t.includes("4") && !e.seven },
    { name: "add9", check: e.majorNinth && e.third && !e.seven },
    { name: "sus2", check: t.includes("2") && !e.third },
    { name: "sus4", check: t.includes("4") && !e.third && !e.seven },
    { name: "sharp5", check: t.includes("#5") && !t.some((s) => ["5", "3"].includes(s)) },
    { name: "flat5", check: t.includes("b5") && !t.some((s) => ["5"].includes(s)) },
    { name: "addflat5", check: ["5", "b5"].every((s) => t.includes(s)) && !e.seven },
    { name: "sharp11", check: ["5", "b5"].every((s) => t.includes(s)) && e.seven },
    { name: "flat9", check: t.includes("b2") && e.third },
    { name: "b6", check: t.includes("#5") && t.includes("5") },
    { name: "doubleflat5", check: t.includes("4") && e.third && !e.fifth && !e.seven }
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
    formula: t,
    qualityS: u.map((s) => F[s][0]),
    qualityL: u.map((s) => F[s][1])
  }) : !1;
}
function D(n) {
  return new RegExp("^[#a-g]+$", "i").test(n);
}
function I(n) {
  let t = [], i = new RegExp("^[a-g]+$", "i"), e = new RegExp("^[#a-g]+$", "i");
  if (i.test(n))
    return n.toUpperCase().split("");
  if (e.test(n)) {
    n = n.toUpperCase();
    for (let r = 0; r < n.length; r++)
      n.charAt(r) !== "#" && (n.charAt(r + 1) !== "#" ? t.push(n.slice(r, r + 1)) : (t.push(n.slice(r, r + 2)), r++));
    return t;
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
  let t = [], i = [];
  for (let e = 0; e < n.length; e++) {
    let r = n[e].filter((l) => l != null).join("");
    t.includes(r) ? i.push(e) : t.push(r);
  }
  return i;
}
function _(n, t) {
  if (typeof n == "object") {
    typeof t == "string" && (t = t.toLowerCase());
    for (let i = 0; i < n.length; i++)
      for (let e in n[i]) {
        if (n[i][e] === t)
          return n[i];
        if (typeof n[i][e] == "string" && n[i][e].toLowerCase() === t)
          return n[i];
      }
    throw "Couldn't find " + t + " in " + n;
  } else
    throw n + " is not an object.";
}
function A(n, t) {
  let i = !1;
  if (!Array.isArray(n))
    throw n + " is not an array.";
  if (typeof t > "u")
    throw "Missing parameter.";
  switch (t) {
    case "min":
      if (i = Math.min.apply(Math, n), isNaN(i)) {
        for (let e = 0; e < n.length; e++)
          if (!isNaN(n[e]))
            if (isNaN(i)) {
              i = n[e];
              continue;
            } else if (n[e] < i)
              i = n[e];
            else
              continue;
      } else
        return i;
      break;
    case "max":
      if (i = Math.max.apply(Math, n), isNaN(i)) {
        for (let e = 0; e < n.length; e++)
          if (!isNaN(n[e]))
            if (isNaN(i)) {
              i = n[e];
              continue;
            } else if (n[e] > i)
              i = n[e];
            else
              continue;
      } else
        return i;
      break;
    default:
      i = U(n.join(""), t);
      break;
  }
  return i;
}
function U(n, t, i) {
  if (n += "", t += "", t.length <= 0)
    return n.length + 1;
  let e = 0, r = 1, l = i ? 1 : t.length;
  for (; r >= 0; )
    r = n.indexOf(t, r), r >= 0 && (++e, r += l);
  return e;
}
function C(n) {
  return !!new RegExp("^[x0-9]*$", "i").test(n);
}
function k(n, t) {
  if (n = n.toLowerCase(), t = t || "EADGBE", !C(n))
    throw N.invalidTab;
  let i = [];
  if (n.length <= t.length)
    return n.split("");
  if (n.length === t.length * 2) {
    for (let e = 0; e < n.length; e++)
      e % 2 || i.push(n.slice(e, e + 2));
    return i;
  } else if (n.length > t.length)
    if (A(n.split(""), "max") > 1) {
      for (let e = 0; e < n.length; e++)
        n.charAt(e).search(/[x02-9]/i) !== -1 || n.charAt(e) === 1 && n.charAt(e + 1).search(/x/i) !== -1 ? i.push(n.slice(e, e + 1)) : n.charAt(e + 1).search(/x/i) === -1 && (i.push(n.slice(e, e + 2)), e++);
      return i;
    } else
      throw N.invalidTab;
  else
    return !1;
}
function H(n, t) {
  let i, e, r = [];
  for (let l = 0; l < n.length; l++)
    isNaN(n[l]) ? r.push("x") : (e = t[l], i = parseInt(n[l]) + d.indexOf(e), i > d.length - 1 && (i = i - d.length), r.push(d[i]));
  return r;
}
function W(n) {
  let t = [];
  for (let e = 0; e < n.length; e++) {
    var i = [];
    if (!(!n[e] || n[e].toLowerCase() === "x")) {
      for (let r = 0; r < n.length; r++) {
        if (!n[r] || n[r].toLowerCase() === "x") {
          i.push(null);
          continue;
        }
        let l = q(n[e], n[r]);
        i.push(l);
      }
      i.includes(0) && t.push(i);
    }
  }
  return t;
}
/**Chordictionary v0.1.0-beta.4, @license MIT, (c) 2019 Hubert Fauconnier + contributors*/
class Y {
  /** Constructor class
  * @param {String} tuning | Required | The instrument tuning
  * @param {Int} fretNumber | Required | The instrument frets number
  * @param {Int} fretsToDisplay | Optional | The number of frets to be displayed when printing a chord, default 0 (auto-resize)
  * @param {Int} maxSpan | Optional | The maximum number of frets that can be played in one chord, default 5
  */
  constructor(t, i, e, r) {
    try {
      if (D(t))
        this.tuning = I(t);
      else
        throw N.invalidTuning;
      this.fretNumber = i, this.fretsToDisplay = isNaN(e) ? 0 : e + 1, this.maxSpan = isNaN(r) ? 4 : r;
    } catch (l) {
      return console.error(l), !1;
    }
    return this;
  }
  /** This function aims to identify the maximum information about a chord, based on its tab notation and the instrument tuning
  * @param {String} tab | Required | The chord tab
  * @return {Object}
  */
  getChordInfo(t) {
    let i = [], e = [], r = [], l = {
      // Will contain every chord information to be returned
      error: "",
      tab: [],
      notes: "",
      tuning: this.tuning,
      chords: []
    };
    try {
      if (C(t))
        t = k(t), l.tab = t;
      else
        throw N.invalidTab;
    } catch (o) {
      return l.error = o, l;
    }
    try {
      i = H(t, this.tuning), l.notes = [...i];
    } catch {
      return l.error = N.failedToConvertTabIntoNotes, l;
    }
    try {
      e = W(i);
    } catch {
      return l.error = N.failedToCalculateFormula, l;
    }
    if (e.length > 0) {
      let o = V([...e]);
      e = e.filter((a, g) => !o.includes(g));
    } else
      throw N.noMatch;
    try {
      for (let o = 0; o < e.length; o++) {
        let a = B([...e][o]);
        if (a) {
          var u = [...new Set(e[o])].filter((g) => !isNaN(g) && g !== null && g !== void 0).sort((g, c) => g - c).map((g) => T[g]);
          r.push({
            formula: u,
            semitones: a.semitones,
            quality: a.qualityL,
            suffix: a.qualityS
          });
        }
      }
    } catch (o) {
      return l.error = o, l;
    }
    r.sort((o, a) => o.quality.length - a.quality.length);
    for (let o of r) {
      var s = o.semitones.map((a) => T[a]).map((a) => a === void 0 ? null : a), b = i.filter((a) => a !== "x")[0], p = i[o.semitones.indexOf(0)], v = p + o.suffix.join("");
      l.chords.push({
        name: p !== b ? v + "/" + b : v,
        pitch: p !== b ? p + "/" + b : p,
        formula: o.formula,
        intervals: s,
        semitones: o.semitones,
        notes: [...i],
        quality: o.quality.join(" "),
        suffix: o.suffix.join("")
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
  getChordsList(t, i, e) {
    e = e || 0;
    let r = [], l, u, s = [], b, p, v = {
      error: "",
      chordList: [],
      offset: 0
    };
    const o = {
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
      if (typeof t == "string")
        t = L(t), b = t[0], l = t[1], r.push(b), p = d.indexOf(b);
      else
        throw N.invalidChordName;
      u = _(P, l), s = u.integer.split("-");
    } catch {
      return v.error = N.invalidChordName, v;
    }
    for (let f = 1; f < s.length; f++) {
      let h = parseInt(s[f]) + parseInt(p);
      h > d.length - 1 && (h = h - d.length), r.push(d[h]);
    }
    let a = [], g, c = 0;
    for (c = 0; c < this.tuning.length; c++) {
      a[c] = [], a[c].push("x");
      for (let f = 0; f < r.length; f++)
        g = d.indexOf(r[f]) - d.indexOf(this.tuning[c]), g < 0 && (g = d.length + g), a[c].push(g), g + 12 < this.fretNumber && a[c].push(g + 12);
    }
    let m = [];
    for (c = 0; c < this.tuning.length; c++) {
      let f = m.length;
      for (let h = 0; h < a[c].length; h++)
        if (m[h])
          for (let x = 0; x < f; x++)
            if (h === 0)
              m[x].push(a[c][h]);
            else {
              let j = m[x].slice(0);
              j.pop(), j.push(a[c][h]), m.push(j);
            }
        else
          m[h] = [a[c][h]];
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
      for (let f = e; f < m.length; f++) {
        if (R(m[f], r, this.tuning) && A(m[f], "max") - A(m[f], "min") < this.maxSpan) {
          let h = {
            openString: !1,
            frettedNotes: 0
          }, x = m[f].join(""), j = /[0-9]+[x]+[0-9]+/gi, S = /[0-9]+[x]+/gi;
          j.test(x) ? h.splittedChord = !0 : h.splittedChord = !1, S.test(x) ? h.noMuteAfterFirstNote = !1 : h.noMuteAfterFirstNote = !0;
          for (let M = 0; M < m[f].length; M++) {
            let y = m[f][M];
            if (!isNaN(y)) {
              let E = y + d.indexOf(this.tuning[M]);
              y === 0 && (h.openString = !0), p === E && (h.frettedNotes === 0 && (h.rootIsLowestNote = !0), h.rootBelow4thFret = y <= 4, h.rootOnLowestFret = A(m[f], "min") >= y), (y > 0 && M < m[f].length - 1 && y === m[f][M - 1] || A(m[f], y) >= 3) && (h.barredString = isNaN(h.barredString) ? 1 : h.barredString + 1), h.frettedNotes++;
            }
          }
          let O = {
            tab: m[f],
            tag: []
          };
          Object.getOwnPropertyNames(o).forEach((M) => {
            G(o[M], h) && O.tag.indexOf(M) && O.tag.push(M);
          }), w.push(O);
        }
        if (i > 0 && i < m[f].length && w.length === i) {
          e = f + 1;
          break;
        }
      }
    } catch (f) {
      console.error(f);
    }
    return v.chordList = w, v.offset = e, v;
  }
  /** Converts a tab notation into its graphic representation
  * @param {String} tab | Required | The tab notation
  * @param {Object} options | Optional | the easiest way is to pass a chord Object (e.g. getChordInfo("X32010").chords[0])
  * @return {String}
  */
  getChordLayout(t, i) {
    let e, r, l = this.fretsToDisplay;
    i = typeof i == "object" ? i : {};
    try {
      C(t) ? e = k(t) : e = [0, 0, 0, 0, 0, 0];
    } catch {
      return !1;
    }
    let u = i.notes ? i.notes : e, s = i.name ? i.name : e.join(" "), b = [];
    for (let a = 0; a < e.length; a++)
      isNaN(e[a]) === !1 && b.push(e[a]);
    let p = Math.abs(Math.max.apply(Math, b)), v = Math.abs(Math.min.apply(Math, b)), o = 1;
    p >= l && (o = v > 0 ? v : 1), o === 1 && p > 5 && (o = p - l + 2);
    try {
      if (l === 0)
        l = p - o + 2;
      else if (p - o + 1 > l - 1)
        throw l = p - o + 2, N.croppedChordLayout;
    } catch (a) {
      console.error(a);
    }
    r = '<table class="chord">';
    for (let a = 0; a < l; a++) {
      let g = a + o - 1;
      o === 1 && a === 0 && (r += "<thead>"), g % 2 && g > 0 ? r += '<tr><th class="fret-number">' + g + "</th>" : r += "<tr><th></th>";
      for (let c = 0; c < this.tuning.length; c++) {
        let m = parseInt(e[c]);
        a === 0 ? m === 0 ? r += '<th><div class="dot open">' + u[c] + "</div></th>" : Number.isNaN(m) ? r += '<th><div class="x"></div></th>' : r += "<th></th>" : m === o + a - 1 ? r += '<td><div class="dot plain">' + u[c] + "</div></td>" : r += "<td></td>";
      }
      o === 1 && a === 0 ? r += "<tr></thead>" : r += "</tr>";
    }
    return r += '<caption align="bottom">' + s + "</caption>", r += "</table>", r;
  }
}
/**Chordictionary v0.1.0-beta.4, @license MIT, (c) 2019 Hubert Fauconnier + contributors*/
const z = C, J = D, K = I, Q = k, X = L, Z = $, ee = d;
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
