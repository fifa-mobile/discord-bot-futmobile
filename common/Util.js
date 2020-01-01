class Util {
  static w(str, hl = '') {
    this.msg.channel.send(`\`\`\`${hl}\n${str}\n\`\`\``);
  }

  static setMsg(msg) {
    this.msg = msg;
  }
}
Util.msg = false;

module.exports = Util;
