import { Column } from "./column";

abstract class AbstractDBbot {
    protected columns: Column[] = [];
    abstract getColumns(): Column[];
    abstract addColumn(column: Column): void;
    abstract removeColumn(column: Column): void;
    abstract loadFile(path: string): void;
}

export class DBbot extends AbstractDBbot {
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
        //TODO: implement file loading
    }
}
