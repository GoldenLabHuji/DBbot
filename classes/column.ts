import { Operator } from "./operator";

type TypeOfData = "string" | "numeric";

class Column {
    private operatorsArray: Operator[] = [];
    constructor(
        private readonly _id: string,
        private _typeOfData: TypeOfData,
        private _displayName: string = _id
    ) {}

    getId(): string {
        return this._id;
    }

    getTypeOfData(): TypeOfData {
        return this._typeOfData;
    }

    getDisplayName(): string {
        return this._displayName;
    }

    getOperators(): Operator[] {
        return this.operatorsArray;
    }
}
