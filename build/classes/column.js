"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const operator_1 = require("./operator");
const resources_1 = require("../general/resources");
const types_1 = require("../general/types");
class Column {
    _id;
    dataType;
    displayName;
    customOperators;
    rows = [];
    operatorsArray = [];
    _description = "No description available";
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
        const factorOperators = [
            new operator_1.ChooseOneOperator(),
            new operator_1.ChooseMultipleOperator(),
        ];
        switch (dataType) {
            case types_1.DataType.NUMERIC:
                this.operatorsArray.push(...[...numericOperators, ...this.customOperators]);
                break;
            case types_1.DataType.STRING:
                this.operatorsArray.push(...[...stringOperators, ...this.customOperators]);
                break;
            case types_1.DataType.FACTOR:
                this.operatorsArray.push(...[...factorOperators, ...this.customOperators]);
                break;
            default:
                throw new Error(resources_1.DATATYPE_ERROR);
        }
    }
    get description() {
        return this._description;
    }
    set description(value) {
        if (typeof value !== "string") {
            throw new Error("Description must be a string");
        }
        this._description = value;
    }
    get id() {
        return this._id;
    }
    deleteAllRows() {
        this.rows = [];
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
    ConvertToFactor() {
        const factorOperators = [
            new operator_1.ChooseOneOperator(),
            new operator_1.ChooseMultipleOperator(),
        ];
        this.dataType = types_1.DataType.FACTOR;
        this.operatorsArray = [...factorOperators, ...this.customOperators];
    }
    addRows(rows) {
        this.rows.push(...rows);
    }
    addOperator(operator) {
        this.operatorsArray.push(operator);
    }
    mean() {
        if (!(this.dataType === types_1.DataType.NUMERIC)) {
            throw new Error(resources_1.NAN_CALCULATION_ERROR);
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
        if (!(this.dataType === types_1.DataType.NUMERIC)) {
            throw new Error(resources_1.NAN_CALCULATION_ERROR);
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
        const countsArray = Object.values(counts);
        const isSame = countsArray.every((count) => count === countsArray[0]);
        if (isSame) {
            throw new Error(resources_1.MODE_ERROR);
        }
        const max = Math.max(...countsArray);
        const result = Number(Object.keys(counts).find((key) => counts[key] === max)) ??
            -1;
        if (result === -1) {
            throw new Error(resources_1.MODE_ERROR);
        }
        return result;
    }
    median() {
        if (!(this.dataType === types_1.DataType.NUMERIC)) {
            throw new Error(resources_1.NAN_CALCULATION_ERROR);
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
        switch (method) {
            case types_1.NullMethod.CUSTOM:
                if (customValue === undefined) {
                    throw new Error(resources_1.CUSTOM_ERROR);
                }
                this.fillRow(customValue, nullValue);
                break;
            case types_1.NullMethod.REMOVE:
                this.rows = this.rows.filter((row) => row !== nullValue);
                break;
            case types_1.NullMethod.MEAN:
                this.fillRow(this.mean(), nullValue);
                break;
            case types_1.NullMethod.MEDIAN:
                this.fillRow(this.median(), nullValue);
                break;
            case types_1.NullMethod.MODE:
                this.fillRow(this.mode(), nullValue);
                break;
            default:
                throw new Error(resources_1.METHOD_ERROR);
        }
    }
}
exports.Column = Column;
