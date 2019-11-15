const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const parser = require('discord-command-parser');
const prefix = "$";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  console.log(`getting a message: ${msg}`);
  const parsed = parser.parse(msg, prefix);
  const commands = ['help', 'league'];
  if(!parsed.success) return;
  if (commands.indexOf(parsed.command) === -1) {
    msg.channel.send(`no command ${parsed.command}. try $help`);
    return;
  }
  const args = parsed.arguments;
  let options = {
    orderby: 'total',
    reverse: true,
  };
  if (args[0]) options.orderby = args[0];
  if (args[1]) options.limit = args[1];
  if (args[2]) options.reverse = false;
  if (parsed.command === 'help') {
    const reply = "```\n"
      + "prefix $; $help - to show this message"
      + "\n"
      + "available commands:"
      + "\n"
      + "$league [ orderBy | limit | reverse ]"
      + "\n"
      + "example: $league chm 5 0 - to get 5 lowest CHM rank"
      + "\n"
      + "options:"
      + "\n"
      + " - orderBy: name, ovr, chm, fans"
      + "\n"
      + " - limit: number (1,2,3...n)"
      + "\n"
      + " - reverse: any string (0, false, etc.) Z-A 10-1 big to small"
      + "\n```"
    ;
    msg.channel.send(reply);
  }
  if (parsed.command === 'league') {
    msg.channel.send('processing, please wait...');
    var GoogleSpreadsheet = require('google-spreadsheet');
    var async = require('async');
     
    var doc = new GoogleSpreadsheet('1kK6L2u0G5KNbUCFBuyBheqFWbXZdH5ZcDHEkbuoE6qo');
    var sheet;
     
    async.series([
      function setAuth(step) {
        var creds = require('./pk.json');
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
          for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let str =
              (i + 1).toString().padStart(3, ' ') + '. ' +
              row.name.padEnd(24, '.') +
              [
                row.ovr.padStart(4, ' '),
                row.chm.padStart(4, ' '),
                row.total.padStart(4, ' '),
              ].join(" ")
            ;
            o += str + "\n";
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
});

client.login(auth.token);
