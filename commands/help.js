const Discord = require("discord.js"),
      fs = require("fs");

exports.help = { // Needed For Help
    name: "help",
    usage: "d!help",
    permissions: "User",
    information: "Shows a list of commands",
    category: "General"
}

exports.run = async (bot, message, args) => { // Exported Async Function
    try {
        let command = args[0];

        if (!command) {
            fs.readdir("./commands/", (err, files) => {
                if (err) throw err;

                let general = []; // lets sort them in different categories
                let fun = [];
                let nsfw = [];
                let moderation = [];
                let utilities = [];

                let js = files.filter(f => f.split(".").pop() === "js");
                js.forEach((f) => {
                    let commands = require(`./${f}`);
                    if (commands.help.category.toLowerCase() == "general") {
                        general += `d!${commands.help.name}\n`;
                    } else if (commands.help.category.toLowerCase() == "fun") {
                        fun += `d!${commands.help.name}\n`;
                    } else if (commands.help.category.toLowerCase() == "nsfw") {
                        nsfw += `d!${commands.help.name}\n`;
                    } else if (commands.help.category.toLowerCase() == "utility") {
                        utilities += `d!${commands.help.name}\n`;
                    } else if (commands.help.category.toLowerCase() == "moderation") {
                        moderation += `d!${commands.help.name}\n`;
                    } else {
                        return;
                    }
                });

                message.channel.send(
                    "```ini\n[Here are the list of available commands]\n\n[General]\n"+
                    general+
                    "\n[Fun]\n"+
                    fun+
                    "\n[Utility]\n"+
                    utilities+
                    "\n[NSFW]\n"+
                    nsfw+
                    "\n[Moderation]\n"+
                    moderation+
                    "\n[For more information about a command, just enter `d!help (command)`]"
                )
            });
        } else {
            let cmd = bot.commands.get(command);

            message.channel.send(
                "```ini\n[d!" + cmd.help.name + "]\n\n[Information]\n" + cmd.help.information + "\n\n[Usage]\n" + cmd.help.usage + "\n\n[Permissions]\n" + cmd.help.permissions +"\n\n[For more information about a command, just enter `d!help (command)`]"
            );
        }
    } catch (err) {
        throw err;
    }
}