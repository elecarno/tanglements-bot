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

// standard loot
const a1l = ["Old Electronics", "hPills"]
const a2l = ["Water"]
const a3l = ["Bronze Berries", "Butter Berries", "Glow Weeds"]
const b1l = ["hPills"]
const b2l = ["hPills"]
const g1l = ["Old Electronics"]
const g2l = ["Ancient Electronics"]
const g3l = ["bPills", "pPills"]
const d1l = ["Chemicals", "Lab Equipment"]
const d2l = ["hPills"]

// valuable loot
const a1v = ["Kar98k"]
const a2v = ["Water", "hPills"]
const a3v = ["hPills"]
const b1v = ["Kar98k"]
const b2v = ["hPills"]
const g1v = ["bPills", "hPills"]
const g2v = ["Ancient Electronics", "hPills"]
const g3v = ["Old Electronics", "Kar98k", "hPills"]
const d1v = ["hPills", "Ancient Electronics"]
const d2v = ["hPills"]

// units
const a1u = ["Old Electronics"]
const a2u = ["Water", "hPills"]
const a3u = ["hPills"]
const b1u = ["Kar98k"]
const b2u = ["hPills"]
const g1u = ["bPills", "hPills"]
const g2u = ["Ancient Electronics", "hPills"]
const g3u = ["Old Electronics", "Kar98k", "hPills"]
const d1u = ["hPills", "Ancient Electronics"]
const d2u = ["hPills"]

// regions - [name, danger rating, radiation rating]
const a1r = [["Streets", 1], ["Anarchist Camp", 0]]
const a2r = [["Forest", 1], ["IHC Main Base", 0], ["Alpha 2 Village", 0]]
const a3r = [["Lower Forest", 1], ["Upper Forest", 2]]
const b1r = [["Wasteland", 2], ["Warzone", 3]]
const b2r = [["Void", 2]]
const g1r = [["Outside the Reactor", 0, 1], ["Reactor 1", 1, 1], ["Destroyed Reactor", 2, 2]]
const g2r = [["Library Hall", 1, 1], ["Sun Tower", 1, 2]]
const g3r = [["Sewers", 3, 3], ["Halls", 2, 3], ["IHC Quaratine Border", 1, 3]]
const d1r = [["Laboratory", 0], ["Abandoned Laboratory", 1], ["Reactor Room", 2, 3], ["Site Delta"]]
const d2r = [["Void", 1]]

// all instance data
const a1 = [a1l, a1v, a1r]
const a2 = [a2l, a2v, a2r]
const a3 = [a3l, a3v, a3r]
const b1 = [b1l, b1v, b1r]
const b2 = [b2l, b2v, b2r]
const g1 = [g1l, g1v, g1r]
const g2 = [g2l, g2v, g2r]
const g3 = [g3l, g3v, g3r]
const d1 = [d1l, d1v, d1r]
const d2 = [d2l, d2v, d2r]

exports.inst = {"a-1": a1, "a-2": a2, "a-3": a3, "b-1": b1, "b-2": b2,"g-1": g1, "g-2": g2, "g-3": g3, "d-1": d1, "d-2": d2}

exports.items = {
    "IHC ID Card": [0], "Bronze Berries": [2], "Butter Berries": [2], "Old Electronics": [3], "Glow Weeds" : [4], "Chemicals" : [7], 
    "Lab Equipment": [15], "Ancient Electronics": [30], "Bag of Chuppy Blood": [120], "Kar98k": [50, 0.35], "Hopper": [250]
}

exports.logCID = "955121521574170674"

exports.client = client
exports.prefix = prefix