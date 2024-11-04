import { DBbot } from "../classes/DBbot";
import {
    BotDetails,
    BotMessages,
    CustomMessages,
    MessagesSlot,
} from "../general/types";

jest.mock("fs");
jest.mock("path");
jest.mock("csv-parse/sync");

describe("DBbot messages tests", () => {
    let dbBot: DBbot;

    beforeEach(() => {
        dbBot = new DBbot();
    });

    test("should initialize with default messages", () => {
        const expectedMessages: BotMessages = {
            customMessages: {
                attributeMessage:
                    "This is a message to ask for an attribute of the database to start the query. Here is the list of the attributes:",
                operatorMessage:
                    "This is the list of operators to choose from:",
                errorMessage: "I don't understand, please enter a valid option",
                continueMessage: "Enter 1 to continue",
                resultMessage: `Here is the results of your query. 
You can download the results as a csv file`,
            },
            slots: {
                welcomeSlot: [
                    "Welcome message",
                    "Description message",
                    "Example message",
                ],
                operatorSlot: [],
                paramsSlot: [],
                restartSlot: [],
                resultSlot: [],
            },
        };

        expect(dbBot.messages).toEqual(expectedMessages);
    });

    test("should set custom messages", () => {
        const customMessages: CustomMessages = {
            attributeMessage: "New attribute message",
            operatorMessage: "New operator message",
            errorMessage: "New error message",
            continueMessage: "New continue message",
            resultMessage: "New result message",
        };

        dbBot.customMessages = customMessages;

        expect(dbBot.messages.customMessages).toEqual(customMessages);
    });

    test("should set slots messages", () => {
        const slotsMessages: MessagesSlot = {
            welcomeSlot: ["New welcome message"],
            operatorSlot: ["New operator message"],
            paramsSlot: ["New params message"],
            restartSlot: ["New restart message"],
            resultSlot: ["New result message"],
        };

        dbBot.slots = slotsMessages;

        expect(dbBot.messages.slots).toEqual(slotsMessages);
    });

    test("should get and set details", () => {
        const details: BotDetails = {
            name: "Test Bot",
            helpDescription: "A test bot description",
        };

        dbBot.details = details;

        expect(dbBot.details.name).toBe("Test Bot");
        expect(dbBot.details.helpDescription).toBe("A test bot description");
    });
});
