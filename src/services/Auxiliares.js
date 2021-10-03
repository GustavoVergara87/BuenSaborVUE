export function numFormat(nStr, decimales = 2, separadorDeMiles = ".", separadorDeDecimales = ",") {
    nStr = Math.round(nStr * Math.pow(10, decimales)) / Math.pow(10, decimales)

    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? separadorDeDecimales + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + separadorDeMiles + "$2");
    }
    return x1 + x2;
}

export function val(a) {
    if (a != null && a != undefined) return parseFloat(a);
    if (a == null || a == undefined) return 0;
}

export function delay(ms) { return new Promise(res => setTimeout(res, ms)) }













