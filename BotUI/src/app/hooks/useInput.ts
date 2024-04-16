import { useState, Dispatch, SetStateAction } from "react";
import { Message } from "@/app/general/interfaces";
import {
    sender,
    typeOfQuestion,
    currentMsgType,
    currentQIndexType,
} from "@/app/general/types";
import {
    botMessages,
    botStringMessages,
    botOperatorMessages,
    botRangeOperatorMessages,
    botNumericEqualMessages,
    botNumericNotEqualMessages,
    botAddParameterMessages,
} from "@/app/general/resources";
import { botAtom } from "@/app/store/atoms";
import { useRecoilState } from "recoil";

export default function useInput(
    currentMsg: currentMsgType,
    currentQIndex: currentQIndexType,
    lastQuestionIndex: number
) {
    const [bot, _] = useRecoilState(botAtom);
    const [botMsg, setBotMsg] = useState<Message[]>(botMessages(bot.headers));
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [__, setIsEndSection] = useState<boolean>(false);
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
                    const isEnd = Number(input) === 2;
                    setIsEndSection(true);
                    setIsEndChat(isEnd);
                    !isEnd &&
                        setBotMsg([...botMsg, ...botAddParameterMessages]);
                    break;
                case "parameter":
                    const isString = Number(input) === bot.headers.length + 1;
                    setIsStringParameter(isString);
                    setBotMsg(
                        isString
                            ? [...botMsg, ...botStringMessages]
                            : [...botMsg, ...botNumericEqualMessages]
                    );
                    break;
                case "operator":
                    if (!isStringParameter && Number(input) === 3) {
                        setBotMsg([...botMsg, ...botRangeOperatorMessages]);
                    } else if (!isStringParameter) {
                        setBotMsg([...botMsg, ...botOperatorMessages]);
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
