export function isNumberArray(value: any): value is number[] {
    const isArray = Array.isArray(value);
    const isNumArray = value.every(
        (element: any) => typeof element === "number"
    );
    return isArray && isNumArray;
}
