"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBbot = void 0;
const fs = require("fs");
const path = require("path");
const sync_1 = require("csv-parse/sync");
const column_1 = require("./column");
const operator_1 = require("./operator");
const resources_1 = require("../general/resources");
class DBbot {
    dataMap = new Map();
    headers = [];
    columns = [];
    name = "INSERT DATABASE NAME";
    description = "INSERT DESCRIPTION OF THE DATABASE";
    example = "INSERT EXAMPLE OF USE CASE";
    filePath = "";
    customOperators = [];
    operatorsData = {
        string: resources_1.STRING_OPERATRORS_DATA,
        numeric: resources_1.NUMERIC_OPERATORS_DATA,
    };
    getDetails() {
        return {
            name: this.name,
            description: this.description,
            example: this.example,
        };
    }
    getData() {
        return {
            headers: this.headers,
            columns: this.columns,
            customOperators: this.customOperators,
        };
    }
    setDetails(details) {
        this.name = details.name ?? this.name;
        this.description = details.description ?? this.description;
        this.example = details.example ?? this.example;
    }
    addColumn(column) {
        this.columns.push(column);
    }
    removeColumn(column) {
        this.columns = this.columns.filter((c) => c !== column);
    }
    addCustomOperator(params) {
        this.registerOperators(params);
        const functionFilePath = path.resolve(__dirname, `../../BotUI/src/app/operators/${params.name}.js`);
        const importStatements = (params.importFunctions &&
            params.importFunctions
                .map((func) => `import {${func}} from './${func}.js';`)
                .join("\n")) ??
            "";
        fs.writeFileSync(functionFilePath, `${importStatements}

export const ${params.name} = ${params.customFunction.toString()};`);
    }
    loadFile(path) {
        this.filePath = path;
        try {
            const fileData = fs.readFileSync(path, "utf8");
            const records = (0, sync_1.parse)(fileData, {
                columns: true,
                trim: true,
                skip_empty_lines: true,
            });
            if (records.length > 0) {
                this.headers = Object.keys(records[0]);
                this.headers.forEach((header) => {
                    this.dataMap.set(header, []);
                });
            }
            this.addColumsToDataMap(records);
            this.addColumnsAuto();
        }
        catch (error) {
            console.error(error);
        }
    }
    registerOperators(params) {
        const newOperator = new operator_1.CustomOperator(params.name, params.customFunction);
        this.customOperators.push(newOperator);
        this.operatorsData[params.dataType].push({
            name: params.name,
            dataType: params.dataType,
            params: params.params,
        });
    }
    addColumsToDataMap(records) {
        records.forEach((record) => {
            this.headers.forEach((header) => {
                const columnData = this.dataMap.get(header);
                if (columnData) {
                    columnData.push(record[header]);
                }
            });
        });
    }
    addColumnsAuto() {
        this.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.every((item) => {
                    return !isNaN(Number(item));
                });
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
