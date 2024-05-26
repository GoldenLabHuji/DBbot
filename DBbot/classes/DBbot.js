"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBbot = void 0;
const fs = require("fs");
const sync_1 = require("csv-parse/sync");
const column_1 = require("./column");
class DBbot {
    dataMap = new Map();
    headers = [];
    columns = [];
    name = "INSERT DATABASE NAME";
    description = "INSERT DESCRIPTION OF THE DATABASE";
    example = "INSERT EXAMPLE OF USE CASE";
    filePath = "";
    getColumns() {
        return this.columns;
    }
    getHeaders() {
        return this.headers;
    }
    setName(name) {
        this.name = name;
    }
    setDescription(description) {
        this.description = description;
    }
    setExample(example) {
        this.example = example;
    }
    addColumn(column) {
        this.columns.push(column);
    }
    removeColumn(column) {
        this.columns = this.columns.filter((c) => c !== column);
    }
    testDataMap() {
        console.log(this.dataMap);
    }
    loadFile(path) {
        this.filePath = path;
        try {
            const fileData = fs.readFileSync(path, "utf8");
            const records = (0, sync_1.parse)(fileData, {
                columns: true,
                trim: true,
                skip_empty_lines: true,
            });
            if (records.length > 0) {
                this.headers = Object.keys(records[0]);
                this.headers.forEach((header) => {
                    this.dataMap.set(header, []);
                });
            }
            this.addColumsToDataMap(records);
            this.addColumnsAuto();
        }
        catch (error) {
            console.error(error);
        }
    }
    addColumsToDataMap(records) {
        records.forEach((record) => {
            this.headers.forEach((header) => {
                const columnData = this.dataMap.get(header);
                if (columnData) {
                    columnData.push(record[header]);
                }
            });
        });
    }
    addColumnsAuto() {
        this.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.every((item) => {
                    return !isNaN(Number(item));
                });
                const dataType = isNumeric ? "numeric" : "string";
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
}
exports.DBbot = DBbot;
