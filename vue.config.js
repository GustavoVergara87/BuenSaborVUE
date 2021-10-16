const path = require("path");
const serverURL = "http://elbuensabor.ddns.net:82";
//const serverURL = "https://localhost:44350";
// const serverURL = "http://192.168.1.35:82";

module.exports = {
	publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
	devServer: {
		headers: {
			"Access-Control-Allow-Private-Network": true,
			"Access-Control-Allow-Origin": "*",
		},
		disableHostCheck: true,
		proxy: {
			"/api": {
				target: serverURL,
			},
			"/image": {
				target: serverURL + "/api/Images",
				pathRewrite: { "^/image": "" },
			},
			"/notificacionesHub": {
				target: serverURL + "/notificacionesHub",
				pathRewrite: { "^/notificacionesHub": "" },
			},
		},
	},
};
