import { Column } from "../classes/column";
import { CustomOperator, Operator } from "../classes/operator";

export enum DataType {
    STRING = "string",
    NUMERIC = "numeric",
    FACTOR = "factor",
}

export type NumOrStr = number | string;

export enum NullMethod {
    MEAN = "mean",
    MEDIAN = "median",
    MODE = "mode",
    REMOVE = "remove",
    CUSTOM = "custom",
}

export type generalObject<T> = {
    [key: string]: T;
};

export type fillNullValuesParams = {
    numericValue?: number | null;
    stringValue?: string;
    nullValue: any[];
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
    helpDescription?: string;
    mailInfo?: string;
};

export type AddCustomOperatorParams = OperatorData & {
    customFunction: Function;
    importFunctions?: string[];
};

type NameAttribute = {
    name: string;
};

export type Params = NameAttribute & {
    isArray?: boolean;
    message?: string;
    dataType: DataType;
};

export type OperatorsObject = {
    string: OperatorData[];
    numeric: OperatorData[];
};

export type OperatorData = NameAttribute & {
    params: Params[];
    column: string;
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

export type OperatorsFiles = {
    functions: { [key: string]: string };
    main: string;
};

export type ColorsProp = {
    user: string;
    bot: string;
};
