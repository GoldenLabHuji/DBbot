import { dbBot, app } from "../index";
import { AddCustomOperatorParams } from "../DBbot/general/types";

const details = {
    name: "SW Database",
    description: "A database of Star Wars characters",
};

const messages = {
    welcomeMessage:
        "Welcome to the Star Wars Characters bot! this bot will help you query the Star Wars Characters database",
    attributeMessage:
        "Here is a list of attributes you can query from the Star Wars Characters database:",
    descriptionMessage:
        "The Star Wars Characters database contains information about characters from the Star Wars universe",
    exampleMessage: `For example, search for names of characters that start with a specific letter
by choosing the 'name' attribute, and then choosing the 'startWith' operator`,
    operatorMessage: "Choose an operator:",
    errorMessage: "Try again, I didn't get that",
};

dbBot.details = details;
dbBot.messages = messages;

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
