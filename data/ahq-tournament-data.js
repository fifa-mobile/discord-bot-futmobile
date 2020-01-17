function showParticipants(res, sheet, count) {
  sheet.getCells({
    'min-row': 1,
    'max-row': count,
    'min-col': 1,
    'max-col': 1,
    'return-empty': true,
  }, (e, cells) => {
    const data = {
      type: 'locked',
      content: cells.map(e => e.value),
    };
    res.write(JSON.stringify(data));
    res.end();
  });
}

function main(u, res, sheets) {
  let sheet = sheets.find(e => e.title === 'data');
  let pSheet = sheets.find(e => e.title === 'participants');
  if (!sheet) {
    u.w('data sheet not found!');
    return;
  }
  sheet.getRows({
    offset: 1,
    limit: 1,
  }, (e, rows) => {
    let data = {
      type: 'unlocked',
      content: {},
    };
    for(let i = 0; i < rows.length; i++) {
      let row = rows[i];
      data.content.role = row.role;
      data.content.date = row.date;
      data.content.count = parseInt(row.count);
      data.content.locked = (row.locked === 'TRUE');
      data.content.prefix = row.prefix;
    }
    console.log(data);
    if (data.locked) {
      showParticipants(res, pSheet, data.count);
      return;
    }
    res.write(JSON.stringify(data));
    res.end();
    return;
  });
}

module.exports = (u, res) => {
  this.process = sheets => {
    main(u, res, sheets);
  };
  return this;
};
