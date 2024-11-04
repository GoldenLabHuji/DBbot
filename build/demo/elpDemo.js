"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const dbBot = new index_1.DBbot();
dbBot.botColor = "blue";
dbBot.userColor = "orange";
const details = {
    name: "ELP Bot",
    description: "Bot of ELP",
};
dbBot.details = details;
const slots = {
    welcomeSlot: ["Welcome to the ELP Bot!", "I can help you to filter ELP items based on different attributes"],
    operatorSlot: ["After you have entered the attribute, you need to choose an operator to filter the items"],
    paramsSlot: ["After you have entered the operator, you need to enter values for the parameters of the operator"],
};
dbBot.slots = slots;
const messages = {
    attributeMessage: "Please choose an attribute",
    operatorMessage: "Please choose an operator",
} -
;
;
dbBot.customMessages = messages;
dbBot.loadFile("./items.csv");
dbBot.loadDescriptionFile("./descriptionElp.csv");
const startWithBOperator = {
    name: "startsWithB",
    customFunction: function (cell) {
        return cell.startsWith("B");
    },
    dataType: "string",
    column: "Word",
    params: [
        {
            name: "cell",
            dataType: "string",
            message: "",
        },
    ],
    message: "",
};
dbBot.addCustomOperator(startWithBOperator);
(0, index_1.generateBotFile)(dbBot);
