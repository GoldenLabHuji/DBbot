import { NumOrStr } from "../general/types";

export abstract class Operator {
    constructor(private readonly displayName: string) {}

    abstract calculate(inputValue: NumOrStr, ...args: any): boolean;

    getDisplayName(): string {
        return this.displayName;
    }
}

export class CustomOperator extends Operator {
    constructor(private name: string, private customFunction: Function) {
        super(name);
    }

    calculate() {
        return this.customFunction();
    }
}

export class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }

    calculate(inputValue: number, compareValue: number) {
        return Number(compareValue) === Number(inputValue);
    }
}

export class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }

    calculate(inputValue: number, compareValue: number) {
        return inputValue <= compareValue;
    }
}

export class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }

    calculate(inputValue: number, compareValue: number) {
        return inputValue >= compareValue;
    }
}

export class RangeOperator extends Operator {
    constructor() {
        super("RANGE");
    }

    calculate(inputValue: number, minValue: number, maxValue: number) {
        return inputValue >= minValue && inputValue <= maxValue;
    }
}

export class SoundLikeOperator extends Operator {
    constructor() {
        super("CONTAINS");
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
        super("STARTS WITH");
    }

    calculate(inputValue: string, compareValue: string) {
        return inputValue.toLowerCase().startsWith(compareValue.toLowerCase());
    }
}
