import Chat from "@/app/components/Chat";

export default function Home() {
    const bot = JSON.parse(process.env.DB_BOT as string);

    return <Chat bot={bot} />;
}
