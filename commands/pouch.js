const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "pouch",
    description: "displays the user's pouch",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }

        let user
        if(message.mentions.users.first() !== undefined)
            user = message.mentions.users.first()
        else
            user = message.author

        let _name = config.client.userData[user.id].name 
        let _credits = config.client.userData[user.id].credits
        let _sickness = config.client.userData[user.id].sickness
        let _water = config.client.userData[user.id].water
        let _pPills = config.client.userData[user.id].pPills
        let _bPills = config.client.userData[user.id].bPills
        let _hPills = config.client.userData[user.id].hPills

        const newEmbed = new Discord.MessageEmbed()
        .setColor("#b56b2a")
        .setTitle(_name + "'s Pouch")
        .addFields(
            {name: "Basics", value: "Water: " +  Math.round(_water*10000)/100 + "%\nCredits: ₵" + _credits},
            {name: "Pill", value: "Perception Pills: " + _pPills + "\nNegative Bequerel Pills: " + _bPills + "\nHop Pills: " + _hPills}
        )        
        message.channel.send(newEmbed)
    }
}