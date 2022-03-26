const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "gift",
    description: "gives pills",
    execute(message, args, Discord){
        let logName = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ")"
        let userToGive
        let logM
        if(message.mentions.users.first() !== undefined)
            userToGive = message.mentions.users.first()
        
        if(args[2] === "p" && config.client.userData[message.author.id].pPills > 0){
            config.client.userData[message.author.id].pPills -= parseInt(args[1])
            config.client.userData[userToGive.id].pPills += parseInt(args[1])
            message.channel.send("Given " + config.client.userData[userToGive.id].name + " " + parseInt(args[1]) + " Perception Pill")
            logM = logName + " gave " + config.client.userData[userToGive.id].name + " (" + userToGive.username + "#" + userToGive.discriminator + ") " + parseInt(args[1]) + " `pPill`(s)"
        }
        else if(args[2]  === "b" && config.client.userData[message.author.id].bPills > 0){
            config.client.userData[message.author.id].bPills -= parseInt(args[1])
            config.client.userData[userToGive.id].bPills += parseInt(args[1])
            message.channel.send("Given " + config.client.userData[userToGive.id].name + " " + parseInt(args[1]) + " Negative Becquerel Pill")
            logM = logName + " gave " + config.client.userData[userToGive.id].name + " (" + userToGive.username + "#" + userToGive.discriminator + ") " + parseInt(args[1]) + " `bPill`(s)"
        }
        else if(args[2] === "h" && config.client.userData[message.author.id].hPills > 0){
            config.client.userData[message.author.id].hPills -= parseInt(parseInt(args[1]))
            config.client.userData[userToGive.id].hPills += parseInt(parseInt(args[1]))
            message.channel.send("Given " + config.client.userData[userToGive.id].name + " " + parseInt(args[1]) + " Hop Pill")
            logM = logName + " gave " + config.client.userData[userToGive.id].name + " (" + userToGive.username + "#" + userToGive.discriminator + ") " + parseInt(args[1]) + " `hPill`(s)"
        }
        else {
            logM = logName + " attempted to give " + config.client.userData[userToGive.id].name + " (" + userToGive.username + "#" + userToGive.discriminator + ") a pill"
            message.channel.send("you don't have any of that pill")
        }
        config.client.channels.cache.get(config.logCID).send(logM)
        console.log(logM)

        /*
        if(Math.random() < 0.2){
            for (var i in config.inst){
                if (i === _instance){
                    let lootEvent = config.inst[i][1][Math.floor(Math.random()*config.inst[i][1].length)];
                    let eventMsg = lootEvent[0]
                    let hpEffect = lootEvent[1]

                    config.client.userData[message.author.id].hp += hpEffect
                    message.channel.send("**As you hand over the pills, " + eventMsg + "**, your Health is " + Math.round(config.client.userData[message.author.id].hp*10000)/100 + "%")
                    let logM2 = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") recieved the event: `[" + lootEvent + "]` while gifting pills, their hp is: `" + config.client.userData[message.author.id].hp + "`"
                    config.client.channels.cache.get(config.logCID).send(logM2)
                    console.log(logM2)
                }
            }
        }
        */

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
        })
    }
}