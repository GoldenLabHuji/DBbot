interface IOperator {
    _displayName: string;
    calculationFunction(column: number[], choise: number): number[];
}

class EqualOperator implements IOperator {
    _displayName: string = "EQUAL";

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value === choise);
    }
}

class LessOperator implements IOperator {
    _displayName: string = "LESS";

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value < choise);
    }
}

class GreaterOperator implements IOperator {
    _displayName: string = "GREATER";

    calculationFunction(column: number[], choise: number): number[] {
        return column.filter((value) => value > choise);
    }
}

class Operator {
    _displayName: string;
    constructor(private displayName: string) {
        this._displayName = displayName;
    }
    greaterThan(column: number[], choise: number): number[] {
        return column.filter((value) => value > choise);
    }
    lessThan(column: number[], choise: number): number[] {
        return column.filter((value) => value < choise);
    }
    equalTo(column: number[], choise: number): number[] {
        return column.filter((value) => value === choise);
    }
}
