import {ALIASES} from '../stanford/scanner.js';
import {PROGRAM_FUNCTION_ALIASES} from './registry.js';


export const generateHelpBlob = (): string => {
    let cmds = "";
    for (const key in PROGRAM_FUNCTION_ALIASES) {
        const keyString = PROGRAM_FUNCTION_ALIASES[key as keyof typeof PROGRAM_FUNCTION_ALIASES].key;
        const aliases = PROGRAM_FUNCTION_ALIASES[key as keyof typeof PROGRAM_FUNCTION_ALIASES].aliases;
        cmds += `\t${keyString}:\t\t${aliases.join(", ")}\n`;
    }
    let operands = "";
    for (const key in ALIASES) {
        const keyString = key;
        const aliases = ALIASES[key as keyof typeof ALIASES].values;
        operands += `\t${keyString}:\t\t${aliases.join(", ")}\n`;
    }

    let helpBlob = `TTG v 0.0.1
    Usage: ttg.js <command> [args]
    
    Commands: 
    ${cmds}
        For the compare command, use ' to denote the two expressions to compare.
        the first expression is what all following expressions are matched against.

    Accepted Operands:
    ${operands}
    `;

    return helpBlob;
}