import { sender, typeOfQuestion, strOrNum } from "@/app/general/types";

export interface Message {
    id: number;
    text: string;
    sender: sender;
    typeOfQuestion: typeOfQuestion;
    answerOptions?: number[];
}

export interface MessageSection {
    id: number;
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
    name: string;
    description: string;
    example: string;
    columns: BotColumn[];
    dataMap: {};
    headers: string[];
    filePath: string;
    operatorsData: BotOperators;
}

interface BotColumn {
    id: string;
    dataType: DataType;
    displayName: string;
    rows: strOrNum[];
    operatorsArray: BotOperatorArray[];
}

interface BotOperators {
    numeric: BotOperatorData[];
    string: BotOperatorData[];
}

interface BotOperatorArray {
    displayName: string;
}

interface BotOperatorData extends NameDataType {
    params: BotOperatorParams[];
}

interface BotOperatorParams extends NameDataType {
    isArray: boolean;
}

interface NameDataType {
    name: string;
    dataType: DataType;
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

export enum DataType {
    Numeric = "numeric",
    String = "string",
}

export interface QueryReq {
    value: strOrNum | number[];
    operator: NumericOperator | StringOperator;
    param: string;
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

export interface WordData {
    [key: string]: strOrNum | null;
}
