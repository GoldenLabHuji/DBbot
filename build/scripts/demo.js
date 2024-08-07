"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
/////////////////
// set details //
/////////////////
const details = {
    name: "Demo database name",
    description: "Demo database description",
};
index_1.dbBot.details = details;
/////////////////////////
// set custom messages //
/////////////////////////
const messages = {
    attributeMessage: "Demo messages for attributes",
    operatorMessage: "Demo message for operators",
    errorMessage: "Demo error message",
    resultMessage: "Demo result message",
};
index_1.dbBot.customMessages = messages;
///////////////
// set slots //
///////////////
// welcome slot
const welcomeMessages = [];
const welcomeFirstMsg = "Demo welcome slot first message";
welcomeMessages.push(welcomeFirstMsg);
const welcomeSecondMsg = "Demo welcome slot second message";
welcomeMessages.push(welcomeSecondMsg);
// operator slot
const operatorMessages = [];
const operatorFirstMsg = "Demo operator slot first message";
operatorMessages.push(operatorFirstMsg);
const operatorSecondMsg = "Demo operator slot second message";
operatorMessages.push(operatorSecondMsg);
const slots = {
    welcomeSlot: welcomeMessages,
    operatorSlot: operatorMessages,
};
index_1.dbBot.slots = slots;
///////////////////
// load csv file //
///////////////////
index_1.dbBot.loadFile("./sw_characters.csv");
/////////////////////////
// null values in rows //
/////////////////////////
const nullValues = [null, "NA", NaN];
const heightColumn = index_1.dbBot.getColumnByName("height");
heightColumn.fillNullValues("mean", nullValues);
index_1.dbBot.fillNullValuesAll({
    numericValue: -1,
    stringValue: "FILL",
    nullValue: nullValues,
});
////////////////////////
// custom column name //
////////////////////////
// try to change the name to an already existing column name
// dbBot.changeColumnDisplayName("name", "abilities"); // throw error
// change the name successfully
index_1.dbBot.changeColumnDisplayName("name", "newName");
/////////////////////
// custom operator //
/////////////////////
const startWithBOperator = {
    name: "startsWithB",
    customFunction: function (cell) {
        return cell.startsWith("B");
    },
    dataType: "string",
    column: "newName",
    params: [
        {
            name: "cell",
            dataType: "string",
        },
    ],
};
index_1.dbBot.addCustomOperator(startWithBOperator);
////////////////
//  run bot   //
////////////////
index_1.app.runBot(index_1.dbBot);
