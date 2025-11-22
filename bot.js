const { Client, Intents } = require('discord.js');

const botRoot = GetResourcePath(GetCurrentResourceName());
const config = require(`${botRoot}/config.js`);
let client = null;

function initBot() {
    if (client) return client;

    client = new Client({
        intents: Object.values(Intents.FLAGS),
        partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"],
        shards: "auto"
    });

    client.log = (msg) => console.log(`[OTHERPLANET:BOT] >> ${msg}`);

    client.on('ready', () => {
        client.log(`Connected as ${client.user.tag}`);
    });

    client.login(config.token).catch((err) => {
        console.error('[OTHERPLANET:BOT] Login error:', err);
    });

    return client;
}

async function getPremiumRanks(discordid) {
    const c = client || initBot();

    try {
        const guild = c.guilds.cache.get(config.server);
        let member = await guild.members.fetch(discordid);
        if (member) {
            let ranks = [];
            for (let index = 0; index < member._roles.length; index++) {
                const role = member._roles[index];
                if (config.ranks[role]) {
                    ranks.push({
                        roleId: role,
                        slots: config.ranks[role].slots
                    });
                }
            }
            return ranks.length ? ranks : false;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    initBot,
    getPremiumRanks
};