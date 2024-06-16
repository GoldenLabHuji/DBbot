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
} from "../general/types";
import {
    STRING_OPERATRORS_DATA,
    NUMERIC_OPERATORS_DATA,
    OPERATOR_PATHS,
    OPERATORS_FILE,
} from "../general/resources";

export class DBbot {
    private dataMap = new Map<string, any>();
    private headers: string[] = [];
    private columns: Column[] = [];
    private name: string = "INSERT DATABASE NAME";
    private description: string = "INSERT DESCRIPTION OF THE DATABASE";
    private operatorsMessage: string = "CHOOSE OPERATOR:";
    private example: string = "INSERT EXAMPLE OF USE CASE";
    public filePath: string = "";
    private customOperators: CustomOperator[] = [];
    private operatorsData: OperatorsObject = {
        string: STRING_OPERATRORS_DATA,
        numeric: NUMERIC_OPERATORS_DATA,
    };
    private currentOperatorIndex: number = 0;

    public getDetails(): BotDetails {
        return {
            name: this.name,
            description: this.description,
            example: this.example,
            operatorsMessage: this.operatorsMessage,
        };
    }

    public getData(): BotData {
        return {
            headers: this.headers,
            columns: this.columns,
            customOperators: this.customOperators,
        };
    }

    public setDetails(details: BotDetails): void {
        this.name = details.name ?? this.name;
        this.description = details.description ?? this.description;
        this.example = details.example ?? this.example;
        this.operatorsMessage =
            details.operatorsMessage ?? this.operatorsMessage;
    }

    private addColumn(column: Column): void {
        this.columns.push(column);
    }

    private removeColumn(column: Column): void {
        this.columns = this.columns.filter((c) => c !== column);
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

        const operatorsNames = this.customOperators.map((operator) =>
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
                this.headers = Object.keys(records[0]);
                this.headers.forEach((header: string) => {
                    this.dataMap.set(header, []);
                });
            }

            this.addColumsToDataMap(records);
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
        this.customOperators.push(newOperator);

        this.operatorsData[params.dataType].push({
            name: params.name,
            dataType: params.dataType,
            params: params.params,
            message: params.message,
        });
    }

    private addColumsToDataMap(records: string[]): void {
        records.forEach((record: any) => {
            this.headers.forEach((header: string) => {
                const columnData = this.dataMap.get(header);
                if (columnData) {
                    columnData.push(record[header]);
                }
            });
        });
    }

    private addColumnsAuto(): void {
        this.headers.forEach((column) => {
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
