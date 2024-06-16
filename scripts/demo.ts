import { dbBot, app } from "../index";
import { AddCustomOperatorParams } from "../DBbot/general/types";

const details = {
    name: "Star Wars Characters",
    description: "A database of Star Wars characters",
    example:
        "Get all characters that start with 'B' and end with 'X' with a custom operator",
    operatorsMessage: "Choose start wars operator",
};

dbBot.setDetails(details);

const startWithBAndEndWithXOperator = {
    name: "startWithBAndEndWithX",
    customFunction: function (inputValue: string, endChar: string) {
        return (
            inputValue.toLowerCase().startsWith("b") &&
            inputValue.toLowerCase().endsWith(endChar)
        );
    },
    dataType: "string",
    message:
        "This operator Check if the input value starts with 'B' and ends with the given character",
    params: [
        {
            name: "InputValue",
            dataType: "string",
        },
        {
            name: "endChar",
            dataType: "string",
            message: "Enter the character to end with:",
        },
    ],
};

dbBot.addCustomOperator(
    startWithBAndEndWithXOperator as AddCustomOperatorParams
);

dbBot.loadFile("./sw_characters.csv");

app.runBot(dbBot);
