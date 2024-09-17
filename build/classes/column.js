"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const operator_1 = require("./operator");
const resources_1 = require("../general/resources");
class Column {
    _id;
    dataType;
    displayName;
    customOperators;
    rows = [];
    operatorsArray = [];
    constructor(_id, dataType, displayName = _id, customOperators = []) {
        this._id = _id;
        this.dataType = dataType;
        this.displayName = displayName;
        this.customOperators = customOperators;
        const numericOperators = [
            new operator_1.EqualOperator(),
            new operator_1.LessOperator(),
            new operator_1.GreaterOperator(),
            new operator_1.RangeOperator(),
        ];
        const stringOperators = [
            new operator_1.StartsWithOperator(),
            new operator_1.EndWithOperator(),
            new operator_1.ContainsOperator(),
            new operator_1.EqualStringOperator(),
        ];
        if (dataType === "numeric") {
            this.operatorsArray.push(...[...numericOperators, ...this.customOperators]);
        }
        else if (dataType === "string") {
            this.operatorsArray.push(...[...stringOperators, ...this.customOperators]);
        }
        else {
            throw new Error(resources_1.DATATYPE_ERROR);
        }
    }
    get id() {
        return this._id;
    }
    getColumnData() {
        return {
            id: this.id,
            rows: this.rows,
            dataType: this.dataType,
            displayName: this.displayName,
            operators: this.operatorsArray,
        };
    }
    addRows(rows) {
        this.rows.push(...rows);
    }
    addOperator(operator) {
        this.operatorsArray.push(operator);
    }
    mean() {
        if (this.dataType === "string") {
            throw new Error(resources_1.STRING_CALCULATION_ERROR);
        }
        const sum = this.rows.reduce((acc, curr) => {
            if (isNaN(curr))
                return acc + 0;
            return acc + curr;
        }, 0);
        const mean = sum / this.rows.length;
        return Math.round(mean * 100) / 100;
    }
    mode() {
        if (this.dataType === "string") {
            throw new Error(resources_1.STRING_CALCULATION_ERROR);
        }
        const counts = this.rows.reduce((accuracy, current) => {
            if (isNaN(current))
                return accuracy;
            if (!accuracy[current]) {
                accuracy[current] = 1;
            }
            else {
                accuracy[current]++;
            }
            return accuracy;
        }, {});
        const max = Math.max(...Object.values(counts));
        const result = Number(Object.keys(counts).find((key) => counts[key] === max)) ??
            -1;
        if (result === -1) {
            throw new Error(resources_1.MODE_ERROR);
        }
        return result;
    }
    median() {
        if (this.dataType === "string") {
            throw new Error(resources_1.STRING_CALCULATION_ERROR);
        }
        const notNaNRows = this.rows.filter((row) => !isNaN(row));
        const sortedRows = notNaNRows.sort((a, b) => {
            return a - b;
        });
        const mid = Math.floor(sortedRows.length / 2);
        if (sortedRows.length % 2 === 0) {
            return (sortedRows[mid - 1] + sortedRows[mid]) / 2;
        }
        return sortedRows[mid];
    }
    fillRow(inputValue, nullValue = [null]) {
        this.rows.forEach((row, index) => {
            if (nullValue.includes(row)) {
                this.rows[index] = inputValue;
            }
        });
    }
    fillNullValues(method, nullValue = [null], customValue) {
        if (method === "custom") {
            if (customValue === undefined) {
                throw new Error(resources_1.CUSTOM_ERROR);
            }
            this.fillRow(customValue, nullValue);
        }
        else if (method === "remove") {
            this.rows = this.rows.filter((row) => row !== nullValue);
        }
        else if (method === "mean") {
            this.fillRow(this.mean(), nullValue);
        }
        else if (method === "median") {
            this.fillRow(this.median(), nullValue);
        }
        else if (method === "mode") {
            this.fillRow(this.mode(), nullValue);
        }
        else {
            throw new Error(resources_1.METHOD_ERROR);
        }
    }
}
exports.Column = Column;
