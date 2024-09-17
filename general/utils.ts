import { DBbot } from "../classes/DBbot";
import * as fs from "fs-extra";
import * as path from "path";

export function generateBotFile(bot: DBbot): void {
    bot.createOperatorsFile();
    const filePath = path.resolve(process.cwd(), "db_bot.json");
    fs.writeJsonSync(filePath, bot);
}
