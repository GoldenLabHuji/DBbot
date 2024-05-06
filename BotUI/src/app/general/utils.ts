export function isNumberArray(value: any): value is number[] {
    const isArray = Array.isArray(value);
    if (!isArray) return false;
    const isNumArray = value.every(
        (element: any) => typeof element === "number"
    );
    return isNumArray;
}

export function getOperator(name: string) {
    switch (name) {
        case "Greater":
            return greaterOperator;
        case "Lower":
            return lowerOperator;
        case "Equal":
            return equalOperator;
        case "Range":
            return rangeOperator;
        case "SoundLike":
            return soundLikeOperator;
        case "StartWith":
            return startsWithOperator;
        default:
            throw new Error("Invalid operator name");
    }
}

export function greaterOperator(startingValue: number, checkValue: number) {
    return checkValue >= startingValue;
}

export function lowerOperator(startingValue: number, checkValue: number) {
    return checkValue <= startingValue;
}

export function equalOperator(startingValue: number, checkValue: number) {
    return Number(startingValue) === Number(checkValue);
}

export function rangeOperator(startingValue: number[], checkValue: number) {
    return checkValue >= startingValue[0] && checkValue <= startingValue[1];
}

export function startsWithOperator(startingValue: string, checkValue: string) {
    return checkValue.toLowerCase().startsWith(startingValue.toLowerCase());
}

export function soundLikeOperator(startingValue: string, checkValue: string) {
    const maxDiff = 2;
    let diffCount = 0;
    const indexArray = new Array(startingValue.length)
        .fill(0)
        .map((_, index) => index);
    const lowerStartingValue = startingValue.toLowerCase();
    const lowerCheckValue = checkValue.toLowerCase();
    indexArray.forEach((i) => {
        if (lowerStartingValue[i] !== lowerCheckValue[i]) diffCount++;
        if (diffCount > maxDiff) return false;
    });
    return diffCount <= maxDiff;
}
