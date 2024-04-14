var _a = require("./DBbot"), DBbot = _a.DBbot, appClass = _a.app;
var dbBot = new DBbot();
var app = new appClass("./BotUI");
dbBot.loadFile("./data.csv");
app.runBot(dbBot);
module.exports = {
    dbBot: dbBot,
    app: app
};
