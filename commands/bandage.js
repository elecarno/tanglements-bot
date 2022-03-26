const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

module.exports = {
    name: "bandage",
    description: "heals the user",
    execute(message, args, Discord){
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("On cooldown");
        } else {
            let _instance = config.client.userData[message.author.id].instance
            let logM
            if (config.client.userData[message.author.id].hp < 3){
                config.client.userData[message.author.id].hp += 0.5
                if(config.client.userData[message.author.id].hp > 3)
                    config.client.userData[message.author.id].hp = 3
                message.channel.send("Bandaged, you now have " + Math.round(config.client.userData[message.author.id].hp*10000)/100 + "% health")
                logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") bandaged themselves in `" + _instance + "`, they now have `" + config.client.userData[message.author.id].hp + "` hp"
            }
            else {
                logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") attempted to use a bandage in `" + _instance + "` but has maxed their health regarding this process"           
                message.channel.send("max hp from bandaging")
            }
            console.log(logM)
            config.client.channels.cache.get(config.logCID).send(logM)

            fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
                if (err) throw err
            })

            talkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after a minute
              talkedRecently.delete(message.author.id);
            }, 300000);
        }
    }
}