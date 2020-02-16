function shuffle(array) {
  var currentIndex =
    array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(
      Math.random() * currentIndex
    );
    currentIndex -= 1;
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
      let mapPlayers = players.map((e, i) => {
        return `${(i+1).toString().padStart(3, ' ')}. ${e}`;
      });

      if (u.a[0] !== 'delay') {
        u.w(mapPlayers.join('\n'));
        return;
      }
      let delayedOutput = [];
      let playersTmp = [];
      for (let i = 0; i < players.length; i++) {
        playersTmp = [];
        for (let j = 0; j <= i; j++) {
          playersTmp.push(mapPlayers[j]);
        }
        delayedOutput.push(playersTmp.join('\n'));
      }
      delayedOutput.push(playersTmp.join('\n') + '\n...done!');
      u.wd(delayedOutput);
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
    u.w(
      `Shuffling ${players.length} players.`
      + '\n' + 'Please wait...'
      + '\n' + 'Result of drawing:'
    );
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
