module.exports = (u, args) => {
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
        let entry = require(
          '../common/Standing.js'
        )(player);
        standings.add(entry);
      }

      sheet.getCells({
        'min-row': 2,
        'max-row': count,
        'min-col': 2,
        'max-col': count,
        'return-empty': !true,
      }, (err, cells) => {
        if (u.a[0].includes('score')) {
          require('../rr/score.js')
            (u, players, standings, cells);
        }
        if (u.a[0].includes('standing')) {
          require('../rr/standing.js')
            (u, players, standings, cells);
        }
        if (u.a[0].includes('fixture')) {
          require('../rr/fixture.js')
            (u, players, standings, cells);
        }
      });
    });
  };
  return this;
};
