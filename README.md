# Remotar Discord Bot

Um bot de Discord que busca e compartilha automaticamente vagas de trabalho remoto do site Remotar.com.br para seu servidor Discord.

## 📋 Sobre o Projeto

Este bot foi desenvolvido para auxiliar os membros de um servidor Discord universitário a encontrar oportunidades de trabalho remoto. Ele faz scraping do site Remotar.com.br em intervalos regulares (a cada hora) e envia as novas vagas do dia para um canal específico no Discord.

## 📷 Como Vai Ficar no Seu Servidor
![image](https://github.com/user-attachments/assets/df1c3eae-a31d-4f27-b060-4277132479bc)


## 🔧 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org/) - Para interação com a API do Discord
- [Puppeteer](https://pptr.dev/) - Para web scraping 
- [dotenv](https://www.npmjs.com/package/dotenv) - Para gerenciamento de variáveis de ambiente
- [Yarn](https://yarnpkg.com/) - Para gerenciamento de dependências

## ⚙️ Funcionalidades

- Busca automática de vagas no site Remotar
- Filtragem de vagas publicadas no dia
- Envio formatado das vagas para um canal específico do Discord
- Execução periódica (a cada hora)
- Tratamento de erros com notificações no Discord

## 🚀 Instalação e Configuração

### Pré-requisitos

- Node.js (versão 16.x ou superior)
- Yarn
- Uma conta no Discord e um bot criado no [Discord Developer Portal](https://discord.com/developers/applications)

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
   DATE=data_conforme_o_site_do_remotar
   ```

4. Execute o bot:
   ```bash
   yarn start
   ```

## 📝 Como Usar

1. Adicione o bot ao seu servidor Discord usando o link de OAuth2 gerado no Discord Developer Portal
2. Defina o ID do canal onde deseja receber as vagas no arquivo `.env`
3. Execute o bot para começar a receber as vagas

O bot irá executar automaticamente quando iniciado e buscará novas vagas a cada hora.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

### Como contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Contato

Para dúvidas ou sugestões, abra uma issue no repositório ou entre em contato através do Discord.

---

⭐ Desenvolvido para auxiliar estudantes universitários na busca por oportunidades de trabalho remoto.