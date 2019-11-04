var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
 
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1kK6L2u0G5KNbUCFBuyBheqFWbXZdH5ZcDHEkbuoE6qo');
//var doc = new GoogleSpreadsheet('1Wwop6wr3ohAKT7bFxhy2CQu401DAxI168O_SintcfbQ');
var sheet;
 
async.series([
  function setAuth(step) {
    // see notes below for authentication instructions!
    var creds = require('./pk.json');
    // OR, if you cannot save the file locally (like on heroku)
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
    sheet.getRows({
      orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        console.log(
          row.name.padEnd(32, '.'),
          [
            row.ovr.padStart(4, ' '),
            row.chm.padStart(4, ' '),
            row.total.padStart(4, ' '),
          ].join("\t")
        );
      }
    });
    step();
  },
  function workingWithCells(step) {
  },
  /*
  function workingWithRows(step) {
    sheet.getRows({
      offset: 1,
      limit: 20,
      orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');
 
      rows[0].colname = 'new val';
      rows[0].save();
 
      rows[0].del();
 
      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-row': 1,
      'max-row': 5,
      'return-empty': true
    }, function(err, cells) {
      var cell = cells[0];
      console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
 
      cell.value == '1'
      cell.numericValue == 1;
      cell.formula == '=ROW()';
 
      cell.value = 123;
      cell.value = '=A1+B2'
      cell.save();
 
      cells[0].value = 1;
      cells[1].value = 2;
      cells[2].formula = '=A1+B1';
      sheet.bulkUpdateCells(cells);
 
      step();
    });
  },
  function managingSheets(step) {
    doc.addWorksheet({
      title: 'my new sheet'
    }, function(err, sheet) {
 
      sheet.setTitle('new title');
 
      sheet.resize({rowCount: 50, colCount: 20});
 
      sheet.setHeaderRow(['name', 'age', 'phone']);
 
      sheet.del();
 
      step();
    });
  }
  */
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});
