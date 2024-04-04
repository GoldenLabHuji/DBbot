import { Operator } from "./operator";

type DataType = "string" | "numeric";

export class Column {
    constructor(
        private readonly id: string,
        private dataType: DataType,
        private displayName: string = id,
        private operatorsArray: Operator[] = []
    ) {}

    getId(): string {
        return this.id;
    }

    getDataType(): DataType {
        return this.dataType;
    }

    getDisplayName(): string {
        return this.displayName;
    }

    getOperators(): Operator[] {
        return this.operatorsArray;
    }
}
