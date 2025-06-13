const fs = require('fs');
const path = require('path');

module.exports = function formatJobMessage(job, date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formatted = {
    data: date.toLocaleDateString("pt-BR", options),
    titulo: job.title,
    empresa: job.company,
    plataforma: job.location,
    tipoDeTrabalho: job.tags,
    link: job.link,
  };

  const wasSaved = saveLog(formatted); // Só salva se não for duplicado

  // Se já foi salva, não retorna nada (ou pode retornar mensagem alternativa)
  if (!wasSaved) return null;

  return `
  ----------------------------------------
  **Data:** ${formatted.data}    
  **Título:** ${formatted.titulo}
  **Empresa:** ${formatted.empresa}
  **Plataforma:** ${formatted.plataforma}
  **Tipo de Trabalho:** ${formatted.tipoDeTrabalho}
  **Link:** ${formatted.link}
  ----------------------------------------`;
};

function saveLog(entry) {
  const filePath = path.join(__dirname, 'log.json');

  let log = [];
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    log = content ? JSON.parse(content) : [];
  }

  // Verifica se o link já está no log
  const isDuplicate = log.some(item => item.link === entry.link);
  if (isDuplicate) return false;

  // Salva nova entrada
  log.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(log, null, 2), 'utf-8');
  return true;
}
