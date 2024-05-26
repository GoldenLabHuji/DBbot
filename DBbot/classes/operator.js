"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartsWithOperator = exports.SoundLikeOperator = exports.RangeOperator = exports.GreaterOperator = exports.LessOperator = exports.EqualOperator = exports.CustomOperator = exports.Operator = void 0;
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
class CustomOperator extends Operator {
    customFunction;
    constructor(name, customFunction) {
        super(name);
        this.customFunction = customFunction;
    }
    calculate() {
        return this.customFunction();
    }
}
exports.CustomOperator = CustomOperator;
class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }
    calculate(startingValue, checkValue) {
        return Number(startingValue) === Number(checkValue);
    }
}
exports.EqualOperator = EqualOperator;
class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }
    calculate(startingValue, checkValue) {
        return checkValue <= startingValue;
    }
}
exports.LessOperator = LessOperator;
class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }
    calculate(startingValue, checkValue) {
        return checkValue >= startingValue;
    }
}
exports.GreaterOperator = GreaterOperator;
class RangeOperator extends Operator {
    constructor() {
        super("RANGE");
    }
    calculate(startingValue, checkValue) {
        return checkValue >= startingValue[0] && checkValue <= startingValue[1];
    }
}
exports.RangeOperator = RangeOperator;
class SoundLikeOperator extends Operator {
    constructor() {
        super("CONTAINS");
    }
    calculate(startingValue, checkValue) {
        const maxDiff = 2;
        let diffCount = 0;
        const indexArray = new Array(startingValue.length)
            .fill(0)
            .map((_, index) => index);
        const lowerStartingValue = startingValue.toLowerCase();
        const lowerCheckValue = checkValue.toLowerCase();
        indexArray.forEach((i) => {
            if (lowerStartingValue[i] !== lowerCheckValue[i])
                diffCount++;
            if (diffCount > maxDiff)
                return false;
        });
        return diffCount <= maxDiff;
    }
}
exports.SoundLikeOperator = SoundLikeOperator;
class StartsWithOperator extends Operator {
    constructor() {
        super("STARTS WITH");
    }
    calculate(startingValue, checkValue) {
        return checkValue.toLowerCase().startsWith(startingValue.toLowerCase());
    }
}
exports.StartsWithOperator = StartsWithOperator;
