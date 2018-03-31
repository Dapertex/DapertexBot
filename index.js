const fs = require("fs");
const Discord = require("discord.js");

const bot = new Discord.Client({
    disableEveryone: true
});

const token = JSON.parse(fs.readFileSync("./token", "utf8")).token;

try {
    bot.token = token;
    bot.commands = new Discord.Collection();
} catch (err) {
    throw err;
}

/**
 * QUICK NOTICE FOR Dapu AND Error:
 * IF YOU WANT TO MAKE COMMANDS, CREATE A NEW .JS FILE,
 * (INSIDE THE COMMANDS DIRECTORY)
 * INSIDE IT WILL BE LIKE THIS:
 * 
 * EXAMPLE:
 * 
 * const Discord = require("discord.js");
 * 
 * exports.help = {
 *      name: "command",
 *      usage: "d!command",
 *      permissions: "User",
 *      information: "Sends a message to a channel.",
 *      category: "None"
 * }
 * 
 * exports.run = async (bot, message, args) => {
 *      message.channel.send("Hello this is a working command");
 * }
 * 
 * I'LL TRY TO DO THE REST OF THE STUFF IF THERE ARE ERRORS.
 * 
 * IF YOU NEED MORE HELP FOR COMMAND HANDLERS,
 * JUST SEARCH IN YOUTUBE.
 */

fs.readdir("./commands/", (err, files) => {
    if (err) throw err;

    let jsFiltered = files.filter(f => f.split(".").pop() === "js");

    console.log(`Loading ${jsFiltered.length} commands!`);

    jsFiltered.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.help.name, props);
        console.log(`${i + 1}: ${f} loaded!`);
    });
});

bot.login(bot.token);

bot.on("ready", async () => {
    try {
        bot.user.setActivity("d!help") && console.log(
            await bot.generateInvite([
                "ADMINISTRATOR"
            ])
        );
    } catch (err) {
        throw err;
    }
});

bot.on("message", async (message) => {
    let sender = message.author;
    let msg = message.content;
    if (sender.bot || sender.id === bot.user.id) return;

    const prefix = "d!";
    const args = msg.substring(prefix.length).split(" ").slice(1);
});