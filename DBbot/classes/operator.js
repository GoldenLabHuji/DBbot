"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartsWithOperator = exports.ContainsOperator = exports.RangeOperator = exports.GreaterOperator = exports.LessOperator = exports.EqualOperator = exports.Operator = void 0;
class Operator {
    displayName;
    constructor(displayName) {
        this.displayName = displayName;
    }
    getDisplayName() {
        return this.displayName;
    }
}
exports.Operator = Operator;
class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }
    calculate(column, choice) {
        return column.filter((value) => value === choice);
    }
}
exports.EqualOperator = EqualOperator;
class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }
    calculate(column, choice) {
        return column.filter((value) => value < choice);
    }
}
exports.LessOperator = LessOperator;
class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }
    calculate(column, choice) {
        return column.filter((value) => value > choice);
    }
}
exports.GreaterOperator = GreaterOperator;
class RangeOperator extends Operator {
    constructor() {
        super("RANGE");
    }
    calculate(column, choice) {
        return column.filter((value) => value >= choice[0] && value <= choice[1]);
    }
}
exports.RangeOperator = RangeOperator;
class ContainsOperator extends Operator {
    constructor() {
        super("CONTAINS");
    }
    calculate(column, choice) {
        return column.filter((value) => value.includes(choice));
    }
}
exports.ContainsOperator = ContainsOperator;
class StartsWithOperator extends Operator {
    constructor() {
        super("STARTS WITH");
    }
    calculate(column, choice) {
        return column.filter((value) => value.startsWith(choice));
    }
}
exports.StartsWithOperator = StartsWithOperator;
