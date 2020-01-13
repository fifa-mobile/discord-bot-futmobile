class Util {
  static w(str, hl = '') {
    this.msg.channel.send(`\`\`\`${hl}\n${str}\n\`\`\``);
  }

  static setMsg(msg) {
    this.msg = msg;
  }

  static setArgs(a) {
    this.a = a;
  }

  static setClient(c) {
    this.c = c;
  }
}
Util.msg = false;
Util.a = [];
Util.c = null;

module.exports = Util;
