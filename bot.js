module.exports = (u, msg, cmd, args, client) => {
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
  if (cmd === 'league') {
    require('./common/sheets.js')(
      require('./bot/league.js')(u, msg, args)
    );
  }
};
