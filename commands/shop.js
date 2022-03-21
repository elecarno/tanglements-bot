const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "shop",
    description: "ihc shop",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }
        if(config.client.userData[message.author.id].instance !== "a-2") { return }

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#a82016")
        .setTitle("IHC Store")

        let index = 1
        
        for (var i in config.items){
            if(config.items[i][1] === undefined)
                newEmbed.addField(index + " - " + i, "Price: ₵" + config.items[i][0])
            else
                newEmbed.addField(index + " - " + i, "Price: ₵" + config.items[i][0] + " • Damage: " + config.items[i][1]*100)

            index++
        }
        
        message.channel.send(newEmbed)
    }
}