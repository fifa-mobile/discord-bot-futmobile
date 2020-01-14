module.exports = (u, players, standings, cells) => {
  let id = u.a[1];
  for (let i = 0; i < cells.length; i++) {
    let cell = cells[i];
    if (id == (i + 1)) {
      if (u.a[2] === undefined) {
        cell.value = '-';
      } else {
        cell.value = u.a[2] + ' - ' + u.a[3];
      }
      cell.save();
      u.w('the fixture updated!');
      return;
    }
  }
};
