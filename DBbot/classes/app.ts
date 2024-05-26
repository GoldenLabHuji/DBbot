import { DBbot } from "./DBbot";
const { exec } = require("child_process");

export class app {
    constructor(public botUIPath: string) {}

    private startReactApp(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const reactAppProcess = exec("npm run dev", { cwd: path });

            reactAppProcess.stdout.on("data", (data: any) => {
                console.log(`React App: ${data}`);
                if (data.includes("Compiled successfully")) {
                    resolve();
                }
            });

            reactAppProcess.stderr.on("data", (data: any) => {
                console.error(`React App Error: ${data}`);
                reject();
            });

            reactAppProcess.on("close", (code: any) => {
                console.log(`React App process exited with code ${code}`);
            });
        });
    }

    runBot(bot: DBbot): void {
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
