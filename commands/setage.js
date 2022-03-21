const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "setage",
    description: "sets the users age",
    execute(message, args, Discord){
        config.client.userData[message.author.id].age = parseInt(args[0])
        let logM =  config.client.userData[message.author.id].name + " (" + message.author.username + "#" + message.author.discriminator + ") has set their age to " + args[0]
        console.log(logM)
        config.client.channels.cache.get("955121521574170674").send(logM)
        fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
            if (err) throw err
            message.channel.send(config.client.userData[message.author.id].name + "'s age has been set to " + args)
        })
    }
}