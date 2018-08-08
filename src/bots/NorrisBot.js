import SlackBots from 'slackbots';
import axios from 'axios';

const DEFAULT_CHANNEL = 'general';
const DEFAULT_PARAMS = { icon_emoji: ':chuck_norris:' };
const API_URL = 'http://api.icndb.com/jokes/random';
/**
 *  The mighty "NorrisBot" is a bot that basically kicks asses!!!
 *  To put it another way, it brings a bit of Chuck Norris into the Slack!
 */
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

  /**
   * Starts the bot
   */
  run() {
    this.bot.on('start', this._onStart.bind(this));
    this.bot.on('message', this._onMessage.bind(this));
  }

  /**
   * When the bot connects to the Slack server event
   */
  async _onStart() {
    await this._loadBotUser();
    await this._checkApiConnection();
    this._postInitalMessageToChannel();
  }

  /**
   * Load bot user
   */
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

  /**
   * Checks if the bot can reach the API
   */
  async _checkApiConnection() {
    const response = await axios.get(API_URL);
    if (response.data && response.data.type === 'success') {
      // eslint-disable-next-line no-console
      console.log('NorrisBot ICNDb connection: true');
    } else {
      throw new Error('NorrisBot cannot connect to ICNDb API. Aborting...');
    }
  }

  /**
   * Post initial message to CHannel
   */
  async _postInitalMessageToChannel() {
    const channel = this.settings.channel || DEFAULT_CHANNEL;
    const params = this.settings.params || DEFAULT_PARAMS;
    await this.bot
      .postMessageToChannel(
        channel,
        `Hello ${channel}! Type 'norrisbot-help' to check what I'm capable!`,
        params
      )
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('NorrisBot initial message: posted');
      })
      .fail(() => {
        throw new Error('NorrisBot initial message: fail. Aborting...');
      });
  }

  /**
   * When the bot receives a message
   *
   * @param {*} message
   */
  _onMessage(message) {
    // eslint-disable-next-line no-console
    if (
      this._isChatMessage(message) &&
      !this._isFromNorrisBot(message) &&
      this._isMentioningChuckNorris(message)
    ) {
      this._replyWithRandomJoke();
    }
  }

  /**
   * Checks if the event represents a chat message
   *
   * @param {object} message
   */
  _isChatMessage(message) {
    return message.type === 'message' && Boolean(message.text);
  }

  /**
   * Checks if the message come from a user that is different from the NorrisBot (to avoid loops)
   *
   * @param {object} message
   */
  _isFromNorrisBot(message) {
    return message.user === this.user.id;
  }

  /**
   * Checks if the message mentions Chuck Norris
   * @param {object} message
   */
  _isMentioningChuckNorris(message) {
    return message.text.toLowerCase().includes('chuck norris');
  }

  /**
   *
   * @param {object} message
   */
  async _replyWithRandomJoke() {
    const channel = this.settings.channel || DEFAULT_CHANNEL;
    const params = this.settings.params || DEFAULT_PARAMS;
    const response = await axios.get(API_URL);
    if (response.data && response.data.type === 'success') {
      this.bot.postMessageToChannel(channel, response.data.value.joke, params);
    }
  }
}

export default NorrisBot;
