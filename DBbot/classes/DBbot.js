"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBbot = void 0;
const fs = require("fs");
const column_1 = require("./column");
class DBbot {
    dataMap = new Map();
    headers = [];
    columns = [];
    getColumns() {
        return this.columns;
    }
    getHeaders() {
        return this.headers;
    }
    addColumn(column) {
        this.columns.push(column);
    }
    removeColumn(column) {
        this.columns = this.columns.filter((c) => c !== column);
    }
    loadFile(path) {
        try {
            const fileData = fs.readFileSync(path, "utf8");
            const rows = fileData.split("\n");
            const headerRow = [rows.shift()];
            if (headerRow) {
                const headers = headerRow[0]
                    .split(",")
                    .map((header) => header.trim());
                this.headers = headers;
                headers.forEach((header) => {
                    this.dataMap.set(header, []);
                });
            }
            rows.forEach((row) => {
                const columns = row
                    .split(",")
                    .map((column) => column.trim());
                columns.forEach((column, index) => {
                    const columnName = this.headers[index];
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
                    const dataType = Number(columnData[0])
                        ? "numeric"
                        : "string";
                    const col = new column_1.Column(column, dataType);
                    const numberColumnData = columnData.map((item) => parseFloat(item));
                    col.addRows(dataType === "numeric" ? numberColumnData : columnData);
                    this.addColumn(col);
                }
                else {
                    console.error(`Column ${column} has no data. Skipping this column.`);
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.DBbot = DBbot;
