export function priceFromString(
    str: string,
): number {
    const stripped = str
        .replace('$', '')
        .replaceAll(',', '')
        .replaceAll(')', '')
        .replaceAll('(', '')
        .replaceAll(' ', '');
    const number = Number.parseFloat(stripped);
    return str.includes("(") || str.includes(")") ? -number : number;
}