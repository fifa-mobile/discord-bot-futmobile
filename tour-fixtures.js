module.exports = (args, msg, sheet, client) => {
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
      console.log(`r#${cell.row}c#${cell.col}: ${cell.value}`);
    }
    console.log('players', players);
    require('./tour-fixtures-data.js')(
      args, msg, sheet, players, client
    );
  });
};
