import fs from "fs";
import csvParser from "csv-parser";
import { Column } from "./column";
import { DataType } from "../general/types";
const { exec } = require("child_process");

export class DBbot {
    private dataMap = new Map<string, any>();
    private headers: string[] = [];
    constructor(private columns: Column[] = []) {}

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
        fs.createReadStream(path)
            .pipe(csvParser())
            .on("headers", (headers: string[]) => {
                this.headers = headers[0].split("\t");

                this.headers.forEach((header) => {
                    this.dataMap.set(header, []);
                });
            })
            .on("data", (row: any) => {
                const entries = Object.entries(row)[0] as [string, string];
                const [columnNames, values] = entries;
                const columns = columnNames.split("\t");
                const rowValues = values.split("\t");

                columns.forEach((column, index) => {
                    if (!this.dataMap.has(column)) {
                        this.dataMap.set(column, []);
                    }
                    this.dataMap.get(column)?.push(rowValues[index]);
                });
            })
            .on("end", () => {
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
                            dataType === "numeric"
                                ? numberColumnData
                                : columnData
                        );
                        this.addColumn(col);
                    } else {
                        console.error(
                            `Column ${column} has no data. Skipping this column.`
                        );
                    }
                });
                console.log(this.getColumns());
            })
            .on("error", (error: any) => {
                console.error("Error occurred while reading CSV:", error);
            });
    }

    private startReactApp(path: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const reactAppProcess = exec("npm run dev", { cwd: path });

            reactAppProcess.stdout.on("data", (data: any) => {
                console.log(`React App: ${data}`);
                if (data.includes("Compiled successfully")) {
                    resolve();
                }
            });

            reactAppProcess.stderr.on("data", (data: any) => {
                console.error(`React App Error: ${data}`);
                reject();
            });

            reactAppProcess.on("close", (code: any) => {
                console.log(`React App process exited with code ${code}`);
            });
        });
    }

    runBot(path: string): void {
        // process.env.DB_BOT = JSON.stringify(new dbBot());
        this.startReactApp(path)
            .then(() => {
                console.log("React app started successfully");
            })
            .catch(() => {
                console.error("Failed to start React app");
            });
    }
}
