"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUMERIC_OPERATORS_DATA = exports.STRING_OPERATRORS_DATA = void 0;
exports.STRING_OPERATRORS_DATA = [
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
exports.NUMERIC_OPERATORS_DATA = [
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
