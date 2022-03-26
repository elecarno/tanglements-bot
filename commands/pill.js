const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

module.exports = {
    name: "pill",
    description: "uses a pill",
    execute(message, args, Discord){
        let logName = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ")"
        let pillUsed
        let messageToSend
        let _instance = config.client.userData[message.author.id].instance

        let a1ro = message.guild.roles.cache.find(r => r.id === "953721199895134259")
        let a2ro = message.guild.roles.cache.find(r => r.id === "953721286301974528")
        let a3ro = message.guild.roles.cache.find(r => r.id === "953721302206795907")
        let b1ro = message.guild.roles.cache.find(r => r.id === "953721330447032390") 
        let b2ro = message.guild.roles.cache.find(r => r.id === "953721351221432341")
        let g1ro = message.guild.roles.cache.find(r => r.id === "953721398893879337")
        let g2ro = message.guild.roles.cache.find(r => r.id === "953721423711572018")
        let g3ro = message.guild.roles.cache.find(r => r.id === "953721437187878922")
        let d1ro = message.guild.roles.cache.find(r => r.id === "953721469790220339")
        let d2ro = message.guild.roles.cache.find(r => r.id === "953721484147302474")
        let d3ro = message.guild.roles.cache.find(r => r.id === "953721501650145281")
        let instToRole = {"a-1": a1ro, "a-2": a2ro, "a-3": a3ro, "b-1": b1ro, "b-2": b2ro, "g-1": g1ro, "g-2": g2ro, "g-3": g3ro, "d-1": d1ro, "d-2": d2ro, "d-3": d3ro}
        let member = message.guild.members.cache.get(message.author.id)
        let logM

        if(args[0] === "p" && config.client.userData[message.author.id].pPills > 0){
            pillUsed = "Perception"
            config.client.userData[message.author.id].pPills -= 1
            config.client.userData[message.author.id].sickness -= Math.random()/3
            if ( config.client.userData[message.author.id].sickness < 0)
                config.client.userData[message.author.id].sickness = 0
            messageToSend = config.client.userData[message.author.id].name + " has reduced their Perception Sickness to " + Math.round(config.client.userData[message.author.id].sickness*10000)/100 + "%"
            message.channel.send("Used a " + pillUsed + " Pill and " + messageToSend)

            logM = logName + " used a `pPill` in `" + _instance + "`, their `sickness` is now `" + config.client.userData[message.author.id].sickness + "`"
        }
        else if(args[0] === "b" && config.client.userData[message.author.id].bPills > 0){
            pillUsed = "Negative Becquerel"
            config.client.userData[message.author.id].bPills -= 1
            config.client.userData[message.author.id].irradiation -= Math.random()/3
            if ( config.client.userData[message.author.id].irradiation < 0)
                config.client.userData[message.author.id].irradiation = 0
            messageToSend = config.client.userData[message.author.id].name + " has reduced their Irradiation to " + Math.round(config.client.userData[message.author.id].irradiation*10000)/100 + "%"
            message.channel.send("Used a " + pillUsed + " Pill and " + messageToSend)
            
            logM = logName + " used a `bPill` in `" + _instance + "`, their `irradiation` is now `" + config.client.userData[message.author.id].irradiation + "`"
        }
        else if(args[0] === "h" && config.client.userData[message.author.id].hPills > 0){
            let newInstance
            newInstance = config.instances[Math.floor(Math.random()*config.instances.length)];
            pillUsed = "Hop"
            config.client.userData[message.author.id].hPills -= 1
            config.client.userData[message.author.id].instance = newInstance

            for(var i in instToRole){
                if (i === config.client.userData[message.author.id].instance){
                    member.roles.set([instToRole[i]])
                }
            }
            
            messageToSend = config.client.userData[message.author.id].name + " has travelled to instance " + config.client.userData[message.author.id].instance
            message.channel.send("Used a " + pillUsed + " Pill and " + messageToSend)
            logM = logName + " used an `hPill` in `" + _instance + "`, is now in instance `" + config.client.userData[message.author.id].instance + "`"
        }
        else {
            logM = logName + " failed to use a pill in `" + _instance + "`"
            message.channel.send("you don't have any of that pill")
        }

        console.log(logM)
        config.client.channels.cache.get(config.logCID).send(logM)

        /*
        if(Math.random() < 0.3){
            for (var i in config.inst){
                if (i === _instance){
                    let lootEvent = config.inst[i][1][Math.floor(Math.random()*config.inst[i][1].length)];
                    let eventMsg = lootEvent[0]
                    let hpEffect = lootEvent[1]
        
                    config.client.userData[message.author.id].hp += hpEffect
                    message.channel.send("**As you take the pill, " + eventMsg + "**, your Health is " + Math.round(config.client.userData[message.author.id].hp*10000)/100 + "%")
                    
                    let logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") recieved the event: `[" + lootEvent + "]` while taking a pill, their hp is: `" + config.client.userData[message.author.id].hp + "`"
                    console.log(logM)
                    config.client.channels.cache.get(config.logCID).send(logM)
                }
            }
        }
        */

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err 
        })
    }
}