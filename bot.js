module.exports = (u, msg, cmd, args, client) => {
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
};
