module.exports = (u, msg, cmd, args) => {
  let options = {
    orderby: 'total',
    reverse: true,
  };
  if (args[0]) options.orderby = args[0];
  if (args[1]) options.limit = args[1];
  if (args[2]) options.reverse = false;
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
    msg.channel.send('processing, please wait...');
    var GoogleSpreadsheet = require('google-spreadsheet');
    var async = require('async');
     
    var doc = new GoogleSpreadsheet('1kK6L2u0G5KNbUCFBuyBheqFWbXZdH5ZcDHEkbuoE6qo');
    var sheet;
     
    async.series([
      function setAuth(step) {
        var creds = false;
        try {
          creds = require('./pk.json');
        } catch (e) {
          creds = JSON.parse(process.env.pk);
        }
        var creds_json = {
          client_email: 'yourserviceaccountemailhere@google.com',
          private_key: 'your long private key stuff here'
        }
     
        doc.useServiceAccountAuth(creds, step);
      },
      function getInfoAndWorksheets(step) {
        doc.getInfo(function(err, info) {
          console.log('Loaded doc: '+info.title+' by '+info.author.email);
          sheet = info.worksheets[0];
          console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
          step();
        });
      },
      function workingWithRows(step) {
        sheet.getRows(options, function( err, rows ){
          console.log('Read '+rows.length+' rows');
          let o = "\n```\n";
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
              //break;
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
          console.log(o);
          msg.channel.send(o + "```");
        });
        step();
      },
      function workingWithCells(step) {
      },
    ], function(err){
        if( err ) {
          console.log('Error: '+err);
        }
    });
  }
};
