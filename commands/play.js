const Discord = require("discord.js");
const ytdl = require("ytdl-core");

exports.help = {
    name: "play",
    usage: "d!play (url)",
    permissions: "User",
    information: "Plays music.",
    category: "Music"
}

exports.run = async (bot, message, args) => {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.reply(":x: You have to be in a voice channel!");
    const permissions = voiceChannel.permissionsFor(message.client.user);

    if (!permissions.has("CONNECT")) return message.reply(":x: I need the permission, \"CONNECT\" to connect to the voice channel.");
    if (!permissions.has("SPEAK")) return message.reply(":x: I need the permission, \"SPEAK\", to speak in this channel.");

    try {
        var connection = await voiceChannel.join();
    } catch (err) {
        throw err;
        message.reply(`I couldn't connect to the voice channel due to this error: ${err.message}`);
    }

    if (!args[0]) return message.reply(":x: You didn't enter a link!");

    const dispatcher = connection.playStream(ytdl(args[0]))
        .on("end", () => {
            return message.reply(":white_check_mark: Song has ended!") && voiceChannel.leave();
        })
        .on("error", (err) => { throw err; });
    dispatcher.setVolumeLogarithmic(5/5);
}