// 处理数字
export function dealNum(num) {
    return (num / 10000).toFixed(1) + '万';
}

// 处理空白字符
export function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

// 格式化文本
export function htmlDecode(text) {
    var temp = document.createElement('div');
    temp.innerHTML = text;
    var output = temp.innerText;
    temp = null;
    return output;
}

//获取秒数
export function getSeconds(line) {
    return +line.replace(
        /^\[(\d{2}):(\d{2}\.\d{2}).*/,
        (match, p1, p2) => +p1 * 60 + parseFloat(+p2)
    );
}

export function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (secs < 10) {
        secs = '0' + secs;
    }
    return `${mins}:${secs}`;
}
