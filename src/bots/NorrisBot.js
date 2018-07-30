import SlackBots from 'slackbots';

const DEFAULT_CHANNEL = 'general';
const DEFAULT_PARAMS = { icon_emoji: ':cat:' };

class NorrisBot {
  constructor(auth, settings = {}) {
    this.settings = settings;

    this.bot = new SlackBots({
      token: auth.token,
      name: auth.name,
    });
  }

  run() {
    // eslint-disable-next-line no-console
    console.log('Run NorrisBot, run...');
    this.bot.on('start', this.onStart.bind(this));
  }

  onStart() {
    const channel = this.settings.channel || DEFAULT_CHANNEL;
    const params = this.settings.params || DEFAULT_PARAMS;
    this.bot.postMessageToChannel(channel, `Hello ${channel}!`, params);
  }
}

export default NorrisBot;
