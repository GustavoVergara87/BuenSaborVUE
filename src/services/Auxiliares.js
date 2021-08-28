export function numFormat(nStr, decimales = 2) {
    nStr = Math.round(nStr * Math.pow(10, decimales)) / Math.pow(10, decimales)

    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "." + "$2");
    }
    return x1 + x2;
}

export function val(a) {
    if (a != null && a != undefined) return parseInt(a);
    if (a == null || a == undefined) return 0;
}

export function delay(ms) { return new Promise(res => setTimeout(res, ms)) }