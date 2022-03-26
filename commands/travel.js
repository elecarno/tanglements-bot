const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

module.exports = {
    name: "travel",
    description: "travel in an instance",
    execute(message, args, Discord){
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("On cooldown");
        } else {
            let logName = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ")"
            let _instance = config.client.userData[message.author.id].instance
            if(args[0] === "n")
                config.client.userData[message.author.id].region += 1
            else if(args[0] === "s")
                config.client.userData[message.author.id].region -= 1
            else { return }

            if(config.client.userData[message.author.id].region < 0)
                config.client.userData[message.author.id].region = 0
            
            if(config.client.userData[message.author.id].region > config.inst[_instance][2].length)
                config.client.userData[message.author.id].region = config.inst[_instance][2].length

            config.client.userData[message.author.id].sickness += Math.random()/10
            config.client.userData[message.author.id].hydration -= Math.random()/10
            if(_instance.charAt(0) === "g")
                config.client.userData[message.author.id].irradiation += Math.random()/20 * _region[2]

            message.channel.send("travelled, you are now in **" + config.inst[config.client.userData[message.author.id].instance][2][config.client.userData[message.author.id].region][0] + "**")
            let logM = logName + " has travelled in instance `" + config.client.userData[message.author.id].instance + "` and is now in region `" + config.inst[config.client.userData[message.author.id].instance][2][config.client.userData[message.author.id].region] + "`"
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
            }, 30000);
        }
    }
}