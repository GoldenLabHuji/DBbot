import Chat from "@/app/components/Chat";
import fs from "fs";

export default function Home() {
    const path = process.env.DB_BOT_FILE;
    if (path) {
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                console.error("Failed to read bot data file:", err);
            } else {
                process.env.DB_BOT = data;
            }
        });
    }

    const bot = JSON.parse((process.env.DB_BOT as string) ?? "{}");

    return <Chat bot={bot} />;
}
