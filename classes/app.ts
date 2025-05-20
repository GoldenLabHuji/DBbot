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

        // Resolve the full path to deploy.sh relative to this file
        const scriptPath = path.resolve(__dirname, "..", "deploy.sh");

        // Check if the script exists
        if (!fs.existsSync(scriptPath)) {
            console.error("deploy.sh not found at:", scriptPath);
            return;
        }

        let shell: string;
        let args: string[];

        if (process.platform === "win32") {
            // Git Bash (adjust path if needed)
            shell = "C:\\Program Files\\Git\\bin\\bash.exe";
            args = [scriptPath];
        } else {
            shell = "sh";
            args = [scriptPath];
        }

        const child = spawn(shell, args, {
            stdio: "inherit",
        });

        child.on("error", (error) => {
            console.error("Error while deploying the bot:", error);
        });
    }
}