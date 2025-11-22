const botRoot = GetResourcePath(GetCurrentResourceName());
const { initBot, getPremiumRanks } = require(`${botRoot}/bot.js`);

initBot();

exports('getPremiumRanks', async (discordId) => {
    return await getPremiumRanks(discordId);
});