module.exports = (args, msg, client) => {
  console.log('args:', args);
  var GoogleSpreadsheet = require('google-spreadsheet');
  var async = require('async');
   
  var doc = new GoogleSpreadsheet(
    '1kK6L2u0G5KNbUCFBuyBheqFWbXZdH5ZcDHEkbuoE6qo');
  var sheet;
   
  async.series([
    function setAuth(step) {
      var creds = false;
      try {
        creds = require('./pk.json');
      } catch (e) {
        creds = JSON.parse(process.env.pk);
      }
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log(
          'Loaded doc: '+info.title+' by '+info.author.email
        );
        for(let i = 0; i < info.worksheets.length; i++) {
          let sheet = info.worksheets[i];
          console.log(
            'sheet #'+i+' : '+sheet.title+' '+sheet.rowCount
            +'x'+sheet.colCount
          );
          if (
            sheet.title === 'tour' && args[0] === 'standing'
          ) {
            require('./tour-score')(args, msg, sheet, true);
            break;
          }
          if (
            sheet.title === 'tour' && args[0] === 'score'
          ) {
            if (!args[2] && !args[3]) {
              require('./tour-score')(args, msg, sheet);
              break;
            }
            if (
              !args[1] || !args[2] || !args[3]
            ) {
              msg.channel.send('ℹ|You need 3 arguments!');
              break;
            }
            if (
              !(!isNaN(args[1]) && args[1] > 0)
              &&
              !(!isNaN(args[2]) && args[2] > 0)
              &&
              !(!isNaN(args[3]) && args[3] > 0)
            ) {
              msg.channel.send(
                'ℹ|The arguments must be unsigned integers !');
              break;
            }
            require('./tour-score')(args, msg, sheet);
            break;
          }
          if (sheet.title === 'tour' && args[0] == 'fixtures') {
            require('./tour-fixtures')(args, msg, sheet, client);
            break;
          }
        }
        step();
      });
    },
  ], function(err){
      if( err ) {
        console.log('Error: '+err);
      }
  });
}
