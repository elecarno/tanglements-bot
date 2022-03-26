const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "global",
    description: "global stats",
    execute(message, args, Discord){
        if(config.client.userData[message.author.id] === undefined) { return }
        
        const newEmbed = new Discord.MessageEmbed()
        .setColor("#e0a73d")
        .setTitle("All Traveller Stats")

        for(var i in config.client.userData){
            let _name = config.client.userData[i].name 
            let _instance = config.client.userData[i].instance 
            let _age = config.client.userData[i].age 
            let _hp = config.client.userData[i].hp
            let _credits = config.client.userData[i].credits
            let _inventory = config.client.userData[i].inventory
            let _hydration = config.client.userData[i].hydration
            let _irradiation = config.client.userData[i].irradiation
            let _sickness = config.client.userData[i].sickness
            let _water = config.client.userData[i].water
            let _pPills = config.client.userData[i].pPills
            let _bPills = config.client.userData[i].bPills
            let _hPills = config.client.userData[i].hPills
            let _fuses = config.client.userData[i].fuses

            let stage
            if(_sickness > 0.3){ stage = 1
                if(_sickness > 0.5){ stage = 2
                    if(_sickness > 0.7){ stage = 3
                        if(_sickness > 0.8){ stage = 4
                            if(_sickness > 0.9){ stage = 5 } } } } }
            else { stage = 0 }

            let items = 0
            let net = 0
            for(var j = 0; j < _inventory.length; j++){
                if(_inventory[j] !== undefined){
                    items += _inventory[j][1]
                    if(config.items[_inventory[j][0]][0] !== undefined)
                        net += config.items[_inventory[j][0]][0]*_inventory[j][1]
                }
            }
            net += _pPills*3
            net += _bPills*2
            net += _hPills*5
            net += _fuses*7
            net += _credits

            newEmbed.addField(_name + ", " + _age + " • Balance: ₵" + _credits + " • Net Worth: ₵" + net, _instance + " • " + Math.round(_hp*10000)/100 + "% HP • " 
            + Math.round(_hydration*10000)/100 + "% Hy • " + Math.round(_irradiation*10000)/100 + "% Ir • " + Math.round(_sickness*10000)/100 + "% PS [" + stage + "]\n"
            + Math.round(_water*10000)/100 + "% H₂O • f:" + _fuses + " p:"+ _pPills + " b:" + _bPills + " h:" + _hPills + " Pills • " + items + " Items")
        }     
        message.channel.send(newEmbed)
    }
}