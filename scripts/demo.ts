import { dbBot, app } from "../index";
import { AddCustomOperatorParams } from "../DBbot/general/types";

const startWithBOperator = {
    name: "startWithB",
    customFunction: function startWithB(inputValue: string) {
        return inputValue.toLowerCase().startsWith("b");
    },
    dataType: "string",
    params: [
        {
            name: "InputValue",
            dataType: "string",
        },
    ],
};

dbBot.addCustomOperator(startWithBOperator as AddCustomOperatorParams);

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

dbBot.loadFile("./demo.csv");

app.runBot(dbBot);
