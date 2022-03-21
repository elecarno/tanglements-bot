const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "inv",
    description: "user inventory",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }

        let user
        if(message.mentions.users.first() !== undefined)
            user = message.mentions.users.first()
        else
            user = message.author

        let _name = config.client.userData[user.id].name 
        let _inventory = config.client.userData[user.id].inventory 

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#b56b2a")
        .setTitle(_name + "'s Inventory")
        
        for(var i = 0; i < _inventory.length; i++){
            if(_inventory[i][2] == undefined)
                newEmbed.addField(_inventory[i][0], "Amount: " +  _inventory[i][1])
            else
                newEmbed.addField(_inventory[i][0], "Amount: " +  _inventory[i][1] + " • Damage: " + _inventory[i][2]*100)
        }
        
        message.channel.send(newEmbed)
    }
}