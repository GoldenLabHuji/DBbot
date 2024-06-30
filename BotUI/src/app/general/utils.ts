import { OPERATORS } from "@/app/operators/operators";
import { Message } from "@/app/general/interfaces";

export function isNumberArray(value: any): value is number[] {
    const isArray = Array.isArray(value);
    if (!isArray) return false;
    const isNumArray = value.every(
        (element: any) => typeof element === "number"
    );
    return isNumArray;
}

export function getOperator(name: string) {
    return OPERATORS[name as keyof typeof OPERATORS];
}

export function convertTextToMessage(
    text: string,
    id: number,
    continueMessage: string
): Message {
    return {
        id: id,
        text: text + "\n" + continueMessage,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    };
}
