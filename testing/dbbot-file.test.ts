import fs from "fs";
import { parse } from "csv-parse/sync";
import { DBbot } from "../classes/DBbot";

jest.mock("fs");
jest.mock("path");
jest.mock("csv-parse/sync");

describe("DBbot load file tests", () => {
    let dbBot: DBbot;

    beforeEach(() => {
        dbBot = new DBbot();
    });

    test("should handle an error when loading a file with invalid data", () => {
        const invalidCSV = `column1,column2\nvalue1\nvalue2,value3,value4`;
        (fs.readFileSync as jest.Mock).mockReturnValue(invalidCSV);
        (parse as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid CSV format");
        });

        expect(() => dbBot.loadFile("invalid.csv")).not.toThrow();
    });

    test("should load file and parse data correctly", () => {
        const sampleCSV = `column1,column2\nvalue1,value2\nvalue3,value4`;
        const parsedData = [
            { column1: "value1", column2: "value2" },
            { column1: "value3", column2: "value4" },
        ];

        (fs.readFileSync as jest.Mock).mockReturnValue(sampleCSV);
        (parse as jest.Mock).mockReturnValue(parsedData);

        dbBot.loadFile("test.csv");
        expect(dbBot.data.headers).toEqual(["column1", "column2"]);
        expect(dbBot.data.columns.length).toBe(2);
    });

    test("should handle empty file load", () => {
        (fs.readFileSync as jest.Mock).mockReturnValue("");
        (parse as jest.Mock).mockReturnValue([]);

        dbBot.loadFile("empty.csv");

        expect(dbBot.data.headers).toEqual([]);
        expect(dbBot.data.columns.length).toBe(0);
    });

    test("should handle invalid CSV format", () => {
        (fs.readFileSync as jest.Mock).mockReturnValue("invalid csv content");
        (parse as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid CSV format");
        });

        expect(() => dbBot.loadFile("invalid.csv")).not.toThrow();
    });
});
