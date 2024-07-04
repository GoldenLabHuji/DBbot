import { Message, MessageSection, Bot } from "@/app/general/interfaces";
import { sender, typeOfQuestion } from "@/app/general/types";
import { convertTextToMessage } from "@/app/general/utils";

export const botMessages = (bot: Bot): Message[] => {
    const headers = bot?._data.headers || [];
    if (!headers || headers.length === 0) return [];
    const headersArray = headers.map(
        (header, index) => `${index + 1}: ${header}`
    );
    const headersString = headersArray.join("\n");

    const welcomeMessages = bot?._messages?.slots.welcomeSlot ?? [];
    const welcomeMessagesArray = welcomeMessages.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );

    return [
        ...welcomeMessagesArray,
        {
            id: welcomeMessagesArray.length,
            text: `${bot?._messages.customMessages.attributeMessage}
            
${headersString}

Which property would you like to start with?`,
            sender: "bot",
            typeOfQuestion: "parameter",
            answerOptions: Array.from(
                { length: headers.length },
                (_, index) => index + 1
            ),
        },
    ];
};

export const botOperatorMessages = (
    bot: Bot,
    currentParam: string
): Message[] => {
    const operators = bot?._data.columns.filter(
        (col) => col.id === currentParam
    )[0]?.operatorsArray;

    console.log("operators", operators);
    const optionsArray = operators.map(
        (operator, index) => `${index + 1}: ${operator.displayName}`
    );
    const optionsString = optionsArray.join("\n");

    const chosenOperator = operators[bot.currentOperatorIndex];

    const operatorMessage: Message = {
        id: 0,
        text: `${chosenOperator?.message}
            
${bot?._messages.customMessages.continueMessage}`,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    };

    const operatorSlot = bot?._messages?.slots.operatorSlot ?? [];
    const operatorSlotArray = operatorSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );

    const displayMessage: Message[] = [
        ...operatorSlotArray,
        {
            id: 0,
            text: `${bot?._messages?.customMessages.operatorMessage}

${optionsString}
`,
            sender: "bot",
            typeOfQuestion: "operator",
            answerOptions: Array.from(
                { length: operators.length },
                (_, index) => index + 1
            ),
        },
    ];

    if (chosenOperator.message) {
        displayMessage.push(operatorMessage);
    }

    return displayMessage;
};

export const botFunctionParamsMessages = (
    bot: Bot,
    currentParam: string
): Message[] => {
    const operators = bot?._data.columns.filter(
        (col) => col.id === currentParam
    )[0]?.operatorsArray;

    const chosenOperator = operators[bot.currentOperatorIndex];
    const params = chosenOperator.params;
    console.log("params", params);

    const messages: Message[] = params.map((prm, index) => {
        return {
            id: index,
            text: prm?.message ?? `Enter value for parameter ${prm?.name}:`,
            sender: "bot",
            typeOfQuestion: "functionParams",
        };
    });
    const messageWithoutFirst = messages.slice(1);

    if (messageWithoutFirst.length === 0) return [emptyMessage];

    messageWithoutFirst.push(...botAddMessages);

    const paramsSlot = bot?._messages?.slots.paramsSlot ?? [];
    const paramsSlotArray = paramsSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );
    messageWithoutFirst.unshift(...paramsSlotArray);

    return messageWithoutFirst;
};

export const botAddMessages: Message[] = [
    {
        id: 0,
        text: `Do you want to add another parameter?
    
    1. Yes
    2. No`,
        sender: "bot",
        typeOfQuestion: "add",
        answerOptions: [1, 2],
    },
];

export const botRestartMessages = (bot: Bot): Message[] => {
    const startMsg = botMessages(bot).slice(-1)[0];
    const restartSlot = bot?._messages?.slots.restartSlot ?? [];
    const restartSlotArray = restartSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );
    return [
        ...restartSlotArray,
        {
            id: 0,
            text: `To add another parameter, I will go through the same process as before.

${bot?._messages.customMessages.continueMessage}`,
            sender: "bot",
            typeOfQuestion: "intro",
            answerOptions: [1],
        },
        startMsg,
    ];
};

export const resultMsg = (bot: Bot): Message[] => {
    const resultSlot = bot?._messages?.slots.resultSlot ?? [];
    const resultSlotArray = resultSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );
    return [
        ...resultSlotArray,
        {
            id: 0,
            text: bot?._messages?.customMessages.resultMessage,
            sender: "bot" as sender,
            typeOfQuestion: "result" as typeOfQuestion,
        },
    ];
};

export const defaultMsgSection = [
    {
        id: 0,
        messageSection: [] as Message[],
    },
] as MessageSection[];

export const emptyMessage: Message = {
    id: 0,
    text: "empty message",
    sender: "bot",
    typeOfQuestion: "functionParams",
};
