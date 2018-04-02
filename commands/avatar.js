const Discord = require("discord.js");

exports.help = {
    name: "avatar",
    usage: "d!avatar",
    permissions: "User",
    information: "Fetch someone's Discord avatar.",
    category: "Miscellaneous"
}

exports.run = async (bot, message, args) => {
    if(!message.mentions.members.size) {

        const picEmbed = new Discord.RichEmbed()
        .setColor('#22A7F0')
        .setTitle('Click here to get your avatar')
        .addField('Requested by : ' , message.author)
        .setURL(message.author.displayAvatarURL)
        .setImage(message.author.displayAvatarURL)
        .setFooter("By DapertexBot");

        message.channel.send(picEmbed);
    }

    message.mentions.members.map(user => {
        const member = user.username;
        const memberavatar = user.displayAvatarURL;

        const picEmbedMention = new Discord.RichEmbed()
        .setColor('#22A7F0')
        .setTitle('Click here to get your avatar')
        .addField('Requested by : ' , message.reply)
        .setURL(memberavatar)
        .setImage(memberavatar)
        .setFooter("By DapertexBot");

        message.channel.send(picEmbedMention);  
    });
}