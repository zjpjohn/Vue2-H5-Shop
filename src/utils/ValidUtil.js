


export function isNumber(number) {
    if (typeof number === 'number' && !isNaN(number)) {
        return true;
    } else {
        return false;
    }
}