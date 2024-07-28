import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";
import { Attribute, Bot, BotColumn } from "@/app/general/interfaces";
import { strOrNum } from "@/app/general/types";

export default function useEndChat(bot: Bot) {
    const [messages, _] = useRecoilState(messagesSectionAtom);

    const handleEndChat = (): Attribute[] => {
        const queryAttributes: Attribute[] = [];

        messages.forEach((msgSec) => {
            const userFilteredMessages = msgSec?.messageSection.filter(
                (msg) => msg && msg?.sender === "user"
            );

            const parametersMessages = userFilteredMessages.filter(
                (msg) => msg.typeOfQuestion === "parameter"
            );
            const operatorsMessages = userFilteredMessages.filter(
                (msg) => msg.typeOfQuestion === "operator"
            );
            const functionParamsMessages = userFilteredMessages.filter(
                (msg) => msg.typeOfQuestion === "functionParams"
            );

            const parameter =
                bot?._data.headers[Number(parametersMessages[0]?.text) - 1];

            const parameterColumnId = bot?._data.columns.find(
                (col) => col.displayName === parameter
            )?.id;

            const parameterColumn = bot?._data.columns.find(
                (col) => col.id === parameterColumnId
            ) as BotColumn;

            const operatorsOfColumn = parameterColumn.operatorsArray;

            const operatorChoice = Number(operatorsMessages[0]?.text) - 1;

            const operator = operatorsOfColumn[operatorChoice];

            const parameterDataType = parameterColumn?.dataType;

            const functionParams: strOrNum[] = [];
            functionParamsMessages.forEach((msg) => {
                if (parameterDataType === "string")
                    functionParams.push(msg.text);
                else functionParams.push(Number(msg.text));
            });

            const newAttribute: Attribute = {
                name: parameter,
                operator: operator.id,
                params: functionParams,
            };

            queryAttributes.push(newAttribute);
        });
        return queryAttributes;
    };

    return { handleEndChat };
}
