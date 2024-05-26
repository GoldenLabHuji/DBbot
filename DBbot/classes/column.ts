import {
    Operator,
    EqualOperator,
    LessOperator,
    GreaterOperator,
    RangeOperator,
    ContainsOperator,
    StartsWithOperator,
} from "./operator";
import { DataType } from "../general/types";

export class Column {
    private rows: any[] = [];
    private operatorsArray: Operator[] = [];
    constructor(
        private readonly id: string,
        private dataType: DataType,
        private displayName: string = id
    ) {
        const numericOperators = [
            new EqualOperator(),
            new LessOperator(),
            new GreaterOperator(),
            new RangeOperator(),
        ];
        const stringOperators = [
            new ContainsOperator(),
            new StartsWithOperator(),
        ];
        if (dataType === "numeric") {
            this.operatorsArray.push(...numericOperators);
        } else if (dataType === "string") {
            this.operatorsArray.push(...stringOperators);
        } else {
            throw new Error("Invalid data type");
        }
    }

    getRows(): any[] {
        return this.rows;
    }

    addRows(rows: any[]): void {
        this.rows.push(...rows);
    }

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
