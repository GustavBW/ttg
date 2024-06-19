/******************************************************************************
 * File: core.js
 * Author: Keith Schwarz (htiek@cs.stanford.edu)
 *
 * Core functionality for the propositional logic tool.
 */

import {parse} from "./parser.js";
import {prettyPrintTruthTable, displayCompileError} from "./renderer.js";

/** Function: go
 *
 * Runs the complete stack!
 * @return {{table: {header: Array<string>, rows: Array<Array<string>>, parsed: any, expression: string}, error: string}} - error
 */
export function go(input) {
	try {	
		//console.log("[core] parsing input: " + input)	
        const parsed = parse(input);
		//Object.keys(parsed).forEach(key => console.log(key + " : " + parsed[key]));
		const table = prettyPrintTruthTable(parsed, input);
		//console.log("[core] Parsed js object: " + JSON.stringify(parsed));
		//console.log("[core] Table: " + JSON.stringify(table));

		return {table: table, error: undefined};
	} catch (error) {		  
		return {table: undefined, error: error.description};
	}
}

/* Function: assert
 *
 * Asserts that the given claim is true, throwing an exception if it isn't.
 */
export function assert(expr, what) {
	if (expr === false) {
		throw new Error("Assertion failed: " + what);
	}
}

/* Function: unreachable
 *
 * Triggers a failure and reports an error
 */
export function unreachable(why) {
	throw new Error("Unreachable code: " + why);
}
