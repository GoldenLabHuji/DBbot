export function soundLikeOperator(
    inputValue: string,
    compareValue: string,
    maxDifferences: number
) {
    let diffCount = 0;
    const shorterLength = Math.min(inputValue.length, compareValue.length);
    const indexArray = new Array(shorterLength)
        .fill(0)
        .map((_, index) => index);
    const lowerStartingValue = inputValue.toLowerCase();
    const lowerCheckValue = compareValue.toLowerCase();
    indexArray.forEach((i) => {
        if (lowerStartingValue[i] !== lowerCheckValue[i]) diffCount++;
        if (diffCount > maxDifferences) return false;
    });
    return diffCount <= maxDifferences;
}