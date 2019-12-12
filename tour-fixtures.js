module.exports = (args, msg, sheet) => {
  sheet.getCells({
    'min-row': 1,
    'max-row': 10,
    'return-empty': !true,
  }, (err, cells) => {
    console.log(err);
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      console.log(`r#${cell.row}c#${cell.col}: ${cell.value}`);
    }
  });
};
