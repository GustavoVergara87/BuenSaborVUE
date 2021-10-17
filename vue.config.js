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
				target: process.env.VUE_APP_FRONTURL,
			},
			"/image": {
				target: process.env.VUE_APP_FRONTURL + "/api/Images",
				pathRewrite: { "^/image": "" },
			},
			"/notificacionesHub": {
				target: process.env.VUE_APP_FRONTURL + "/notificacionesHub",
				pathRewrite: { "^/notificacionesHub": "" },
			},
		},
	},
};
