import store from "../store/index"
import Vue from "vue"
import router from '@/router'

export async function registrarCliente(RegistroRequest) {
    const response = await fetch("/api/Auth/RegistrarCliente", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(RegistroRequest),
    });
    const responseJson = await response.json();
    return responseJson
}

export async function googleLogin(id_token) {
    const resp = await store.dispatch("obtenerJwTokenConGoogle", id_token)
    posLogin(resp);
}

export async function login(AuthRequest) {
    const resp = await store.dispatch("obtenerJwToken", AuthRequest)
    posLogin(resp);
    return true
}

export async function logout() {
    //Reset Vuex
    await store.dispatch("resetCarrito")
    await store.dispatch("resetUsuarios")

    //LogOut from google
    await Vue.prototype.$gAuth.signOut()

}

export function posLogin(resp) {
    let rolId;
    if (store.getters.traerRolId != null) {
        rolId = store.getters.traerRolId.id
    }
    let clienteId;
    if (store.getters.traerCliente != null) {
        clienteId = store.getters.traerCliente
    }

    const enroute = {
        Cliente: () => {
            //asocia el cliente que se acaba de loggear a un grupo (de un solo miembro) para recibir mensajes via SignalR
            joinClienteToGroup(clienteId);
            router.push({ name: "ClientePlatos" });

        },
        Administrador: () => router.push({ name: "AdministradorPlatos" }),
        Cajero: () => {
            joinRolIdToGroup(rolId);
            router.push({ name: "CajeroListaDePedidos" });
        },
        Cocinero: () => {
            joinRolIdToGroup(rolId);
            router.push({ name: "CocineroListaDePedidos" });
        },
    };

    enroute[resp.rol]();
}

//---------------SignalR------------------------------
export function joinRolIdToGroup(id) {
    removeStoredFromAllGroups();
    Vue.prototype.$connectionHub
        .invoke("JoinRolIDToGroup", id)
        .catch((err) => {
            console.log(err);
        });
}
export function joinClienteToGroup(id) {
    removeStoredFromAllGroups();
    Vue.prototype.$connectionHub
        .invoke("JoinClienteIDToGroup", id)
        .catch((err) => {
            console.log(err);
        });
}
export function removeStoredFromAllGroups() {

    let rolId;
    if (store.getters.traerRolId != null) {
        rolId = store.getters.traerRolId.id
    }
    let clienteId;
    if (store.getters.traerCliente != null) {
        clienteId = store.getters.traerCliente
    }

    Vue.prototype.$connectionHub
        .invoke("RemoveRolIDFromGroup", rolId)
        .catch((err) => {
            console.log(err);
        });

    if (store.getters.traerCliente == null) return;
    Vue.prototype.$connectionHub
        .invoke("RemoveClienteIDFromGroup", clienteId)
        .catch((err) => {
            console.log(err);
        });
}

//---------------Fin SignalR------------------------------