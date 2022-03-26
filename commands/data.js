const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "data",
    description: "instance data",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }
        if(args[0] === undefined || args[0] === null || !config.instances.includes(args[0])) { return }

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#bdb54a")
        .setTitle("Data for " + args[0])      

        let sLoot = config.inst[args[0]][0]
        let vLoot = config.inst[args[0]][1]
        let regions = config.inst[args[0]][2]

        let regionDisplay = ""

        for(var i = 0; i < regions.length; i++){
            let listItem
            if(regions[i][2] === undefined)
                listItem = "\n" + regions[i][0] + " • " + regions[i][1] + " • 0"
            else
                listItem = "\n" + regions[i][0] + " • " + regions[i][1] + " • " + regions[i][2]
            regionDisplay += listItem
        }

        newEmbed.addField("Standard Loot: ", sLoot)
        newEmbed.addField("Danger Loot: ", vLoot)
        newEmbed.addField("Regions:", "**Name • Danger/Loot Rating • Radiation Rating**" + regionDisplay, true)
        
        message.channel.send(newEmbed)
    }
}