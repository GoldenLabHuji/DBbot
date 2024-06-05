import { dbBot, app } from "../index";

function startWithB(startingValue: string) {
    return startingValue.toLowerCase().startsWith("b");
}

function endWithR(startingValue: string) {
    return startingValue.toLowerCase().endsWith("r");
}

dbBot.addCustomOperator({
    name: "startWithB",
    customFunction: startWithB,
    dataType: "string",
    params: [
        {
            name: "startingValue",
            dataType: "string",
        },
    ],
});

dbBot.addCustomOperator({
    name: "endWithR",
    customFunction: endWithR,
    dataType: "string",
    params: [
        {
            name: "startingValue",
            dataType: "string",
        },
    ],
});

dbBot.loadFile("./demo.csv");
app.runBot(dbBot);
