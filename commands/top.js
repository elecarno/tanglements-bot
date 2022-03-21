const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "top",
    description: "leaderboard by networth",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }
        
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#e0a73d")
        .setTitle("Leaderboard by Networth")

        let data = []

        for(var i in config.client.userData){
            let _credits = config.client.userData[i].credits
            let _inventory = config.client.userData[i].inventory
            let _pPills = config.client.userData[i].pPills
            let _bPills = config.client.userData[i].bPills
            let _hPills = config.client.userData[i].hPills

            let net = 0
            for(var j = 0; j < _inventory.length; j++){
                if(_inventory[j] !== undefined){
                    if(config.items[_inventory[j][0]][0] !== undefined)
                    net += config.items[_inventory[j][0]][0]*_inventory[j][1]
                }
            }
            net += _pPills*3
            net += _bPills*2
            net += _hPills*5
            net += _credits
            data.push([net, i])
        }     

        sorted = data.sort((a, b) => b[0] - a[0]);
        index = 1

        for(var i = 0; i < sorted.length; i++){
            newEmbed.addField( index + ". " + config.client.userData[sorted[i][1]].name, "Networth: ₵" + sorted[i][0] + " • Credits: ₵" + config.client.userData[sorted[i][1]].credits)
            index++
        }
        message.channel.send(newEmbed)
    }
}