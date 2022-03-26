const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

module.exports = {
    name: "craft",
    description: "craft an item",
    execute(message, args, Discord){
        let logName = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ")"
        let logM
        let _inventory = config.client.userData[message.author.id].inventory
        let success = false

        if(args[0] === "f"){
            for(var i = 0; i < _inventory.length; i++){
                if(_inventory[i][0] === "Old Electronics" && _inventory[i][1] > 0){
                    config.client.userData[message.author.id].inventory[i][1] -= 1
                    config.client.userData[message.author.id].fuses += 1
                    message.channel.send("crafted a fuse")
                    logM = logName + " has crafted a `fuse` from `Old Electronics` in instance `" + config.client.userData[message.author.id].instance + "`"
                    success = true
                }
            }
            if(success === false){
                message.channel.send("unable to craft")
                logM = logName + " failed to craft in instance `" + config.client.userData[message.author.id].instance + "`"
            }
            console.log(logM)
            config.client.channels.cache.get(config.logCID).send(logM)
        }
        else {
            message.channel.send("invalid item to craft")
            logM = logName + " failed to craft in instance `" + config.client.userData[message.author.id].instance + "`"
            console.log(logM)
            config.client.channels.cache.get(config.logCID).send(logM)
        }

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err 
        })
    }
}