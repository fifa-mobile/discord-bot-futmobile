module.exports = (client, msg) => {
  let channel = client.channels.find(
    ch => ch.name === 'x' || ch.name === 'one_word_story'
  );
  if (channel) {
    console.log('channel found!');
  }
  if (
    msg.channel.name === 'x'
    || msg.channel.name === 'one_word_story'
  ) {
    msg.channel.fetchMessages().then(
      messages => {
        console.log('messages count: '+messages.size);
        let story = [];
        let msgs = messages.array();
        for (let i = 0; i < msgs.length; i++) {
          let m = msgs[i];
          if (
            m.toString() === '$read'
            || m.toString().startsWith('.....')
          ) continue;
          story.push(m);
        }
        story.reverse();
        msg.channel.send('.....'+story.join(' '));
      }
    );
  } else {
    msg.channel.send("can't arrange the story here...");
  }
  console.log('story end...', msg.channel.name);
};
