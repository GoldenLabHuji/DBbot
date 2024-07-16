import {
    Operator,
    EqualOperator,
    LessOperator,
    GreaterOperator,
    RangeOperator,
    SoundLikeOperator,
    StartsWithOperator,
} from "./operator";
import { DataType, ColumnData, nullMethod, NumOrStr } from "../general/types";

export class Column {
    private rows: any[] = [];
    private operatorsArray: Operator[] = [];
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
            new SoundLikeOperator(),
            new StartsWithOperator(),
        ];
        if (dataType === "numeric") {
            this.operatorsArray.push(
                ...[...numericOperators, ...this.customOperators]
            );
        } else if (dataType === "string") {
            this.operatorsArray.push(
                ...[...stringOperators, ...this.customOperators]
            );
        } else {
            throw new Error("Invalid data type");
        }
    }

    public get id(): string {
        return this._id;
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

    public addRows(rows: any[]): void {
        this.rows.push(...rows);
    }

    public addOperator(operator: Operator): void {
        this.operatorsArray.push(operator);
    }

    public mean(): number {
        if (this.dataType === "string") {
            throw new Error("Cannot calculate mean for string data type");
        }
        const sum = this.rows.reduce((acc, curr) => {
            if (isNaN(curr)) return acc + 0;
            return acc + curr;
        }, 0);
        const mean = sum / this.rows.length;
        return Math.round(mean * 100) / 100;
    }

    public mode(): number {
        if (this.dataType === "string") {
            throw new Error("Cannot calculate mode for string data type");
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
        const max = Math.max(...(Object.values(counts) as number[]));
        const result =
            Number(Object.keys(counts).find((key) => counts[key] === max)) ??
            -1;
        if (result === -1) {
            throw new Error("No mode found");
        }
        return result;
    }

    public median(): number {
        if (this.dataType === "string") {
            throw new Error("Cannot calculate median for string data type");
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

    private fillRow(inputValue: NumOrStr, nullValue: any[] = [null]): void {
        this.rows.forEach((row, index) => {
            if (nullValue.includes(row)) {
                this.rows[index] = inputValue;
            }
        });
    }

    public fillNullValues(
        method: nullMethod,
        nullValue: any[] = [null],
        customValue?: NumOrStr
    ): void {
        if (method === "custom") {
            if (customValue === undefined) {
                throw new Error("Custom value is required");
            }
            this.fillRow(customValue, nullValue);
        } else if (method === "remove") {
            this.rows = this.rows.filter((row) => row !== nullValue);
        } else if (method === "mean") {
            this.fillRow(this.mean(), nullValue);
        } else if (method === "median") {
            this.fillRow(this.median(), nullValue);
        } else if (method === "mode") {
            this.fillRow(this.mode(), nullValue);
        } else {
            throw new Error(
                "Invalid method, Please provide a valid method of the following 'mean', 'median', 'mode', 'remove' or 'custom'"
            );
        }
    }
}
