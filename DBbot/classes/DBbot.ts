import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { Column } from "./column";
import { CustomOperator } from "./operator";
import {
    DataType,
    OperatorsObject,
    AddCustomOperatorParams,
    BotDetails,
    BotData,
    BotMessages,
} from "../general/types";
import {
    STRING_OPERATORS_DATA,
    NUMERIC_OPERATORS_DATA,
    OPERATOR_PATHS,
    OPERATORS_FILE,
    EMPTY_MESSAGES,
} from "../general/resources";

export class DBbot {
    private dataMap = new Map<string, any>();
    public filePath: string = "";
    private _customOperators: CustomOperator[] = [];
    private _messages: BotMessages = EMPTY_MESSAGES;
    private currentOperatorIndex: number = 0;
    private _data: BotData = {
        headers: [],
        columns: [],
        customOperators: this._customOperators,
    };

    private operatorsData: OperatorsObject = {
        string: STRING_OPERATORS_DATA,
        numeric: NUMERIC_OPERATORS_DATA,
    };

    private _details: BotDetails = {
        name: "INSERT DATABASE NAME",
        description: "INSERT DESCRIPTION OF THE DATABASE",
    };

    constructor() {
        this.initMessages();
    }

    private initMessages(): void {
        this._messages = {
            welcomeMessage: `This is the welcome messages of the bot of the database ${this._details.name}.
    
You can customize this and the other messages. See more in our documentation: 
    
*LINK TO THE DOCUMENTATION*`,
            attributeMessage:
                "This is a message to ask for an attribute of the database to start the query. Here is the list of the attributes:",
            descriptionMessage: `Here is a description of the database ${this._details.description}`,
            exampleMessage: "This is an example of use case",
            operatorMessage: "This is the list of operators to choose from:",
            errorMessage: "I don't understand, please enter a valid option",
        };
    }

    public get details(): BotDetails {
        return this.details;
    }

    public set details(details: BotDetails) {
        this._details.name = details.name ?? this._details.name;
        this._details.description =
            details.description ?? this._details.description;
        this.initMessages();
    }

    public get data(): BotData {
        return this._data;
    }

    public get messages(): BotMessages {
        return this._messages;
    }

    public set messages(messages: BotMessages) {
        Object.keys(messages).forEach((key) => {
            const keyName = key as keyof BotMessages;
            this._messages[keyName] =
                messages[keyName] ?? this._messages[keyName];
        });
    }

    private addColumn(column: Column): void {
        this._data.columns.push(column);
    }

    private removeColumn(column: Column): void {
        this._data.columns = this._data.columns.filter((c) => c !== column);
    }

    public addCustomOperator(params: AddCustomOperatorParams): void {
        this.registerOperators(params);

        const functionFilePath = path.resolve(
            __dirname,
            `${OPERATOR_PATHS[process.env.NODE_ENV ?? "production"]}/${
                params.name
            }.js`
        );

        const importStatements =
            (params.importFunctions &&
                params.importFunctions
                    .map((func) => `import {${func}} from './${func}.js';`)
                    .join("\n")) ??
            "";

        fs.writeFileSync(
            functionFilePath,
            `${importStatements}

export const ${params.name} = ${params.customFunction.toString()};`
        );
    }

    public createOperatorsFile(): void {
        const operatorsFilePath = path.resolve(
            __dirname,
            `${
                OPERATOR_PATHS[process.env.NODE_ENV ?? "production"]
            }/operators.ts`
        );

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
        fs.writeFileSync(operatorsFilePath, fileText);
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
        this._data.customOperators.push(newOperator);

        this.operatorsData[params.dataType].push({
            name: params.name,
            dataType: params.dataType,
            params: params.params,
            message: params.message,
        });
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

    private addColumnsAuto(): void {
        this._data.headers.forEach((column) => {
            const columnData = this.dataMap.get(column);
            if (columnData && columnData.length > 0) {
                const isNumeric = columnData.every((item: string) => {
                    return !isNaN(Number(item));
                });
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
