const { DBbot, app: appClass } = require("./DBbot");
const path = require("path");

const dbBot = new DBbot();
const reactPath = path.resolve(__dirname, "./BotUI");
const app = new appClass(reactPath);

module.exports = {
    dbBot,
    app,
};
