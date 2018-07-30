import SlackBots from "slackbots";

/**
 * To be able to extend slackbots, we will need to add to .babelrc
 * "exclude": [ "transform-es2015-classes" ]
 */

const bot = new SlackBots({
  token: "xoxb-396722210992-397582760805-O1lt2o9E7cicbcGC4pEHpMsI",
  name: "chuck_norris_bot"
});

// TODO: use node.js json database to save is first run

bot.on("start", () => {
  console.log("bot :: start");
  const channel = "general";
  const params = { icon_emoji: ":cat:" };
  bot.postMessageToChannel(channel, `Hello ${channel}!`, params);
});
