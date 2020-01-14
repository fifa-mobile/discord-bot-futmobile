class Match {
  constructor(i, p0, p1, s) {
    this.id = (i + 1).toString();
    this.p0 = p0;
    this.s0 = s[0];
    this.p1 = p1;
    this.s1 = s[1];
  }

  toString() {
    const o =
      this.id.padStart(2, ' ') + '| '
      + this.p0.padEnd(14, ' ')
      + this.s0.padStart(2, ' ')
      + ' - '
      + this.s1.padEnd(2, ' ')
      + this.p1.padStart(14, ' ')
    ;
    return o;
  }
}

module.exports = (i, p0, p1, s) => new Match(i, p0, p1, s);
