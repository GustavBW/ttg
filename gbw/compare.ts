
export type TableComparison = {
    expression: string;
    matchesMaster: "T" | "F" | "ERROR";
}

export const prettyPrintTableComparisons = (master: string, comparisons: TableComparison[]): void => {
    console.log("Comparison Result(s) matching: " + master);
    comparisons.forEach((comparison) => {
        console.log(`\t${comparison.expression} : ${comparison.matchesMaster}`);
    });
}

export const compareTables = (master: any, ...tables: any[]): TableComparison[] => {
    const masterCheck = isValidParseResult(master);
    if(masterCheck !== "T") {
        console.error("[compare] Invalid master expression.");
        return [];
    }

    return tables.map((table) => compare(master, table));
};

const compare = (master: any, table: any): TableComparison => {
    const peerCheck = isValidParseResult(table);
    if(peerCheck !== "T") {
        return {
            expression: "",
            matchesMaster: "ERROR"
        };
    }
    //same number of variables
    if(master.parsed.variables.length !== table.parsed.variables.length) {
        return {
            expression: table.expression,
            matchesMaster: "F"
        };
    }
    //maybe check for variable order

    return {
        expression: table.expression,
        matchesMaster: truthTableCheck(master, table)
    };
}

const truthTableCheck = (master: any, table: any): "T" | "F" | "ERROR" => {
    const peerRows = table.rows;
    const masterRows = master.rows;
    if(peerRows.length !== masterRows.length) {
        return "F";
    }

    //Compare last index of each row in each table
    for (let i = 0; i < peerRows.length; i++) {
        const peerRow = peerRows[i];
        const masterRow = masterRows[i];
        if(peerRow[peerRow.length - 1] !== masterRow[masterRow.length - 1]) {
            return "F";
        }
    }

    return "T";
}

const isValidParseResult = (table: any): "T" | "F" | "ERROR" => {
    if(!table.parsed) {
        return "ERROR";
    }
    if(!table.parsed.variables) {
        return "ERROR";
    }
    return "T";
}