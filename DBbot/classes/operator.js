"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.StartsWithOperator = exports.ContainsOperator = exports.RangeOperator = exports.GreaterOperator = exports.LessOperator = exports.EqualOperator = exports.Operator = void 0;
var Operator = /** @class */ (function () {
    function Operator(displayName) {
        this.displayName = displayName;
    }
    Operator.prototype.getDisplayName = function () {
        return this.displayName;
    };
    return Operator;
}());
exports.Operator = Operator;
var EqualOperator = /** @class */ (function (_super) {
    __extends(EqualOperator, _super);
    function EqualOperator() {
        return _super.call(this, "EQUAL") || this;
    }
    EqualOperator.prototype.calculate = function (column, choice) {
        return column.filter(function (value) { return value === choice; });
    };
    return EqualOperator;
}(Operator));
exports.EqualOperator = EqualOperator;
var LessOperator = /** @class */ (function (_super) {
    __extends(LessOperator, _super);
    function LessOperator() {
        return _super.call(this, "LESS") || this;
    }
    LessOperator.prototype.calculate = function (column, choice) {
        return column.filter(function (value) { return value < choice; });
    };
    return LessOperator;
}(Operator));
exports.LessOperator = LessOperator;
var GreaterOperator = /** @class */ (function (_super) {
    __extends(GreaterOperator, _super);
    function GreaterOperator() {
        return _super.call(this, "GREATER") || this;
    }
    GreaterOperator.prototype.calculate = function (column, choice) {
        return column.filter(function (value) { return value > choice; });
    };
    return GreaterOperator;
}(Operator));
exports.GreaterOperator = GreaterOperator;
var RangeOperator = /** @class */ (function (_super) {
    __extends(RangeOperator, _super);
    function RangeOperator() {
        return _super.call(this, "RANGE") || this;
    }
    RangeOperator.prototype.calculate = function (column, choice) {
        return column.filter(function (value) { return value >= choice[0] && value <= choice[1]; });
    };
    return RangeOperator;
}(Operator));
exports.RangeOperator = RangeOperator;
var ContainsOperator = /** @class */ (function (_super) {
    __extends(ContainsOperator, _super);
    function ContainsOperator() {
        return _super.call(this, "CONTAINS") || this;
    }
    ContainsOperator.prototype.calculate = function (column, choice) {
        return column.filter(function (value) { return value.includes(choice); });
    };
    return ContainsOperator;
}(Operator));
exports.ContainsOperator = ContainsOperator;
var StartsWithOperator = /** @class */ (function (_super) {
    __extends(StartsWithOperator, _super);
    function StartsWithOperator() {
        return _super.call(this, "STARTS WITH") || this;
    }
    StartsWithOperator.prototype.calculate = function (column, choice) {
        return column.filter(function (value) { return value.startsWith(choice); });
    };
    return StartsWithOperator;
}(Operator));
exports.StartsWithOperator = StartsWithOperator;
