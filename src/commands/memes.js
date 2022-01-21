// const Canvas = require("canvas");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// const { MessageAttachment } = require("discord.js");
module.exports = {
  name: "memes",
  description: "sends memes",

  async execute(message) {
    // const canvas = Canvas.createCanvas(1280, 720);
    // const context = canvas.getContext("2d");

    const randomMeme = await fetch("https://meme-api.herokuapp.com/gimme").then(
      (response) => response.json()
    );
    // console.log(randomMeme.url);

    // const background = await Canvas.loadImage(randomMeme.url);
    // context.drawImage(background, 0, 0, canvas.width, canvas.height);

    // const attachment = new MessageAttachment(canvas.toBuffer(), "meme.png");
    // message.channel.send({ files: [attachment] });
    message.channel.send(randomMeme.url);
  },
};
