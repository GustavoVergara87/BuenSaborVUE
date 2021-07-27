export async function getUsuario(id) {
    const response = await fetch("/api/Usuarios/" + id);
    const responseJson = await response.json();
    return responseJson
}

export async function addUsuario(usuario) {
    const response = await fetch("/api/Usuarios", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(usuario),
    });
    const responseJson = await response.json();
    return responseJson
}

export default {
    getUsuario,
    addUsuario,
}