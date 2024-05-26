import { useState } from "react";
import { Message } from "@/app/general/interfaces";

export default function useChat() {
    const [currentMessagesSection, setCurrentMessagesSection] = useState<
        Message[]
    >([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [isEndChat, setIsEndChat] = useState<boolean>(false);

    const currentMsg = {
        state: currentMessagesSection,
        setState: setCurrentMessagesSection,
    };
    const currentQIndex = {
        state: currentQuestionIndex,
        setState: setCurrentQuestionIndex,
    };

    const endChat = { state: isEndChat, setState: setIsEndChat };
    return { currentMsg, currentQIndex, endChat };
}
