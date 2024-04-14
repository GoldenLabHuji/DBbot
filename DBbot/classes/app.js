"use strict";
exports.__esModule = true;
exports.app = void 0;
var exec = require("child_process").exec;
var app = /** @class */ (function () {
    function app(botUIPath) {
        this.botUIPath = botUIPath;
    }
    app.prototype.startReactApp = function (path) {
        return new Promise(function (resolve, reject) {
            var reactAppProcess = exec("npm run dev", { cwd: path });
            reactAppProcess.stdout.on("data", function (data) {
                console.log("React App: ".concat(data));
                if (data.includes("Compiled successfully")) {
                    resolve();
                }
            });
            reactAppProcess.stderr.on("data", function (data) {
                console.error("React App Error: ".concat(data));
                reject();
            });
            reactAppProcess.on("close", function (code) {
                console.log("React App process exited with code ".concat(code));
            });
        });
    };
    app.prototype.runBot = function (bot) {
        process.env.DB_BOT = JSON.stringify(bot);
        this.startReactApp(this.botUIPath)
            .then(function () {
            console.log("React app started successfully");
        })["catch"](function () {
            console.error("Failed to start React app");
        });
    };
    return app;
}());
exports.app = app;
