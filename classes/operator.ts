interface IOperator {
    readonly displayName: string;
    calculationFunction(column: number[], choise: number): number[];
    getDisplayName(): string;
}

export class Operator implements IOperator {
    displayName: string;
    constructor(private _displayName: string) {
        this.displayName = _displayName;
    }

    calculationFunction(column: number[], choise: number): number[] {
        return column;
    }

    getDisplayName(): string {
        return this._displayName;
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
