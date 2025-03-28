import fs from "fs";
import { parse } from "csv-parse/sync";
import { Column } from "./column";
import { CustomOperator } from "./operator";
import { generateTypeError } from "../general/utils";
import * as types from "../general/types";
import * as resources from "../general/resources";

export class DBbot {
    private dataMap = new Map<string, any>();
    public filePath: string = "";
    private _customOperators: CustomOperator[] = [];
    private _messages: types.BotMessages = resources.EMPTY.messages;
    private currentOperatorIndex: number = 0;
    private operatorsData: types.OperatorData[] =
        resources.EMPTY_OPERATORS_DATA;
    private _details: types.BotDetails = resources.EMPTY.details;
    private _data: types.BotData = {
        headers: [],
        columns: [],
        customOperators: this._customOperators,
    };
    private operatorsFiles: types.OperatorsFiles =
        resources.EMPTY.operatorsFiles;
    private colors: types.ColorsProp = { bot: "blue", user: "purple" };
    private nullValues: types.NullValues = {
        isFilterIncludesNull: false,
        nullValues: [],
    };

    constructor() {
        this.initMessages();
    }

    private initMessages(): void {
        this._messages.customMessages = {
            attributeMessage:
                "This is a message to ask for an attribute of the database to start the query. Here is the list of the attributes:",
            operatorMessage: "This is the list of operators to choose from:",
            errorMessage: "I don't understand, please enter a valid option",
            continueMessage: "Enter 1 to continue",
            resultMessage: `Here is the results of your query. 
You can download the results as a csv file`,
        };

        this._messages.slots = {
            welcomeSlot: [
                "Welcome message",
                "Description message",
                "Example message",
            ],
            operatorSlot: [],
            paramsSlot: [],
            restartSlot: [],
            resultSlot: [],
        };
    }

    public get details(): types.BotDetails {
        return this._details;
    }

    public set details(details: types.BotDetails) {
        this._details.name = details.name ?? this._details.name;
        this._details.helpDescription =
            details.helpDescription ?? this._details.helpDescription;
        this._details.mailInfo = details.mailInfo ?? this._details.mailInfo;
    }

    public get data(): types.BotData {
        return this._data;
    }

    public get messages(): types.BotMessages {
        return this._messages;
    }

    public set customMessages(messages: types.CustomMessages) {
        this.setMessages("customMessages", messages);
    }

    public set slots(messages: types.MessagesSlot) {
        this.setMessages("slots", messages);
    }

    public get botColor(): string {
        return this.colors.bot;
    }

    public get userColor(): string {
        return this.colors.user;
    }

    public set botColor(color: string) {
        generateTypeError(color, "string", "botColor");
        this.setColor(color, "bot");
    }

    public set userColor(color: string) {
        generateTypeError(color, "string", "userColor");
        this.setColor(color, "user");
    }

    public defineNullValues(values: any[]): void {
        this.nullValues.nullValues = values;
    }

    public setColumnDescription(column: string, description: string): void {
        const col = this.getColumnByName(column);
        col.description = description;
    }

    public getNullValuesProperty(): types.NullValues {
        return this.nullValues;
    }

    public setIsFilterIncludesNull(value: boolean): void {
        generateTypeError(value, "boolean", "filterIncludesNull");
        this.nullValues.isFilterIncludesNull = value;
    }

    public convertColumnsToFactor(columns: string[]): void {
        columns.forEach((column) => {
            const col = this.getColumnByName(column);
            col.ConvertToFactor();
            const columnData = this.dataMap.get(column);
            if (columnData) {
                col.deleteAllRows();
                col.addRows(columnData);
            } else {
                console.error(
                    `Column ${column} has no data. cannot convert to factor`
                );
            }
        });
    }

    private setColor(color: string, type: "bot" | "user"): void {
        if (!resources.COLORS.includes(color)) {
            console.error(`Color ${color} is not a valid option`);
            console.error(`Please choose from ${resources.COLORS.join(", ")}`);
            throw new Error(`Invalid color ${color}`);
        }
        this.colors[type] = color;
    }

    private setMessages<T extends keyof types.BotMessages>(
        key: T,
        messages: types.BotMessages[T]
    ): void {
        Object.keys(messages).forEach((messageKey) => {
            const messageKeyName = messageKey as keyof types.BotMessages[T];
            this._messages[key][messageKeyName] =
                messages[messageKeyName] ?? this._messages[key][messageKeyName];
        });
    }

    private getColumnByStringProperty(property: string, value: string) {
        const column = this._data.columns.find(
            (column) =>
                (column[property as keyof Column] as string).toLowerCase() ===
                value.toLowerCase()
        );
        if (column === undefined) {
            throw new Error(`Column with ${property} of ${value} not found`);
        }
        return column;
    }

