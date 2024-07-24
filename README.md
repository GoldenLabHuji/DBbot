# DBbot

DBbot is an npm package that allows researchers to create a bot based on a CSV file. The bot can query and filter the data of the CSV file, making it easy to interact with and manipulate large datasets.

## Features

- Easy to use and integrate
- Query and filter data from a CSV file
- Flexible and customizable
- Supports various data operations

## Installation

You can install CSV Bot using npm:

```bash
npm install dbbot
```

# Usage

## Basic Example
Here is a basic example of how to use DBbot:

```javascript
import {DBbot, app} from "dbbot";

// Initialize the bot with a CSV file
const bot = new CsvBot('path/to/your/file.csv');

// Query the CSV file
const results = bot.query('SELECT * FROM data WHERE column1 = "value"');

console.log(results);
```

## Filtering Data
You can also filter data based on specific conditions:

```javascript
// Filter data
const filteredData = bot.filter(data => data.column2 > 100);

console.log(filteredData);
```

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

