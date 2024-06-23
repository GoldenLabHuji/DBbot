import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";
import {
    QueryWords,
    NumericAttribute,
    StringAttribute,
    Bot,
} from "@/app/general/interfaces";
import {
    emptyNumericAttribute,
    emptyStringAttribute,
} from "@/app/general/resources";
import { strParamType } from "@/app/general/types";

export default function useEndChat(strParam: strParamType, bot: Bot) {
    const [messages, _] = useRecoilState(messagesSectionAtom);

    const handleEndChat = (): QueryWords => {
        const wordsParams: QueryWords = {};
        bot.columns.forEach((col) => {
            wordsParams[col?.displayName] = null;
        });

        const numericAttribute: NumericAttribute = {
            ...emptyNumericAttribute,
        };
        const stringAttribute: StringAttribute = {
            ...emptyStringAttribute,
        };

        messages.forEach((msgSec) => {
            const userFilteredMessages = msgSec?.messageSection.filter(
                (msg) => msg && msg?.sender === "user"
            );

            const numericOpertors = bot.operatorsData.numeric.map(
                (op) => op.name
            );
            const stringOpertors = bot.operatorsData.string.map(
                (op) => op.name
            );

            userFilteredMessages?.forEach((msg) => {
                switch (msg?.typeOfQuestion) {
                    case "functionParams":
                        if (strParam.state)
                            stringAttribute.params.push(msg?.text);
                        else numericAttribute.params.push(Number(msg?.text));
                        break;
                    case "operator":
                        if (!strParam.state)
                            numericAttribute.operator =
                                numericOpertors[Number(msg?.text) - 1];
                        else
                            stringAttribute.operator =
                                stringOpertors[Number(msg?.text) - 1];

                        break;
                    case "parameter":
                        const param = bot.headers[
                            Number(msg?.text) - 1
                        ] as keyof QueryWords;
                        const paramColumn = bot.columns.find(
                            (col) => col.displayName === param
                        );
                        wordsParams[param] =
                            paramColumn?.dataType === "numeric"
                                ? numericAttribute
                                : stringAttribute;
                        break;
                    default:
                        break;
                }
            });
        });

        return wordsParams;
    };

    return { handleEndChat };
}
