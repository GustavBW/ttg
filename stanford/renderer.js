/******************************************************************************
 * File: renderer.js
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * Logic to display results and information to the user.
 */
import {generateTruthTable} from "./truth-table.js";

/* Function: prettyPrintTruthTable
 *
 * Outputs an elegantly-formatted truth table for the given parsed expression.
 * @return {{header: Array<string>, rows: Array<Array<string>>, parsed: any, expression: string}}
 */
export function prettyPrintTruthTable(parseResult, originalExpression) {
    if(parseResult && parseResult.parsed){
        parseResult = parseResult.parsed;
    }
    //console.log("prettyPrintTruthTable called with parseResult: " + JSON.stringify(parseResult) + " and originalExpression: " + originalExpression);
    
    var table = createTableObject();
    
    /* Create the header, which needs knowledge of the variables and the expression. */
    createTableHeader(table, parseResult, originalExpression);
    
    /* Now, go generate the body of the table. */
    generateTruthTable(parseResult, outputRow(table));
    
    /* Display the table. */
    return {
        header: table.header,
        rows: table.rows,
        parsed: parseResult,
        expression: originalExpression
    };
}

/* Function: createTableObject
 *
 * Creates a new table object and sets up its properties.
 */
function createTableObject() {
    return {
        header: [],
        rows: []
    };
}

/* Function: createTableHeader
 *
 * Given a table representing the result of the truth table, creates the header
 * for the table by listing the variables and the expression in separate columns.
 */
function createTableHeader(table, parseResult, originalExpression) {
    var header = [];

    /* Add one column for each variable. */
    for (var i = 0; i < parseResult.variables.length; i++) {
        header.push(parseResult.variables[i]);
    }
    
    /* Add one column for the overall expression. */
    header.push(originalExpression);

    table.header = header;
} 
 
/* Function: outputRow
 *
 * Given a table to output a row to, creates a callback that outputs a row to that table.
 */
function outputRow(table) {
    return function(assignment, result) {
        var row = [];
        
        /* Show the value of each variable. */
        for (var i = 0; i < assignment.length; i++) {
            row.push(assignment[i] ? "T" : "F");
        }
        
        /* Show the value of the expression. */
        row.push(result ? "T" : "F");
        
        table.rows.push(row);
    }
}

/* Function: displayTable
 *
 * Displays the specified truth table in the console.
 */
export function displayTable(table) {
    console.log("Truth Table:");
    console.log(table.header.join(' | '));
    table.rows.forEach(row => {
        console.log(row.join(' | '));
    });
}

/* Function: displayCompileError
 *
 * Displays the specified compilation error message. The first parameter should
 * be the actual string provided as input, and the second the error message
 * that was generated.
 */
export function displayCompileError(input, error) {
    console.log("Error: " + error.description);
}
