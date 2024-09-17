import fs from "fs";
import { parse } from "csv-parse/sync";
import { DBbot } from "../classes/DBbot";
import { Column } from "../classes/column";
import { AddCustomOperatorParams } from "../general/types";

jest.mock("fs");
jest.mock("path");
jest.mock("csv-parse/sync");

describe("DBbot operators tests", () => {
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

    test("should correctly register a custom operator", () => {
        const params: AddCustomOperatorParams = {
            name: "testOperator",
            customFunction: (a: number, b: number) => a + b,
            params: [],
            message: "Test message",
            column: "column1",
        };

        const column = new Column("testColumn", "string");
        dbBot["addColumn"](column);

        dbBot["registerOperators"](params);

        const operator = dbBot.data.customOperators.find(
            (op) => op.getDisplayName() === "testOperator"
        );
        expect(operator).toBeDefined();
    });

    test("should initialize custom operators", () => {
        expect(dbBot.data.customOperators).toEqual([]);
    });

    test("should throw error if column not found in registerOperators", () => {
        const params: AddCustomOperatorParams = {
            name: "testOperator",
            customFunction: (a: number, b: number) => a + b,
            params: [],
            message: "Test message",
            column: "nonexistentColumn",
        };

        expect(() => dbBot["registerOperators"](params)).toThrow(
            "Column with displayName of nonexistentColumn not found"
        );
    });

    test("should add custom operator", () => {
        const params: AddCustomOperatorParams = {
            name: "testOperator",
            customFunction: (a: number, b: number) => a + b,
            params: [],
            message: "Test message",
            column: "column1",
        };

        dbBot.addCustomOperator(params);

        expect(dbBot.data.customOperators.length).toBe(1);
        expect(dbBot.data.customOperators[0].getDisplayName()).toBe(
            "testOperator"
        );
    });
});
