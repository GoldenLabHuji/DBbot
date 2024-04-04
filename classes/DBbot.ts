import fs from "fs";
import csvParser from "csv-parser";
import { Column } from "./column";

export class DBbot {
    private dataMap = new Map<string, any>();
    constructor(private columns: Column[] = []) {}

    getColumns(): Column[] {
        return this.columns;
    }

    addColumn(column: Column): void {
        this.columns.push(column);
    }

    removeColumn(column: Column): void {
        this.columns = this.columns.filter((c) => c !== column);
    }

    loadFile(path: string): void {
        fs.createReadStream(path)
            .pipe(csvParser())
            .on("data", (row: any) => {
                this.dataMap.set(row.id, row);
            })
            .on("end", () => {
                console.log("CSV file successfully processed.");
                console.log("Data:", this.dataMap);
            })
            .on("error", (error: any) => {
                console.error("Error occurred while reading CSV:", error);
            });
    }

    getRow(id: string): any {
        return this.dataMap.get(id);
    }
}
