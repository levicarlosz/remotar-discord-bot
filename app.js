require("dotenv").config();


const { Client, GatewayIntentBits } = require("discord.js");
const puppeteer = require("puppeteer");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const DISCORD_TOKEN = process.env.DISCORD_API_KEY;
const CHANNEL_ID = process.env.DISCORD_CHANNEL_ID;
const REMOTAR_URL = process.env.REMOTAR_URL;
const DATE = process.env.DATE;


const timeElapsed = Date.now()
const date = new Date(timeElapsed);
const options = { year: 'numeric', month: 'long', day: 'numeric' };

client.once("ready", () => {
  console.log(`Bot ${client.user.tag} está online!`);
  fetchJobs();
  setInterval(fetchJobs, 3600000);
});

async function fetchJobs() {
  let browser;
  try {
    // Inicia o navegador
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navega até a página de vagas do Remotar
    await page.goto(REMOTAR_URL, {
      waitUntil: "networkidle2",
    });

    // Esperar elementos carregarem
    await page.waitForSelector("div.css-1m4ly91", { timeout: 30000 });

    // Extrair dados
    const jobs = await page.evaluate(() => {
      return [...document.querySelectorAll("div.css-1m4ly91")].map((job) => {
        const titleElement = job.querySelector("p.h1");
        const companyElement = job.querySelector("p.company");
        const locationElement = job.querySelector(
          "div.subheading__company-info p"
        );
        const tags = [...job.querySelectorAll("a.css-z1wlc8")]
          .map((tag) => tag.innerText.trim())
          .join(", ");
        const linkElement = job.querySelector('a[href^="/job/"]');
        const dateElement = job.querySelector("p.created-at");

        return {
          title: titleElement ? titleElement.innerText.trim() : "Sem título",
          company: companyElement
            ? companyElement.innerText.trim()
            : "Sem empresa",
          location: locationElement
            ? locationElement.innerText.trim()
            : "Sem localização",
          tags,
          link: linkElement
            ? `https://remotar.com.br${linkElement.getAttribute("href")}`
            : "Sem link",
          date: dateElement ? dateElement.innerText.trim() : "Sem data",
        };
      });
    });

    // Fecha o navegador
    await browser.close();

    // Filtra as vagas do dia
    const todayJobs = jobs.filter((job) => job.date === DATE);

    // Envia as vagas do dia para o canal do Discord
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      if (todayJobs.length > 0) {
        todayJobs.forEach((job, index) => {
          const message = `
----------------------------------------
**Data:** ${date.toLocaleDateString('pt-BR', options)}    
**Título:** ${job.title}
**Empresa:** ${job.company}
**Localização:** ${job.location}
**Tipo de Trabalho:** ${job.tags}
**Link:** ${job.link}
----------------------------------------
                    `;
          channel.send(message);
        });
        console.log(`Encontradas ${todayJobs.length} vagas para ${DATE}.`);
      } else {
        channel.send(`Nenhuma vaga nova encontrada ${DATE}.`);
        console.log(`Nenhuma vaga nova encontrada ${DATE}.`);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);

    // Fecha o navegador em caso de erro
    if (browser) {
      await browser.close();
    }

    // Envia uma mensagem de erro para o canal do Discord
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send(
        "Ocorreu um erro ao buscar as vagas. Verifique os logs para mais detalhes."
      );
    }
  }
}

client.login(DISCORD_TOKEN);
