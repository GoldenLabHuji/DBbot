const fs = require("fs");
import { Column } from "./column";
import { DataType } from "../general/types";

export class DBbot {
    private dataMap = new Map<string, any>();
    private headers: string[] = [];
    private columns: Column[] = [];

    getColumns(): Column[] {
        return this.columns;
    }
    getHeaders(): string[] {
        return this.headers;
    }

    addColumn(column: Column): void {
        this.columns.push(column);
    }

    removeColumn(column: Column): void {
        this.columns = this.columns.filter((c) => c !== column);
    }

    loadFile(path: string): void {
        try {
            const fileData = fs.readFileSync(path, "utf8");
            const rows = fileData.split("\n");
            const headerRow = [rows.shift()];
            if (headerRow) {
                const headers = headerRow[0]
                    .split(",")
                    .map((header: string) => header.trim());
                this.headers = headers;
                headers.forEach((header: string) => {
                    this.dataMap.set(header, []);
                });
            }

            rows.forEach((row: string) => {
                const columns = row
                    .split(",")
                    .map((column: string) => column.trim());
                columns.forEach((column: string, index: string | number) => {
                    const columnName = this.headers[index as number];
                    if (columnName && column !== "") {
                        const columnData = this.dataMap.get(columnName);
                        if (columnData) {
                            columnData.push(column);
                        }
                    }
                });
            });

            this.headers.forEach((column) => {
                const columnData = this.dataMap.get(column);
                if (columnData && columnData.length > 0) {
                    const dataType: DataType = Number(columnData[0])
                        ? "numeric"
                        : "string";
                    const col = new Column(column, dataType);
                    const numberColumnData: number[] = columnData.map(
                        (item: string) => parseFloat(item)
                    );
                    col.addRows(
                        dataType === "numeric" ? numberColumnData : columnData
                    );
                    this.addColumn(col);
                } else {
                    console.error(
                        `Column ${column} has no data. Skipping this column.`
                    );
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}
