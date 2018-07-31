import SlackBots from 'slackbots';
import axios from 'axios';

const DEFAULT_CHANNEL = 'general';
const DEFAULT_PARAMS = { icon_emoji: ':chuck_norris:' };

class NorrisBot {
  constructor(settings = {}) {
    this.settings = settings;

    this.bot = new SlackBots({
      token: settings.token,
      name: settings.name
    });

    this.user = null;
    this.jokes = [];
  }

  run() {
    this.bot.on('start', this._onStart.bind(this));
  }

  /**
   * When our bot connects to the Slack server
   */
  async _onStart() {
    await this._loadBotUser();
    await this._checkApiConnection();
    this._postInitalMessageToChannel();
  }

  async _loadBotUser() {
    await this.bot
      .getUser(this.settings.name)
      .then(data => {
        this.user = data;
        // eslint-disable-next-line no-console
        console.log(`NorrisBot name: ${this.user.name}`);
      })
      .fail(err => {
        throw new Error(err);
      });
  }

  async _checkApiConnection() {
    const response = await axios.get('http://api.icndb.com/jokes/random');
    if (response.data && response.data.type === 'success') {
      // eslint-disable-next-line no-console
      console.log('NorrisBot ICNDb connection: true');
    } else {
      throw new Error('NorrisBot cannot connect to ICNDb API. Aborting...');
    }
  }

  async _postInitalMessageToChannel() {
    const channel = this.settings.channel || DEFAULT_CHANNEL;
    const params = this.settings.params || DEFAULT_PARAMS;
    await this.bot
      .postMessageToChannel(channel, `Hello ${channel}! Type `, params)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('NorrisBot initial message: posted');
      })
      .fail(() => {
        throw new Error('NorrisBot initial message: fail. Aborting...');
      });
  }
}

export default NorrisBot;
