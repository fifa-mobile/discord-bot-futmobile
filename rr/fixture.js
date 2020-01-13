module.exports = (u, players, standings, cells) => {
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
    if (u.a[1] === 'played' && !isPlayed) continue;
    if (u.a[1] === 'left' && isPlayed) continue;
    let user = u.msg.mentions.users.first();
    let guild = u.c.guilds.get(u.msg.guild.id);
    let member = guild.member(user);
    let nickname = member ? member.displayName : null;
    if (
      u.a[1]
      &&
      u.a[1] !== 'played'
      &&
      u.a[1] !== 'left'
      &&
      (
        (
          u.a[1] !== players[cell.row - 2]
          &&
          nickname !== players[cell.row - 2]
        )
        &&
        (
          u.a[1] !== players[cell.col - 2]
          &&
          nickname !== players[cell.col - 2]
        )
      )
    ) continue;
    o += match + "\n";
  }
  u.w(o);
}

