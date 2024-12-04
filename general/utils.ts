import { DBbot } from "../classes/DBbot";
import * as fs from "fs-extra";
import * as path from "path";

export function generateBotFile(bot: DBbot): void {
    bot.createOperatorsFile();
    const filePath = path.resolve(process.cwd(), "db_bot.json");
    fs.writeJsonSync(filePath, bot);
}

export function generateTypeError(
    value: any,
    expectedType: string,
    variable: string
): void {
    if (typeof value !== expectedType) {
        throw new Error(
            `The type of ${variable} is invalid. Expected type ${expectedType} but got ${typeof value}`
        );
    }
}
