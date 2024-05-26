const fs = require("fs");
import { parse } from "csv-parse/sync";
import { Column } from "./column";
import { DataType } from "../general/types";

export class DBbot {
    private dataMap = new Map<string, any>();
    private headers: string[] = [];
    private columns: Column[] = [];
    private name: string = "INSERT DATABASE NAME";
    private description: string = "INSERT DESCRIPTION OF THE DATABASE";
    private example: string = "INSERT EXAMPLE OF USE CASE";
    public filePath: string = "";

    getColumns(): Column[] {
        return this.columns;
    }
    getHeaders(): string[] {
        return this.headers;
    }
    setName(name: string): void {
        this.name = name;
    }
    setDescription(description: string): void {
        this.description = description;
    }
    setExample(example: string): void {
        this.example = example;
    }

    addColumn(column: Column): void {
        this.columns.push(column);
    }

    removeColumn(column: Column): void {
        this.columns = this.columns.filter((c) => c !== column);
    }

    testDataMap(): void {
        console.log(this.dataMap);
    }

    loadFile(path: string): void {
        this.filePath = path;
        try {
            const fileData = fs.readFileSync(path, "utf8");
            const records = parse(fileData, {
                columns: true,
                trim: true,
                skip_empty_lines: true,
            });

            if (records.length > 0) {
                this.headers = Object.keys(records[0]);
                this.headers.forEach((header: string) => {
                    this.dataMap.set(header, []);
                });
            }

            this.addColumsToDataMap(records);
            this.addColumnsAuto();
        } catch (error) {
            console.error(error);
        }
    }

    private addColumsToDataMap(records: string[]): void {
        records.forEach((record: any) => {
            this.headers.forEach((header: string) => {
                const columnData = this.dataMap.get(header);
                if (columnData) {
                    columnData.push(record[header]);
                }
            });
        });
    }

    private addColumnsAuto() {
        this.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.every((item: string) => {
                    return !isNaN(Number(item));
                });
                const dataType: DataType = isNumeric ? "numeric" : "string";
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
    }
}
