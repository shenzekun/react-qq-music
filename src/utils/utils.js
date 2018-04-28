export function dealNum(num) {
    return (num / 10000).toFixed(1) + '万';
}
export function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

export function htmlDecode(text) {
    var temp = document.createElement('div');
    temp.innerHTML = text;
    var output = temp.innerText;
    temp = null;
    return output;
}
