# DBbot

DBbot is an npm package that allows researchers to create a bot based on a CSV file. The bot can query and filter the data of the CSV file, making it easy to interact with and manipulate large datasets.


# Table of contents
- [Features](#features)
- [Description of the chat](#description-of-the-chat)
- [Installation](#installation)
- [Usage](#usage)
   - [Operators](#operators)
   - [Custom operators](#custom-operators)
   - [Handling null values](#handling-null-values)
   - [Display name of an attribute](#display-name-of-an-attribute)
   - [Messages](#messages)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)


# Features

- Easy to use and integrate
- Query and filter data from a CSV file
- Flexible and customizable
- Supports various data operations

# Description of the chat

This is a description of what the **user** will see

First, the bot will provide the user an explaintion about the database (CSV file).
Second, the bot will display the user a list of the columns of the database, and the user can choose from it which column he/she would like to query.

After the user has chosen the attribute (column) the bot will display a list of operators of the chosen column. Each column has it's own operators.
The operators are used for query the data. 
For example, if the user chose a "name" attribute and he/she want to query only the names that starts with the letter "S", he/she can choose the "StartWith" operator to achive that.
Some operators require input of parameters. The bot will ask the user for it as well.

Once the operator has been chosen and given all his parameters, the bot will prompt the user if he/she would like to add another attribute to the query.
If the user chooses "No", the bot will fetch the data from the database and provide the user a CSV file to download with the results.
If the user chooses "Yes", the whole proccess will start over.


# Installation

## Node.js
First, node.js should be installed on your machine. If you don't know how to install it, you can look at this [guide](https://thiraphat-ps-dev.medium.com/installing-node-js-a-comprehensive-guide-for-beginners-3ac322fd17f0) 

## Start a new project
Open your code editor, and create new folder *my-new-project*.

Open the integrated terminal of your code editor, and navigate to your new project:

```bash
cd my-new-project
```

Then init a new node.js project with the command:

```bash
npm init
```

## Install DBbot pakcage

You can install DBbot using npm:

```bash
npm install dbbot
```

And that's it! You are now ready to use DBbot.

# Usage

## Basic Example
Here is a basic example of how to use DBbot:

```javascript
import { dbBot, app } from "dbbot";

// Initialize the bot with a CSV file
dbBot.loadFile("./example.csv");

// Run the bot
app.runBot(dbBot);
```

## Operators
By default the bot has 6 operators to query data from the csv columns:
- Numeric
   - Equal
   - Less
   - Greater
   - Range
- String
   - SoundLike
   - StartWith

Attributes with string values will have the string operators, and attributes with numeric values will have the numeric operators.

## Custom operators

When building the bot, the developer can add custom operators to specific attributes.
A custom operator must have the following:
* name: The name of the operator
* function: The function to execute for the query of the data. Read more below about the requirments of the function.
* dataType: The type of the values the operator can work with. - can only be "string" or "numeric"
* column: The name of the attribute (column) the operator will be assign to.
* params: The parameters of the function. Each parameter must have a name and a dataType.

#### The function
The function of the operator must always have a parameter called "cell" and a return value of type boolean.
The cell parameter must always be the first one.
For example:

```javascript
// The function has a parameter called "cell" which can be of type string or number
function startsWithB(cell: string) {
   return cell.startsWith("B"); / return value of type boolean
}
```

#### Example of custom operator
```javascript
const startWithBOperator = {
    name: "startsWithB",
    customFunction: function (cell: string) {
        return cell.startsWith("B");
    },
    dataType: "string",
    column: "name",
    params: [
        {
            name: "cell",
            dataType: "string",
        },
    ],
}

dbBot.addCustomOperator(startWithBOperator); // add the operator to the bot

```

To add the operator to the bot, The addCustomOperator must be called with the operator as a parameter.

## Handling null values
In many databaes there are missing values in some attributes. DBbot gives the researcher the option to decide how to treat those values.

The are some default value the researcher can change the null values to:
- mean:  The mean on the not-null values of the attribute. Only for numeric attributes.
- median: The median on the not-null values of the attribute. Only for numeric attributes.
- mode: The mode on the not-null values of the attribute. Only for numeric attributes.
- remove: Remove the cells with null values.
- custom: A custom value.

### Example:

```javascript
// Define which values are treated as null values
const nullValues = [null, "NA", NaN];

// Get the attribute
const heightColumn = dbBot.getColumnByName("height");

// Fill the null values with the mean of the attribute
heightColumn.fillNullValues("mean", nullValues);

// Fill the null values with a custom value - 5
heightColumn.fillNullValues("custom", nullValues, 5);
```

Another option is to fill all null values of all columns at the same time and with the same value (one for string attributes and one for numeric attributes)

### Example:

```javascript

// Define which values are treated as null values
const nullValues = [null, "NA", NaN];

// Fill all null values
dbBot.fillNullValuesAll({
    numericValue: -1,
    stringValue: "FILL",
    nullValue: nullValues,
});

```

## Display name of an attribute

The name of each attribute can be changed:
```javascript
// Change a display name of "name" attribute to "newName"
dbBot.changeColumnDisplayName("name", "newName");

// If the new name already exists in another attribute then the function will throw an error

```

The user will see the new name in the chat bot, and the `dbBot.getColumnByName()` method will be affected as well.

**NOTE**: The `dbBot.getColumnById()` will *not* be affected by changes in the display name of the attribute. 
The id property of a column is a read only property, and can not be changed once the csv file get load.

## Messages

All the messages of the chat bot can be changed.

There are two types of messages:
- Fixed in time messages
- Slots messgaes

The fixed in time messages has a fixed position in the chat, and only the text can be changed.
The slots messages are messages that can be placed between the fixed in time messages, and the researcher can insert as many as he/she wants.

- The fixed in time messages
   - attributeMessage: In this message the user will see the list of attributes to choose from.
     The custom message is the text before the list.
   - operatorMessage: Same as the attributeMessage, but with the operators list
   - errorMessage: An error message in the chat, when the user enters invalid input.
   - continueMessage: A message to confirm an continue the conversion, e.g. "Press 1 to continue"
   - resultMessage: This message will be displayed to the user when the result of the query are ready.
- The slots messages:
   - welcomeSlot: Messages in this slots will be displayed at the begining of the chat.
   - operatorSlot: Message in this slots will be displayed after the fix in time operatorMessage message.
   - paramsSlot: Message in this slots will be displayed after the the messages of the params of the operator.
   - restartSlot: Message in this slots will be displayed after the query has been chosen.
     This slots is meant to ask the user if he/she wants to add another attribute to the query.
   - resultSlot: Message in this slots will be displayed *before* the fix in time resultMessage message.

  ### Example of fixed in time messages:

  ```javascript
   const messages = {
    attributeMessage: "Demo messages for attributes",
    operatorMessage: "Demo message for operators",
    errorMessage: "Demo error message",
    resultMessage: "Demo result message",
  };

  dbBot.customMessages = messages;
  ```
  ### Example of slots messages:
  
   ```javascript
   // welcome slot
   const welcomeMessages = [];
   
   const welcomeFirstMsg = "Demo welcome slot first message";
   
   welcomeMessages.push(welcomeFirstMsg);
   
   const welcomeSecondMsg = "Demo welcome slot second message";
   
   welcomeMessages.push(welcomeSecondMsg);
   
   // operator slot
   const operatorMessages = [];
   
   const operatorFirstMsg = "Demo operator slot first message";
   
   operatorMessages.push(operatorFirstMsg);
   
   const operatorSecondMsg = "Demo operator slot second message";
   
   operatorMessages.push(operatorSecondMsg);
   
   const slots = {
       welcomeSlot: welcomeMessages,
       operatorSlot: operatorMessages,
   };
   
   dbBot.slots = slots;
   ```


# API

## dbBot
The instance of the main bot class.

### Properties

#### data

returns the data of the bot includes:

**type**: BotData

**BotData**
* headers: string[] - array of the headers of the csv file
* columns: Column[] - array of columns of the csv file
* customOperators: CustomOperator[] - array of the custom oprators defined by the researcher

---

#### messages

returns the messages of the bot, both fixed in time and slots.

**type**: BotMessages

**BotMessages**
* customMessages: CustomMessages - the fixed in time messages
* slots: MessagesSlot - the slots messages

---

### Methods

#### getColumnByName()
returns the column find by display name. If non exist, throw an error

**return type**: Column

**params**: 
* name: string - the name of the column to find

---

#### getColumnById()
same as *getColumnByName* just by id

**return type**: Column

**params**: 
* id: string - the id of the column to find

---

#### changeColumnDisplayName()
change the display name of a column

**return type**: void

**params**: 
* name: string - the name of the column to change
* newName: string - the new name of the column to change to.

---

#### addCustomOperator()
add custom operator

**return type**: void

**params**: 
* params: AddCustomOperatorParams - object of params to add for the custom operator.
  
  **AddCustomOperatorParams:**
  * name: string - the name of the operator
  * customFunction: Function - the function of the operator
  * column: string - the name of the column to assign the operator to
  * message(optional): string - the message to display to the user after choosing this operator
  * params: Params[] - array of the parameters of the operator function
    
    **Params:**
    * name: string - the name of the parameter
    * dataType: DataType - the data type of the parameter, *string* or *numeric*
    * message(optional) - the message to display to the user before asking for input for this parameter
      
---

#### loadFile()

loads the csv file to the bot

**return type**: void

**params**:
* path: string - the path to the csv file

---

#### fillNullValuesAll()

fill all the defind null values in the in the attributes to a specific value (one for numeric attributes and one for the string attributes)

**return type**: void

**params**:
* params: fillNullValuesParams - the values to fiil
  
  **fillNullValuesParams**
   * numericValue(optional): number - the numeric value to fill
   * stringValue(optional): string - the string value to fill
   * nullValue: any[] - an array of what values are considered null
---

## app

### Methods

#### runBot

run the bot

**return type**: void

**params**:
* bot: DBbot - the instance of the bot

---

## Column

### Properties

#### id
returns the id of the column. readonly property

**type**: string

---

### Methods

#### getColumnData()

return the data of the column

**return type**: ColumnData

**ColumnData**
* id: string - the id of the column
* rows: any[] - the rows of the column
* dataType: DataType - the data type of the column. *numeric* or *string*
* displayName: string - the display name of the column
* operators: Operator[] - the operators of the column

---

#### mean()
 *NOTE: only for numeric columns*

 returns the mean of the column

**return type**: number

---

#### mode()
 *NOTE: only for numeric columns*

 returns the mode of the column

**return type**: number

---

#### median()
 *NOTE: only for numeric columns*

 returns the median of the column

**return type**: number

---

#### fillNullValues()

fill the defined null values of the column with a specific values

**return type**: void

**params**:
* method: nullMethod - the method for the function to use. options: mean, median, mode, remove and custom
* nullValue: any[] - an array of what values are considered null
* customValue(optional): NumOrStr - if the "custom" method has been chosen, the custom value to change to.

---

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License
This project is licensed under the MIT License.

# Acknowledgements
Special thanks to all the contributors and the open-source community.

