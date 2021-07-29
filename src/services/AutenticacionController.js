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
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    obtenerGoogleIdToken,
    obtenerJwToken,
}