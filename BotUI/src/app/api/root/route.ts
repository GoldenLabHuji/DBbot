import { Attribute } from "@/app/general/interfaces";
import { getOperator } from "@/app/general/utils";
import { strOrNum } from "@/app/general/types";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import csvParser from "csv-parser";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const attributes = req.queryParams as Attribute[];
    const filePath = req.filePath as string;
    const rows = await filterCSV(filePath, attributes);
    return NextResponse.json(rows);
}

async function filterCSV(filePath: string, attributes: Attribute[]) {
    return new Promise<any[]>((resolve, reject) => {
        const operators = attributes.map(
            (query) => getOperator(query.operator) as any
        );
        const rows: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row: any) => {
                const isRequired = isRowRequired(attributes, operators, row);

                if (isRequired) {
                    rows.push(row);
                }
            })
            .on("end", () => {
                resolve(rows);
            })
            .on("error", (error) => {
                reject(error);
            });
    });
}

function isRowRequired(
    attributes: Attribute[],
    operators: any[],
    row: any
): boolean {
    let isRequired: boolean = true;
    const duplicates = findDuplicates(attributes, "name");
    if (duplicates.length > 0) {
        const notDuplicatesAttributes = attributes.filter(
            (attribute) => !duplicates.includes(attribute)
        );
        const isRequiredNotDuplicates = notDuplicatesAttributes.every(
            (query, index) => operators[index](row[query.name], ...query.params)
        );

        const namesOfDuplicates = duplicates.map((query) => query.name);
        const duplicatesAttributes = [...new Set(namesOfDuplicates)];

        const duplicatesRequiredArray = duplicatesAttributes.map((name) => {
            const attributeOfTheName = attributes.filter(
                (attribute) => attribute.name === name
            );
            const isRowRequired = attributeOfTheName.some((query, index) =>
                operators[index](row[query.name], ...query.params)
            );
            return isRowRequired;
        });

        const isRequiredDuplicates = duplicatesRequiredArray.every(
            (value) => value
        );

        isRequired = isRequiredNotDuplicates && isRequiredDuplicates;
    } else {
        isRequired = attributes.every((query, index) =>
            operators[index](row[query.name], ...query.params)
        );
    }

    return isRequired;
}

function findDuplicates(arr: Attribute[], key: keyof Attribute): Attribute[] {
    const occurrences = new Map<strOrNum[] | string, number>();

    arr.forEach((obj) => {
        const value = obj[key];
        occurrences.set(value, (occurrences.get(value) || 0) + 1);
    });

    return arr.filter((obj) => occurrences.get(obj[key])! > 1);
}
