import { go } from './stanford/core.js';
import { generateHelpBlob } from './gbw/help.js';
import { normalizeProgramArg, PROGRAM_FUNCTION_ALIASES } from './gbw/registry.js';
import { prettyPrintTruthTable, displayTable } from './stanford/renderer.js';
import { compareTables, prettyPrintTableComparisons } from './gbw/compare.js';

const nodejsExecutablePath = process.argv[0];
const scriptPath = process.argv[1];

const programArg = normalizeProgramArg(process.argv[2]);
const functionArgs = process.argv.slice(3);

console.log("Running TTG v 0.0.1");

if(programArg === PROGRAM_FUNCTION_ALIASES.table.key) {
    const expressions = process.argv.slice(3)
        .map(k => k.trim())
        .filter(k => k.length > 0);

    console.log("[index] expressions:" + expressions + " length: " + expressions.length);
    for (let expr of expressions) {
        const res = go(expr);
        if(typeof res.error === "string") {
            console.error("Expression: " + expr + " failed: " + res.error);
        }else{
            const table = prettyPrintTruthTable(res.table, expr);
            displayTable(table);
        }
    }

} else if (programArg === PROGRAM_FUNCTION_ALIASES.help.key) {
    console.log(generateHelpBlob());

} else if (programArg === PROGRAM_FUNCTION_ALIASES.compare.key) {
    console.log("[index] func args:" + functionArgs + " length: " + functionArgs.length);
    if(functionArgs.length < 2) {
        console.error("Expected at least 2 expressions to compare")
        process.exit(1);
    }
    //node ttg compare |expression1| |expression2|
    const masterExpression = functionArgs[0];
    const peerExpressions = process.argv.slice(4)

    const masterParseAttempt = go(masterExpression);
    if(masterParseAttempt.error) {
        console.error("[index] Invalid master expression:" + masterParseAttempt.error);
        process.exit(1);
    }

    const peerParseAttempts = peerExpressions.map((expression) => go(expression));
    const failedPeers = peerParseAttempts.filter((res) => res.error);
    const successfulPeers = peerParseAttempts.filter((res) => !res.error);
    if(failedPeers.length > 0) {
        console.error("[index] Invalid peer expressions:" + failedPeers.map((res) => res.error).join(", "));
    }

    const comparisons = compareTables(masterParseAttempt.table, ...successfulPeers.map((res) => res.table));
    prettyPrintTableComparisons(masterExpression, comparisons);
} else {
    console.log('Invalid command: ' + programArg + ' Use "help" to get help.');
}