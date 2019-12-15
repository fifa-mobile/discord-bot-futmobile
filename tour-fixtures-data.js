module.exports = (args, msg, sheet, players) => {
  let count = players.length + 1;
  sheet.getCells({
    'min-row': 2,
    'max-row': count,
    'min-col': 2,
    'max-col': count,
    'return-empty': !true,
  }, (err, cells) => {
    console.log(err);
    let o = '';
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      let score = cell.value.split('-');
      score = score.map(s => s.trim());
      let isPlayed = score[0].length;
      let match =
        (i + 1).toString().padStart(2, ' ') + '| '
        + players[cell.row - 2].padEnd(14, ' ')
        + score[0].padStart(2, ' ')
        + ' - '
        + score[1].padEnd(2, ' ')
        + players[cell.col - 2].padStart(14, ' ')
      ;
      if (args[1] === 'played' && !isPlayed) continue;
      if (args[1] === 'left' && isPlayed) continue;
      o += match + "\n";
    }
    console.log(o);
    msg.channel.send("```\n" + o + "```");
  });
};
