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