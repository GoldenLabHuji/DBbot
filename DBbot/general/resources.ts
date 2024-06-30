import { OperatorData, Paths, BotMessages } from "./types";

export const OPERATOR_PATHS: Paths = {
    development: "../../BotUI/src/app/operators",
    production: "../../../BotUI/src/app/operators",
};

export const REACT_APP_PATH: Paths = {
    development: "./BotUI",
    production: "../BotUI",
};

export const EMPTY_MESSAGES: BotMessages = {
    welcomeMessage: undefined,
    attributeMessage: undefined,
    descriptionMessage: undefined,
    exampleMessage: undefined,
    operatorMessage: undefined,
    errorMessage: undefined,
    continueMessage: undefined,
};

export const STRING_OPERATORS_DATA: OperatorData[] = [
    {
        name: "SoundLike",
        dataType: "string",
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
        dataType: "string",
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

export const NUMERIC_OPERATORS_DATA: OperatorData[] = [
    {
        name: "Equal",
        dataType: "numeric",
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
        dataType: "numeric",
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
        dataType: "numeric",
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
        dataType: "numeric",
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
    Greater: greaterOperator,
    Lower: lowerOperator,
    Equal: equalOperator,
    Range: rangeOperator,
    SoundLike: soundLikeOperator,
    StartWith: startWithOperator,
};`;
