const { Client, GatewayIntentBits } = require("discord.js");
const fetchJobs = require("../jobs/fetchJobs");
const { DISCORD_TOKEN } = require("../config");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once("ready", () => {
  console.log(`Bot ${client.user.tag} está online!`);
  fetchJobs(client);
  setInterval(() => fetchJobs(client), 3600000); // 1 hora
});

client.login(DISCORD_TOKEN);
