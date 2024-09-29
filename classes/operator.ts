import { NumOrStr, Params } from "../general/types";

export abstract class Operator {
    public params: Params[] = [];
    constructor(
        private readonly id: string,
        private displayName: string = id
    ) {}

    abstract calculate(inputValue: NumOrStr, ...args: any): boolean;

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

    addParams(params: Params[]) {
        this.params.push(...params);
    }
}

export class ChooseOneOperator extends Operator {
    constructor() {
        super("chooseOne");
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

    calculate(inputValue: string, compareValue: string) {
        return inputValue === compareValue;
    }
}

export class ChooseMultipleOperator extends Operator {
    constructor() {
        super("chooseMultiple");
        this.params = [
            {
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
                isArray: true,
            },
        ];
    }

    calculate(inputValue: string, compareValue: string[]) {
        return compareValue.includes(inputValue);
    }
}

export class EqualOperator extends Operator {
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

    calculate(inputValue: number, compareValue: number) {
        return Number(compareValue) === Number(inputValue);
    }
}

export class LessOperator extends Operator {
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

    calculate(inputValue: number, compareValue: number) {
        return inputValue <= compareValue;
    }
}

export class GreaterOperator extends Operator {
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

    calculate(inputValue: number, compareValue: number) {
        return inputValue >= compareValue;
    }
}

export class RangeOperator extends Operator {
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

    calculate(inputValue: number, minValue: number, maxValue: number) {
        return inputValue >= minValue && inputValue <= maxValue;
    }
}

export class SoundLikeOperator extends Operator {
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
                name: "inputValue",
                dataType: "string",
            },
            {
                name: "compareValue",
                dataType: "string",
            },
        ];
    }

    calculate(inputValue: string, compareValue: string) {
        return inputValue.toLowerCase().startsWith(compareValue.toLowerCase());
    }
}

export class EndWithOperator extends Operator {
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

    calculate(inputValue: string, compareValue: string) {
        return inputValue.toLowerCase().endsWith(compareValue.toLowerCase());
    }
}

export class ContainsOperator extends Operator {
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

    calculate(inputValue: string, compareValue: string) {
        return inputValue.toLowerCase().includes(compareValue.toLowerCase());
    }
}

export class EqualStringOperator extends Operator {
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

    calculate(inputValue: string, compareValue: string) {
        return inputValue.toLowerCase() === compareValue.toLowerCase();
    }
}
