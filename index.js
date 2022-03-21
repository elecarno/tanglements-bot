const Discord = require("discord.js")
const config = require("./config")
const token = require("./token")

config.client.once("ready", () => {
    console.log("Tanglements Bot is online")
})

config.client.on("message", message => {  
    if (!message.content.startsWith(config.prefix) || message.author.bot ) return;

    const args = message.content.slice(config.prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()

    if(command === "help"){
        config.client.commands.get("help").execute(message, args, Discord)
    }
    else if(command === "enter"){
        config.client.commands.get("enter").execute(message, args, Discord)
    }
    else if(command == "st" || command == "stats"){
        config.client.commands.get("stats").execute(message, args, Discord)
    }   
    else if(command == "setage"){
        config.client.commands.get("setage").execute(message, args, Discord)
    }   
    else if(command == "update"){
        config.client.commands.get("update").execute(message, args, Discord)
    }  
    else if(command == "pill"){
        config.client.commands.get("pill").execute(message, args, Discord)
    }  
    else if(command == "loot"){
        config.client.commands.get("loot").execute(message, args, Discord)
    }  
    else if(command == "drink"){
        config.client.commands.get("drink").execute(message, args, Discord)
    }  
    else if(command == "ihc"){
        config.client.commands.get("ihc").execute(message, args, Discord)
    }  
    else if(command == "gift"){
        config.client.commands.get("gift").execute(message, args, Discord)
    }
    else if(command == "test"){
        config.client.commands.get("test").execute(message, args, Discord)
    }
    else if(command == "inv"){
        config.client.commands.get("inv").execute(message, args, Discord)
    }
    else if(command == "shop"){
        config.client.commands.get("shop").execute(message, args, Discord)
    }
    else if(command == "buy"){
        config.client.commands.get("buy").execute(message, args, Discord)
    }
    else if(command == "global"){
        config.client.commands.get("global").execute(message, args, Discord)
    }
    else if(command == "top"){
        config.client.commands.get("top").execute(message, args, Discord)
    }
    else if(command == "pouch" || command == "ph"){
        config.client.commands.get("pouch").execute(message, args, Discord)
    }
    else if(command == "bandage" || command == "bn"){
        config.client.commands.get("bandage").execute(message, args, Discord)
    }
})
config.client.login(token.token)