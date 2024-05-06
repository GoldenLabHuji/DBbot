"use strict";
const { DBbot, app: appClass } = require("./DBbot");
const dbBot = new DBbot();
const app = new appClass("./BotUI");
dbBot.loadFile("./data.csv");
app.runBot(dbBot);
module.exports = {
    dbBot,
    app,
};
