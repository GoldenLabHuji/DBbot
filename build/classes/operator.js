"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EqualStringOperator = exports.ContainsOperator = exports.EndWithOperator = exports.StartsWithOperator = exports.SoundLikeOperator = exports.RangeOperator = exports.GreaterOperator = exports.LessOperator = exports.EqualOperator = exports.ChooseMultipleOperator = exports.ChooseOneOperator = exports.CustomOperator = exports.Operator = void 0;
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
class ChooseOneOperator extends Operator {
    constructor() {
        super("chooseOne");
        this.params = [
            {
                name: "cell",
                dataType: "string",
            },
            {
                name: "value",
                dataType: "string",
                message: "Enter the value you would like to choose:",
            },
        ];
    }
    calculate(cell, value) {
        return cell === value;
    }
}
exports.ChooseOneOperator = ChooseOneOperator;
class ChooseMultipleOperator extends Operator {
    constructor() {
        super("chooseMultiple");
        this.params = [
            {
                name: "cell",
                dataType: "string",
            },
            {
                name: "values",
                dataType: "string",
                isArray: true,
                message: "Enter the values you would like to choose. Please enter in the format: value1, value2, value3",
            },
        ];
    }
    calculate(cell, values) {
        return values.includes(cell);
    }
}
exports.ChooseMultipleOperator = ChooseMultipleOperator;
class EqualOperator extends Operator {
    constructor() {
        super("equal");
        this.params = [
            {
                name: "cell",
                dataType: "numeric",
            },
            {
                name: "value",
                dataType: "numeric",
                message: "Enter the value you would like it to be equal to:",
            },
        ];
    }
    calculate(cell, value) {
        return Number(value) === Number(cell);
    }
}
exports.EqualOperator = EqualOperator;
class LessOperator extends Operator {
    constructor() {
        super("less");
        this.params = [
            {
                name: "cell",
                dataType: "numeric",
            },
            {
                name: "value",
                dataType: "numeric",
                message: "Enter the value you would like it to be less than:",
            },
        ];
    }
    calculate(cell, value) {
        return cell <= value;
    }
}
exports.LessOperator = LessOperator;
class GreaterOperator extends Operator {
    constructor() {
        super("greater");
        this.params = [
            {
                name: "cell",
                dataType: "numeric",
            },
            {
                name: "value",
                dataType: "numeric",
                message: "Enter the value you would like it to be greater than:",
            },
        ];
    }
    calculate(cell, value) {
        return cell >= value;
    }
}
exports.GreaterOperator = GreaterOperator;
class RangeOperator extends Operator {
    constructor() {
        super("range");
        this.params = [
            {
                name: "cell",
                dataType: "numeric",
            },
            {
                name: "minValue",
                dataType: "numeric",
                message: "Enter the minimum value:",
            },
            {
                name: "maxValue",
                dataType: "numeric",
                message: "Enter the maximum value:",
            },
        ];
    }
    calculate(cell, minValue, maxValue) {
        return cell >= minValue && cell <= maxValue;
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
                name: "cell",
                dataType: "string",
            },
            {
                name: "value",
                dataType: "string",
                message: "Enter the character to start with:",
            },
        ];
    }
    calculate(cell, value) {
        return cell.toLowerCase().startsWith(value.toLowerCase());
    }
}
exports.StartsWithOperator = StartsWithOperator;
class EndWithOperator extends Operator {
    constructor() {
        super("endWith");
        this.params = [
            {
                name: "cell",
                dataType: "string",
            },
            {
                name: "value",
                dataType: "string",
                message: "Enter the character to end with:",
            },
        ];
    }
    calculate(cell, value) {
        return cell.toLowerCase().endsWith(value.toLowerCase());
    }
}
exports.EndWithOperator = EndWithOperator;
class ContainsOperator extends Operator {
    constructor() {
        super("contains");
        this.params = [
            {
                name: "cell",
                dataType: "string",
            },
            {
                name: "value",
                dataType: "string",
                message: "Enter the string the word should contain:",
            },
        ];
    }
    calculate(cell, value) {
        return cell.toLowerCase().includes(value.toLowerCase());
    }
}
exports.ContainsOperator = ContainsOperator;
class EqualStringOperator extends Operator {
    constructor() {
        super("equalString", "equal");
        this.params = [
            {
                name: "cell",
                dataType: "string",
            },
            {
                name: "value",
                dataType: "string",
                message: "Enter the value the word should be equal to:",
            },
        ];
    }
    calculate(cell, value) {
        return cell.toLowerCase() === value.toLowerCase();
    }
}
exports.EqualStringOperator = EqualStringOperator;
