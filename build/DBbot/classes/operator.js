"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqualStringOperator = exports.ContainsOperator = exports.EndWithOperator = exports.StartsWithOperator = exports.SoundLikeOperator = exports.RangeOperator = exports.GreaterOperator = exports.LessOperator = exports.EqualOperator = exports.CustomOperator = exports.Operator = void 0;
class Operator {
    id;
    displayName;
    params = [];
    constructor(id, displayName = id) {
        this.id = id;
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
    addParams(params) {
        this.params.push(...params);
    }
}
exports.CustomOperator = CustomOperator;
class EqualOperator extends Operator {
    constructor() {
        super("equal");
        this.params = [
            {
                name: "inputValue",
                dataType: "numeric",
            },
            {
                name: "compareValue",
                dataType: "numeric",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return Number(compareValue) === Number(inputValue);
    }
}
exports.EqualOperator = EqualOperator;
class LessOperator extends Operator {
    constructor() {
        super("less");
        this.params = [
            {
                name: "inputValue",
                dataType: "numeric",
            },
            {
                name: "compareValue",
                dataType: "numeric",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return inputValue <= compareValue;
    }
}
exports.LessOperator = LessOperator;
class GreaterOperator extends Operator {
    constructor() {
        super("greater");
        this.params = [
            {
                name: "inputValue",
                dataType: "numeric",
            },
            {
                name: "compareValue",
                dataType: "numeric",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return inputValue >= compareValue;
    }
}
exports.GreaterOperator = GreaterOperator;
class RangeOperator extends Operator {
    constructor() {
        super("range");
        this.params = [
            {
                name: "inputValue",
                dataType: "numeric",
            },
            {
                name: "minValue",
                dataType: "numeric",
            },
            {
                name: "maxValue",
                dataType: "numeric",
            },
        ];
    }
    calculate(inputValue, minValue, maxValue) {
        return inputValue >= minValue && inputValue <= maxValue;
    }
}
exports.RangeOperator = RangeOperator;
class SoundLikeOperator extends Operator {
    constructor() {
        super("contains");
        this.params = [
            {
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
            },
            {
                name: "maxDifferences",
                dataType: "numeric",
            },
        ];
    }
    calculate(inputValue, compareValue, maxDifferences) {
        let diffCount = 0;
        const shorterLength = Math.min(inputValue.length, compareValue.length);
        const indexArray = new Array(shorterLength)
            .fill(0)
            .map((_, index) => index);
        const lowerStartingValue = inputValue.toLowerCase();
        const lowerCheckValue = compareValue.toLowerCase();
        indexArray.forEach((i) => {
            if (lowerStartingValue[i] !== lowerCheckValue[i])
                diffCount++;
            if (diffCount > maxDifferences)
                return false;
        });
        return diffCount <= maxDifferences;
    }
}
exports.SoundLikeOperator = SoundLikeOperator;
class StartsWithOperator extends Operator {
    constructor() {
        super("startWith");
        this.params = [
            {
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return inputValue.toLowerCase().startsWith(compareValue.toLowerCase());
    }
}
exports.StartsWithOperator = StartsWithOperator;
class EndWithOperator extends Operator {
    constructor() {
        super("endWith");
        this.params = [
            {
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return inputValue.toLowerCase().endsWith(compareValue.toLowerCase());
    }
}
exports.EndWithOperator = EndWithOperator;
class ContainsOperator extends Operator {
    constructor() {
        super("contains");
        this.params = [
            {
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return inputValue.toLowerCase().includes(compareValue.toLowerCase());
    }
}
exports.ContainsOperator = ContainsOperator;
class EqualStringOperator extends Operator {
    constructor() {
        super("equalString", "equal");
        this.params = [
            {
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
            },
        ];
    }
    calculate(inputValue, compareValue) {
        return inputValue.toLowerCase() === compareValue.toLowerCase();
    }
}
exports.EqualStringOperator = EqualStringOperator;
