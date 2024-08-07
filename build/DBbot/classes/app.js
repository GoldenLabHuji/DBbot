"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const child_process_1 = require("child_process");
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
class app {
    botUIPath;
    constructor(botUIPath) {
        this.botUIPath = botUIPath;
    }
    startReactApp(path) {
        return new Promise((resolve, reject) => {
            const reactAppProcess = (0, child_process_1.exec)("npm run dev", { cwd: path });
            reactAppProcess.stdout?.on("data", (data) => {
                console.log(`React App: ${data}`);
                if (data.includes("Compiled successfully")) {
                    resolve();
                }
            });
            reactAppProcess.stderr?.on("data", (data) => {
                console.error(`React App Error: ${data}`);
                reject();
            });
            reactAppProcess.on("close", (code) => {
                console.log(`React App process exited with code ${code}`);
            });
        });
    }
    runBot(bot) {
        bot.createOperatorsFile();
        const tmpFilePath = path.join(os.tmpdir(), 'db_bot.json');
        fs.writeJsonSync(tmpFilePath, bot);
        process.env.DB_BOT_FILE = tmpFilePath;
        this.startReactApp(this.botUIPath)
            .then(() => {
            console.log("React app started successfully");
        })
            .catch((err) => {
            console.error(err);
        });
    }
}
exports.app = app;
