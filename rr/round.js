class Round {
  constructor(players, matches) {
    this.maps = {
      3: [
        [
          [1],
          [6],
          [2],
        ],
        [
          [3],
          [4],
          [5],
        ],
      ],
      4: [
        [
          [1,9],
          [5,10],
          [2,6],
        ],
        [
          [4,12],
          [3,8],
          [7,11],
        ],
      ],
      5: [
        [
          [1,11],
          [7,17],
          [10,16],
          [2,8],
          [13,19],
        ],
        [
          [5,15],
          [4,14],
          [6,20],
          [9,18],
          [3,12],
        ],
      ],
    };
    this.map = this.maps[players.length];
    this.matches = matches;
  }

  toString() {
    const map = this.map;
    const matches = this.matches;
    let o = '';
    let start = 0;
    const moment = require('moment');
    let date = moment('2020-01-15');
    for (let i = 0; i < map.length; i++) {
      let pad = ''.padEnd(31, '=');
      o += `half #${i + 1} ${pad}\n\n`;
      const halfLen = map[i].length;
      for (var j = 0; j < halfLen; j++) {
        const roundLen = map[i][j].length;
        const roundNum = start + j + 1;
        const num = roundNum.toString().padEnd(3, ' ');
        const at = date.format('DD/MM');
        date.add(2, 'days');
        pad = ''.padEnd(20, '-');
        o += `round #${num} - ${at} ${pad}\n\n`;
        for (let k = 0; k < roundLen; k++) {
          let match = matches[map[i][j][k] - 1];
          o += `${match}\n`;
        }
        o += '\n';
      }
      start += j;
      o += '\n';
    }
    return o;
  }
}

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
  let matches = [];
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let score = cell.value.split('-');
    score = score.map(s => s.trim());
    let p0 = players[cell.row - 2];
    let p1 = players[cell.col - 2];
    let match = new Match(i, p0, p1, score);
    matches.push(match);
  }
  let round = new Round(players, matches);
  u.w(round);
}

