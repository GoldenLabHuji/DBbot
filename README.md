# DBbot

DBbot is an npm package that allows researchers to create a bot based on a CSV file. The bot can query and filter the data of the CSV file, making it easy to interact with and manipulate large datasets.

# Table of contents

-   [Features](#features)
-   [Description of the chat](#description-of-the-chat)
-   [Installation](#installation)
-   [Usage](#usage)
    -   [Operators](#operators)
    -   [Custom operators](#custom-operators)
    -   [Handling null values](#handling-null-values)
    -   [Display name of an attribute](#display-name-of-an-attribute)
    -   [Messages](#messages)
-   [API](#api)
-   [Contributing](#contributing)
-   [License](#license)
-   [Acknowledgements](#acknowledgements)

# Features

-   Easy to use and integrate
-   Query and filter data from a CSV file
-   Flexible and customizable
-   Supports various data operations

# Description of the chat

This is a description of what the **user** will see

First, the bot will provide the uaer an explaintion about the database (CSV file).
Second, the bot will display the user a list of the columns of the database, and the user can choose from it which column he/she would like to query.

After ther user has choose the attribute (column) the bot will display a list the of operators of the chosen column. Each column has it's own operators.
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

Open your code editor, and create new folder _my-new-project_.

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
npm install @gold-lab/dbbot # fix
```

And that's it! You are now ready to use DBbot.

# Usage

## Basic Example

Here is a basic example of how to use DBbot:

```javascript
import { DBbot, App } from "dbbot";

// Create bot and app instances
const dbBot = new DBbot();
const app = new App();

// Initialize the bot with a CSV file
dbBot.loadFile("./example.csv");

// Run the bot
app.deploy(dbBot);
```

## Terminology

- Attribute - a column of the data set
- Operator - a function used for filtering data from an attribute
- Developer - the programmer who write the code of the bot using dbbot npm package
- User - the user of the final product of the bot who only see the UI of the bot and not the code.

## Operators

By default the bot has 11 operators to query data from the csv columns:

-   Numeric
    -   Equal
    -   Less
    -   Greater
    -   Range
-   String
    -   SoundLike
    -   StartWith
    -   EndWith
    -   Contains
    -   Equal
-   Factor
    -   ChooseOne
    -   ChooseMultiple

Attributes with string values will have the string operators, and attributes with numeric values will have the numeric operators.
Factor operators behave differently. More about Factor Attributes/Operators in the Factor Section # fix

## Custom operators

When building the bot, the developer can add custom operators to specific attributes.
A custom operator must have the following:

-   name: The name of the operator
-   function: The function to execute for the query of the data. Read more below about the requirements of the function.
-   dataType: The type of the values the operator can work with. - can only be "string" or "numeric"
-   column: The name of the attribute (column) the operator will be assign to.
-   params: The parameters of the function. Each parameter must have a name and a dataType.

#### The function

The function of the operator must always have a parameter called "cell" and a return value of type boolean.
The cell parameter must always be the first one.
For example:

```javascript
// The function have a paraeter called "cell"  which can be of type string or number
function startsWithB(cell: string) {
   return cell.startsWith("B"); // return value of type boolean
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
};

dbBot.addCustomOperator(startWithBOperator); // add the operator to the bot
```

To add the operator to the bot, The addCustomOperator must be called with the operator as a parameter.

## Handling null values

In many databases there are missing values in some attributes. DBbot gives the developer the option to decide how to treat those values.

The are some default value the developer can change the null values to:

-   mean: The mean on the not-null values of the attribute. Only for numeric attributes.
-   median: The median on the not-null values of the attribute. Only for numeric attributes.
-   mode: The mode on the not-null values of the attribute. Only for numeric attributes.
-   remove: Remove the cells with null values.
-   custom: A custom value.

### Example:

```javascript
// Define what values treat as null values
const nullValues = [null, "NA", NaN];

// Get the attribute
const heightColumn = dbBot.getColumnByName("height");

// Fill the null values with the mean of the attribute
heightColumn.fillNullValues("mean", nullValues);

// Fill the null values with a custom value - 5
heightColumn.fillNullValues("custom", nullValues, 5);
```

Another option is to fill al null values of all columns at the same time and with the same value (one for string attributes and one for numeric attributes)

### Example:

```javascript
// Define what values treat as null values
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
// change a display name of "name" attribute to "newName"
dbBot.changeColumnDisplayName("name", "newName");

// If the new name is already exists in another attribute, it throw an error
```

The user will see the new name in the chat bot, and the `dbBot.getColumnByName()` method will be affected as well.

**NOTE**: The `dbBot.getColumnById()` will _not_ be affected by changes in the display name of the attribute.
The id property of a column is a read only property, and can not be changed once the csv file get load.

## Messages

All the messages of the chat bot can be changed.

There are two types of messages:

-   Fixed in time messages
-   Slots messgaes

The fixed in time messages has a fixed position in the chat, and only the text can be changed.
The slots messages are messages that can be placed between the fixed in time messages, and the researcher can insert as many as he/she wants.

-   The fixed in time messages
    -   attributeMessage: In this message the user will see the list of attributes to choose from.
        The custom message is the text before the list.
    -   operatorMessage: Same as the attributeMessage, but with the operators list
    -   errorMessage: An error message in the chat, when the user enters invalid input.
    -   continueMessage: A message to confirm an continue the conversion, e.g. "Press 1 to continue"
    -   resultMessage: This message will be displayed to the user when the result of the query are ready.
-   The slots messages:

    -   welcomeSlot: Messages in this slots will be displayed at the begining of the chat.
    -   operatorSlot: Message in this slots will be displayed after the fix in time operatorMessage message.
    -   paramsSlot: Message in this slots will be displayed after the the messages of the params of the operator.
    -   restartSlot: Message in this slots will be displayed after the query has been chosen.
        This slots meant to ask the user if he/she wants to add another attribute to the query.
    -   resultSlot: Message in this slots will be displayed _before_ the fix in time resultMessage message.

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

# DBbot Class

The `DBbot` class is .... # fix

---

## Properties

### `filePath: string`
- **Description**: Stores the file path of the currently loaded data.
- **Default**: `""`

### `_messages: BotMessages` - getter only
- **Description**: Contains predefined bot-related messages.
- **Default**: 
```javascript
{
    customMessages: {
        attributeMessage: undefined,
        operatorMessage: undefined,
        errorMessage: undefined,
        continueMessage: undefined,
        resultMessage: undefined,
    },
    slots: {
        welcomeSlot: [],
        operatorSlot: [],
        paramsSlot: [],
        restartSlot: [],
        resultSlot: [],
    }
}
```

### `customMessages: CustomMessages` - setter only
- **Description**: Contains predefined bot-related messages. # fix
- **Default**: 
```javascript
{
    attributeMessage: undefined,
    operatorMessage: undefined,
    errorMessage: undefined,
    continueMessage: undefined,
    resultMessage: undefined,
}
```
### `slots: MessagesSlot` - setter only
- **Description**: Contains predefined bot-related messages. # fix
- **Default**: 
```javascript
{
    welcomeSlot: [],
    operatorSlot: [],
    paramsSlot: [],
    restartSlot: [],
    resultSlot: [],
}
```

### `_details: BotDetails`
- **Description**: Stores configuration details specific to the bot.
- **Default**: 
```javascript
{
    name: "DBBot",
    helpDescription: "NO DESCRIPTION PROVIDED",
}
```

### `_data: BotData`
- **Description**: Core data structure containing headers, columns, and custom operators.
- **Default**:
```javascript
  {
      headers: [],
      columns: [],
      customOperators: this._customOperators,
  }
```

### `botColor: string`
- **Description**: Configurable color settings for bot interactions.
- **Default**: `"blue"`

### `userColor: string`
- **Description**: Configurable color settings for bot interactions.
- **Default**: `"purple"`


## Methods


## `defineNullValues(values: any[])`
- **Description**:
This method allows you to define an array of null values for the bot. It updates the `nullValues` property, which holds an array of values that are considered null.
- **Parameters**: 
    - `values`
        - **Type**: `any[]`
         - **Description**: An array of values that you wish to set as null values. The values in this array will replace the current `nullValues` array.
- **RType**: `void`
- **Returns**: nothing

## `setColumnDescription(column: string, description: string)`
- **Description**:
This method sets the description for a specified column. It updates the `description` property of the column object retrieved by its name.
- **Parameters**: 
    - `column`
        - **Type**: `string`
        - **Description**: The name of the column whose description is to be set.
    - `description`
        - **Type**: `string`
        - **Description**: The description to be set for the specified column.
- **RType**: `void`
- **Returns**: nothing

## `getNullValuesProperty()`
- **Description**:
This method retrieves the current `nullValues` property, which holds the array of values considered as null and the associated configuration.
- **Parameters**: 
    - None
- **RType**: `NullValues`
- **Returns**: The current `nullValues` property.

## `setIsFilterIncludesNull(value: boolean)`
- **Description**:
This method sets the `isFilterIncludesNull` property in the `nullValues` object. It also validates that the provided value is of type `boolean`, throwing a `TypeError` if the validation fails.
- **Parameters**: 
    - `value`
        - **Type**: `boolean`
        - **Description**: The boolean value to be set for the `isFilterIncludesNull` property.
- **RType**: `void`
- **Returns**: nothing

## `convertColumnsToFactor(columns: string[])`
- **Description**:
This method converts specified columns to the "factor" type. It retrieves the columns by name, invokes the `ConvertToFactor()` method on each column, and updates the column's data by deleting all existing rows and adding new rows from the corresponding data map. If a column has no data, an error message is logged.
- **Parameters**: 
    - `columns`
        - **Type**: `string[]`
        - **Description**: An array of column names to be converted to the "factor" type.
- **RType**: `void`
- **Returns**: nothing

## `getColumnByName(name: string)`
- **Description**:
This method retrieves a column by its `displayName` property. It internally calls the private method `getColumnByStringProperty` to find a column whose `displayName` matches the provided name, performing a case-insensitive comparison.
- **Parameters**: 
    - `name`
        - **Type**: `string`
        - **Description**: The name of the column (as the `displayName`) to be retrieved.
- **RType**: `Column`
- **Returns**: The `Column` object that matches the provided `displayName`. If no matching column is found, an error is thrown.

## `getColumnById(id: string)`
- **Description**:
This method retrieves a column by its `id` property. It internally calls the private method `getColumnByStringProperty` to find a column whose `id` matches the provided value, performing a case-insensitive comparison.
- **Parameters**: 
    - `id`
        - **Type**: `string`
        - **Description**: The ID of the column to be retrieved.
- **RType**: `Column`
- **Returns**: The `Column` object that matches the provided `id`. If no matching column is found, an error is thrown.

## `changeColumnDisplayName(name: string, newName: string)`
- **Description**:
This method changes the display name of a specified column. It first checks if a column with the new name already exists. If not, it updates the column's `displayName` and updates the corresponding header in the `_data.headers` array. If a column with the new name is found, an error is thrown.
- **Parameters**: 
    - `name`
        - **Type**: `string`
        - **Description**: The current display name of the column to be renamed.
    - `newName`
        - **Type**: `string`
        - **Description**: The new display name to be assigned to the column.
- **RType**: `void`
- **Returns**: nothing

## `addCustomOperator(params: types.AddCustomOperatorParams)`
- **Description**:
This method adds a custom operator by registering it and generating an import statement for any specified functions. It creates a file text containing the necessary import statements and the custom function, which is then added to the `operatorsFiles.functions` object under the operator's name.
- **Parameters**: 
    - `params`
        - **Type**: `types.AddCustomOperatorParams`
        - **Description**: An object containing parameters for adding a custom operator, including:
            - `name` (`string`): The name of the custom operator.
            - `customFunction` (`Function`): The custom function to be assigned to the operator.
            - `importFunctions` (`string[] | undefined`): An optional array of functions to be imported for use within the custom operator.
- **RType**: `void`
- **Returns**: nothing

## `loadDescriptionFile(path: string)`
- **Description**:
This method loads a description file from the specified path, parses it, and updates the `description` property of the corresponding columns. It reads the file synchronously, parses the data into records, and associates the description from the file with each column by matching the column name.
- **Parameters**: 
    - `path`
        - **Type**: `string`
        - **Description**: The file path of the description file to be loaded.
- **RType**: `void`
- **Returns**: nothing


## `loadFile(path: string)`
- **Description**:
This method loads and processes a file from the specified path. It reads the file data synchronously, parses the records, and updates the `_data.headers` and `dataMap` properties. It then adds columns to the `dataMap` and performs any additional automatic column assignments. If an error occurs during file reading or parsing, it is logged to the console.
- **Parameters**: 
    - `path`
        - **Type**: `string`
        - **Description**: The file path of the file to be loaded and processed.
- **RType**: `void`
- **Returns**: nothing

## `fillNullValuesAll({ numericValue, stringValue, nullValue }: types.fillNullValuesParams)`
- **Description**:
This method fills null values in all columns of the data. It loops through each column and assigns a value based on the column's data type. If the column is of type `NUMERIC`, it uses the `numericValue`; otherwise, it uses the `stringValue`. If no value is provided for either, the method does nothing for that column. It also allows specifying custom null values.
- **Parameters**: 
    - `numericValue`
        - **Type**: `any`
        - **Description**: The value to use for numeric columns when filling null values.
    - `stringValue`
        - **Type**: `any`
        - **Description**: The value to use for string columns when filling null values.
    - `nullValue`
        - **Type**: `any[]`
        - **Description**: An optional array of values representing the null values to be replaced. The default value is `[null]`.
- **RType**: `void`
- **Returns**: nothing

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

## app

### Methods

#### runBot

run the bot

**return type**: void

**params**:

-   bot: DBbot - the instance of the bot

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

-   id: string - the id of the column
-   rows: any[] - the rows of the column
-   dataType: DataType - the data type of the column. _numeric_ or _string_
-   displayName: string - the display name of the column
-   operators: Operator[] - the operators of the column

---

#### mean()

_NOTE: only for numeric columns_

returns the mean of the column

**return type**: number

---

#### mode()

_NOTE: only for numeric columns_

returns the mode of the column

**return type**: number

---

#### median()

_NOTE: only for numeric columns_

returns the median of the column

**return type**: number

---

#### fillNullValues()

fill the defined null values of the column with a specific values

**return type**: void

**params**:

-   method: nullMethod - the method for the function to use. options: mean, median, mode, remove and custom
-   nullValue: any[] - an array of what values are considered null
-   customValue(optional): NumOrStr - if the "custom" method has been chosen, the custom value to change to.

---

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License

This project is licensed under the MIT License.

# Acknowledgements

Special thanks to all the contributors and the open-source community.
