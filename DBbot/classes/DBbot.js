"use strict";
exports.__esModule = true;
exports.DBbot = void 0;
var fs = require("fs");
var csvParser = require("csv-parser");
var column_1 = require("./column");
var DBbot = /** @class */ (function () {
    function DBbot(columns) {
        if (columns === void 0) { columns = []; }
        this.columns = columns;
        this.dataMap = new Map();
        this.headers = [];
    }
    DBbot.prototype.getColumns = function () {
        return this.columns;
    };
    DBbot.prototype.getHeaders = function () {
        return this.headers;
    };
    DBbot.prototype.addColumn = function (column) {
        this.columns.push(column);
    };
    DBbot.prototype.removeColumn = function (column) {
        this.columns = this.columns.filter(function (c) { return c !== column; });
    };
    DBbot.prototype.loadFile = function (path) {
        var _this = this;
        try {
            var fileData = fs.readFileSync(path, 'utf8');
            var rows = fileData.split('\n');
            var headerRow = rows.shift(); // Remove the header row
            if (headerRow) {
                var headers = headerRow.split('\t').map(function (header) { return header.trim(); }); // Trim whitespace from headers
                this.headers = headers;
                headers.forEach(function (header) {
                    _this.dataMap.set(header, []);
                });
            }
            rows.forEach(function (row) {
                var columns = row.split('\t').map(function (column) { return column.trim(); }); // Trim whitespace from columns
                columns.forEach(function (column, index) {
                    var columnName = _this.headers[index];
                    if (columnName && column !== '') { // Check for empty values
                        var columnData = _this.dataMap.get(columnName);
                        if (columnData) {
                            columnData.push(column);
                        }
                    }
                });
            });
            this.headers.forEach(function (column) {
                var columnData = _this.dataMap.get(column);
                if (columnData && columnData.length > 0) {
                    var dataType = Number(columnData[0])
                        ? 'numeric'
                        : 'string';
                    var col = new column_1.Column(column, dataType);
                    var numberColumnData = columnData.map(function (item) { return parseFloat(item); });
                    col.addRows(dataType === 'numeric' ? numberColumnData : columnData);
                    _this.addColumn(col);
                }
                else {
                    console.error("Column ".concat(column, " has no data. Skipping this column."));
                }
            });
        }
        catch (error) {
            console.error('Error occurred while reading CSV:', error);
        }
    };
    return DBbot;
}());
exports.DBbot = DBbot;
