import {
    OperatorData,
    CustomMessages,
    MessagesSlot,
    BotMessages,
} from "./types";

export const DATATYPE_ERROR = "Invalid data type";
export const STRING_CALCULATION_ERROR = "Cannot calculate for string data type";
export const MODE_ERROR = "No mode found";
export const CUSTOM_ERROR = "Custom value is required";
export const METHOD_ERROR =
    "Invalid method, Please provide a valid method of the following 'mean', 'median', 'mode', 'remove' or 'custom'";

export const EMPTY_OPERATORS_FILES = { functions: {}, main: "" };

export const COLORS = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "orange",
    "black",
    "white",
];

const EMPTY_CUSTOM_MESSAGES: CustomMessages = {
    attributeMessage: undefined,
    operatorMessage: undefined,
    errorMessage: undefined,
    continueMessage: undefined,
    resultMessage: undefined,
};

const EMPTY_SLOTS: MessagesSlot = {
    welcomeSlot: [],
    operatorSlot: [],
    paramsSlot: [],
    restartSlot: [],
    resultSlot: [],
};

export const EMPTY_MESSAGES: BotMessages = {
    customMessages: EMPTY_CUSTOM_MESSAGES,
    slots: EMPTY_SLOTS,
};

export const EMPTY_DETAILS = {
    name: "INSERT DATABASE NAME",
    description: "INSERT DESCRIPTION OF THE DATABASE",
};

const STRING_OPERATORS_DATA: OperatorData[] = [
    {
        name: "EndWithOperator",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "string",
                isArray: false,
            },
            {
                name: "value",
                dataType: "string",
                isArray: false,
                message: "Enter the character to end with:",
            },
        ],
    },
    {
        name: "ContainsOperator",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "string",
                isArray: false,
            },
            {
                name: "value",
                dataType: "string",
                isArray: false,
                message: "Enter the string the word should contain:",
            },
        ],
    },
    {
        name: "EqualStringOperator",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "string",
                isArray: false,
            },
            {
                name: "value",
                dataType: "string",
                isArray: false,
                message: "Enter the value the word should be equal to:",
            },
        ],
    },
    {
        name: "StartWith",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "string",
                isArray: false,
            },
            {
                name: "value",
                dataType: "string",
                isArray: false,
                message: "Enter the character to start with:",
            },
        ],
    },
];

const NUMERIC_OPERATORS_DATA: OperatorData[] = [
    {
        name: "Equal",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "value",
                dataType: "numeric",
                isArray: false,
                message: "Enter the value you would like it to be equal to:",
            },
        ],
    },
    {
        name: "Greater",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "value",
                dataType: "numeric",
                isArray: false,
                message:
                    "Enter the value you would like it to be greater than:",
            },
        ],
    },
    {
        name: "Less",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "value",
                dataType: "numeric",
                isArray: false,
                message: "Enter the value you would like it to be less than:",
            },
        ],
    },
    {
        name: "Range",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "minValue",
                dataType: "numeric",
                isArray: false,
                message: "Enter the minimum value:",
            },
            {
                name: "maxValue",
                dataType: "numeric",
                isArray: false,
                message: "Enter the maximum value:",
            },
        ],
    },
];

const FACTOR_OPERATORS_DATA: OperatorData[] = [
    {
        name: "ChooseOne",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "string",
                isArray: false,
            },
            {
                name: "value",
                dataType: "string",
                isArray: false,
                message: "Enter the value you would like to choose:",
            },
        ],
    },
    {
        name: "ChooseMultiple",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: "factor",
                isArray: false,
            },
            {
                name: "values",
                dataType: "factor",
                isArray: true,
                message:
                    "Enter the values you would like to choose. Please enter in the format: value1, value2, value3",
            },
        ],
    },
];

export const EMPTY_OPERATORS_DATA: OperatorData[] = [
    ...STRING_OPERATORS_DATA,
    ...NUMERIC_OPERATORS_DATA,
    ...FACTOR_OPERATORS_DATA,
];

export const OPERATORS_FILE = `
import {
    greaterOperator,
    lowerOperator,
    equalOperator,
    rangeOperator,
    startWithOperator,
    endWithOperator,
    containsOperator,
    equalStringOperator,
    chooseOneOperator,
    chooseMultipleOperator,   
} from "@/app/operators";

export const OPERATORS = {
    greater: greaterOperator,
    lower: lowerOperator,
    equal: equalOperator,
    range: rangeOperator,
    startWith: startWithOperator,
    endWith: endWithOperator,
    contains: containsOperator,
    equalString: equalStringOperator,
    chooseOne: chooseOneOperator,
    chooseMultiple: chooseMultipleOperator,
};`;
