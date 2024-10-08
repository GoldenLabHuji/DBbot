"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullMethod = exports.DataType = void 0;
var DataType;
(function (DataType) {
    DataType["STRING"] = "string";
    DataType["NUMERIC"] = "numeric";
    DataType["FACTOR"] = "factor";
})(DataType || (exports.DataType = DataType = {}));
var NullMethod;
(function (NullMethod) {
    NullMethod["MEAN"] = "mean";
    NullMethod["MEDIAN"] = "median";
    NullMethod["MODE"] = "mode";
    NullMethod["REMOVE"] = "remove";
    NullMethod["CUSTOM"] = "custom";
})(NullMethod || (exports.NullMethod = NullMethod = {}));
