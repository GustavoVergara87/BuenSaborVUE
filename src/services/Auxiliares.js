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

export async function now() {
    const resp = await fetch("http://worldtimeapi.org/api/timezone/America/Argentina/Mendoza")
    return await resp.json()
}

function distanciaModular(a, b, modulo, sentido = 0) {
    //Sentido de las agujas del reloj
    // console.log("a",a,"b",b,"modulo", modulo, "sentido", sentido)
    if (sentido == 0) {
        if (b >= a) {
            // console.log("distanciaModular",b - a)
            return (b - a)
        } else if (b < a) {
            // console.log("distanciaModular",(b+modulo) - a )
            return ((b + modulo) - a)
        }
    } else if (sentido == 1) {
        if (b >= a) {
            // console.log("distanciaModular",(b+modulo) - a )
            return ((b + modulo) - a)
        } else if (b < a) {
            // console.log("distanciaModular",b - a)
            return (a - b)
        }
    }
}

function perteneceAlIntervaloModular(a, b, valor, modulo, sentido = 0) {
    // console.log("a", a, "b", b, "valor", valor, "modulo", modulo, "sentido", sentido, "a - valor", distanciaModular(a, valor, modulo, sentido), "a - b", distanciaModular(a, b, modulo, sentido))
    if (distanciaModular(a, b, modulo, sentido) >= distanciaModular(a, valor, modulo, sentido)) {
        return true;
    } else {
        return false;
    }
}

async function ahora() {
    const resp = await now()
    const _now = Date.parse(resp.datetime)
    return {
        dia: new Date(_now).getDay(),
        hora: (new Date(_now).getHours()) + (new Date(_now).getMinutes() / 60),
    }
}

const horariosDeAtencion = [
    {
        dia1: 0,
        dia2: 6,
        hora1: 20,
        hora2: 24
    },
    {
        dia1: 6,
        dia2: 0,
        hora1: 11,
        hora2: 15
    },
]

export async function estaAbierto() {
    const _ahora = await ahora()
    for (let i = 0; i < horariosDeAtencion.length; i++) {
        const hda = horariosDeAtencion[i];
        if (perteneceAlIntervaloModular(hda.dia1, hda.dia2, _ahora.dia, 7)) {
            if (perteneceAlIntervaloModular(hda.hora1, hda.hora2, _ahora.hora, 24)) {
                // console.log("pertenece al intevalo")
                return true
            }
        }
    }
    return false
}

export const DiaDeLaSemana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]

export async function proximoHdA() {
    const _ahora = await ahora()
    let hdaMasCercano = horariosDeAtencion[0]

    for (let i = 0; i < horariosDeAtencion.length; i++) {
        const hda = horariosDeAtencion[i];

        for (let d = 0; d <= distanciaModular(hda.dia1, hda.dia2, 7); d++) {
            const hdaDiario = {
                dia1: (hda.dia1 + d) % 7,
                dia2: (hda.dia1 + d) % 7,
                hora1: hda.hora1,
                hora2: hda.hora2,
            }
            // console.log(_ahora, hdaDiario, distanciaModular(_ahora.dia + _ahora.hora / 24, hdaDiario.dia1 + hdaDiario.hora1 / 24, 7))

            if (perteneceAlIntervaloModular(hdaDiario.dia1 + hdaDiario.hora1 / 24, hdaDiario.dia2 + hdaDiario.hora2 / 24, _ahora.dia + _ahora.hora / 24, 7)
            ) {
                // console.log("esta abierto ahora mismo",hdaDiario.dia1 + hdaDiario.hora1 / 24, hdaDiario.dia2 + hdaDiario.hora2 / 24, _ahora.dia + _ahora.hora / 24, 7)
                hdaMasCercano = hdaDiario;
                return hdaMasCercano
            }

            if (distanciaModular(_ahora.dia + _ahora.hora / 24, hdaDiario.dia1 + hdaDiario.hora1 / 24, 7) <
                distanciaModular(_ahora.dia + _ahora.hora / 24, hdaMasCercano.dia1 + hdaMasCercano.hora1 / 24, 7)
            ) {
                hdaMasCercano = hdaDiario;
            }
        }

    }
    return hdaMasCercano
}