import { DBbot } from "./classes/DBbot";
import { app as appClass } from "./classes/app";

const dbBot = new DBbot();
const app = new appClass();

module.exports = {
    dbBot,
    app,
};
