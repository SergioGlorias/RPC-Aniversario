const client = require('discord-rich-presence')('686980255025725580');
const cron = require("cron")
const moment = require("moment")

const { date , aniversario } = require("./config.json")

let end = Date.parse(`${date.year}-${date.month}-${date.day}`)

function leftDays() {
    let up = Date.now()
    return moment.duration(end-up).days()
}
function leftsec() {
    return Date.now()
}

async function run() {
    let days = await leftDays()
    if (days > 0) {
        client.updatePresence({
            details: `Quase a fazer ${aniversario} anos!`,
            state: `Só falta ${days + 1} dias`,
            largeImageKey: 'bolo',
            smallImageKey: 'bolo2',
            instance: true,
        })
    } else if (days = 0) {
        if ((await leftsec()) < end) {
            client.updatePresence({
                details: `Vou fazer ${aniversario} anos!`,
                state: `Amanhã`,
                largeImageKey: 'bolo',
                smallImageKey: 'bolo2',
                instance: true,
            })
        } else {
            client.updatePresence({
                details: `Hoje faço ${aniversario} anos!`,
                state: `É HOJE 🥳!!`,
                largeImageKey: 'bolo',
                smallImageKey: 'bolo2',
                instance: true,
            })
        }
    } else if (days < 0) {
        console.log("Data de aniversário já passou!!")
        process.exit()
    }
}

const altDay = new cron.CronJob('00 00 00 * * *', async () => {
    run()
})

altDay.start()
run()