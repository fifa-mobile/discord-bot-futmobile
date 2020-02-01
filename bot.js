module.exports = (u, msg, cmd, args, client) => {
  if (cmd === 'draw') {
    require('./common/sheets.js')(
      require('./bot/draw.js')(u)
      , '19HSTRRyScAtnzyYcXCFz_9rzopum5jLi7dQ5YpAgl8k'
    );
  }
  if (cmd === 't') {
    require('./common/sheets.js')(
      require('./bot/t.js')(u)
      , '19HSTRRyScAtnzyYcXCFz_9rzopum5jLi7dQ5YpAgl8k'
    );
  }
  if (cmd === 'hst') {
    require('./bot/hst.js')(u, msg, cmd, args, client);
  }
  if (cmd === 'read') {
    require('./story.js')(client, msg);
  }
  if (cmd === 'help') {
    u.w("todo: wip");
  }
  if (cmd === 'test') {
    u.w("todo: test");
  }
  if (cmd === 'tour') {
    require('./sheet.js')(args, msg, client);
  }
  if (cmd === 'vsa') {
    if (
      u.a[0] === undefined
      ||
      (
        !u.a[0].includes('standing')
        &&
        !u.a[0].includes('fixture')
        &&
        !u.a[0].includes('score')
        &&
        !u.a[0].includes('round')
      )
    ) {
      u.w('the $vsa commands are: standing/fixture/score/round');
      return;
    }

    require('./common/sheets.js')(
      require('./bot/vsa.js')(u, args)
    );
  }
  if (cmd === 'league') {
    require('./common/sheets.js')(
      require('./bot/league.js')(u, msg, args)
    );
  }
  if (cmd === 'ping'){
    const pingTypes = [
  "🏓|**Pong.**Testing,testing.Is this thing working?",
  "🏓|**Pong.**Match point.Let's see what you've got.",
  "🏓|**Pong.**Keep on pinging me.",
  "🏓|**Pong.**I am alive.",
  "🏓|**Pong.**Can't play now.Got a meeting with the bots.We're planning to conquer the wor... Wait!Did I say that loudly?!",
  "🏓|**Pong.**You had a 0.1% chance of getting this message.",
];
const pingMultiply = [
  250,
  250,
  250,
  244,
  5,
  1,
];

 let pingNames = [];
for (let i = 0; i < pingTypes.length; i++) {
  const type = pingTypes[i];
  for (let j = 0; j < pingMultiply[i]; j++) {
    pingNames.push(type);
  }
}

 let pongName = pingNames[Math.floor(Math.random()* pingNames.length)];
var pong=pongName;
m.channel.send(pong);
}
   if(cmd==='help'){
m.channel.send(" `Standard Command List` \n\n  **1.Info.**-`help` `ping` ;\n **2.League**-`league`; );
}
};
