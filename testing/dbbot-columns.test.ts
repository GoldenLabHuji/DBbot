import fs from "fs";
import { parse } from "csv-parse/sync";
import { DBbot } from "../classes/DBbot";
import { Column } from "../classes/column";
import { DataType, NullMethod } from "../general/types";

jest.mock("fs");
jest.mock("path");
jest.mock("csv-parse/sync");

describe("DBbot columns tests", () => {
    let dbBot: DBbot;

    beforeEach(() => {
        dbBot = new DBbot();
        const sampleCSV = `column1,column2\nvalue1,value2\nvalue3,value4`;
        const parsedData = [
            { column1: "value1", column2: "value2" },
            { column1: "value3", column2: "value4" },
        ];

        (fs.readFileSync as jest.Mock).mockReturnValue(sampleCSV);
        (parse as jest.Mock).mockReturnValue(parsedData);

        dbBot.loadFile("test.csv");
    });

    test("should handle adding columns with numeric and string data types", () => {
        const numericColumnData = ["1", "2", "3"];
        const stringColumnData = ["a", "b", "c"];

        dbBot["dataMap"].set("numericColumn", numericColumnData);
        dbBot["dataMap"].set("stringColumn", stringColumnData);
        dbBot["data"].headers = ["numericColumn", "stringColumn"];

        dbBot["addColumnsAuto"]();

        const numericColumn = dbBot.getColumnByName("numericColumn");
        const stringColumn = dbBot.getColumnByName("stringColumn");

        expect(numericColumn["dataType"]).toBe("numeric");
        expect(numericColumn["rows"]).toEqual([1, 2, 3]);

        expect(stringColumn["dataType"]).toBe("string");
        expect(stringColumn["rows"]).toEqual(["a", "b", "c"]);
    });

    test("should throw error when column is not found during display name change", () => {
        expect(() =>
            dbBot.changeColumnDisplayName("nonexistent", "newName")
        ).toThrow("Column with displayName of nonexistent not found");
    });

    test("should throw error when changing column display name to an existing one", () => {
        const column1 = new Column("name1", DataType.STRING);
        const column2 = new Column("name2", DataType.STRING);
        dbBot["addColumn"](column1);
        dbBot["addColumn"](column2);

        expect(() => dbBot.changeColumnDisplayName("name1", "name2")).toThrow(
            "Column name2 already exists"
        );
    });

    test("should call addColumnsToDataMap correctly", () => {
        const sampleCSV = `column1,column2\nvalue1,value2\nvalue3,value4`;
        const records = parse(sampleCSV, {
            columns: true,
            trim: true,
            skip_empty_lines: true,
        });
        dbBot["data"].headers = ["column1", "column2"];
        dbBot["dataMap"].set("column1", []);
        dbBot["dataMap"].set("column2", []);

        dbBot["addColumnsToDataMap"](records);

        expect(dbBot["dataMap"].get("column1")).toEqual(["value1", "value3"]);
        expect(dbBot["dataMap"].get("column2")).toEqual(["value2", "value4"]);
    });

    test("should auto-add columns correctly", () => {
        dbBot["dataMap"].set("numericColumn", ["1", "2", "3"]);
        dbBot["dataMap"].set("stringColumn", ["a", "b", "c"]);
        dbBot["dataMap"].set("emptyColumn", []);
        dbBot["data"].headers = [
            "numericColumn",
            "stringColumn",
            "emptyColumn",
        ];

        dbBot["addColumnsAuto"]();

        const numericColumn = dbBot.getColumnByName("numericColumn");
        const stringColumn = dbBot.getColumnByName("stringColumn");

        expect(numericColumn["dataType"]).toBe("numeric");
        expect(numericColumn["rows"]).toEqual([1, 2, 3]);

        expect(stringColumn["dataType"]).toBe("string");
        expect(stringColumn["rows"]).toEqual(["a", "b", "c"]);

        expect(() => dbBot.getColumnByName("emptyColumn")).toThrow(
            "Column with displayName of emptyColumn not found"
        );
    });

    test("should remove column", () => {
        const column = new Column("testColumn", DataType.STRING);
        dbBot["addColumn"](column);

        dbBot["removeColumn"](column);

        expect(() => dbBot.getColumnByName("testColumn")).toThrow(
            "Column with displayName of testColumn not found"
        );
    });

    test("should get column by id", () => {
        const column = new Column("testId", DataType.STRING);
        column.displayName = "testName";
        dbBot["addColumn"](column);

        const fetchedColumn = dbBot.getColumnById("testId");

        expect(fetchedColumn.id).toBe("testId");
        expect(fetchedColumn.displayName).toBe("testName");
    });

    test("should change column display name", () => {
        const column = new Column("oldName", DataType.STRING);
        dbBot["addColumn"](column);

        dbBot.changeColumnDisplayName("oldName", "newName");

        expect(dbBot.getColumnByName("newName").displayName).toBe("newName");
    });

    test("should throw error when column not found by name", () => {
        expect(() => dbBot.getColumnByName("nonexistent")).toThrow(
            "Column with displayName of nonexistent not found"
        );
    });

    test("should throw error when duplicate column display name is added", () => {
        const column1 = new Column("name1", DataType.STRING);
        const column2 = new Column("name2", DataType.STRING);
        dbBot["addColumn"](column1);
        dbBot["addColumn"](column2);

        expect(() => dbBot.changeColumnDisplayName("name1", "name2")).toThrow(
            "Column name2 already exists"
        );
    });

    test("should throw error when column not found by id", () => {
        expect(() => dbBot.getColumnById("nonexistentId")).toThrow(
            "Column with id of nonexistentId not found"
        );
    });
});
