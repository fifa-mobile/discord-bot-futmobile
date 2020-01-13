module.exports = (u, players, standings, cells) => {
  let id = u.a[1];
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (id == (i + 1) && u.a[0] === 'score') {
      if (u.a[2] === undefined) {
        cell.value = '-';
      } else {
        cell.value = u.a[2] + ' - ' + u.a[3];
      }
      cell.save();
      u.w('the fixture updated!');
    }
    let score = cell.value.split('-');
    score = score.map(s => s.trim());
    let player0 = standings.get(players[cell.row - 2]);
    let player1 = standings.get(players[cell.col - 2]);
    if (score[0].length > 0) {
      let score0 = Number(score[0]);
      let score1 = Number(score[1]);
      player0.add(score0, score1);
      player1.add(score1, score0);
    }
  }
  if (u.a[0] === 'standing') {
    u.w(standings.table());
  }
};
