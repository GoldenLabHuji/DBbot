"use strict";
exports.__esModule = true;
exports.Column = void 0;
var operator_1 = require("./operator");
var Column = /** @class */ (function () {
    function Column(id, dataType, displayName) {
        var _a, _b;
        if (displayName === void 0) { displayName = id; }
        this.id = id;
        this.dataType = dataType;
        this.displayName = displayName;
        this.rows = [];
        this.operatorsArray = [];
        var numericOperators = [
            new operator_1.EqualOperator(),
            new operator_1.LessOperator(),
            new operator_1.GreaterOperator(),
            new operator_1.RangeOperator(),
        ];
        var stringOperators = [
            new operator_1.ContainsOperator(),
            new operator_1.StartsWithOperator(),
        ];
        if (dataType === "numeric") {
            (_a = this.operatorsArray).push.apply(_a, numericOperators);
        }
        else if (dataType === "string") {
            (_b = this.operatorsArray).push.apply(_b, stringOperators);
        }
        else {
            throw new Error("Invalid data type");
        }
    }
    Column.prototype.getRows = function () {
        return this.rows;
    };
    Column.prototype.addRows = function (rows) {
        var _a;
        (_a = this.rows).push.apply(_a, rows);
    };
    Column.prototype.getId = function () {
        return this.id;
    };
    Column.prototype.getDataType = function () {
        return this.dataType;
    };
    Column.prototype.getDisplayName = function () {
        return this.displayName;
    };
    Column.prototype.getOperators = function () {
        return this.operatorsArray;
    };
    return Column;
}());
exports.Column = Column;
