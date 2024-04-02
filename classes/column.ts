import { Operator } from "./operator";

type TypeOfData = "string" | "numeric";

export class Column {
    constructor(
        private readonly id: string,
        private typeOfData: TypeOfData,
        private displayName: string = id,
        private operatorsArray: Operator[] = []
    ) {}

    getId(): string {
        return this.id;
    }

    getTypeOfData(): TypeOfData {
        return this.typeOfData;
    }

    getDisplayName(): string {
        return this.displayName;
    }

    getOperators(): Operator[] {
        return this.operatorsArray;
    }
}
