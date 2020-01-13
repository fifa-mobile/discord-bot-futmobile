module.exports = (u, msg, args) => {
  this.process = sheets => {
    const sheet = sheets.find(e => e.title === 'vsa');

    if (!sheet) {
      u.w('sheet not found!');
      return;
    }

    sheet.getCells({
      'min-row': 1,
      'max-row': 1,
      'return-empty': !true,
    }, (err, cells) => {
      let players = [];
      for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        if (cell.value === 'players') continue;
        players.push(cell.value);
      }

      let count = players.length + 1;
      let standings = require('../common/Standings.js')();
      for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let standing = require(
          '../common/Standing.js'
        )(player);
        standings.add(standing);
      }

      sheet.getCells({
        'min-row': 2,
        'max-row': count,
        'min-col': 2,
        'max-col': count,
        'return-empty': !true,
      }, (err, cells) => {
        let id = args[1];
        let o = '';
        for (let i = 0; i < cells.length; i++) {
          let cell = cells[i];
          if (id == (i + 1) && args[0] === 'result') {
            if (args[2] === undefined) {
              cell.value = '-';
            } else {
              cell.value = args[2] + ' - ' + args[3];
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
          let match =
            (i + 1).toString().padStart(2, ' ') + '| '
            + player0.name.padEnd(16, ' ')
            + score[0].padStart(3, ' ')
            + ' vs '
            + score[1].padEnd(3, ' ')
            + player1.name.padStart(16, ' ')
          ;
          o += match + "\n";
        }
        if (args[0] === 'standing') {
          console.log('aaaaaaaaaaa');
          u.w(standings.table());
        }
        console.log(args);
      });
    });
  };
  return this;
};
