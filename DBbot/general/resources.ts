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
                name: "startingValue",
                dataType: "string",
                isArray: false,
            },
            {
                name: "checkValue",
                dataType: "string",
                isArray: false,
            },
        ],
    },
    {
        name: "StartsWith",
        dataType: "string",
        params: [
            {
                name: "startingValue",
                dataType: "string",
                isArray: false,
            },
            {
                name: "checkValue",
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
                name: "startingValue",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "checkValue",
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
                name: "startingValue",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "checkValue",
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
                name: "startingValue",
                dataType: "numeric",
                isArray: false,
            },
            {
                name: "checkValue",
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
                name: "startingValue",
                dataType: "numeric",
                isArray: true,
            },
            {
                name: "checkValue",
                dataType: "numeric",
                isArray: false,
            },
        ],
    },
];
