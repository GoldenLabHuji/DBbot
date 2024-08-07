"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBbot = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sync_1 = require("csv-parse/sync");
const column_1 = require("./column");
const operator_1 = require("./operator");
const resources_1 = require("../general/resources");
class DBbot {
    dataMap = new Map();
    filePath = "";
    _customOperators = [];
    _messages = resources_1.EMPTY_MESSAGES;
    currentOperatorIndex = 0;
    operatorsData = resources_1.EMPTY_OPERATORS_DATA;
    _details = resources_1.EMPTY_DETAILS;
    _data = {
        headers: [],
        columns: [],
        customOperators: this._customOperators,
    };
    constructor() {
        this.initMessages();
    }
    initMessages() {
        this._messages.customMessages = {
            attributeMessage: "This is a message to ask for an attribute of the database to start the query. Here is the list of the attributes:",
            operatorMessage: "This is the list of operators to choose from:",
            errorMessage: "I don't understand, please enter a valid option",
            continueMessage: "Enter 1 to continue",
            resultMessage: `Here is the results of your query. 
You can download the results as a csv file`,
        };
        this._messages.slots = {
            welcomeSlot: [
                "Welcome message",
                "Description message",
                "Example message",
            ],
            operatorSlot: [],
            paramsSlot: [],
            restartSlot: [],
            resultSlot: [],
        };
    }
    get details() {
        return this._details;
    }
    set details(details) {
        this._details.name = details.name ?? this._details.name;
        this._details.description =
            details.description ?? this._details.description;
    }
    get data() {
        return this._data;
    }
    get messages() {
        return this._messages;
    }
    set customMessages(messages) {
        this.setMessages("customMessages", messages);
    }
    set slots(messages) {
        this.setMessages("slots", messages);
    }
    setMessages(key, messages) {
        Object.keys(messages).forEach((messageKey) => {
            const messageKeyName = messageKey;
            this._messages[key][messageKeyName] =
                messages[messageKeyName] ?? this._messages[key][messageKeyName];
        });
    }
    getColumnByStringProperty(property, value) {
        const column = this._data.columns.find((column) => column[property].toLowerCase() ===
            value.toLowerCase());
        if (column === undefined) {
            throw new Error(`Column with ${property} of ${value} not found`);
        }
        return column;
    }
    getColumnByName(name) {
        return this.getColumnByStringProperty("displayName", name);
    }
    getColumnById(id) {
        return this.getColumnByStringProperty("id", id);
    }
    changeColumnDisplayName(name, newName) {
        const column = this.getColumnByName(name);
        try {
            this.getColumnByName(newName);
        }
        catch {
            column.displayName = newName;
            const index = this._data.headers.indexOf(name);
            this._data.headers[index] = newName;
            return;
        }
        throw new Error(`Column ${newName} already exists`);
    }
    addColumn(column) {
        this._data.columns.push(column);
    }
    removeColumn(column) {
        this._data.columns = this._data.columns.filter((c) => c !== column);
    }
    addCustomOperator(params) {
        this.registerOperators(params);
        const functionFilePath = path_1.default.resolve(__dirname, `${resources_1.OPERATOR_PATHS[process.env.NODE_ENV ?? "production"]}/${params.name}.js`);
        const importStatements = (params.importFunctions &&
            params.importFunctions
                .map((func) => `import {${func}} from './${func}.js';`)
                .join("\n")) ??
            "";
        fs_1.default.writeFileSync(functionFilePath, `${importStatements}

export const ${params.name} = ${params.customFunction.toString()};`);
    }
    createOperatorsFile() {
        const operatorsFilePath = path_1.default.resolve(__dirname, `${resources_1.OPERATOR_PATHS[process.env.NODE_ENV ?? "production"]}/operators.ts`);
        const operatorsNames = this._data.customOperators.map((operator) => operator.getDisplayName());
        const customFunctionsImport = operatorsNames
            .map((name) => `import { ${name} } from "@/app/operators/${name}";`)
            .join("\n");
        const appendOperators = operatorsNames
            .map((name) => `OPERATORS["${name}" as keyof typeof OPERATORS] = ${name};`)
            .join("\n");
        const fileText = resources_1.OPERATORS_FILE +
            "\n\n" +
            customFunctionsImport +
            "\n\n" +
            appendOperators;
        fs_1.default.writeFileSync(operatorsFilePath, fileText);
    }
    loadFile(path) {
        this.filePath = path;
        try {
            const fileData = fs_1.default.readFileSync(path, "utf8");
            const records = (0, sync_1.parse)(fileData, {
                columns: true,
                trim: true,
                skip_empty_lines: true,
            });
            if (records.length > 0) {
                this._data.headers = Object.keys(records[0]);
                this._data.headers.forEach((header) => {
                    this.dataMap.set(header, []);
                });
            }
            this.addColumnsToDataMap(records);
            this.addColumnsAuto();
        }
        catch (error) {
            console.error(error);
        }
    }
    registerOperators(params) {
        const newOperator = new operator_1.CustomOperator(params.name, params.customFunction);
        newOperator.addParams(params.params);
        this._data.customOperators.push(newOperator);
        this.operatorsData.push({
            name: params.name,
            params: params.params,
            message: params.message,
            column: params.column,
        });
        const column = this.getColumnByName(params.column);
        column.addOperator(newOperator);
    }
    addColumnsToDataMap(records) {
        records.forEach((record) => {
            this._data.headers.forEach((header) => {
                const columnData = this.dataMap.get(header);
                if (columnData) {
                    columnData.push(record[header]);
                }
            });
        });
    }
    fillNullValuesAll({ numericValue, stringValue, nullValue = [null], }) {
        this._data.columns.forEach((column) => {
            const value = column.dataType === "numeric" ? numericValue : stringValue;
            if (value === undefined)
                return;
            column.fillNullValues("custom", nullValue, value);
        });
    }
    addColumnsAuto() {
        this._data.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.some((item) => !isNaN(Number(item)));
                const dataType = isNumeric ? "numeric" : "string";
                const col = new column_1.Column(column, dataType);
                const numberColumnData = columnData.map((item) => parseFloat(item));
                col.addRows(dataType === "numeric" ? numberColumnData : columnData);
                this.addColumn(col);
            }
            else {
                console.error(`Column ${column} has no data. Skipping this column.`);
            }
        });
    }
}
exports.DBbot = DBbot;
