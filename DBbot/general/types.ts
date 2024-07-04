import { Column } from "../classes/column";
import { CustomOperator, Operator } from "../classes/operator";

export type DataType = "string" | "numeric";

export type NumOrStr = number | string;

export type Paths = {
    [key: string]: string;
};

export type ColumnData = {
    id: string;
    rows: any[];
    dataType: DataType;
    displayName: string;
    operators: Operator[];
};

export type BotData = {
    headers: string[];
    columns: Column[];
    customOperators: CustomOperator[];
};

export type BotDetails = {
    name?: string;
    description?: string;
};

export type AddCustomOperatorParams = OperatorData & {
    customFunction: Function;
    importFunctions?: string[];
};

type NameDataType = {
    name: string;
    dataType: DataType;
};

type Params = NameDataType & {
    isArray?: boolean;
    message?: string;
};

export type OperatorsObject = {
    string: OperatorData[];
    numeric: OperatorData[];
};

export type OperatorData = NameDataType & {
    params: Params[];
    message?: string;
};

export type BotMessages = {
    customMessages: CustomMessages;
    slots: MessagesSlot;
};

export type CustomMessages = {
    attributeMessage?: string;
    operatorMessage?: string;
    errorMessage?: string;
    continueMessage?: string;
    resultMessage?: string;
};

export type MessagesSlot = {
    welcomeSlot?: string[];
    operatorSlot?: string[];
    paramsSlot?: string[];
    restartSlot?: string[];
    resultSlot?: string[];
};
