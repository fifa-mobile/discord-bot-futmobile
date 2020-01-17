class Util {
  static w(str, hl = '') {
    this.msg.channel.send(`\`\`\`${hl}\n${str}\n\`\`\``);
  }

  static set(client, msg, args) {
    this.c = client;
    this.msg = msg;
    this.author = msg.author;
    this.g = msg.guild;
    this.roles = this.g.roles;

    this.fU = msg.mentions.users.first();
    this.authorMember = this.g.member(this.author);

    this.a = args;
  }

  static getMembers(roleName) {
    let members = this.g.members.filter(member => {
      return member.roles.find(e => e.name === roleName);
    }).map(r => { 
      return this.g.member(r.user);
    });

    console.log(`${roleName} users:`);
    return members;
  }
}

module.exports = Util;
