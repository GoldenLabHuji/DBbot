# DBbot

DBbot is an npm package that allows researchers to create a bot based on a CSV file. The bot can query and filter the data of the CSV file, making it easy to interact with and manipulate large datasets.

## Features

- Easy to use and integrate
- Query and filter data from a CSV file
- Flexible and customizable
- Supports various data operations

## Description of the ChatBot (what the user will see)

First, the bot will provide the uaer an explaintion about the database (CSV file).
Second, the bot will display the user a list of the columns of the database, and the user can choose from it which column he/she would like to query.

After ther user has choose the attribute (column) the bot will display a list the  of operators of the chosen column. Each column has it's own operators.
The operators are used for query the data. 
For example, if the user chose a "name" attribute and he/she want to query only the names that starts with the letter "S", he/she can choose the "StartWith" operator to achive that.
Some operators require input of parameters. The bot will ask the user for it as well.

Once the operator has been chosen and given all his parameters, the bot will prompt the user if he/she would like to add another attribute to the query.
If the user chooses "No", the bot will fetch the data from the database and provide the user a CSV file to download with the results.
If the user chooses "Yes", the whole proccess will start over.


## Installation

You can install DBbot using npm:

```bash
npm install dbbot
```

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
* numeric
 - Equal
 - Less
 - Greater
 - Range
* string
 - SoundLike
 - StartWith

Attributes with string values will have the string operators, and attributes with numeric values will have the numeric operators.

### Custom operators

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
// The function have a paraeter called "cell"  which can be of type string or number
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

To add the operator to the bot, The addCustomOperator must be called  with the operator as a parameter.

## Custom Queries
CSV Bot supports custom queries for more complex operations:

```javascript
// Custom query example
const customResults = bot.customQuery('SELECT column1, column3 FROM data WHERE column4 LIKE "%pattern%"');

console.log(customResults);
```

# API

### new CsvBot(filePath)
Creates a new instance of the CsvBot.

#### params
  * filePath: The path to the CSV file.

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License
This project is licensed under the MIT License.

# Acknowledgements
Special thanks to all the contributors and the open-source community.

