"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const operator_1 = require("./operator");
class Column {
    id;
    dataType;
    displayName;
    customOperators;
    rows = [];
    operatorsArray = [];
    constructor(id, dataType, displayName = id, customOperators = []) {
        this.id = id;
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
            new operator_1.SoundLikeOperator(),
            new operator_1.StartsWithOperator(),
        ];
        if (dataType === "numeric") {
            this.operatorsArray.push(...[...numericOperators, ...this.customOperators]);
        }
        else if (dataType === "string") {
            this.operatorsArray.push(...[...stringOperators, ...this.customOperators]);
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
