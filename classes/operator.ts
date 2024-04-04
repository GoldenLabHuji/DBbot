export abstract class Operator {
    constructor(private readonly displayName: string) {}

    abstract calculate(
        column: number[] | string[],
        choice: number | number[]
    ): number[] | string[];

    getDisplayName(): string {
        return this.displayName;
    }
}

export class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }

    calculate(
        column: number[] | string[],
        choice: number | number[]
    ): number[] | string[] {
        return column.filter((value) => value === choice) as
            | number[]
            | string[];
    }
}

export class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }

    calculate(
        column: number[] | string[],
        choice: number | number[]
    ): number[] | string[] {
        return column.filter((value) => value < choice) as number[] | string[];
    }
}

export class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }

    calculate(
        column: number[] | string[],
        choice: number | number[]
    ): number[] | string[] {
        return column.filter((value) => value > choice) as number[] | string[];
    }
}
