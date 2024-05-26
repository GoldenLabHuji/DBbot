import { QueryReq } from "@/app/general/interfaces";
import { getOperator } from "@/app/general/utils";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import csvParser from "csv-parser";

export async function POST(request: NextRequest) {
    const req = await request.json();
    const queryReq = req.queryReq as QueryReq[];
    const filePath = req.filePath as string;
    const rows = await filterCSV(filePath, queryReq);
    return NextResponse.json(rows);
}

export async function filterCSV(filePath: string, queryReq: QueryReq[]) {
    return new Promise<any[]>((resolve, reject) => {
        const operators = queryReq.map(
            (query) => getOperator(query.operator) as any
        );
        const rows: any[] = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row: any) => {
                const isRequired = queryReq.every((query, index) =>
                    operators[index](query.value, row[query.param])
                );
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
