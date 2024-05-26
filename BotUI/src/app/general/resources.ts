import {
    Message,
    NumericAttribute,
    StringAttribute,
    NumericOperator,
    StringOperator,
    MessageSection,
    Bot,
} from "@/app/general/interfaces";
import { sender, typeOfQuestion } from "@/app/general/types";

export const botMessages = (bot: Bot): Message[] => {
    const headers = bot?.headers || [];
    if (!headers || headers.length === 0) return [];
    const headersArray = headers.map(
        (header, index) => `${index + 1}: ${header}`
    );
    const headersString = headersArray.join("\n");

    return [
        {
            id: 0,
            text: `Hello! I'm a ChatBot that will help you to get small pieces of data from a large dataset called ${
                bot?.name || "INSERT DATABASE NAME"
            }. 

${bot?.description || "INSERT DESCRIPTION OF THE DATABASE"}

Enter 1 to continue`,
            sender: "bot",
            typeOfQuestion: "intro",
            answerOptions: [1],
        },
        {
            id: 1,
            text: `My main purpose as a ChatBot is to help you get data based on specific properties of words.

${bot?.example || "INSERT EXAMPLE OF USE CASE"}

Enter 1 to continue`,
            sender: "bot",
            typeOfQuestion: "intro",
            answerOptions: [1],
        },
        {
            id: 2,
            text: `At the moment, I have the capacity of helping you extract data based on ${
                headers.length
            } word properties:
${headersString}
${
    headers.length + 1
}: Related words ( like words that start with the same characters as a chosen word or words that sound like a chosen word )

Which property would you like to start with?`,
            sender: "bot",
            typeOfQuestion: "parameter",
            answerOptions: Array.from(
                { length: headers.length + 1 },
                (_, index) => index + 1
            ),
        },
    ];
};
export const botNumericNotEqualMessages: Message[] = [
    {
        id: 0,
        text: `To help you get the words you desire, 
I need to know few things about your specific 
requirments to the property you have chosen above.

First I need to know if you want the words to be greater, lower or in a specific range.
Then I need to know the value of this property you want to start with.

Enter 1 to continue`,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    },
    {
        id: 1,
        text: `For example, if you chose the property "age of aquisition" and you want words that aquiered at the age of 5 or less, you will choose the "Lower" in the first question, and then the value 5 in the next question.

Enter 1 to continue`,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    },
    {
        id: 2,
        text: `Let's start with the first question.
        
Do you want the words to be greater, lower, or in a specific range?

1. Greater
2. Lower
3. Range`,
        sender: "bot",
        typeOfQuestion: "operator",
        answerOptions: [1, 2, 3],
    },
];

export const botNumericEqualMessages = (bot: Bot): Message[] => {
    const numericOperators = bot.operatorsData.numeric;

    const optionsArray =
        (numericOperators &&
            numericOperators.map(
                (operator, index) => `${index + 1}: ${operator.name}`
            )) ??
        [];
    const optionsString = optionsArray.join("\n") ?? "";

    return [
        {
            id: 0,
            text: `Choose operator:

${optionsString}
`,
            sender: "bot",
            typeOfQuestion: "operator",
            answerOptions: Array.from(
                { length: numericOperators.length + 1 },
                (_, index) => index + 1
            ),
        },
    ];
};
export const botOperatorMessages: Message[] = [
    {
        id: 0,
        text: `Enter starting value:`,
        sender: "bot",
        typeOfQuestion: "value",
    },
    {
        id: 1,
        text: `Do you want to add more parameter?
1. Yes
2. No`,
        sender: "bot",
        typeOfQuestion: "add",
        answerOptions: [1, 2],
    },
];

export const botRangeOperatorMessages: Message[] = [
    {
        id: 0,
        text: `Now I need to know the range of values you want to start with.
First I need to know the lower value of the range, then the higher value of the range.
Enter 1 to continue`,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    },
    {
        id: 1,
        text: "What would you like the <b>lower</b> value of this range to be?",
        sender: "bot",
        typeOfQuestion: "value",
    },
    {
        id: 1,
        text: "What would you like the <b>higher</b> value of this range to be?",
        sender: "bot",
        typeOfQuestion: "value",
    },
    {
        id: 1,
        text: `Do you want to add more parameter?
1. Yes
2. No`,
        sender: "bot",
        typeOfQuestion: "add",
        answerOptions: [1, 2],
    },
];

export const botStringMessages = (bot: Bot): Message[] => {
    const stringOperators = bot.operatorsData.string;

    const optionsArray =
        stringOperators.map(
            (operator, index) => `${index + 1}: ${operator.name}`
        ) ?? [];

    const optionsString = optionsArray.join("\n") ?? "";
    return [
        {
            id: 0,
            text: `Choose operator:

${optionsString}`,

            sender: "bot",
            typeOfQuestion: "operator",
            answerOptions: Array.from(
                { length: stringOperators.length + 1 },
                (_, index) => index + 1
            ),
        },
        {
            id: 1,
            text: `Enter starting value:`,
            sender: "bot",
            typeOfQuestion: "value",
        },
        {
            id: 2,
            text: `Do you want to add more parameter?

1. Yes
2. No`,
            sender: "bot",
            typeOfQuestion: "add",
            answerOptions: [1, 2],
        },
    ];
};

export const botAddParameterMessages: Message[] = [
    {
        id: 0,
        text: `To add another parameter, I will go through the same process as before.

Enter 1 to continue`,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    },
    {
        id: 1,
        text: `At the moment, I have the capacity of helping you extract data based on five word properties:

1: Age of Acquisition
2: Number of Phonemes
3: Number of Syllables
4: Related words ( like words that start with the same characters as a chosen word or words that sound like a chosen word )

Which property would you like to start with?`,
        sender: "bot",
        typeOfQuestion: "parameter",
        answerOptions: [1, 2, 3, 4],
    },
];

export const emptyNumericAttribute: NumericAttribute = {
    value: 0,
    operator: NumericOperator.Greater,
};

export const emptyStringAttribute: StringAttribute = {
    value: "",
    operator: StringOperator.StartWith,
};

export const resultMsg = {
    id: 0,
    text: `Here is the results of your query. 
You can download the results as a csv file`,
    sender: "bot" as sender,
    typeOfQuestion: "result" as typeOfQuestion,
};

export const defaultMsgSection = [
    {
        id: 0,
        messageSection: [] as Message[],
    },
] as MessageSection[];
