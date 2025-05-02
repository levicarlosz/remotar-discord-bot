
# Remotar Discord Bot

Um bot de Discord que busca e compartilha automaticamente vagas de trabalho remoto do site [Remotar.com.br](https://remotar.com.br) diretamente em um canal do seu servidor Discord.

## 📋 Sobre o Projeto

Este bot foi desenvolvido para ajudar membros de comunidades (como servidores universitários) a encontrar oportunidades de trabalho remoto. Ele realiza scraping do site Remotar a cada hora e envia automaticamente as novas vagas publicadas no dia para um canal específico do Discord.

## 📷 Como Vai Ficar no Seu Servidor

![image](https://github.com/user-attachments/assets/1351deec-9c98-4e9c-aeb2-99331c307154)

## 🔧 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org/) — Interação com a API do Discord
- [Puppeteer](https://pptr.dev/) — Web scraping das vagas
- [dotenv](https://www.npmjs.com/package/dotenv) — Gerenciamento de variáveis de ambiente
- [Yarn](https://yarnpkg.com/) — Gerenciamento de dependências

## ⚙️ Funcionalidades

- Scraping automático das vagas no Remotar.com.br
- Filtragem inteligente para mostrar apenas as vagas publicadas **hoje**
- Envio das vagas diretamente em um canal do Discord, com formatação amigável
- Mensagens de erro em caso de falha durante o scraping
- Modularização do código para facilitar manutenção e extensões futuras
- Inclusão de informação de origem da vaga (ex: “Via Inhire”)

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16.x ou superior)
- Yarn
- Conta no Discord e um bot registrado no [Discord Developer Portal](https://discord.com/developers/applications)

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/levicarlosz/remotar-discord-bot.git
   cd remotar-discord-bot
   ```

2. Instale as dependências:

   ```bash
   yarn install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   DISCORD_API_KEY=seu_token_do_bot_discord
   DISCORD_CHANNEL_ID=id_do_canal_para_enviar_vagas
   REMOTAR_URL=https://remotar.com.br/jobs
   ```

4. Execute o bot:

   ```bash
   yarn start
   ```

## 📝 Como Usar

1. Adicione o bot ao seu servidor Discord usando o link de OAuth2 gerado no Discord Developer Portal.
2. No arquivo `.env`, configure o ID do canal onde deseja receber as vagas.
3. Execute o bot com `yarn start`.

O bot buscará automaticamente por novas vagas a cada hora e enviará somente as vagas publicadas no dia.

## 🧠 Estrutura do Projeto

```bash
remotar-discord-bot/
├── src/
│   ├── bot.js              # Inicialização e login do bot
│   ├── config.js           # Variáveis de ambiente e validação
│   ├── jobs/
│   │   └── fetchJobs.js    # Scraping e envio de mensagens
│   └── utils/
│       └── dateUtils.js    # Funções de filtro e normalização de datas
├── .env.example            # Exemplo de configuração
└── README.md               # Documentação do projeto
```

## 📁 Exemplo de `.env`

```env
DISCORD_API_KEY=coloque_seu_token_aqui
DISCORD_CHANNEL_ID=coloque_o_id_do_canal_aqui
REMOTAR_URL=https://remotar.com.br/jobs
```

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

### Como contribuir:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## 📜 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas, sugestões ou feedback, abra uma issue no repositório ou entre em contato pelo Discord.

---

⭐ Desenvolvido para ajudar estudantes e profissionais na busca por oportunidades remotas com mais praticidade.
