module.exports = function formatJobMessage(job, date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return `
  ----------------------------------------
  **Data:** ${date.toLocaleDateString("pt-BR", options)}    
  **Título:** ${job.title}
  **Empresa:** ${job.company}
  **Plataforma:** ${job.location}
  **Tipo de Trabalho:** ${job.tags}
  **Link:** ${job.link}
  ----------------------------------------`;
};
