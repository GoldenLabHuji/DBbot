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
        try {
            spawn("sh", ["deploy.sh"], {
                cwd: process.cwd(),
            });
        } catch (error) {
            console.error("Error while deploying the bot", error);
        }
    }
}
