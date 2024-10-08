"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPERATORS_FILE = exports.EMPTY_OPERATORS_DATA = exports.EMPTY_DETAILS = exports.EMPTY_MESSAGES = exports.COLORS = exports.EMPTY_OPERATORS_FILES = exports.METHOD_ERROR = exports.CUSTOM_ERROR = exports.MODE_ERROR = exports.NAN_CALCULATION_ERROR = exports.DATATYPE_ERROR = void 0;
const types_1 = require("./types");
exports.DATATYPE_ERROR = "Invalid data type";
exports.NAN_CALCULATION_ERROR = "Can only calculate for numeric data type";
exports.MODE_ERROR = "No mode found";
exports.CUSTOM_ERROR = "Custom value is required";
exports.METHOD_ERROR = "Invalid method, Please provide a valid method of the following 'mean', 'median', 'mode', 'remove' or 'custom'";
exports.EMPTY_OPERATORS_FILES = { functions: {}, main: "" };
exports.COLORS = [
    "blue",
    "green",
    "red",
    "yellow",
    "purple",
    "orange",
    "black",
    "white",
];
const EMPTY_CUSTOM_MESSAGES = {
    attributeMessage: undefined,
    operatorMessage: undefined,
    errorMessage: undefined,
    continueMessage: undefined,
    resultMessage: undefined,
};
const EMPTY_SLOTS = {
    welcomeSlot: [],
    operatorSlot: [],
    paramsSlot: [],
    restartSlot: [],
    resultSlot: [],
};
exports.EMPTY_MESSAGES = {
    customMessages: EMPTY_CUSTOM_MESSAGES,
    slots: EMPTY_SLOTS,
};
exports.EMPTY_DETAILS = {
    name: "INSERT DATABASE NAME",
    description: "INSERT DESCRIPTION OF THE DATABASE",
};
const STRING_OPERATORS_DATA = [
    {
        name: "EndWithOperator",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types_1.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.STRING,
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
                dataType: types_1.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.STRING,
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
                dataType: types_1.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.STRING,
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
                dataType: types_1.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.STRING,
                isArray: false,
                message: "Enter the character to start with:",
            },
        ],
    },
];
const NUMERIC_OPERATORS_DATA = [
    {
        name: "Equal",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.NUMERIC,
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
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
                message: "Enter the value you would like it to be greater than:",
            },
        ],
    },
    {
        name: "Less",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.NUMERIC,
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
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "minValue",
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
                message: "Enter the minimum value:",
            },
            {
                name: "maxValue",
                dataType: types_1.DataType.NUMERIC,
                isArray: false,
                message: "Enter the maximum value:",
            },
        ],
    },
];
const FACTOR_OPERATORS_DATA = [
    {
        name: "ChooseOne",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types_1.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types_1.DataType.STRING,
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
                dataType: types_1.DataType.FACTOR,
                isArray: false,
            },
            {
                name: "values",
                dataType: types_1.DataType.FACTOR,
                isArray: true,
                message: "Enter the values you would like to choose. Please enter in the format: value1, value2, value3",
            },
        ],
    },
];
exports.EMPTY_OPERATORS_DATA = [
    ...STRING_OPERATORS_DATA,
    ...NUMERIC_OPERATORS_DATA,
    ...FACTOR_OPERATORS_DATA,
];
exports.OPERATORS_FILE = `
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
