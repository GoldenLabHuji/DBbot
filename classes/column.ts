import {
    Operator,
    EqualOperator,
    LessOperator,
    GreaterOperator,
    RangeOperator,
    StartsWithOperator,
    EndWithOperator,
    ContainsOperator,
    EqualStringOperator,
    ChooseOneOperator,
    ChooseMultipleOperator,
} from "./operator";
import {
    DATATYPE_ERROR,
    NAN_CALCULATION_ERROR,
    MODE_ERROR,
    CUSTOM_ERROR,
    METHOD_ERROR,
} from "../general/resources";
import { DataType, ColumnData, NullMethod, NumOrStr } from "../general/types";

export class Column {
    private rows: any[] = [];
    private operatorsArray: Operator[] = [];
    private _description: string = "No description available";
    constructor(
        private readonly _id: string,
        public dataType: DataType,
        public displayName: string = _id,
        private customOperators: Operator[] = []
    ) {
        const numericOperators = [
            new EqualOperator(),
            new LessOperator(),
            new GreaterOperator(),
            new RangeOperator(),
        ];
        const stringOperators = [
            new StartsWithOperator(),
            new EndWithOperator(),
            new ContainsOperator(),
            new EqualStringOperator(),
        ];
        const factorOperators = [
            new ChooseOneOperator(),
            new ChooseMultipleOperator(),
        ];
        switch (dataType) {
            case DataType.NUMERIC:
                this.operatorsArray.push(
                    ...[...numericOperators, ...this.customOperators]
                );
                break;
            case DataType.STRING:
                this.operatorsArray.push(
                    ...[...stringOperators, ...this.customOperators]
                );
                break;
            case DataType.FACTOR:
                this.operatorsArray.push(
                    ...[...factorOperators, ...this.customOperators]
                );
                break;
            default:
                throw new Error(DATATYPE_ERROR);
        }
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        if (typeof value !== "string") {
            throw new Error("Description must be a string");
        }
        this._description = value;
    }

    public get id(): string {
        return this._id;
    }

    public deleteAllRows(): void {
        this.rows = [];
    }

    public getColumnData(): ColumnData {
        return {
            id: this.id,
            rows: this.rows,
            dataType: this.dataType,
            displayName: this.displayName,
            operators: this.operatorsArray,
        };
    }

    public ConvertToFactor(): void {
        const factorOperators = [
            new ChooseOneOperator(),
            new ChooseMultipleOperator(),
        ];
        this.dataType = DataType.FACTOR;
        this.operatorsArray = [...factorOperators, ...this.customOperators];
    }

    public addRows(rows: any[]): void {
        this.rows.push(...rows);
    }

    public addOperator(operator: Operator): void {
        this.operatorsArray.push(operator);
    }

    public mean(): number {
        if (!(this.dataType === DataType.NUMERIC)) {
            throw new Error(NAN_CALCULATION_ERROR);
        }
        const sum = this.rows.reduce((acc, curr) => {
            if (isNaN(curr)) return acc + 0;
            return acc + curr;
        }, 0);
        const mean = sum / this.rows.length;
        return Math.round(mean * 100) / 100;
    }

    public mode(): number {
        if (!(this.dataType === DataType.NUMERIC)) {
            throw new Error(NAN_CALCULATION_ERROR);
        }
        const counts = this.rows.reduce((accuracy, current) => {
            if (isNaN(current)) return accuracy;
            if (!accuracy[current]) {
                accuracy[current] = 1;
            } else {
                accuracy[current]++;
            }
            return accuracy;
        }, {});
        const countsArray = Object.values(counts) as number[];
        const isSame = countsArray.every((count) => count === countsArray[0]);
        if (isSame) {
            throw new Error(MODE_ERROR);
        }
        const max = Math.max(...countsArray);
        const result =
            Number(Object.keys(counts).find((key) => counts[key] === max)) ??
            -1;
        if (result === -1) {
            throw new Error(MODE_ERROR);
        }
        return result;
    }

    public median(): number {
        if (!(this.dataType === DataType.NUMERIC)) {
            throw new Error(NAN_CALCULATION_ERROR);
        }
        const notNaNRows = this.rows.filter((row) => !isNaN(row));
        const sortedRows = notNaNRows.sort((a, b) => {
            return a - b;
        });
        const mid = Math.floor(sortedRows.length / 2);
        if (sortedRows.length % 2 === 0) {
            return (sortedRows[mid - 1] + sortedRows[mid]) / 2;
        }
        return sortedRows[mid];
    }

    private fillRow(
        inputValue: NumOrStr | null,
        nullValue: any[] = [null]
    ): void {
        this.rows.forEach((row, index) => {
            if (nullValue.includes(row)) {
                this.rows[index] = inputValue;
            }
        });
    }

    public fillNullValues(
        method: NullMethod,
        nullValue: any[] = [null],
        customValue?: NumOrStr | null
    ): void {
        switch (method) {
            case NullMethod.CUSTOM:
                if (customValue === undefined) {
                    throw new Error(CUSTOM_ERROR);
                }
                this.fillRow(customValue, nullValue);
                break;
            case NullMethod.REMOVE:
                this.rows = this.rows.filter((row) => row !== nullValue);
                break;
            case NullMethod.MEAN:
                this.fillRow(this.mean(), nullValue);
                break;
            case NullMethod.MEDIAN:
                this.fillRow(this.median(), nullValue);
                break;
            case NullMethod.MODE:
                this.fillRow(this.mode(), nullValue);
                break;
            default:
                throw new Error(METHOD_ERROR);
        }
    }
}
