import { dbBot, app } from "../index";
import { AddCustomOperatorParams } from "../DBbot/general/types";

/////////////////
// set details //
/////////////////

const details = {
    name: "Demo database name",
    description: "Demo database description",
};

dbBot.details = details;

/////////////////////////
// set custom messages //
/////////////////////////

const messages = {
    attributeMessage: "Demo messages for attributes",
    operatorMessage: "Demo message for operators",
    errorMessage: "Demo error message",
    resultMessage: "Demo result message",
};

dbBot.customMessages = messages;

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

dbBot.slots = slots;

///////////////////
// load csv file //
///////////////////

dbBot.loadFile("./sw_characters.csv");

/////////////////////////
// null values in rows //
/////////////////////////

const nullValues = [null, "NA", NaN];

const heightColumn = dbBot.getColumnByName("height");

heightColumn.fillNullValues("mean", nullValues);

dbBot.fillNullValuesAll({
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

dbBot.changeColumnDisplayName("name", "newName");

/////////////////////
// custom operator //
/////////////////////

const startWithBOperator = {
    name: "startsWithB",
    customFunction: function (cell: string) {
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
} as AddCustomOperatorParams;

dbBot.addCustomOperator(startWithBOperator);

////////////////
//  run bot   //
////////////////

app.runBot(dbBot);
