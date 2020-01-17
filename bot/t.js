function addParticipants(sheet, members) {
  sheet.clear(e => {
    if (e) {
      u.w('error clearing the sheet!');
      return;
    }
    sheet.getCells({
      'min-row': 1,
      'max-row': members.length,
      'min-col': 1,
      'max-col': 1,
      'return-empty': true,
    }, (err, cells) => {
      for (let i = 0; i < cells.length; i++) {
        let cell = cells[i], member = members[i];
        cell.value = member;
      }
      sheet.bulkUpdateCells(cells);
    });
  });
}

function main(u, sheets) {
  let sheet = sheets.find(e => e.title === 'data');
  let participantsSheet = sheets.find(e => e.title === 'participants');
  if (!sheet) {
    u.w('data sheet not found!');
    return;
  }
  sheet.getRows({
    offset: 1,
    limit: 1,
  }, (e, rows) => {
    let role, date = '';
    let row = null;
    for(let i = 0; i < rows.length; i++) {
      row = rows[i];
      role = row.role;
      date = row.date;
    }
    let members = 
      u.getMembers(role).map(
        e => 
          e.nickname
          ?e.nickname
          :`${e.user.username}#${e.user.discriminator}`
      );
    console.log(
      members.join('\n')
      , members.length
    );
    row.count = members.length;
    row.save(e => {
      if (e) {
        u.w('error saving data.count!');
        return;
      }
      addParticipants(participantsSheet, members);
    });
  });
}

module.exports = u => {
  this.process = sheets => {
    main(u, sheets);
  };
  return this;
};
