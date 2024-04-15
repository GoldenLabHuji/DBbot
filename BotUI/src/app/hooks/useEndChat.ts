import { useRecoilState } from "recoil";
import { messagesSectionAtom } from "@/app/store/atoms";
import {
    QueryWords,
    Operator,
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
    const [messages, _] = useRecoilState(messagesSectionAtom);
    const handleEndChat = (): QueryWords => {
        const wordsParams: QueryWords = {
            age_of_aquisition: null,
            number_of_phon: null,
            number_of_syll: null,
            start_with: null,
            sound_like: null,
        };

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
                        if (!strParam.state) {
                            if (numericAttribute.operator === Operator.Range) {
                                if (isNumberArray(numericAttribute.value)) {
                                    numericAttribute.value.push(
                                        Number(msg?.text)
                                    );
                                }
                            } else {
                                numericAttribute.value = Number(msg?.text);
                            }
                        } else {
                            stringAttribute.value = msg?.text;
                        }
                        break;
                    case "operator":
                        if (!strParam.state) {
                            numericAttribute.operator = [
                                Operator.Greater,
                                Operator.Lower,
                                Operator.Range,
                                Operator.Equal,
                            ][Number(msg?.text) - 1];
                            if (Number(msg?.text) === 3) {
                                numericAttribute.value = [] as number[];
                            }
                        } else {
                            wordsParams[
                                ["start_with", "sound_like"][
                                    Number(msg?.text) - 1
                                ] as keyof QueryWords
                            ] = stringAttribute as StringAttribute &
                                NumericAttribute;
                        }
                        break;
                    case "parameter":
                        if (!strParam.state) {
                            wordsParams[
                                [
                                    "age_of_aquisition",
                                    "number_of_phon",
                                    "number_of_syll",
                                ][Number(msg?.text) - 1] as keyof QueryWords
                            ] = numericAttribute as NumericAttribute &
                                StringAttribute;
                        }
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
