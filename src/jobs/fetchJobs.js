const puppeteer = require("puppeteer");
const formatJobMessage = require("../utils/formatJobMessage");
const { REMOTAR_URL, DATE, CHANNEL_ID } = require("../config");

module.exports = async function fetchJobs(client) {
  let browser;
  const timeElapsed = Date.now();
  const date = new Date(timeElapsed);

  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(REMOTAR_URL, { waitUntil: "networkidle2" });
    await page.waitForSelector("div.css-1m4ly91", { timeout: 30000 });

    const jobs = await page.evaluate(() => {
      return [...document.querySelectorAll("div.css-1m4ly91")].map((job) => {
        const titleElement = job.querySelector("p.h1");
        const companyElement = job.querySelector("p.company");
        const locationElement = job.querySelector("div.subheading__company-info p");
        const tags = [...job.querySelectorAll("a.css-z1wlc8")]
          .map((tag) => tag.innerText.trim())
          .join(", ");
        const linkElement = job.querySelector('a[href^="/job/"]');
        const dateElement = job.querySelector("p.created-at");

        return {
          title: titleElement ? titleElement.innerText.trim() : "Sem título",
          company: companyElement ? companyElement.innerText.trim() : "Sem empresa",
          location: locationElement ? locationElement.innerText.trim() : "Sem localização",
          tags,
          link: linkElement ? `https://remotar.com.br${linkElement.getAttribute("href")}` : "Sem link",
          date: dateElement ? dateElement.innerText.trim() : "Sem data",
        };
      });
    });

    await browser.close();

    const todayJobs = jobs.filter((job) => job.date === DATE);
    const channel = client.channels.cache.get(CHANNEL_ID);

    if (channel) {
      if (todayJobs.length > 0) {
        todayJobs.forEach((job) => {
          channel.send(formatJobMessage(job, date));
        });
        console.log(`Encontradas ${todayJobs.length} vagas para ${DATE}.`);
      } else {
        channel.send(`Nenhuma vaga nova encontrada ${DATE}.`);
        console.log(`Nenhuma vaga nova encontrada ${DATE}.`);
      }
    }
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    if (browser) await browser.close();
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send("Ocorreu um erro ao buscar as vagas. Verifique os logs para mais detalhes.");
    }
  }
};
