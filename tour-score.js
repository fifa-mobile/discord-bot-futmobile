module.exports = (args, msg, sheet, standing) => {
  sheet.getCells({
    'min-row': 1,
    'max-row': 1,
    'return-empty': !true,
  }, (err, cells) => {
    console.log(err);
    let players = [];
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.row === 1 && cell.value !== 'players') {
        players.push(cell.value);
      }
    }
    require('./tour-score-data.js')(
      args, msg, sheet, players, standing
    );
  });
};
