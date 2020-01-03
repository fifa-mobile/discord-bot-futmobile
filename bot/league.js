module.exports = (u, msg, args) => {
  this.process = sheets => {
    let options = {
      orderby: 'total',
      reverse: true,
    };
    if (args[0]) options.orderby = args[0];
    if (args[1]) options.limit = args[1];
    if (args[2]) options.reverse = false;

    const sheet = sheets[0];
    sheet.getRows(options, function( err, rows ){
      let o = "";
      let str =
        '#   ' +
        'name'.padEnd(16, ' ') +
        [
          'ovr'.padEnd(3, ' '),
          'chm'.padEnd(3, ' '),
          'total'.padEnd(5, ' '),
        ].join(" ")
      ;
      o += str + "\n";
      let init = true;
      let highest = 0;
      let limited = 0;
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (!row.name) continue;
        if (init) {
          highest = row.total;
          init = 0;
        }
        if (!limited && row.total < highest - 10) {
          o += ''.padEnd(42, '-') + "\n";
          limited = 1;
        }
        let str =
          (i + 1).toString().padStart(2, ' ') + '. ' +
          row.name.padEnd(16, '.') +
          [
            row.ovr.padStart(3, ' '),
            row.chm.padStart(3, ' '),
            row.total.padStart(5, ' '),
            row.last1==='1'?'✔️':
              (row.last1==='0'?'❌':' '),
            row.last2==='1'?'✔️':
              (row.last2==='0'?'❌':' '),
            row.last3==='1'?'✔️':
              (row.last3==='0'?'❌':' '),
          ].join(" ")
        ;
        o += str + "\n";
        if ( i === 11 ) {
          o += ''.padEnd(42, '-') + "\n";
        }
      }
      u.w(o);
    });
  };
  return this;
};
