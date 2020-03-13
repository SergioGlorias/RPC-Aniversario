const { spawn } = require("child_process");
const { greenBright } = require("cli-color")
const { CronJob } = require("cron")

async function run() {
	let rpc = spawn('node', ['rpc.js'], {
		shell: true
	})

	rpc.stdout.setEncoding("utf-8")
	rpc.stdin.setEncoding('utf-8')

	const altDay = new CronJob('00 00 00 * * *', async () => {
		rpc.stdin.write("day update\n")
	})
	rpc.stdout.on("data", (log) => {
		if (greenBright('Ready!') == log.trim()) altDay.start()
		console.log(log.trim())
		if (log.trim() == "Data de aniversário já passou!!") process.exit()
	})
    rpc.on('close', () => {
		console.log("reconnectando")
		altDay.stop()
		setTimeout(() => run(), 1000)
	});
}

run();
