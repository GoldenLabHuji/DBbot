"use strict";
const { DBbot, app: appClass } = require("./DBbot");
const dbBot = new DBbot();
const app = new appClass("./BotUI");
module.exports = {
    dbBot,
    app,
};
