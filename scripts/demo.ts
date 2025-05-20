import { DBbot, App } from "../index";
import { AddCustomOperatorParams, NullMethod } from "../general/types";

////////////////
// create bot //
////////////////
const dbBot = new DBbot();
const app = new App();

////////////////
// set colors //
////////////////

dbBot.botColor = "green";
dbBot.userColor = "orange";

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

dbBot.loadFile("./demo.csv");

/////////////////////////
// null values in rows //
/////////////////////////

const nullValues = [null, "NA", NaN];

const heightColumn = dbBot.getColumnByName("col_3");

heightColumn.fillNullValues(NullMethod.MEAN, nullValues);

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

dbBot.changeColumnDisplayName("col_2", "col_2_new");

/////////////////////
// custom operator //
/////////////////////

const startWithBOperator = {
    name: "startsWithB",
    customFunction: function (cell: string) {
        return cell.startsWith("B");
    },
    dataType: "string",
    column: "col_2_new",
    params: [
        {
            name: "cell",
            dataType: "string",
        },
    ],
} as AddCustomOperatorParams;

dbBot.addCustomOperator(startWithBOperator);

///////////////////////
// generate bot file //
///////////////////////

app.deploy(dbBot);
