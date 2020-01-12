
module.exports = (u, msg, cmd, args, client) => {
  let user = msg.author;
  let guild = msg.guild;
  let roles = guild.roles;
  let member = guild.member(user);
  let name = member ? member.displayName : member.name;
  let participantRole = roles.find(e => {
    return e.name === 'participant';
  });
  console.log(name, guild.name, participantRole.name);
  u.w(`hst`);
};
