const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

module.exports = {
    name: "hop",
    description: "uses a hopper",
    execute(message, args, Discord){
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("On cooldown");
        } else {
            let logName = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ")"
            let _instance = config.client.userData[message.author.id].instance
            let _irradiation = config.client.userData[message.author.id].irradiation
            let _inventory = config.client.userData[message.author.id].inventory

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
            let hasHopper = false

            for(var i = 0; i < _inventory.length; i++){
                if(_inventory[i][0] === "Hopper")
                    hasHopper = true
            }

            if(args[0] !== undefined && config.client.userData[message.author.id].fuses > 0 && hasHopper && config.instances.includes(args[0])){
                if (Math.random() < _irradiation){
                    logM = logName + " attempted to use a hopper in `" + _instance + "` but it failed due to an irradiation of `" + _irradiation + "`"
                    message.channel.send("failed due to irradiation")
                } else {
                    config.client.userData[message.author.id].fuses -= 1
                    config.client.userData[message.author.id].instance = args[0]

                    for(var i in instToRole){
                        if (i === config.client.userData[message.author.id].instance){
                            member.roles.set([instToRole[i]])
                        }
                    }
                    message.channel.send("Travelled to instance " + config.client.userData[message.author.id].instance)
                    logM = logName + " used a hopper in instance `" + _instance + "`, and is now in instance `" + config.client.userData[message.author.id].instance + "`"

                }
            } else {
                logM = logName + " failed to use a hopper in `" + _instance + "`"
                if(hasHopper)
                    message.channel.send("unavailable instance or no fuses")
                else
                    message.channel.send("you do not have a hopper")
            }

            console.log(logM)
            config.client.channels.cache.get(config.logCID).send(logM)

            fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
                if (err) throw err 
            })

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 180000);
    }
    }
}