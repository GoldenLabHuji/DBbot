import fs from "fs";
import { parse } from "csv-parse/sync";
import { DBbot } from "../classes/DBbot";
import { Column } from "../classes/column";
import {
    BotDetails,
    BotMessages,
    AddCustomOperatorParams,
    CustomMessages,
    MessagesSlot,
} from "../general/types";

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
        const column1 = new Column("name1", "string");
        const column2 = new Column("name2", "string");
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
        const column = new Column("testColumn", "string");
        dbBot["addColumn"](column);

        dbBot["removeColumn"](column);

        expect(() => dbBot.getColumnByName("testColumn")).toThrow(
            "Column with displayName of testColumn not found"
        );
    });

    test("should get column by id", () => {
        const column = new Column("testId", "string");
        column.displayName = "testName";
        dbBot["addColumn"](column);

        const fetchedColumn = dbBot.getColumnById("testId");

        expect(fetchedColumn.id).toBe("testId");
        expect(fetchedColumn.displayName).toBe("testName");
    });

    test("should change column display name", () => {
        const column = new Column("oldName", "string");
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
        const column1 = new Column("name1", "string");
        const column2 = new Column("name2", "string");
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

describe("DBbot messages tests", () => {
    let dbBot: DBbot;

    beforeEach(() => {
        dbBot = new DBbot();
    });

    test("should initialize with default messages", () => {
        const expectedMessages: BotMessages = {
            customMessages: {
                attributeMessage:
                    "This is a message to ask for an attribute of the database to start the query. Here is the list of the attributes:",
                operatorMessage:
                    "This is the list of operators to choose from:",
                errorMessage: "I don't understand, please enter a valid option",
                continueMessage: "Enter 1 to continue",
                resultMessage: `Here is the results of your query. 
You can download the results as a csv file`,
            },
            slots: {
                welcomeSlot: [
                    "Welcome message",
                    "Description message",
                    "Example message",
                ],
                operatorSlot: [],
                paramsSlot: [],
                restartSlot: [],
                resultSlot: [],
            },
        };

        expect(dbBot.messages).toEqual(expectedMessages);
    });

    test("should set custom messages", () => {
        const customMessages: CustomMessages = {
            attributeMessage: "New attribute message",
            operatorMessage: "New operator message",
            errorMessage: "New error message",
            continueMessage: "New continue message",
            resultMessage: "New result message",
        };

        dbBot.customMessages = customMessages;

        expect(dbBot.messages.customMessages).toEqual(customMessages);
    });

    test("should set slots messages", () => {
        const slotsMessages: MessagesSlot = {
            welcomeSlot: ["New welcome message"],
            operatorSlot: ["New operator message"],
            paramsSlot: ["New params message"],
            restartSlot: ["New restart message"],
            resultSlot: ["New result message"],
        };

        dbBot.slots = slotsMessages;

        expect(dbBot.messages.slots).toEqual(slotsMessages);
    });

    test("should get and set details", () => {
        const details: BotDetails = {
            name: "Test Bot",
            description: "A test bot description",
        };

        dbBot.details = details;

        expect(dbBot.details.name).toBe("Test Bot");
        expect(dbBot.details.description).toBe("A test bot description");
    });
});

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

    test("should create operators file", () => {
        const params: AddCustomOperatorParams = {
            name: "testOperator",
            customFunction: (a: number, b: number) => a + b,
            params: [],
            message: "Test message",
            column: "column1",
        };

        dbBot.addCustomOperator(params);
        dbBot.createOperatorsFile();

        expect(fs.writeFileSync).toHaveBeenCalled();
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

describe("DBbot load file tests", () => {
    let dbBot: DBbot;

    beforeEach(() => {
        dbBot = new DBbot();
    });


    test('should handle an error when loading a file with invalid data', () => {
        const invalidCSV = `column1,column2\nvalue1\nvalue2,value3,value4`;
        (fs.readFileSync as jest.Mock).mockReturnValue(invalidCSV);
        (parse as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid CSV format');
        });

        expect(() => dbBot.loadFile('invalid.csv')).not.toThrow();
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
