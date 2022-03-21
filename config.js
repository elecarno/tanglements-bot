const Discord = require("discord.js")
const client = new Discord.Client()
// Add Link - https://discord.com/oauth2/authorize?client_id=953363672087027772&scope=bot&permissions=1099511627775

const prefix = "!"
client.userData = require("./user-data.json")

const UBS = 1;

const fs = require("fs")
const { Z_PARTIAL_FLUSH } = require("zlib")
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

exports.instances = [
    "a-1", "a-2", "a-3",
    "b-1", "b-2",
    "g-1", "g-2", "g-3",
    "d-1", "d-2",
]

const a1l = ["Old Electronics", "hPills"]
const a2l = ["Water", "hPills"]
const a3l = ["Bronze Berries", "Butter Berries", "Glow Weeds", "hPills"]
const b1l = ["Kar98k", "hPills"]
const b2l = ["hPills"]
const g1l = ["Old Electronics", "bPills", "hPills"]
const g2l = ["Ancient Electronics", "hPills"]
const g3l = ["bPills", "pPills", "Old Electronics", "Kar98k", "hPills"]
const d1l = ["Chemicals", "Lab Equipment", "hPills", "Ancient Electronics"]
const d2l = ["hPills"]

const a1e = [["you hear a scream nearby", 0]]
const a2e = [["you hear roars in the distance", 0], ["a butterfly lands on your shoulder and heals you", 1]]
const a3e = [["you are attacked by a Hyper Lizard", -0.3], ["you get mauled by a giant snake", -0.6], ["you are attacked and strangled by a giant centipede", -0.4]]
const b1e = [["you get shot in the shoulder by a stray bullet", -0.5]]
const b2e = [["you are attacked by a Void Crawler", -0.25]]
const g1e = [["you are attacked by a Radio Cricket", -0.2]]
const g2e = [["the books grant you strength", 0.1]]
const g3e = [["you get your face ripped off by a chuppy", -1], ["you get bitten by a chuppy", -0.8]]
const d1e = [["you are attacked by a Lab Serpent", -0.7]]
const d2e = [["you are attacked by a Void Bug", -0.05]]

const a1 = [a1l, a1e]
const a2 = [a2l, a2e]
const a3 = [a3l, a3e]
const b1 = [b1l, b1e]
const b2 = [b2l, b2e]
const g1 = [g1l, g1e]
const g2 = [g2l, g2e]
const g3 = [g3l, g3e]
const d1 = [d1l, d1e]
const d2 = [d2l, d2e]

exports.inst = {"a-1": a1, "a-2": a2, "a-3": a3, "b-1": b1, "b-2": b2,"g-1": g1, "g-2": g2, "g-3": g3, "d-1": d1, "d-2": d2}

exports.items = {
    "IHC ID Card": [0], "Bronze Berries": [2], "Butter Berries": [2], "Old Electronics": [3], "Glow Weeds" : [4], "Chemicals" : [7], 
    "Lab Equipment": [15], "Ancient Electronics": [30], "Bag of Chuppy Blood": [120], "Kar98k": [50, 0.35],
}

exports.client = client
exports.prefix = prefix