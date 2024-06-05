// import {
//     greaterOperator,
//     lowerOperator,
//     equalOperator,
//     rangeOperator,
//     startWithOperator,
//     soundLikeOperator,
// } from "@/app/operators";

import { OPERATORS } from "@/app/operators/operators";

export function isNumberArray(value: any): value is number[] {
    const isArray = Array.isArray(value);
    if (!isArray) return false;
    const isNumArray = value.every(
        (element: any) => typeof element === "number"
    );
    return isNumArray;
}

export function getOperator(name: string) {
    return OPERATORS[name as keyof typeof OPERATORS];
}

// export function getOperator(name: string) {
//     switch (name) {
//         case "Greater":
//             return greaterOperator;
//         case "Lower":
//             return lowerOperator;
//         case "Equal":
//             return equalOperator;
//         case "Range":
//             return rangeOperator;
//         case "SoundLike":
//             return soundLikeOperator;
//         case "StartWith":
//             return startWithOperator;
//         default:
//             throw new Error("Invalid operator name");
//     }
// }
