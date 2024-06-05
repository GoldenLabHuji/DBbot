import { dbBot, app } from "../index";

function addNum(a: number, b: number) {
    a + b;
}

function addStr(a: string, b: string) {
    a + b;
}

dbBot.addCustomOperator({
    name: "addNum",
    customFunction: addNum,
    dataType: "numeric",
    params: [
        {
            name: "a",
            dataType: "numeric",
        },
        {
            name: "b",
            dataType: "numeric",
        },
    ],
});
dbBot.addCustomOperator({
    name: "addStr",
    customFunction: addStr,
    dataType: "string",
    params: [
        {
            name: "a",
            dataType: "string",
        },
        {
            name: "b",
            dataType: "string",
        },
    ],
});


dbBot.loadFile("./sw_characters.csv");
app.runBot(dbBot);
