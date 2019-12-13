module.exports = (args, msg, sheet) => {
  sheet.getCells({
    'max-col': 7,
    'return-empty': !true,
  }, (err, cells) => {
    console.log(err);
    let data = [];
    let oldRow = 2;
    let dataRow = [];
    let heading = [];
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      console.log(`r#${cell.row}c#${cell.col}: ${cell.value}`);
      if (cell.row === 1) {
        heading.push(cell.value);
        continue;
      }
      if (oldRow !== cell.row) {
        data.push(dataRow.slice());
        dataRow = [];
      }
      oldRow = cell.row;
      dataRow.push(cell.value);
    }
    data.push(dataRow.slice());
    let AT = require('ascii-table');
    let table = AT.factory({
      heading: heading,
      rows: data,
    });
    console.log(heading, data, table.toString());
    msg.channel.send("```\n" + table + "```");
  });
};
