import { DBbot } from "./DBbot";
import { exec } from "child_process";
import * as fs from "fs-extra";
import * as path from "path";
import * as os from "os";

export class app {
    constructor(public botUIPath: string) {}

    private startReactApp(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const reactAppProcess = exec("npm run dev", { cwd: path });

            reactAppProcess.stdout?.on("data", (data: any) => {
                console.log(`React App: ${data}`);
                if (data.includes("Compiled successfully")) {
                    resolve();
                }
            });

            reactAppProcess.stderr?.on("data", (data: any) => {
                console.error(`React App Error: ${data}`);
                reject();
            });

            reactAppProcess.on("close", (code: any) => {
                console.log(`React App process exited with code ${code}`);
            });
        });
    }

    public runBot(bot: DBbot): void {
        bot.createOperatorsFile();

        const tmpFilePath = path.join(os.tmpdir(), 'db_bot.json');
        fs.writeJsonSync(tmpFilePath, bot);

        process.env.DB_BOT_FILE = tmpFilePath;

        this.startReactApp(this.botUIPath)
            .then(() => {
                console.log("React app started successfully");
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
