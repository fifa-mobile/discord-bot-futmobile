class Rounds {
  constructor(players) {
    this.count = players.length + 1;
    this.mspr = Math.floor(this.count);
  }
}

class Round {
  constructor(players) {
  }
}

class Match {
  constructor(i, p0, p1, s) {
    this.id = (i + 1).toString();
    this.p0 = p0;
    this.s0 = s[0];
    this.p1 = p1;
    this.s1 = s[1];
  }

  toString() {
    const o =
      this.id.padStart(2, ' ') + '| '
      + this.p0.padEnd(14, ' ')
      + this.s0.padStart(2, ' ')
      + ' - '
      + this.s1.padEnd(2, ' ')
      + this.p1.padStart(14, ' ')
    ;
    return o;
  }
}

module.exports = (u, players, standings, cells) => {
  let o = '';
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    let score = cell.value.split('-');
    score = score.map(s => s.trim());
    let isPlayed = score[0].length;
    let p0 = players[cell.row - 2];
    let p1 = players[cell.col - 2];
    let match = new Match(i, p0, p1, score);
    if (u.a[1] === 'played' && !isPlayed) continue;
    if (u.a[1] === 'left' && isPlayed) continue;
    let user = u.msg.mentions.users.first();
    let guild = u.c.guilds.get(u.msg.guild.id);
    let member = guild.member(user);
    let nickname = member ? member.displayName : null;
    if (
      u.a[1] && u.a[1] !== 'played' && u.a[1] !== 'left'
      &&
      (
        (u.a[1] !== p0 && nickname !== p0)
        &&
        (u.a[1] !== p1 && nickname !== p1)
      )
    ) continue;
    o += match + "\n";
  }
  u.w(o);
}

