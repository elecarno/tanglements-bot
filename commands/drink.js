const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "drink",
    description: "lets the user drink",
    execute(message, args, Discord){
        let logName = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ")"
        let _instance = config.client.userData[message.author.id].instance
        let logM
        if (config.client.userData[message.author.id].water > 0){
            config.client.userData[message.author.id].water -= (1-config.client.userData[message.author.id].hydration)
            config.client.userData[message.author.id].hydration = 1
            message.channel.send(config.client.userData[message.author.id].name + " is now fully hydrated and has " + Math.round(config.client.userData[message.author.id].water*10000)/100 + "% water left")
            logM = logName + " restored their hydration in `" + _instance + "`" 
        }
        else {
            logM = logName + " attempted to restore their hydration in `" + _instance + "`"           
            message.channel.send("no water left")
        }
        console.log(logM)
        config.client.channels.cache.get(config.logCID).send(logM)

        /*
        if(Math.random() < 0.35){
            for (var i in config.inst){
                if (i === _instance){
                    let lootEvent = config.inst[i][1][Math.floor(Math.random()*config.inst[i][1].length)];
                    let eventMsg = lootEvent[0]
                    let hpEffect = lootEvent[1]
        
                    config.client.userData[message.author.id].hp += hpEffect
                    message.channel.send("**As you take gulps of water, " + eventMsg + "**, your Health is " + Math.round(config.client.userData[message.author.id].hp*10000)/100 + "%")
                
                    let logM2 = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") recieved the event: `[" + lootEvent + "]` while restoring their hydration, their hp is now:  " + config.client.userData[message.author.id].hp
                    console.log(logM2)
                    config.client.channels.cache.get(config.logCID).send(logM2)
                }
            }
        }
        */

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
        })
    }
}