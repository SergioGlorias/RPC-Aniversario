const { spawn } = require("child_process");

let rpc
switch (process.platform) {
	case 'linux':
		rpc = spawn('x-terminal-emulator', ['-e', 'node', 'terminal.js'], {
            shell: true
        });
		break;
	case 'win32':
		rpc = spawn('start', ['cmd.exe', '/C', 'node', 'terminal.js'], {
            shell: true
        });
		break;
}