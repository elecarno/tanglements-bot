const config = require("../config")
const fs = require("fs")
const talkedRecently = new Set();

module.exports = {
    name: "ihc",
    description: "gives the user a supply from the ihc",
    execute(message, args, Discord){
        if (talkedRecently.has(message.author.id)) {
            message.channel.send("On cooldown");
        } else {
            if(!config.client.userData[message.author.id].instance === "a-2") { return }

            if(args[0] === "p"){
                config.client.userData[message.author.id].pPills += 3
                message.channel.send("The IHC has supplied you with 3 perception pills, you may get more in 10 minutes")
            }
            if(args[0] === "b"){
                config.client.userData[message.author.id].bPills += 3
                message.channel.send("The IHC has supplied you with 3 negative becquerel pills, you may get more in 10 minutes")
            }
            if(args[0] === "h"){
                config.client.userData[message.author.id].hPills += 3
                message.channel.send("The IHC has supplied you with 3 hop pills, you may get more in 10 minutes")
            }
            if(args[0] === "m"){
                config.client.userData[message.author.id].hp = 1
                message.channel.send("The IHC has dressed your wounds, your health is now at " + config.client.userData[message.author.id].hp*100 + "%")
            }

            fs.writeFile("./user-data.json", JSON.stringify(config.client.userData, null, 4), err => {
                if (err) throw err 
            })

            // Adds the user to the set so that they can't talk for a minute
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 600000);
        }
    }
}