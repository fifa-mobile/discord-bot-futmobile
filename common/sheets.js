module.exports = (m) => {
  let GoogleSpreadsheet = require('google-spreadsheet');
  let async = require('async');
  let doc = new GoogleSpreadsheet('1kK6L2u0G5KNbUCFBuyBheqFWbXZdH5ZcDHEkbuoE6qo');
  let sheets;

  async.series([
    function setAuth(step) {
      var creds = false;
      try {
        creds = require('../pk.json');
      } catch (e) {
        creds = JSON.parse(process.env.pk);
      }
      doc.useServiceAccountAuth(creds, step);
    },
    function getInfoAndWorksheets(step) {
      doc.getInfo(function(err, info) {
        console.log(
          'Loaded doc: '+info.title+' by '+info.author.email);
        sheets = info.worksheets;
        sheets.forEach(sheet => {
          console.log(
            'sheet 1: '+sheet.title+' '+sheet.rowCount
            +'x'+sheet.colCount);
        });
        m.process(sheets);
        step();
      });
    },
  ], function(err){
      if( err ) {
        console.log('Error: '+err);
      }
  });
};
