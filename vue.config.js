const path = require("path");

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
				target: process.env.VUE_APP_BACKURL,
				// target: 'https://localhost:44350'
			},
			"/image": {
				target: process.env.VUE_APP_BACKURL + "/api/Images",
				// target: "https://localhost:44350/api/Images",
				pathRewrite: { "^/image": "" },
			},
			"/notificacionesHub": {
				target: process.env.VUE_APP_BACKURL + "/notificacionesHub",
				// target: 'https://localhost:44350/notificacionesHub',
				pathRewrite: { "^/notificacionesHub": "" },
			},
		},
	},
};
