import { OperatorData } from "./types";

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
