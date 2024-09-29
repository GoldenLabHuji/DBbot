"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
////////////////
// create bot //
////////////////
const dbBot = new index_1.DBbot();
////////////////
// set colors //
////////////////
dbBot.botColor = "green";
dbBot.userColor = "blue";
/////////////////
// set details //
/////////////////
const details = {
    name: "Star Wars Characters Bot",
    description: "Bot to get details of Star Wars characters",
};
dbBot.details = details;
/////////////////////////
// set custom messages //
/////////////////////////
const messages = {
    attributeMessage: "Please choose an attribute to filter the characters",
    operatorMessage: "Please choose an operator for filtering the attribute",
    errorMessage: "Sorry, I didn't get that. Please try again",
    resultMessage: "Here is your result. May the force be with you!",
};
dbBot.customMessages = messages;
///////////////
// set slots //
///////////////
// welcome slot
const welcomeMessages = [];
const welcomeFirstMsg = "Welcome to Star Wars Characters Bot!";
welcomeMessages.push(welcomeFirstMsg);
const welcomeSecondMsg = "I can help to filter Star Wars characters based on different attributes";
welcomeMessages.push(welcomeSecondMsg);
// operator slot
const operatorMessages = [];
const operatorFirstMsg = "After you  have entered the operator, you need to enter values for the parameters of the operator";
operatorMessages.push(operatorFirstMsg);
const slots = {
    welcomeSlot: welcomeMessages,
    operatorSlot: operatorMessages,
};
dbBot.slots = slots;
///////////////////
// load csv file //
///////////////////
dbBot.loadFile("./sw_characters.csv");
//////////////////////////////
// convert column to factor //
//////////////////////////////
dbBot.convertColumnsToFactor(["gender"]); // can enter multiple columns
/////////////////////////
// null values in rows //
/////////////////////////
const nullValues = [null, "NA", NaN];
const heightColumn = dbBot.getColumnByName("height");
heightColumn.fillNullValues("mean", nullValues);
dbBot.fillNullValuesAll({
    numericValue: null,
    stringValue: "",
    nullValue: nullValues,
});
/////////////////////
// custom operator //
/////////////////////
const startWithBOperator = {
    name: "startsWithB",
    customFunction: function (cell) {
        return cell.startsWith("B");
    },
    dataType: "string",
    column: "name",
    params: [
        {
            name: "cell",
            dataType: "string",
            message: "Custom parameter message",
        },
    ],
    message: "Custom operator message",
};
dbBot.addCustomOperator(startWithBOperator);
///////////////////////
// generate bot file //
///////////////////////
(0, index_1.generateBotFile)(dbBot);
