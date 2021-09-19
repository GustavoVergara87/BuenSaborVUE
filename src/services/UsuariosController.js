//Que se pueda pedir un Usuario es totalmente inseguro
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

export async function editUsuario(usuarioChange) {
    const response = await fetch("/api/Usuarios", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(usuarioChange),
    });

    if (response.status == 400) {
        alert("Error usuario no encontrado")
        // console.log(await response.text())
        return await response.text()
    }
    
    return null
}

export default {
    getUsuario,
    addUsuario,
}