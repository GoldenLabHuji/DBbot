import {
    CustomOperator,
    ChooseOneOperator,
    ChooseMultipleOperator,
    EqualOperator,
    LessOperator,
    GreaterOperator,
    RangeOperator,
    SoundLikeOperator,
    StartsWithOperator,
    EndWithOperator,
    ContainsOperator,
    EqualStringOperator,
} from "../classes/operator";
import { DataType } from "../general/types";

describe("Operator and its subclasses", () => {
    test("CustomOperator should calculate using custom function", () => {
        const customFunction = jest.fn(() => true);
        const customOperator = new CustomOperator("custom", customFunction);

        expect(customOperator.calculate()).toBe(true);
        expect(customFunction).toHaveBeenCalled();
    });

    test("CustomOperator should add params", () => {
        const customOperator = new CustomOperator("custom", () => true);
        const params = [{ name: "param1", dataType: DataType.STRING }];
        customOperator.addParams(params);

        expect(customOperator.params).toEqual(params);
    });

    test("ChooseOneOperator should return true when cell equals value", () => {
        const chooseOneOperator = new ChooseOneOperator();
        expect(chooseOneOperator.calculate("apple", "apple")).toBe(true);
        expect(chooseOneOperator.calculate("apple", "orange")).toBe(false);
    });

    test("ChooseMultipleOperator should return true if cell is in values", () => {
        const chooseMultipleOperator = new ChooseMultipleOperator();
        expect(
            chooseMultipleOperator.calculate("apple", ["apple", "orange"])
        ).toBe(true);
        expect(
            chooseMultipleOperator.calculate("banana", ["apple", "orange"])
        ).toBe(false);
    });

    test("EqualOperator should return true if numbers are equal", () => {
        const equalOperator = new EqualOperator();
        expect(equalOperator.calculate(5, 5)).toBe(true);
        expect(equalOperator.calculate(5, 10)).toBe(false);
    });

    test("LessOperator should return true if cell is less than or equal to value", () => {
        const lessOperator = new LessOperator();
        expect(lessOperator.calculate(5, 10)).toBe(true);
        expect(lessOperator.calculate(10, 5)).toBe(false);
    });

    test("GreaterOperator should return true if cell is greater than or equal to value", () => {
        const greaterOperator = new GreaterOperator();
        expect(greaterOperator.calculate(10, 5)).toBe(true);
        expect(greaterOperator.calculate(5, 10)).toBe(false);
    });

    test("RangeOperator should return true if cell is within range", () => {
        const rangeOperator = new RangeOperator();
        expect(rangeOperator.calculate(7, 5, 10)).toBe(true);
        expect(rangeOperator.calculate(4, 5, 10)).toBe(false);
    });

    test("SoundLikeOperator should return true if inputValue sounds like compareValue", () => {
        const soundLikeOperator = new SoundLikeOperator();
        expect(soundLikeOperator.calculate("apple", "applo", 1)).toBe(true);
        expect(soundLikeOperator.calculate("apple", "banana", 1)).toBe(false);
    });

    test("StartsWithOperator should return true if cell starts with value", () => {
        const startsWithOperator = new StartsWithOperator();
        expect(startsWithOperator.calculate("apple", "a")).toBe(true);
        expect(startsWithOperator.calculate("apple", "b")).toBe(false);
    });

    test("EndWithOperator should return true if cell ends with value", () => {
        const endWithOperator = new EndWithOperator();
        expect(endWithOperator.calculate("apple", "e")).toBe(true);
        expect(endWithOperator.calculate("apple", "a")).toBe(false);
    });

    test("ContainsOperator should return true if cell contains value", () => {
        const containsOperator = new ContainsOperator();
        expect(containsOperator.calculate("apple pie", "apple")).toBe(true);
        expect(containsOperator.calculate("apple pie", "banana")).toBe(false);
    });

    test("EqualStringOperator should return true if strings are equal ignoring case", () => {
        const equalStringOperator = new EqualStringOperator();
        expect(equalStringOperator.calculate("Apple", "apple")).toBe(true);
        expect(equalStringOperator.calculate("Apple", "banana")).toBe(false);
    });
});
