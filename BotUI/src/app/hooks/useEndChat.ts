import { useRecoilState } from "recoil";
import { messagesSectionAtom, botAtom } from "@/app/store/atoms";
import {
    QueryWords,
    NumericOperator,
    StringOperator,
    NumericAttribute,
    StringAttribute,
} from "@/app/general/interfaces";
import {
    emptyNumericAttribute,
    emptyStringAttribute,
} from "@/app/general/resources";
import { isNumberArray } from "@/app/general/utils";
import { strParamType } from "@/app/general/types";

export default function useEndChat(strParam: strParamType) {
    const [bot, __] = useRecoilState(botAtom);
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

            userFilteredMessages?.forEach((msg) => {
                switch (msg?.typeOfQuestion) {
                    case "value":
                        const isRange =
                            numericAttribute.operator === NumericOperator.Range;
                        if (strParam.state) stringAttribute.value = msg?.text;
                        if (!isRange)
                            numericAttribute.value = Number(msg?.text);
                        if (isNumberArray(numericAttribute.value))
                            numericAttribute.value.push(Number(msg?.text));

                        break;
                    case "operator":
                        if (!strParam.state) {
                            numericAttribute.operator = [
                                NumericOperator.Greater,
                                NumericOperator.Lower,
                                NumericOperator.Range,
                                NumericOperator.Equal,
                            ][Number(msg?.text) - 1];
                            if (Number(msg?.text) === 3) {
                                numericAttribute.value = [] as number[];
                            }
                        } else {
                            stringAttribute.operator = [
                                StringOperator.StartWith,
                                StringOperator.SoundLike,
                            ][Number(msg?.text) - 1];
                        }
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
