const Discord = require("discord.js");

exports.help = {
    name: "ping",
    usage: "d!ping",
    permissions: "User",
    information: "Test if your connection can ping me.",
    category: "Miscellaneous"
}

exports.run = async (bot, message, args) => {
    message.channel.send('Pong!');
}