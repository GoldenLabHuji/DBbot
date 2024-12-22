import { DBbot, generateBotFile } from "../index";
import { AddCustomOperatorParams, NullMethod } from "../general/types";
import { StartsWithOperator } from "../classes/operator";

////////////////
// create bot //
////////////////
const dbBot = new DBbot();

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
    helpDescription:
        "This bot can help you filter Star Wars characters based on different attributes",
    mailInfo: "example@gmail.com",
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

const welcomeSecondMsg =
    "I can help to filter Star Wars characters based on different attributes";

welcomeMessages.push(welcomeSecondMsg);

// operator slot
const operatorMessages = [];

const operatorFirstMsg =
    "After you  have entered the operator, you need to enter values for the parameters of the operator";

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

heightColumn.fillNullValues(NullMethod.MEAN, nullValues);

dbBot.fillNullValuesAll({
    numericValue: null,
    stringValue: "",
    nullValue: nullValues,
});

dbBot.defineNullValues(["NA"]);
dbBot.setIsFilterIncludesNull(true);

/////////////////////////
// columns description //
/////////////////////////

// by column
dbBot.setColumnDescription("name", "Name of the character");

// by file
// dbBot.loadDescriptionFile("./demo/descriptionSw.csv");

///////////////////////
// default operators //
///////////////////////

// the useDefaultOperators attribute used to enable or disable the default operators
// the default value of this attribute is true
const eyeColorColumn = dbBot.getColumnByName("eye_color");
eyeColorColumn.useDefaultOperators = false;

// add specific operators
// DO NOT use addOperator for custom operators!
eyeColorColumn.addOperator(new StartsWithOperator());

/////////////////////
// custom operator //
/////////////////////

const startWithBOperator = {
    name: "startsWithBAndEndsWithX",
    customFunction: function (cell: string, value: string) {
        return cell.startsWith("B") && cell.endsWith(value);
    },
    dataType: "string",
    column: "name",
    params: [
        {
            name: "cell",
            dataType: "string",
            message: "Custom parameter message",
        },
        {
            name: "value",
            dataType: "string",
            message: "Enter the value you would like the words to end with:",
        },
    ],
    message: "Custom operator message",
} as AddCustomOperatorParams;

dbBot.addCustomOperator(startWithBOperator);

///////////////////////
// generate bot file //
///////////////////////

generateBotFile(dbBot);
