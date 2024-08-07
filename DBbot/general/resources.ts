import {
    OperatorData,
    Paths,
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

export const OPERATOR_PATHS: Paths = {
    development: "../../BotUI/src/app/operators",
    production: "../../../BotUI/src/app/operators",
};

export const REACT_APP_PATH: Paths = {
    development: "./BotUI",
    production: "../BotUI",
};

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
                name: "inputValue",
                dataType: "string",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
                dataType: "string",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
                dataType: "string",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
                dataType: "string",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "compareValue",
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
                name: "inputValue",
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

export const EMPTY_OPERATORS_DATA: OperatorData[] = [
    ...STRING_OPERATORS_DATA,
    ...NUMERIC_OPERATORS_DATA,
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
};`;
