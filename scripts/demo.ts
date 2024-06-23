import { dbBot, app } from "../index";
import { AddCustomOperatorParams } from "../DBbot/general/types";

const startWithBAndEndWithXOperator = {
    name: "startWithBAndEndWithX",
    customFunction: function (inputValue: string, endChar: string) {
        return inputValue.toLowerCase().startsWith("b") && inputValue.toLowerCase().endsWith(endChar);
    },
    dataType: "string",
    params: [
        {
            name: "InputValue",
            dataType: "string",
        },
        {
            name: "endChar",
            dataType: "string",
        },
    ],
};

dbBot.addCustomOperator(startWithBAndEndWithXOperator as AddCustomOperatorParams);

const endWithROperator = {
    name: "endWithR",
    customFunction: function (inputValue: string) {
        return inputValue.toLowerCase().endsWith("r");
    },
    dataType: "string",
    params: [
        {
            name: "inputValue",
            dataType: "string",
        },
    ],
};

dbBot.addCustomOperator(endWithROperator as AddCustomOperatorParams);

dbBot.loadFile("./sw_characters.csv");

app.runBot(dbBot);
