import { NumOrStr } from "../general/types";

export abstract class Operator {
    constructor(private readonly displayName: string) {}

    abstract calculate(
        startingValue: NumOrStr | number[],
        checkValue: NumOrStr
    ): boolean;

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

    getName() {
        return this.name;
    }
}
export class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }

    calculate(startingValue: number, checkValue: number) {
        return Number(startingValue) === Number(checkValue);
    }
}

export class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }

    calculate(startingValue: number, checkValue: number) {
        return checkValue <= startingValue;
    }
}

export class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }

    calculate(startingValue: number, checkValue: number) {
        return checkValue >= startingValue;
    }
}

export class RangeOperator extends Operator {
    constructor() {
        super("RANGE");
    }

    calculate(startingValue: number[], checkValue: number) {
        return checkValue >= startingValue[0] && checkValue <= startingValue[1];
    }
}

export class SoundLikeOperator extends Operator {
    constructor() {
        super("CONTAINS");
    }

    calculate(startingValue: string, checkValue: string) {
        const maxDiff = 2;
        let diffCount = 0;
        const indexArray = new Array(startingValue.length)
            .fill(0)
            .map((_, index) => index);
        const lowerStartingValue = startingValue.toLowerCase();
        const lowerCheckValue = checkValue.toLowerCase();
        indexArray.forEach((i) => {
            if (lowerStartingValue[i] !== lowerCheckValue[i]) diffCount++;
            if (diffCount > maxDiff) return false;
        });
        return diffCount <= maxDiff;
    }
}

export class StartsWithOperator extends Operator {
    constructor() {
        super("STARTS WITH");
    }

    calculate(startingValue: string, checkValue: string) {
        return checkValue.toLowerCase().startsWith(startingValue.toLowerCase());
    }
}
