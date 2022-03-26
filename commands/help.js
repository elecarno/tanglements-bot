module.exports = {
    name: "help",
    description: "displays all commands",
    execute(message, args, Discord){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#a84931")
        .setTitle("List of Commands")
        .addFields(
            {name: "**BASIC INFO ════════════════════════════════════════**", value: "Useful to understand all of this"},
            {name: "prefix is \"!\"", value: "use this at the start of all your commands."},     
            {name: "**BASE COMMANDS ═══════════════════════════════════**", value: "Primary commands"},
            {name: "help", value: "shows a list of all commands"},
            {name: "enter <rp name>", value: "enters the Tanglements in a random instance"},
            {name: "stats / st", value: "Displays the stats of your profile"},
            {name: "pouch / ph", value: "Displays your pouch"},
            {name: "inv", value: "Displays your inventory"},
            {name: "update", value: "Updates your server info to reflect your profile"},
            {name: "**STATS COMMANDS ═══════════════════════════════════**", value: "Statistics commands"},
            {name: "global", value: "Shows the stats of all profiles"},
            {name: "top", value: "Leaderboard by networth"},
            {name: "**CONFIG COMMANDS ═══════════════════════════════════**", value: "Configuration commands"},
            {name: "setage <age>", value: "Sets your profile's age"},
            {name: "**RP COMMANDS ═══════════════════════════════════**", value: "Roleplay commands"},
            {name: "loot", value: "loots the instance you are in"},
            {name: "drink", value: "drink water"},
            {name: "bandage / bn", value: "restores hp"},
            {name: "pill <p | b | h>", value: "Uses a pill"},
            {name: "gift <@user> <amount> <p | b | h>", value: "gifts pills"},
            {name: "shop", value: "IHC Store, can only use if you are in alpha-2"},
            {name: "buy <item shop index>", value: "buy from the IHC store"},
            {name: "fac <p | b | h | m>", value: "Gets supplies or medical attention from your faction"},
            {name: "hop <instance>", value: "use a hopper"},
        )
        .setFooter("Bot by Elecarno")         
        message.channel.send(newEmbed)
    }
}