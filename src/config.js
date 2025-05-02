require("dotenv").config();

if (!DISCORD_TOKEN || !CHANNEL_ID || !REMOTAR_URL || !DATE) {
  throw new Error("Uma ou mais variáveis de ambiente estão faltando.");
}


module.exports = {
  DISCORD_TOKEN: process.env.DISCORD_API_KEY,
  CHANNEL_ID: process.env.DISCORD_CHANNEL_ID,
  REMOTAR_URL: process.env.REMOTAR_URL,
  DATE: process.env.DATE,
};
