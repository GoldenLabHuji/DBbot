import fs from "fs";
import { parse } from "csv-parse/sync";
import { Column } from "./column";
import { CustomOperator } from "./operator";
import {
    DataType,
    OperatorData,
    AddCustomOperatorParams,
    BotDetails,
    BotData,
    BotMessages,
    CustomMessages,
    MessagesSlot,
    fillNullValuesParams,
    OperatorsFiles,
    ColorsProp,
    generalObject,
} from "../general/types";
import {
    OPERATORS_FILE,
    EMPTY_MESSAGES,
    EMPTY_DETAILS,
    EMPTY_OPERATORS_DATA,
    EMPTY_OPERATORS_FILES,
    COLORS,
} from "../general/resources";

export class DBbot {
    private dataMap = new Map<string, any>();
    public filePath: string = "";
    private _customOperators: CustomOperator[] = [];
    private _messages: BotMessages = EMPTY_MESSAGES;
    private currentOperatorIndex: number = 0;
    private operatorsData: OperatorData[] = EMPTY_OPERATORS_DATA;
    private _details: BotDetails = EMPTY_DETAILS;
    private _data: BotData = {
        headers: [],
        columns: [],
        customOperators: this._customOperators,
    };
    private operatorsFiles: OperatorsFiles = EMPTY_OPERATORS_FILES;
    private colors: ColorsProp = { bot: "blue", user: "purple" };

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

    public get details(): BotDetails {
        return this._details;
    }

    public set details(details: BotDetails) {
        this._details.name = details.name ?? this._details.name;
        this._details.description =
            details.description ?? this._details.description;
    }

    public get data(): BotData {
        return this._data;
    }

    public get messages(): BotMessages {
        return this._messages;
    }

    public set customMessages(messages: CustomMessages) {
        this.setMessages("customMessages", messages);
    }

    public set slots(messages: MessagesSlot) {
        this.setMessages("slots", messages);
    }

    public get botColor(): string {
        return this.colors.bot;
    }

    public get userColor(): string {
        return this.colors.user;
    }

    public set botColor(color: string) {
        this.setColor(color, "bot");
    }

    public set userColor(color: string) {
        this.setColor(color, "user");
    }

    public setColumnDescription(column: string, description: string): void {
        const col = this.getColumnByName(column);
        col.description = description;
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
        if (!COLORS.includes(color)) {
            console.error(`Color ${color} is not a valid option`);
            console.error(`Please choose from ${COLORS.join(", ")}`);
            throw new Error(`Invalid color ${color}`);
        }
        this.colors[type] = color;
    }

    private setMessages<T extends keyof BotMessages>(
        key: T,
        messages: BotMessages[T]
    ): void {
        Object.keys(messages).forEach((messageKey) => {
            const messageKeyName = messageKey as keyof BotMessages[T];
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

    public addCustomOperator(params: AddCustomOperatorParams): void {
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
            OPERATORS_FILE +
            "\n\n" +
            customFunctionsImport +
            "\n\n" +
            appendOperators;

        this.operatorsFiles.main = fileText;
    }

    public loadDescriptionFile(path: string): void {
        let records: generalObject<string>[] = [];
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

    private registerOperators(params: AddCustomOperatorParams): void {
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
    }: fillNullValuesParams): void {
        this._data.columns.forEach((column) => {
            const value =
                column.dataType === "numeric" ? numericValue : stringValue;
            if (value === undefined) return;
            column.fillNullValues("custom", nullValue, value);
        });
    }

    private addColumnsAuto(): void {
        this._data.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.some(
                    (item: string) => !isNaN(Number(item))
                );
                const dataType: DataType = isNumeric ? "numeric" : "string";
                const col = new Column(column, dataType);
                const numberColumnData: number[] = columnData.map(
                    (item: string) => parseFloat(item)
                );
                col.addRows(
                    dataType === "numeric" ? numberColumnData : columnData
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
