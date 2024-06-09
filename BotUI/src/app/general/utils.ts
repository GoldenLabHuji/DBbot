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
