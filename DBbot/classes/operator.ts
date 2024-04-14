export abstract class Operator {
    constructor(private readonly displayName: string) {}

    abstract calculate(
        column: number[] | string[],
        choice: number | string | number[]
    ): number[] | string[];

    getDisplayName(): string {
        return this.displayName;
    }
}

export class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }

    calculate(column: number[], choice: number): number[] {
        return column.filter((value) => value === choice);
    }
}

export class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }

    calculate(column: number[], choice: number): number[] {
        return column.filter((value) => value < choice);
    }
}

export class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }

    calculate(column: number[], choice: number): number[] {
        return column.filter((value) => value > choice);
    }
}

export class RangeOperator extends Operator {
    constructor() {
        super("RANGE");
    }

    calculate(column: number[], choice: number[]): number[] {
        return column.filter(
            (value) => value >= choice[0] && value <= choice[1]
        );
    }
}

export class ContainsOperator extends Operator {
    constructor() {
        super("CONTAINS");
    }

    calculate(column: string[], choice: string): string[] {
        return column.filter((value) => value.includes(choice));
    }
}

export class StartsWithOperator extends Operator {
    constructor() {
        super("STARTS WITH");
    }

    calculate(column: string[], choice: string): string[] {
        return column.filter((value) => value.startsWith(choice));
    }
}
