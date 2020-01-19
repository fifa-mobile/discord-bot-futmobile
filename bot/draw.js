function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function saveDrawing(u, sheet, players) {
  sheet.getCells({
    'min-row': 1,
    'max-row': 100,
    'min-col': 1,
    'max-col': 1,
    'return-empty': true,
  }, (e, cells) => {
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      cell.value = '';
    }
    for (let i = 0; i < players.length; i++) {
      let cell = cells[i];
      let player = players[i];
      cell.value = player;
    }
    sheet.bulkUpdateCells(cells, e => {
      console.log(e);
      u.w('result drawing:');
      let mapPlayers = players.map((e, i) => {
        return `${(i+1).toString().padStart(3, ' ')}. ${e}`;
      });
      u.w(mapPlayers.join('\n'));
    });
  });
}

function main(u, sheets) {
  let title = 'list';
  let sheet = sheets.find(e => e.title === title);
  if (!sheet) {
    u.w(`${title} sheet not found!`);
    return;
  }
  sheet.getCells({
    'min-row': 1,
    'max-row': 100,
    'min-col': 1,
    'max-col': 1,
    'return-empty': false,
  }, (e, cells) => {
    let players = [];
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      players.push(cell.value);
    }
    u.w(`shuffling ${players.length} players` + '\n' + 'please wait...');
    players = shuffle(players);

    title = 'draw';
    let _sheet = sheets.find(e => e.title === title);
    if (!sheet) {
      u.w(`${title} sheet not found!`);
      return;
    }
    saveDrawing(u, _sheet, players);
  });
}

module.exports = u => {
  this.process = sheets => {
    main(u, sheets);
  };
  return this;
};
