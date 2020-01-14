module.exports = (u, players, standings, cells) => {
  let matches = [];
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let score = cell.value.split('-');
    score = score.map(s => s.trim());
    let p0 = players[cell.row - 2];
    let p1 = players[cell.col - 2];
    let match = require('../common/Match.js')(i, p0, p1, score);
    matches.push(match);
  }
  let round = require('../common/Round.js')(players, matches);
  u.w(round);
}

