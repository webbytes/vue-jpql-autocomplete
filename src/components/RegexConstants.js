export default {
    bracketsRegex: /[()]/g,
    inBracketRegex: /IN\s\(([',\s\w]*)\)?/ig,
    multiSpaceRegex: /\s\s+/g,
    field: '[\\s](?!and|or)[\\w_.]',
    logicalop: '[\\s](?:AND|OR)',
}