export abstract class Operator {
    constructor(private readonly displayName: string) {}

    abstract calculationFunction(column: number[], choise: number): number[];

    getDisplayName(): string {
        return this.displayName;
    }
}

export class EqualOperator extends Operator {
    constructor() {
        super("EQUAL");
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value === choise);
    }
}

export class LessOperator extends Operator {
    constructor() {
        super("LESS");
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value < choise);
    }
}

export class GreaterOperator extends Operator {
    constructor() {
        super("GREATER");
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value > choise);
    }
}
