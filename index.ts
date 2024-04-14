const { exec } = require("child_process");
const { dbBot } = require("./DBbot");


process.env.DB_BOT = JSON.stringify(new dbBot());

