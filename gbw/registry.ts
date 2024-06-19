export const PROGRAM_FUNCTION_ALIASES = {
    table: {
        aliases: ['table', 't', 'tab', '-t'],
        key: 'table',
    },
    help: {
        aliases: ['help', 'h', '-h'],
        key: 'help',
    },
    compare: {
        aliases: ['compare', 'c', '-c'],
        key: 'compare',
    },
};

export const normalizeProgramArg = (arg: string): string => {
    arg = arg.toLowerCase();
    for (const key in PROGRAM_FUNCTION_ALIASES) {
        const aliases = PROGRAM_FUNCTION_ALIASES[key as keyof typeof PROGRAM_FUNCTION_ALIASES].aliases;
        if(aliases.includes(arg)) {
            return key;
        }
    }
    return arg;
}