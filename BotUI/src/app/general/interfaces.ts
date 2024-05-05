import { sender, typeOfQuestion } from "@/app/general/types";

export interface Message {
    id: string | number;
    text: string;
    sender: sender;
    typeOfQuestion: typeOfQuestion;
    answerOptions?: number[];
}

export interface MessageSection {
    id: number | string;
    messageSection: Message[];
}

export interface ChatProps {
    bot: Bot;
}
export interface ChatBoxProps extends ChatProps {}

export interface MessageProps {
    message: Message;
}

export interface TableProps {
    rows: WordData[];
}

export interface Bot {
    name: string | null;
    description: string | null;
    example: string | null;
    columns: BotColumn[];
    dataMap: {};
    headers: string[];
}

interface BotColumn {
    id: string;
    dataType: "numeric" | "string";
    displayName: string;
    rows: string[] | number[];
    operatorsArray: BotOperatorArray[];
}

interface BotOperatorArray {
    displayName: string;
}

export enum NumericOperator {
    Greater = "Greater",
    Lower = "Lower",
    Equal = "Equal",
    Range = "Range",
}

export enum StringOperator {
    StartWith = "StartWith",
    SoundLike = "SoundLike",
}

export interface NumericAttribute {
    value: number | number[];
    operator: NumericOperator;
}

export interface StringAttribute {
    value: string;
    operator: StringOperator;
}

export interface QueryWords {
    [key: string]: NumericAttribute | StringAttribute | null;
}

export interface ResultsData {
    data: any[];
}

export interface WordData {
    [key: string]: string | number | null;
}
