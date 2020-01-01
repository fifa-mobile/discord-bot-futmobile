require('./common/home.js')();
let u = require('./common/Util.js');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  u.setMsg(msg);
  const parser = require('discord-command-parser');
  const prefix = "$";
  const parsed = parser.parse(msg, prefix);
  const commands = [
    'help', 'league', 'test', 'tour',
    'read',
  ];
  if(!parsed.success) return;
  if (commands.indexOf(parsed.command) === -1) {
    u.w(`no command ${parsed.command}. try $help`);
    return;
  }
  const args = parsed.arguments;
  require('./bot.js')(u, msg, parsed.command, args);
});

let auth = false;
try {
  auth = require('./auth.json');
} catch (e) {
  auth = JSON.parse(process.env.auth);
}
client.login(auth.token);
