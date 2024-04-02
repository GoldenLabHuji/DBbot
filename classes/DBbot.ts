import { Column } from "./column";

interface IDBbot {
    readonly columns: Column[];
    getColumns(): Column[];
    addColumn(column: Column): void;
    removeColumn(column: Column): void;
    loadFile(path: string): void;
}

export class DBbot implements IDBbot {
    columns: Column[];
    constructor(_columns: Column[] = []) {
        this.columns = _columns;
    }

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
