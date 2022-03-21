const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "enter",
    description: "enters the Tanglements in a random instance",
    execute(message, args, Discord){
        let initInstance = config.instances[Math.floor(Math.random()*config.instances.length)];
        config.client.userData[message.author.id] = {
            name: args[0],
            instance: initInstance,
            age: 0,
            hp: 1,
            credits: 0,
            inventory: [],
            hydration: 1,
            irradiation: 0,
            sickness: 0,
            water: 1,
            pPills: 0,
            bPills: 0,
            hPills: 0
        }
        message.channel.send(message.author.username + " has entered the Tanglements as " + args[0])
        let logM =  message.author.username + "#" + message.author.discriminator + " has entered the Tanglement as " + args[0]
        console.log(logM)
        config.client.channels.cache.get("955121521574170674").send(logM)
        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
        })
    }
}