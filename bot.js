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
msg.channel.send(pong);
}
   if(cmd==='help'){
msg.channel.send(" `Standard Command List` \n\n  **1.Info.**-`help` `ping` ;\n **2.League**-`league` `tour`; \n **3.Fun**- `read`;");
}
   if(cmd==='help help'){
msg.channel.send("**`$help`** \n **Use**:Used to show a list of commands.Also shows command specific help. \n **Command**:$help [command] \n\n **Example**:\n `$help`-Shows command list. \n `$help league`-Explains the use of the `league` command.");
}
   if(cmd==='help ping'){
msg.channel.send("**`$`** \n **Use**:Used to check if bot is running. \n **Command**:$ping \n\n **Example**:\n `$ping`-Bot answers if everything is good.");
}
   if(cmd==='help league'){
msg.channel.send("**`$`** \n **Use**:Used to get information on AHQ League. \n **Command**:$league `[orderBy | limit | reverse]` \n `orderBy`-name (alphabetical order),ovr (overall rating order),chem (chamistry order),total(overall rating+chemistry order)\n `limit`-number of players listed \n `reverse`-1(normal order),0(reversed order)\n\n **Example**:\n`$league`-Lists players based on their ovr+chm points. \n `$league name 15`-Lists first 15 players in alphabetical order. \n `$league ovr 10 0`-Lists last 10 players in ovr order.");
}
   if(cmd==='help tour'){
msg.channel.send("**`$tour`** \n **Use**:Used to get information on a certain H2H Tournament going on. \n **Command**:$tour `[fixtures | standing | score]` \n $tour fixtures `[user | played/left]` \n $tour score `<match_id>` `home_score` `away_score`\n\n **Example**:\n `$tour fixtures @user left`-shows a user's left fixtures \n `$tour standing`-shows tourney's current standing \n `$tour score 19 2 1`-updates match 19 with the 2-1 result");
}
   if(cmd==='help read'){
msg.channel.send("**`$read`** \n **Use**:Used to read the latest part of the history in #one_word_story which is accessible by Apprentice 3 or higher ranked users. \n **Command**:$read \n\n **Example**:\n `$read`-show latest part of the history");
}
};
