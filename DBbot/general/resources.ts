import {
    OperatorData,
    Paths,
    CustomMessages,
    MessagesSlot,
    BotMessages,
    OperatorsObject,
} from "./types";

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
        name: "SoundLike",
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
                message:
                    "enter the word you would like it to sound similar to:",
            },
            {
                name: "maxDifferences",
                dataType: "numeric",
                isArray: false,
                message: "Enter the maximum number of differences allowed:",
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
    soundLikeOperator,
} from "@/app/operators";

export const OPERATORS = {
    greater: greaterOperator,
    lower: lowerOperator,
    equal: equalOperator,
    range: rangeOperator,
    soundLike: soundLikeOperator,
    startWith: startWithOperator,
};`;
