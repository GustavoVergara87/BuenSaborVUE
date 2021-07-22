// import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'

// const connection = new HubConnectionBuilder()
//   .withUrl('https://localhost:44350/notificacionesHub')
//   .configureLogging(LogLevel.Information)
//   .build()

// connection.start() //{ withCredentials: false } necesario si AllowAnyOrigin esta en el back. Según SO, pero no anda
// import Vue from "vue";
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
export default {
    install() {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:44350/notificacionesHub')
            .configureLogging(LogLevel.Information)
            .build()
        //   connection.start() //el bloque de abajo es para que reintente la conexion en caso de que se pierda
        //If the connection is closed, we simply try to connect again. In the event we couldn’t establish the connection, it retries after 5 seconds.
        let startedPromise = null
        function start() {
            startedPromise = connection.start().catch(err => {
                console.error('Failed to connect with hub', err)
                return new Promise((resolve, reject) =>
                    setTimeout(() => start().then(resolve).catch(reject), 5000))
            })
            return startedPromise
        }
        connection.onclose(() => start())

        start()
    }
}
