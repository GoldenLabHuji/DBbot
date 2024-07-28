import {
    greaterOperator,
    lowerOperator,
    equalOperator,
    rangeOperator,
    startWithOperator,
    endWithOperator,
    containsOperator,
    equalStringOperator,
} from "@/app/operators";

export const OPERATORS = {
    greater: greaterOperator,
    lower: lowerOperator,
    equal: equalOperator,
    range: rangeOperator,
    startWith: startWithOperator,
    endWith: endWithOperator,
    contains: containsOperator,
    equalString: equalStringOperator,
};
