const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

var randomProperty = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
};

module.exports = {
    name: "loot",
    description: "loots your current instance",
    execute(message, args, Discord){
    if (talkedRecently.has(message.author.id)) {
            message.channel.send("On cooldown");
    } else {
        let _instance = config.client.userData[message.author.id].instance
        let _sickness = config.client.userData[message.author.id].sickness
        let lootToGive
        let giveable = true
        let sickened = false

        if(Math.random() < _sickness){
            sickened = true
            giveable = false
            message.channel.send("**Your sickness prevents you from searching the nearby area**")
                   
            let logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") attempted to loot in `" +  _instance + "` but could not due to a `sickness` of `" + _sickness + "`"
            console.log(logM)
            config.client.channels.cache.get("955121521574170674").send(logM)
        }

        for (var i in config.inst){
            if (i === _instance && !sickened){
                lootToGive = config.inst[i][0][Math.floor(Math.random()*config.inst[i][0].length)];
                
                let logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") looted `" + lootToGive + "` in `" +  _instance + "`"
                console.log(logM)
                config.client.channels.cache.get("955121521574170674").send(logM)
            }
        }

        if (lootToGive === "Water"){
            giveable = false
            config.client.userData[message.author.id].water = 1
            message.channel.send("Your water has been replenished")
        }
        if (lootToGive === "pPills" || lootToGive ===  "bPills" || lootToGive === "hPills"){
            giveable = false
            switch (lootToGive) {
                case "pPills":
                    config.client.userData[message.author.id].pPills += 1
                    message.channel.send("You found some Perception Pills")
                break
                case "bPills":
                    config.client.userData[message.author.id].bPills += 1
                    message.channel.send("You found some Negative Becquerel Pills")
                break
                case "hPills":
                    config.client.userData[message.author.id].hPills += 1
                    message.channel.send("You found some Hop Pills")
                break
            }
        }

        if(giveable){
            message.channel.send("You have found " + lootToGive)
            let has = false
            for(let j = 0; j < config.client.userData[message.author.id].inventory.length; j++){
                if(config.client.userData[message.author.id].inventory[j][0] === lootToGive){
                    config.client.userData[message.author.id].inventory[j][1] += 1
                    if(config.items[lootToGive][1] !== undefined)
                        config.client.userData[message.author.id].inventory[j][2] = config.items[lootToGive][1]
                    has = true
                }
            }
            if(!has){
                if(config.items[lootToGive][1] === undefined)
                    config.client.userData[message.author.id].inventory.push([lootToGive, 1])
                else
                    config.client.userData[message.author.id].inventory.push([lootToGive, 1, config.items[lootToGive][1]])
            }
        }

        config.client.userData[message.author.id].sickness += Math.random()/20
        config.client.userData[message.author.id].hydration -= Math.random()/20
        if(_instance.charAt(0) === "g")
            config.client.userData[message.author.id].irradiation += Math.random()/20
        
        // events
        if(Math.random() < (0.3 + _sickness) && !sickened){
            for (var i in config.inst){
                if (i === _instance){
                    let lootEvent = config.inst[i][1][Math.floor(Math.random()*config.inst[i][1].length)];
                    let eventMsg = lootEvent[0]
                    let hpEffect = lootEvent[1]

                    config.client.userData[message.author.id].hp += hpEffect
                    message.channel.send("**As you search the nearby area, " + eventMsg + "**, your Health is " + Math.round(config.client.userData[message.author.id].hp*10000)/100 + "%")
                   
                    let logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") recieved the event: `[" + lootEvent + "]` while looting, their hp is: `" + config.client.userData[message.author.id].hp + "`"
                    console.log(logM)
                    config.client.channels.cache.get("955121521574170674").send(logM)
                }
            }
        }

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