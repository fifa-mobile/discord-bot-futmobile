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

module.exports = (u, players, standings, cells) => {
  let o = '';
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let score = cell.value.split('-');
    score = score.map(s => s.trim());
    let p0 = players[cell.row - 2];
    let p1 = players[cell.col - 2];
    let match = new Match(i, p0, p1, score);
    o += match + "\n";
  }
  u.w(o);
}

