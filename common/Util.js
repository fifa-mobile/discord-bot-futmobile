class Util {
  static w(str, hl = '') {
    return this.msg.channel.send(`\`\`\`${hl}\n${str}\n\`\`\``);
  }

  static wd(strs, time = 1000, hl = '') {
    if (strs.length < 1) {
      this.w('the string length is not enough!');
      return;
    }
    let str = strs[0];
    this.w(str).then( msg => {
      for (let i = 1; i < strs.length; i++) {
        str = strs[i];
        ((str, i) => {
          setTimeout(() => {
            msg.edit(`\`\`\`${hl}\n${str}\n\`\`\``);
          }, (time * i));
        })(str, i);
      }
    });
  }

  static set(client, msg, args) {
    this.c = client;
    this.msg = msg;
    this.author = msg.author;
    this.g = msg.guild;
    this.roles = this.g.roles;

    this.fU = msg.mentions.users.first();
    this.member = this.g.member(this.author);

    this.a = args;
  }

  static getMembers(roleName) {
    let members = this.g.members.filter(member => {
      return member.roles.find(e => e.name === roleName);
    }).map(r => { 
      return this.g.member(r.user);
    });

    return members;
  }

  static getRole(mention) {
    const string = mention.join(' ');
    const matches = mention[0].match(/^<@&!?(\d+)>$/);
    try {
      const id = matches[1];
      return this.g.roles.get(id);
    } catch (e) {
      return this.g.roles.find(
        e => e.name === string
      );
    }
    return false;
  }
}

module.exports = Util;
