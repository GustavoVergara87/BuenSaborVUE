// import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

// const connection = new HubConnectionBuilder()
//   .withUrl('https://localhost:44350notificacionesHub')
//   .configureLogging(LogLevel.Information)
//   .build()

// connection.start() //{ withCredentials: false } necesario si AllowAnyOrigin esta en el back. Según SO, pero no anda
// import Vue from "vue";
import store from "../store/index"

import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
export default {
    install(Vue) {
        const connection = new HubConnectionBuilder()
            // .withUrl('https://localhost:44350notificacionesHub')
            .withUrl('https://localhost:44350/notificacionesHub')
            .configureLogging(LogLevel.Information)
            .build()
        //   connection.start() //el bloque de abajo es para que reintente la conexion en caso de que se pierda
        //If the connection is closed, we simply try to connect again. In the event we couldn’t establish the connection, it retries after 5 seconds.
        let startedPromise = null
        function start() {
            startedPromise = connection.start().then(() => {

                //Si existe un usuario logeado en vuex, debe reconectarlo a SignalR
                const clienteId = store.getters.traerCliente.id
                const rolID = store.getters.traerUsuario.rolID

                if (clienteId != 0) {
                    connection.invoke("JoinClienteIDToGroup", clienteId)
                    console.log("cliente reconectado a SignalR")
                } else if (rolID != 0) {
                    connection.invoke("JoinRolIDToGroup", rolID)
                    console.log("usuario reconectado a SignalR")
                }

            }

            )
                .catch(err => {
                    console.error('Failed to connect with hub', err)
                    return new Promise((resolve, reject) =>
                        setTimeout(() => start().catch(reject), 5000))
                })
            return startedPromise
        }

        connection.onclose(() => start())

        start()




        // loggin puede acceder this.$connectionHub para unir a los usuarios a grupos de SignalR
        Vue.prototype.$connectionHub = connection

        // use new Vue instance as an Event Bus
        const notificacionesHub = new Vue()

        // every component will use this.$notificacionesHub to access the event bus
        Vue.prototype.$notificacionesHub = notificacionesHub

        // Forward server side SignalR events through $notificacionesHub, where components will listen to them
        connection.on('Notificacion', (mensaje, pedido) => {
            console.log("Notificacion", { mensaje, pedido })
            notificacionesHub.$emit('Notificacion', { mensaje, pedido })
        })




    }
}
