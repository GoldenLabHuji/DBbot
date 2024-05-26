"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const { exec } = require("child_process");
class app {
    botUIPath;
    constructor(botUIPath) {
        this.botUIPath = botUIPath;
    }
    startReactApp(path) {
        return new Promise((resolve, reject) => {
            const reactAppProcess = exec("npm run dev", { cwd: path });
            reactAppProcess.stdout.on("data", (data) => {
                console.log(`React App: ${data}`);
                if (data.includes("Compiled successfully")) {
                    resolve();
                }
            });
            reactAppProcess.stderr.on("data", (data) => {
                console.error(`React App Error: ${data}`);
                reject();
            });
            reactAppProcess.on("close", (code) => {
                console.log(`React App process exited with code ${code}`);
            });
        });
    }
    runBot(bot) {
        process.env.DB_BOT = JSON.stringify(bot);
        this.startReactApp(this.botUIPath)
            .then(() => {
            console.log("React app started successfully");
        })
            .catch(() => {
            console.error("Failed to start React app");
        });
    }
}
exports.app = app;
