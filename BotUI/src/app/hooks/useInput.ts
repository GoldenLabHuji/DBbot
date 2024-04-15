import { useState, Dispatch, SetStateAction } from "react";
import { botMessages } from "@/app/general/resources";
import { Message } from "@/app/general/interfaces";
import {
    sender,
    typeOfQuestion,
    currentMsgType,
    currentQIndexType,
} from "@/app/general/types";
import {
    botStringMessages,
    botOperatorMessages,
    botRangeOperatorMessages,
    botNumericEqualMessages,
    botNumericNotEqualMessages,
    botAddParameterMessages,
} from "@/app/general/resources";

export default function useInput(
    currentMsg: currentMsgType,
    currentQIndex: currentQIndexType,
    lastQuestionIndex: number
) {
    const [botMsg, setBotMsg] = useState<Message[]>(botMessages);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [_, setIsEndSection] = useState<boolean>(false);
    const [isStringParameter, setIsStringParameter] = useState<boolean>(false);

    const handleUserInput = (
        input: string,
        setIsEndChat: Dispatch<SetStateAction<boolean>>
    ) => {
        const lastMessageSectionQuestion =
            currentMsg.state[currentMsg.state.length - 1];
        const typeOfQuestion =
            currentMsg.state.length > 0
                ? lastMessageSectionQuestion.typeOfQuestion
                : "";

        const isAnswerOptions = !!lastMessageSectionQuestion.answerOptions;
        const isAnswerOptionsValid =
            lastMessageSectionQuestion.answerOptions?.includes(Number(input));

        if ((isAnswerOptions && !isAnswerOptionsValid) || input === "") {
            const newMessage: Message = {
                id: currentMsg.state.length,
                text: "I don't understand, please enter a valid option",
                sender: "bot" as sender,
                typeOfQuestion: typeOfQuestion as typeOfQuestion,
                answerOptions: lastMessageSectionQuestion.answerOptions,
            };
            currentMsg.setState([...currentMsg.state, newMessage]);
        }

        if ((!isAnswerOptions && input !== "") || isAnswerOptionsValid) {
            const newMessage: Message = {
                id: currentMsg.state.length,
                text: input,
                sender: "user" as sender,
                typeOfQuestion: typeOfQuestion as typeOfQuestion,
            };
            currentMsg.setState([...currentMsg.state, newMessage]);

            switch (typeOfQuestion) {
                case "add":
                    if (Number(input) === 2) {
                        setIsEndChat(true);
                    } else {
                        setIsEndSection(true);
                        setBotMsg([...botMsg, ...botAddParameterMessages]);
                    }
                    break;
                case "parameter":
                    if (Number(input) === 4) {
                        setIsStringParameter(true);
                        setBotMsg([...botMsg, ...botStringMessages]);
                        setIsEndSection(false);
                    } else {
                        setIsStringParameter(false);
                        if (Number(input) === 1) {
                            setBotMsg([
                                ...botMsg,
                                ...botNumericNotEqualMessages,
                            ]);
                        } else {
                            setBotMsg([...botMsg, ...botNumericEqualMessages]);
                        }
                    }
                    break;
                case "operator":
                    if (!isStringParameter) {
                        if (Number(input) === 3) {
                            setBotMsg([...botMsg, ...botRangeOperatorMessages]);
                        } else {
                            setBotMsg([...botMsg, ...botOperatorMessages]);
                        }
                    }
                    break;
                default:
                    break;
            }

            currentQIndex.setState(
                currentQIndex.state < lastQuestionIndex + 1
                    ? currentQIndex.state + 1
                    : 0
            );
        }
        setIsSubmit(!isSubmit);
    };

    const strParam = {
        state: isStringParameter,
        setState: setIsStringParameter,
    };

    return { handleUserInput, botMsg, isSubmit, strParam };
}
