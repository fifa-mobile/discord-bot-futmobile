module.exports = (args, msg) => {
  console.log('args:', args);
  msg.channel.send('processing, please wait...');
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
          if (sheet.title === 'tour' && args[0] == 'fixtures') {
            require('./tour-fixtures')(args, msg, sheet);
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