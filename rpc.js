const RPC = require('discord-rpc')
const clc = require('cli-color')
const { createInterface } = require("readline")
const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});
const moment = require("moment")
moment.locale("pt")
const { date , aniversario } = require("./config.json")

const client = new RPC.Client({transport: "ipc"})

let end = Date.parse(`${date.year}-${date.month}-${date.day}`)

function leftDays() {
    let up = Date.now()
    return moment(end).diff(up, 'days')
}
function leftsec() {
    return Date.now()
}

client.on("connected", () => {
    console.log(clc.greenBright('Ready!'))

    async function run() {
        let days = await leftDays()
        if (days > 0) {
            client.setActivity({
                details: `Quase a fazer ${aniversario} anos!`,
                state: `Só falta ${days + 1} dias`,
                largeImageKey: 'bolo',
                smallImageKey: 'bolo2',
                largeImageText: `🥳 ${moment(end).format("L")} 🎂`,
                instance: true,
            })
            console.log(`Só falta ${days + 1} dias`)
        } else if (days === 0) {
            if ((await leftsec()) < end) {
                client.setActivity({
                    details: `Vou fazer ${aniversario} anos!`,
                    state: `Amanhã`,
                    largeImageKey: 'bolo',
                    smallImageKey: 'bolo2',
                    largeImageText: `🥳 ${moment(end).format("L")} 🎂`,
                    instance: true,
                })
                console.log(`Amanhã é o aniversário`)
            } else {
                client.setActivity({
                    details: `Hoje faço ${aniversario} anos!`,
                    state: `É HOJE 🥳!!`,
                    largeImageKey: 'bolo',
                    smallImageKey: 'bolo2',
                    smallImageText: `🎉🎉🎉  🥳🎂  🎉🎉🎉`,
                    instance: true,
                })
                console.log(`Feliz Aniversário`)
            }
        } else if (days <= -1) {
            console.log("Data de aniversário já passou!!")
            process.exit()
        }
    }

    console.log("Contador de aniversário iniciado")
    run()

    rl.on("line", (input) => {
        run()
    })
})

client.transport.on("close", () => process.exit())



client.connect("686980255025725580").finally(() => setTimeout(()=> {if(client.user === null) return process.exit()}, 5000))


