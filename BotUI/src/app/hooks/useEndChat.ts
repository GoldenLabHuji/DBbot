import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";
import { Attribute, Bot } from "@/app/general/interfaces";
import { strOrNum } from "@/app/general/types";

export default function useEndChat(bot: Bot) {
    const [messages, _] = useRecoilState(messagesSectionAtom);

    const handleEndChat = (): Attribute[] => {
        const queryAttributes: Attribute[] = [];

        messages.forEach((msgSec) => {
            const userFilteredMessages = msgSec?.messageSection.filter(
                (msg) => msg && msg?.sender === "user"
            );

            const numericOperators = bot.operatorsData.numeric.map(
                (op) => op.name
            );
            const stringOperators = bot.operatorsData.string.map(
                (op) => op.name
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

            const parameterColumn = bot?._data.columns.find(
                (col) => col.displayName === parameter
            );

            const parameterDataType = parameterColumn?.dataType;

            const operatorChoice = Number(operatorsMessages[0]?.text) - 1;

            const operator =
                parameterDataType === "numeric"
                    ? numericOperators[operatorChoice]
                    : stringOperators[operatorChoice];

            const functionParams: strOrNum[] = [];
            functionParamsMessages.forEach((msg) => {
                if (parameterDataType === "string")
                    functionParams.push(msg.text);
                else functionParams.push(Number(msg.text));
            });

            const newAttribute: Attribute = {
                name: parameter,
                operator,
                params: functionParams,
            };

            queryAttributes.push(newAttribute);
        });
        return queryAttributes;
    };

    return { handleEndChat };
}
