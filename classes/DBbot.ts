import { Column } from "./column";

export class DBbot {
    constructor(private columns: Column[] = []) {}

    getColumns(): Column[] {
        return this.columns;
    }

    addColumn(column: Column): void {
        this.columns.push(column);
    }

    removeColumn(column: Column): void {
        this.columns = this.columns.filter((c) => c !== column);
    }

    loadFile(path: string): void {
        console.log(`Loading file from path: ${path}`);
    }
}
