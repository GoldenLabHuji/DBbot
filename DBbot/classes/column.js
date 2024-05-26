"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const operator_1 = require("./operator");
class Column {
    id;
    dataType;
    displayName;
    rows = [];
    operatorsArray = [];
    constructor(id, dataType, displayName = id) {
        this.id = id;
        this.dataType = dataType;
        this.displayName = displayName;
        const numericOperators = [
            new operator_1.EqualOperator(),
            new operator_1.LessOperator(),
            new operator_1.GreaterOperator(),
            new operator_1.RangeOperator(),
        ];
        const stringOperators = [
            new operator_1.ContainsOperator(),
            new operator_1.StartsWithOperator(),
        ];
        if (dataType === "numeric") {
            this.operatorsArray.push(...numericOperators);
        }
        else if (dataType === "string") {
            this.operatorsArray.push(...stringOperators);
        }
        else {
            throw new Error("Invalid data type");
        }
    }
    getRows() {
        return this.rows;
    }
    addRows(rows) {
        this.rows.push(...rows);
    }
    getId() {
        return this.id;
    }
    getDataType() {
        return this.dataType;
    }
    getDisplayName() {
        return this.displayName;
    }
    getOperators() {
        return this.operatorsArray;
    }
}
exports.Column = Column;
