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
      let match =
        (i + 1).toString().padStart(2, ' ') + '| '
        + players[cell.row - 2].padEnd(16, ' ')
        + score[0].padStart(3, ' ')
        + ' vs '
        + score[1].padEnd(3, ' ')
        + players[cell.col - 2].padStart(16, ' ')
      //,`r#${cell.row}c#${cell.col}: ${cell.value}`
      ;
      o += match + "\n";
    }
    console.log(o);
    msg.channel.send("```\n" + o + "```");
  });
};
