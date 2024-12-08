import * as types from "./types";
import * as operators from "../classes/operator";

export enum ERRORS {
    DATATYPE = "Invalid data type",
    NAN = "Can only calculate for numeric data type",
    MODE = "No mode found",
    CUSTOM = "Custom value is required",
    METHOD = "Invalid method, Please provide a valid method of the following 'mean', 'median', 'mode', 'remove' or 'custom'",
}

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

export const EMPTY = {
    operatorsFiles: { functions: {}, main: "" },
    details: {
        name: "DBBot",
        helpDescription: "NO DESCRIPTION PROVIDED",
    },
    messages: {
        customMessages: {
            attributeMessage: undefined,
            operatorMessage: undefined,
            errorMessage: undefined,
            continueMessage: undefined,
            resultMessage: undefined,
        } as types.CustomMessages,
        slots: {
            welcomeSlot: [],
            operatorSlot: [],
            paramsSlot: [],
            restartSlot: [],
            resultSlot: [],
        } as types.MessagesSlot,
    } as types.BotMessages,
};

export const DEFAULT_OPERATORS = {
    numericOperators: [
        new operators.EqualOperator(),
        new operators.LessOperator(),
        new operators.GreaterOperator(),
        new operators.RangeOperator(),
    ],
    stringOperators: [
        new operators.StartsWithOperator(),
        new operators.EndWithOperator(),
        new operators.ContainsOperator(),
        new operators.EqualStringOperator(),
    ],
    factorOperators: [
        new operators.ChooseOneOperator(),
        new operators.ChooseMultipleOperator(),
    ],
};

const STRING_OPERATORS_DATA: types.OperatorData[] = [
    {
        name: "EndWithOperator",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
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
                dataType: types.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
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
                dataType: types.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
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
                dataType: types.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
                isArray: false,
                message: "Enter the character to start with:",
            },
        ],
    },
];

const NUMERIC_OPERATORS_DATA: types.OperatorData[] = [
    {
        name: "Equal",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.NUMERIC,
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
                dataType: types.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.NUMERIC,
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
                dataType: types.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.NUMERIC,
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
                dataType: types.DataType.NUMERIC,
                isArray: false,
            },
            {
                name: "minValue",
                dataType: types.DataType.NUMERIC,
                isArray: false,
                message: "Enter the minimum value:",
            },
            {
                name: "maxValue",
                dataType: types.DataType.NUMERIC,
                isArray: false,
                message: "Enter the maximum value:",
            },
        ],
    },
];

const FACTOR_OPERATORS_DATA: types.OperatorData[] = [
    {
        name: "ChooseOne",
        column: "all",
        params: [
            {
                name: "cell",
                dataType: types.DataType.STRING,
                isArray: false,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
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
                dataType: types.DataType.FACTOR,
                isArray: false,
            },
            {
                name: "values",
                dataType: types.DataType.FACTOR,
                isArray: true,
                message:
                    "Enter the values you would like to choose. Please enter in the format: value1, value2, value3",
            },
        ],
    },
];

export const EMPTY_OPERATORS_DATA: types.OperatorData[] = [
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
