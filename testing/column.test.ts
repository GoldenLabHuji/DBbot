import { Column } from "../classes/column";
import { EqualOperator } from "../classes/operator";
import {
    DATATYPE_ERROR,
    STRING_CALCULATION_ERROR,
    MODE_ERROR,
    CUSTOM_ERROR,
    METHOD_ERROR,
} from "../general/resources";

describe("Column", () => {
    let column: Column;

    beforeEach(() => {
        column = new Column("testColumn", "numeric");
    });

    test("should initialize with correct data type and operators", () => {
        expect(column.dataType).toBe("numeric");
        expect(column.getColumnData().operators.length).toBeGreaterThan(0);
    });

    test("should throw DATATYPE_ERROR if data type is invalid", () => {
        expect(() => {
            new Column("invalidColumn", "invalid" as any);
        }).toThrow(DATATYPE_ERROR);
    });

    test("should set and get description", () => {
        column.description = "Test description";
        expect(column.description).toBe("Test description");
    });

    test("should throw error if description is not a string", () => {
        expect(() => {
            column.description = 123 as any;
        }).toThrow("Description must be a string");
    });

    test("should delete all rows", () => {
        column.addRows([1, 2, 3]);
        column.deleteAllRows();
        expect(column.getColumnData().rows.length).toBe(0);
    });

    test("should calculate mean correctly", () => {
        column.addRows([1, 2, 3, 4]);
        expect(column.mean()).toBe(2.5);
    });

    test("should throw STRING_CALCULATION_ERROR when calculating mean for string data type", () => {
        const stringColumn = new Column("stringColumn", "string");
        expect(() => stringColumn.mean()).toThrow(STRING_CALCULATION_ERROR);
    });

    test("should calculate mode correctly", () => {
        column.addRows([1, 1, 2, 2, 3]);
        expect(column.mode()).toBe(1);
    });

    test("should throw MODE_ERROR if no mode found", () => {
        column.addRows([1, 2, 3]);
        expect(() => column.mode()).toThrow(MODE_ERROR);
    });

    test("should calculate median correctly", () => {
        column.addRows([3, 1, 2, 4]);
        expect(column.median()).toBe(2.5);
    });

    test("should throw STRING_CALCULATION_ERROR when calculating median for string data type", () => {
        const stringColumn = new Column("stringColumn", "string");
        expect(() => stringColumn.median()).toThrow(STRING_CALCULATION_ERROR);
    });

    test("should fill null values with custom value", () => {
        column.addRows([1, null, 3, null]);
        column.fillNullValues("custom", [null], 99);
        expect(column.getColumnData().rows).toEqual([1, 99, 3, 99]);
    });

    test("should throw CUSTOM_ERROR if custom value is missing", () => {
        column.addRows([1, null, 3, null]);
        expect(() => column.fillNullValues("custom")).toThrow(CUSTOM_ERROR);
    });

    test("should throw METHOD_ERROR if invalid method is provided", () => {
        column.addRows([1, null, 3, null]);
        expect(() => column.fillNullValues("invalidMethod" as any)).toThrow(
            METHOD_ERROR
        );
    });

    test("should convert numeric column to factor and update operators", () => {
        column.ConvertToFactor();
        expect(column.dataType).toBe("factor");
        expect(column.getColumnData().operators.length).toBeGreaterThan(0);
    });

    test("should add custom operator", () => {
        const customOperator = new EqualOperator();
        column.addOperator(customOperator);
        expect(column.getColumnData().operators).toContain(customOperator);
    });
});
