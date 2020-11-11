const ENV = require("dotenv");
ENV.config();

var TelegramBot = require("node-telegram-bot-api"),
  // Be sure to replace YOUR_BOT_TOKEN with your actual bot token on this line.
  telegram = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true,
  });

const TEXT = 0;

const bestemmie = {
  0: { val: "Dio cane", wrongs: ["Dio acne", "Dicoane"] },
  1: { val: "Dio porco", wrongs: ["Diporco"] },
  2: { val: "Porco dio", wrongs: ["Provo dio"] },
};

setBestemmia = (message) => {
  let rnd = parseInt(Math.random() * 3);
  let bestemmia = bestemmie[rnd].val;

  let nRetry = parseInt(Math.random() * 3) + 2;
  let wrong =
    bestemmie[rnd].wrongs[
      parseInt(Math.random() * bestemmie[rnd].wrongs.length)
    ];

  for (let i = 0; i < nRetry; i++) {
    setTimeout(() => {
      telegram.sendMessage(message.chat.id, wrong);
    }, 1000 * i);
  }

  setTimeout(() => {
    telegram.sendMessage(message.chat.id, bestemmia);
  }, 1000 * (nRetry + 2));
};

telegram.on("text", (message) => {
  let msg = message.text.toLowerCase();
  switch (msg) {
    case "bestemmia":
      // telegram.sendMessage(message.chat.id, "Dio cane");
      setBestemmia(message);
      break;
    case "/start":
      telegram.sendMessage(message.chat.id, "Ciao vez");
      break;
    default:
      telegram.sendMessage(message.chat.id, "Oh vez non capisco un cazzo");
      setTimeout(() => {
        telegram.sendMessage(message.chat.id, "TIOKANEEEEE 🚀🚀🚀🚀🚀🚀🚀");
      }, 1500);
  }
});
