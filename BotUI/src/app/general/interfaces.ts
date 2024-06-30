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

export interface Bot {
    dataMap: {};
    _data: BotData;
    _details: BotDetails;
    _messages: BotMessages;
    filePath: string;
    operatorsData: BotOperators;
    currentOperatorIndex: number;
}

interface BotData {
    headers: string[];
    columns: BotColumn[];
}

interface BotDetails {
    name: string;
    description: string;
}

interface BotMessages {
    customMessages: CustomMessages;
    slots: MessagesSlot;
}

interface CustomMessages {
    attributeMessage: string;
    operatorMessage: string;
    errorMessage: string;
    continueMessage: string;
    resultMessage: string;
}

interface MessagesSlot {
    welcomeSlot?: string[];
    operatorSlot?: string[];
    paramsSlot?: string[];
    restartSlot?: string[];
    resultSlot?: string[];
}
interface BotColumn {
    id: string;
    dataType: DataType;
    displayName: string;
    rows: strOrNum[];
    operatorsArray: { displayName: string }[];
}

interface BotOperators {
    numeric: BotOperatorData[];
    string: BotOperatorData[];
}

interface BotOperatorData extends NameDataType {
    params: BotOperatorParams[];
    message?: string;
}

interface BotOperatorParams extends NameDataType {
    isArray: boolean;
    message?: string;
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

export interface Attribute {
    name: string;
    params: strOrNum[];
    operator: string;
}

export interface QueryWords {
    [key: string]: Attribute;
}

export interface WordData {
    [key: string]: strOrNum | null;
}
