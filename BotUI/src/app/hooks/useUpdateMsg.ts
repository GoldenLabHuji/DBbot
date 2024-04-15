import { useState } from "react";
import { currentMsgType } from "@/app/general/types";
import { Message, MessageSection } from "@/app/general/interfaces";
import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";

export default function useUpdateMsg(
    currentMsg: currentMsgType,
    botMsg: Message[],
    currentQuestionIndex: number
) {
    const [messages, setMessages] = useRecoilState(messagesSectionAtom);
    const [isEndSection, setIsEndSection] = useState<boolean>(false);

    const updateMessagesSection = (isEndChat: boolean) => {
        const lastMessageIndex = messages.length - 1;
        const updatedMessages = [...messages];
        updatedMessages[lastMessageIndex] = {
            ...updatedMessages[lastMessageIndex],
            messageSection: currentMsg.state,
        };

        setMessages((prevMessages) => {
            const newMessageSection: MessageSection = {
                id: prevMessages.length,
                messageSection: [...currentMsg.state],
            };
            return isEndSection
                ? [...updatedMessages, newMessageSection]
                : updatedMessages;
        });
        if (isEndSection) {
            currentMsg.setState(
                !isEndChat ? [botMsg[currentQuestionIndex]] : []
            );
        }

        setIsEndSection(false);
    };

    const endSection = { state: isEndSection, setState: setIsEndSection };

    return { endSection, updateMessagesSection };
}
