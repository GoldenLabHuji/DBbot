import { currentMsgType } from "@/app/general/types";
import { Message, MessageSection } from "@/app/general/interfaces";
import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";

export default function useUpdateMsg(
    currentMsg: currentMsgType,
    botMsg: Message[],
    currentQuestionIndex: number,
    endSection: {
        state: boolean;
        setState: (value: boolean) => void;
    }
) {
    const [messages, setMessages] = useRecoilState(messagesSectionAtom);

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
            return endSection.state
                ? [...updatedMessages, newMessageSection]
                : updatedMessages;
        });
        if (endSection.state) {
            currentMsg.setState(
                !isEndChat ? [botMsg[currentQuestionIndex]] : []
            );
        }

        endSection.setState(false);
    };

    return { endSection, updateMessagesSection };
}
