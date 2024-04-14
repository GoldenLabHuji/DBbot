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

export interface MessageProps {
    message: Message;
}

export enum Operator {
    Greater = "Greater",
    Lower = "Lower",
    Equal = "Equal",
    Range = "Range",
}

export interface NumericAttribute {
    value: number | number[];
    operator: Operator;
}

export interface StringAttribute {
    value: string;
}

export interface QueryWords {
    [key: string]: NumericAttribute | StringAttribute | null;
}
export interface TableProps {
    rows: WordData[];
}

export interface ResultsData {
    data: any[];
}

export interface WordData {
    [key: string]: string | number | null;
}
