const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "buy",
    description: "buy from the ihc shop",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }
        if(config.client.userData[message.author.id].instance !== "a-2") { return }

        let index = 1
        let logM
        for(let i in config.items){
            if (index === parseInt(args[0]) && config.client.userData[message.author.id].credits >= config.items[i][0]){
                config.client.userData[message.author.id].credits -= config.items[i][0]
                let has = false
                for(let j = 0; j < config.client.userData[message.author.id].inventory.length; j++){
                    if(config.client.userData[message.author.id].inventory[j][0] === i){
                        config.client.userData[message.author.id].inventory[j][1] += 1
                        if(config.items[i][1] !== undefined)
                            config.client.userData[message.author.id].inventory[j][2] = config.items[i][1]
                        has = true
                        let logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") has bought item `" + args[0] + "` (`" +  i + "`) and has `" + config.client.userData[message.author.id].credits + "` credits left"
                        console.log(logM)
                        config.client.channels.cache.get("955121521574170674").send(logM)
                    }
                }
                if(!has){
                    if(config.items[i][1] === undefined)
                        config.client.userData[message.author.id].inventory.push([i, 1])
                    else
                        config.client.userData[message.author.id].inventory.push([i, 1, config.items[i][1]])
                    
                    let logM = config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") has bought item `" + args[0] + "` (`" +  i + "`) - an item they did not previously have, and has `" + config.client.userData[message.author.id].credits + "` credits left"
                    console.log(logM)
                    config.client.channels.cache.get("955121521574170674").send(logM)
                }
            }
            index++
        }

        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
        })
    }
}