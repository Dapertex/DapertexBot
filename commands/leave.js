const Discord = require("discord.js");

exports.help = {
    name: "leave",
    usage: "d!leave",
    permissions: "User",
    information: "Leaves the voice channel.",
    category: "Music"
}

exports.run = async (bot, message, args) => {
    const voiceChannel = message.member.voiceChannel;

    if (!voiceChannel) return message.reply(":x: You are not in a voice channel!");
    return message.reply(":white_check_mark: Left the voice channel.") && voiceChannel.leave();
}