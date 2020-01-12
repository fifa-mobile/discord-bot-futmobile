class Standings {
  constructor() {
    this.players = [];
  }

  get(name) {
    for (let i = 0;i < this.players.length;i++) {
      let player = this.players[i];
      if (name === player.name) {
        return player;
      }
    }
  }

  add(player) {
    this.players.push(player);
  }

  table() {
    this.players.sort((a, b) => b.GD - a.GD);
    this.players.sort((a, b) => b.Pts - a.Pts);
    let o = '';
    let heading =
      '# ' +
      '|' +
      'Team'.padEnd(13, ' ') +
      '|' +
      'P'.padEnd(2, ' ') +
      '|' +
      'W'.padEnd(2, ' ') +
      '|' +
      'D'.padEnd(2, ' ') +
      '|' +
      'L'.padEnd(2, ' ') +
      '|' +
      'Pts'.padEnd(3, ' ') +
      '|' +
      'GS'.padEnd(2, ' ') +
      '|' +
      'GA'.padEnd(2, ' ') +
      '|' +
      'GD'.padEnd(2, ' ') +
      '\n';
    o += heading;
    o += ''.padEnd(42, '-') + '\n';
    for (let i = 0; i < this.players.length; i++) {
      let p = this.players[i];
      o +=
        (i + 1).toString().padStart(2, ' ') +
        '|' +
        p.name.padEnd(13, ' ') +
        '|' +
        p.P.toString().padStart(2, ' ') +
        '|' +
        p.W.toString().padStart(2, ' ') +
        '|' +
        p.D.toString().padStart(2, ' ') +
        '|' +
        p.L.toString().padStart(2, ' ') +
        '|' +
        p.Pts.toString().padStart(3, ' ') +
        '|' +
        p.GS.toString().padStart(2, ' ') +
        '|' +
        p.GA.toString().padStart(2, ' ') +
        '|' +
        p.GD.toString().padStart(3, ' ') +
        '\n';
    }
    return o;
  }
}

module.exports = () => new Standings();
