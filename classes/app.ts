import { DBbot } from "./DBbot";
import * as fs from "fs-extra";
import * as path from "path";
import { spawn } from "child_process";

export class App {
    public generateConfigFile(bot: DBbot): void {
        bot.createOperatorsFile();
        const filePath = path.resolve(process.cwd(), "db_bot.json");
        fs.writeJsonSync(filePath, bot);
    }

    public deploy(bot: DBbot): void {
        this.generateConfigFile(bot);

        let shell: string;
        let args: string[];

        if (process.platform === "win32") {
            // Try Git Bash path (adjust if needed)
            shell = "C:\\Program Files\\Git\\bin\\bash.exe";
            args = ["deploy.sh"];
        } else {
            shell = "sh";
            args = ["deploy.sh"];
        }

        const child = spawn(shell, args, {
            cwd: process.cwd(),
            stdio: "inherit",
        });

        child.on("error", (error) => {
            console.error("Error while deploying the bot:", error);
        });
    }
}
