import * as types from "../general/types";

export abstract class Operator {
    public params: types.Params[] = [];
    constructor(
        private readonly id: string,
        private displayName: string = id
    ) {}

    abstract calculate(inputValue: types.NumOrStr, ...args: any): boolean;

    getDisplayName(): string {
        return this.displayName;
    }
}

export class CustomOperator extends Operator {
    constructor(name: string, private customFunction: Function) {
        super(name);
    }

    calculate() {
        return this.customFunction();
    }

    addParams(params: types.Params[]) {
        this.params.push(...params);
    }
}

export class ChooseOneOperator extends Operator {
    constructor() {
        super("chooseOne");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.STRING,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
                message: "Enter the value you would like to choose:",
            },
        ];
    }

    calculate(cell: string, value: string) {
        return cell === value;
    }
}

export class ChooseMultipleOperator extends Operator {
    constructor() {
        super("chooseMultiple");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.STRING,
            },
            {
                name: "values",
                dataType: types.DataType.STRING,
                isArray: true,
                message:
                    "Enter the values you would like to choose. Please enter in the format: value1, value2, value3",
            },
        ];
    }

    calculate(cell: string, values: string[]) {
        return values.includes(cell);
    }
}

export class EqualOperator extends Operator {
    constructor() {
        super("equal");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.NUMERIC,
            },
            {
                name: "value",
                dataType: types.DataType.NUMERIC,
                message: "Enter the value you would like it to be equal to:",
            },
        ];
    }

    calculate(cell: number, value: number) {
        return Number(value) === Number(cell);
    }
}

export class LessOperator extends Operator {
    constructor() {
        super("less");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.NUMERIC,
            },
            {
                name: "value",
                dataType: types.DataType.NUMERIC,
                message: "Enter the value you would like it to be less than:",
            },
        ];
    }

    calculate(cell: number, value: number) {
        return cell <= value;
    }
}

export class GreaterOperator extends Operator {
    constructor() {
        super("greater");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.NUMERIC,
            },
            {
                name: "value",
                dataType: types.DataType.NUMERIC,
                message:
                    "Enter the value you would like it to be greater than:",
            },
        ];
    }

    calculate(cell: number, value: number) {
        return cell >= value;
    }
}

export class RangeOperator extends Operator {
    constructor() {
        super("range");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.NUMERIC,
            },
            {
                name: "minValue",
                dataType: types.DataType.NUMERIC,
                message: "Enter the minimum value:",
            },
            {
                name: "maxValue",
                dataType: types.DataType.NUMERIC,
                message: "Enter the maximum value:",
            },
        ];
    }

    calculate(cell: number, minValue: number, maxValue: number) {
        return cell >= minValue && cell <= maxValue;
    }
}

export class SoundLikeOperator extends Operator {
    constructor() {
        super("contains");
        this.params = [
            {
                name: "inputValue",
                dataType: types.DataType.STRING,
            },
            {
                name: "compareValue",
                dataType: types.DataType.STRING,
            },
            {
                name: "maxDifferences",
                dataType: types.DataType.STRING,
            },
        ];
    }

    calculate(
        inputValue: string,
        compareValue: string,
        maxDifferences: number
    ) {
        let diffCount = 0;
        const shorterLength = Math.min(inputValue.length, compareValue.length);
        const indexArray = new Array(shorterLength)
            .fill(0)
            .map((_, index) => index);
        const lowerStartingValue = inputValue.toLowerCase();
        const lowerCheckValue = compareValue.toLowerCase();
        indexArray.forEach((i) => {
            if (lowerStartingValue[i] !== lowerCheckValue[i]) diffCount++;
            if (diffCount > maxDifferences) return false;
        });
        return diffCount <= maxDifferences;
    }
}

export class StartsWithOperator extends Operator {
    constructor() {
        super("startWith");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.STRING,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
                message: "Enter the character to start with:",
            },
        ];
    }

    calculate(cell: string, value: string) {
        return cell.toLowerCase().startsWith(value.toLowerCase());
    }
}

export class EndWithOperator extends Operator {
    constructor() {
        super("endWith");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.STRING,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
                message: "Enter the character to end with:",
            },
        ];
    }

    calculate(cell: string, value: string) {
        return cell.toLowerCase().endsWith(value.toLowerCase());
    }
}

export class ContainsOperator extends Operator {
    constructor() {
        super("contains");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.STRING,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
                message: "Enter the string the word should contain:",
            },
        ];
    }

    calculate(cell: string, value: string) {
        return cell.toLowerCase().includes(value.toLowerCase());
    }
}

export class EqualStringOperator extends Operator {
    constructor() {
        super("equalString", "equal");
        this.params = [
            {
                name: "cell",
                dataType: types.DataType.STRING,
            },
            {
                name: "value",
                dataType: types.DataType.STRING,
                message: "Enter the value the word should be equal to:",
            },
        ];
    }

    calculate(cell: string, value: string) {
        return cell.toLowerCase() === value.toLowerCase();
    }
}
