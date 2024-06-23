import { OperatorData, Paths } from "./types";

export const OPERATOR_PATHS: Paths = {
    development: "../../BotUI/src/app/operators",
    production: "../../../BotUI/src/app/operators",
};
export const REACT_APP_PATH: Paths = {
    development: "./BotUI",
    production: "../BotUI",
};

export const STRING_OPERATRORS_DATA: OperatorData[] = [
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
            },
            {
                name: "maxValue",
                dataType: "numeric",
                isArray: false,
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
