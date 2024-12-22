import { Operator } from "./operator";
import * as resources from "../general/resources";
import * as types from "../general/types";
import { generateTypeError } from "../general/utils";

export class Column {
    private rows: any[] = [];
    private operatorsArray: Operator[] = [];
    private _description: string = "No description available";
    private _useDefaultOperators: boolean = true;
    constructor(
        private readonly _id: string,
        public dataType: types.DataType,
        public displayName: string = _id,
        private customOperators: Operator[] = []
    ) {
        if (this._useDefaultOperators) {
            this.addDefaultOperators(dataType);
        }
    }

    public get useDefaultOperators(): boolean {
        return this._useDefaultOperators;
    }

    public set useDefaultOperators(value: boolean) {
        generateTypeError(value, "boolean", "useDefaultOperators");

        if (value) {
            this.addDefaultOperators(this.dataType);
        } else {
            this.operatorsArray = [...this.customOperators];
        }

        this._useDefaultOperators = value;
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

    private addDefaultOperators(dataType: types.DataType): void {
        switch (dataType) {
            case types.DataType.NUMERIC:
                this.pushOperators(resources.DEFAULT_OPERATORS.numericOperators);
                break;
            case types.DataType.STRING:
                this.pushOperators(resources.DEFAULT_OPERATORS.stringOperators);
                break;
            case types.DataType.FACTOR:
                this.pushOperators(resources.DEFAULT_OPERATORS.factorOperators);
                break;
            default:
                throw new Error(resources.ERRORS.DATATYPE);
        }
    }

    private pushOperators(operators: Operator[]): void {
        this.operatorsArray.push(...[...operators, ...this.customOperators]);
        this.operatorsArray = [...new Set(this.operatorsArray)];
    }

    public deleteAllRows(): void {
        this.rows = [];
    }

    public getColumnData(): types.ColumnData {
        return {
            id: this.id,
            rows: this.rows,
            dataType: this.dataType,
            displayName: this.displayName,
            operators: this.operatorsArray,
        };
    }

    public ConvertToFactor(): void {
        this.dataType = types.DataType.FACTOR;
        this.operatorsArray = [
            ...resources.DEFAULT_OPERATORS.factorOperators,
            ...this.customOperators,
        ];
    }

    public addRows(rows: any[]): void {
        this.rows.push(...rows);
    }

    public addOperator(operator: Operator): void {
        this.operatorsArray.push(operator);
    }

    public mean(): number {
        if (!(this.dataType === types.DataType.NUMERIC)) {
            throw new Error(resources.ERRORS.NAN);
        }
        const sum = this.rows.reduce((acc, curr) => {
            if (isNaN(curr)) return acc + 0;
            return acc + curr;
        }, 0);
        const mean = sum / this.rows.length;
        return Math.round(mean * 100) / 100;
    }

    public mode(): number {
        if (!(this.dataType === types.DataType.NUMERIC)) {
            throw new Error(resources.ERRORS.NAN);
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
            throw new Error(resources.ERRORS.MODE);
        }
        const max = Math.max(...countsArray);
        const result =
            Number(Object.keys(counts).find((key) => counts[key] === max)) ??
            -1;
        if (result === -1) {
            throw new Error(resources.ERRORS.MODE);
        }
        return result;
    }

    public median(): number {
        if (!(this.dataType === types.DataType.NUMERIC)) {
            throw new Error(resources.ERRORS.NAN);
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
        inputValue: types.NumOrStr | null,
        nullValue: any[] = [null]
    ): void {
        this.rows.forEach((row, index) => {
            if (nullValue.includes(row)) {
                this.rows[index] = inputValue;
            }
        });
    }

    public fillNullValues(
        method: types.NullMethod,
        nullValue: any[] = [null],
        customValue?: types.NumOrStr | null
    ): void {
        switch (method) {
            case types.NullMethod.CUSTOM:
                if (customValue === undefined) {
                    throw new Error(resources.ERRORS.CUSTOM);
                }
                this.fillRow(customValue, nullValue);
                break;
            case types.NullMethod.REMOVE:
                this.rows = this.rows.filter((row) => row !== nullValue);
                break;
            case types.NullMethod.MEAN:
                this.fillRow(this.mean(), nullValue);
                break;
            case types.NullMethod.MEDIAN:
                this.fillRow(this.median(), nullValue);
                break;
            case types.NullMethod.MODE:
                this.fillRow(this.mode(), nullValue);
                break;
            default:
                throw new Error(resources.ERRORS.METHOD);
        }
    }
}
