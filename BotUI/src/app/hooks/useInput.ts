import { useState, Dispatch, SetStateAction } from "react";
import { Message, Bot } from "@/app/general/interfaces";
import {
    sender,
    typeOfQuestion,
    currentMsgType,
    currentQIndexType,
} from "@/app/general/types";
import {
    botMessages,
    botOperatorMessages,
    botRestartMessages,
    botFunctionParamsMessages,
    emptyMessage,
    botAddMessages,
} from "@/app/general/resources";

export default function useInput(
    currentMsg: currentMsgType,
    currentQIndex: currentQIndexType,
    lastQuestionIndex: number,
    bot: Bot,
    strParam: {
        state: boolean;
        setState: Dispatch<SetStateAction<boolean>>;
    },
    setIsEndSection: Dispatch<SetStateAction<boolean>>
) {
    const [botMsg, setBotMsg] = useState<Message[]>(botMessages(bot));
    const [isSubmit, setIsSubmit] = useState<boolean>(false);

    const handleUserInput = (
        input: string,
        setIsEndChat: Dispatch<SetStateAction<boolean>>
    ) => {
        const lastMessageSectionQuestion =
            currentMsg.state[currentMsg.state.length - 1];
        const typeOfQuestion = lastMessageSectionQuestion.typeOfQuestion ?? "";

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
                        setBotMsg([...botMsg, ...botRestartMessages(bot)]);
                    break;
                case "parameter":
                    const dataType = bot.columns[Number(input) - 1]?.dataType;
                    const isString =
                        dataType === "string" ||
                        Number(input) === bot.headers.length + 1;
                    strParam.setState(isString);
                    setBotMsg([
                        ...botMsg,
                        ...botOperatorMessages(bot, isString),
                    ]);
                    break;
                case "operator":
                    const operatorIndex = Number(input) - 1;
                    const funcParamsMsg = botFunctionParamsMessages(
                        bot,
                        operatorIndex,
                        strParam.state
                    );

                    if (funcParamsMsg[0] === emptyMessage) {
                        setBotMsg([...botMsg, ...botAddMessages]);
                    } else {
                        setBotMsg([...botMsg, ...funcParamsMsg]);
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

    return { handleUserInput, botMsg, isSubmit };
}
