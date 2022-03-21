const config = require("../config")
const fs = require("fs")

module.exports = {
    name: "update",
    description: "updates server info",
    execute(message, args, Discord){
        let _irradiation = config.client.userData[message.author.id].irradiation
    }
}