    public getColumnByName(name: string): Column {
        return this.getColumnByStringProperty("displayName", name);
    }

    public getColumnById(id: string): Column {
        return this.getColumnByStringProperty("id", id);
    }

    public changeColumnDisplayName(name: string, newName: string): void {
        const column = this.getColumnByName(name);

        try {
            this.getColumnByName(newName);
        } catch {
            column.displayName = newName;
            const index = this._data.headers.indexOf(name);
            this._data.headers[index] = newName;
            return;
        }

        throw new Error(`Column ${newName} already exists`);
    }

    private addColumn(column: Column): void {
        this._data.columns.push(column);
    }

    private removeColumn(column: Column): void {
        this._data.columns = this._data.columns.filter((c) => c !== column);
    }

    public addCustomOperator(params: types.AddCustomOperatorParams): void {
        this.registerOperators(params);

        const importStatements =
            (params.importFunctions &&
                params.importFunctions
                    .map((func) => `import {${func}} from './${func}.js';`)
                    .join("\n")) ??
            "";

        const fileText = `${importStatements}

        export const ${params.name} = ${params.customFunction.toString()};`;

        this.operatorsFiles.functions[params.name] = fileText;
    }

    public createOperatorsFile(): void {
        const operatorsNames = this._data.customOperators.map((operator) =>
            operator.getDisplayName()
        );

        const customFunctionsImport = operatorsNames
            .map((name) => `import { ${name} } from "@/app/operators/${name}";`)
            .join("\n");

        const appendOperators = operatorsNames
            .map(
                (name) =>
                    `OPERATORS["${name}" as keyof typeof OPERATORS] = ${name};`
            )
            .join("\n");

        const fileText =
            resources.OPERATORS_FILE +
            "\n\n" +
            customFunctionsImport +
            "\n\n" +
            appendOperators;

        this.operatorsFiles.main = fileText;
    }

    public loadDescriptionFile(path: string): void {
        let records: types.generalObject<string>[] = [];
        try {
            const fileData = fs.readFileSync(path, "utf8");
            records = parse(fileData, {
                columns: true,
                trim: true,
                skip_empty_lines: true,
            });
        } catch (error) {
            console.error(error);
        }

        records.forEach((record) => {
            const keys = Object.keys(record);
            const columnName = record[keys[0]];
            const description = record[keys[1]];
            const column = this.getColumnByName(columnName);
            column.description = description;
        });
    }

    public loadFile(path: string): void {
        this.filePath = path;
        try {
            const fileData = fs.readFileSync(path, "utf8");
            const records = parse(fileData, {
                columns: true,
                trim: true,
                skip_empty_lines: true,
            });

            if (records.length > 0) {
                this._data.headers = Object.keys(records[0]);
                this._data.headers.forEach((header: string) => {
                    this.dataMap.set(header, []);
                });
            }

            this.addColumnsToDataMap(records);
            this.addColumnsAuto();
        } catch (error) {
            console.error(error);
        }
    }

    private registerOperators(params: types.AddCustomOperatorParams): void {
        const newOperator = new CustomOperator(
            params.name,
            params.customFunction
        );

        newOperator.addParams(params.params);

        this._data.customOperators.push(newOperator);

        this.operatorsData.push({
            name: params.name,
            params: params.params,
            message: params.message,
            column: params.column,
        });

        const column = this.getColumnByName(params.column);
        column.addOperator(newOperator);
    }

    private addColumnsToDataMap(records: string[]): void {
        records.forEach((record: any) => {
            this._data.headers.forEach((header: string) => {
                const columnData = this.dataMap.get(header);
                if (columnData) {
                    columnData.push(record[header]);
                }
            });
        });
    }

    public fillNullValuesAll({
        numericValue,
        stringValue,
        nullValue = [null],
    }: types.fillNullValuesParams): void {
        this._data.columns.forEach((column) => {
            const value =
                column.dataType === types.DataType.NUMERIC
                    ? numericValue
                    : stringValue;
            if (value === undefined) return;
            column.fillNullValues(types.NullMethod.CUSTOM, nullValue, value);
        });
    }

    private addColumnsAuto(): void {
        this._data.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.some(
                    (item: string) => !isNaN(Number(item))
                );
                const dataType: types.DataType = isNumeric
                    ? types.DataType.NUMERIC
                    : types.DataType.STRING;
                const col = new Column(column, dataType);
                const numberColumnData: number[] = columnData.map(
                    (item: string) => parseFloat(item)
                );
                col.addRows(
                    dataType === types.DataType.NUMERIC
                        ? numberColumnData
                        : columnData
                );
                this.addColumn(col);
            } else {
                console.error(
                    `Column ${column} has no data. Skipping this column.`
                );
            }
        });
    }
}
