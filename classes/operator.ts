export abstract class AbstractOperator {
    constructor(private readonly displayName: string) {}

    abstract calculationFunction(column: number[], choise: number): number[];

    getDisplayName(): string {
        return this.displayName;
    }
}

export class EqualOperator extends AbstractOperator {
    constructor() {
        super("EQUAL");
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value === choise);
    }
}

export class LessOperator extends AbstractOperator {
    constructor() {
        super("LESS");
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value < choise);
    }
}

export class GreaterOperator extends AbstractOperator {
    constructor() {
        super("GREATER");
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value > choise);
    }
}
