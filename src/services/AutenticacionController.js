//Google creates a new idToken on every login. The token is only valid for a short time.
export async function obtenerGoogleIdToken(id_token) {

    const GoogleAuthRequest = {
        Id_token: id_token,
    }
    const response = await fetch("/api/Auth/googlelogin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(GoogleAuthRequest),
    });
    const responseJson = await response.json();
    return responseJson
}

export async function obtenerJwToken(AuthRequest) {
    const response = await fetch("/api/Auth/Login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(AuthRequest),
    })
    if (response.status == 400) {
        alert("Usuario y Contraseña incorrectos")
        console.log(await response.text())
        return null
    }
    if (response.ok) {
        const responseJson = await response.json();
        // console.log(responseJson)
        return responseJson
    }
}

export async function registrarNuevoCliente(RegistroRequest) {
    const response = await fetch("/api/Auth/RegistrarCliente", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(RegistroRequest),
    });

    if (response.status == 409) {
        const respTxt = await response.text()
        throw respTxt
    }
    const responseJson = await response.json();
    return responseJson
}



export default {
    obtenerGoogleIdToken,
    obtenerJwToken,
    registrarNuevoCliente,
}