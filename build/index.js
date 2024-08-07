"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.dbBot = void 0;
const DBbot_1 = require("./DBbot");
const resources_1 = require("./DBbot/general/resources");
require("dotenv/config");
const path_1 = __importDefault(require("path"));
exports.dbBot = new DBbot_1.DBbot();
const reactPath = path_1.default.resolve(__dirname, resources_1.REACT_APP_PATH[process.env.NODE_ENV ?? "production"]);
exports.app = new DBbot_1.app(reactPath);
