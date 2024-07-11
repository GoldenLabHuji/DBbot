import {
    Operator,
    EqualOperator,
    LessOperator,
    GreaterOperator,
    RangeOperator,
    SoundLikeOperator,
    StartsWithOperator,
} from "./operator";
import { DataType, ColumnData } from "../general/types";

export class Column {
    private rows: any[] = [];
    private operatorsArray: Operator[] = [];
    constructor(
        private readonly id: string,
        private dataType: DataType,
        public displayName: string = id,
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
}
