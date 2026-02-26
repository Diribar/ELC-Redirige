"use strict"; // cookies + redirige
console.clear();

// Requires
const path = require("path");
const express = require("express");
const app = express();

// Para usar cookies
const cookies = require("cookie-parser");
app.use(cookies());

// Entornos
const entProd = true;

// Listener
const puerto = entProd ? 4205 : 3001;
if (!entProd) {
	const https = require("https");
	const fs = require("fs");
	const opciones = {cert: fs.readFileSync("./https-cert.pem"), key: fs.readFileSync("./https-clave.pem")};
	https.createServer(opciones, app).listen(puerto, () => console.log("ELC Películas Redirecciona - Servidor funcionando...")); // Para conectarse con el servidor
} else app.listen(puerto, () => console.log("ELC Películas Redirecciona - Servidor funcionando...")); // Para conectarse con el servidor

// Redirige
const url = "https://peliculasconvalorescatolicos";
const urlHost = url + (entProd ? ".com" : ":3006");
const maxAge = 1000 * 60 * 60 * 24 * 365;
app.use((req, res) => {
	// Acciones si pide cookies
	if (req.query.pideCookies) {
		// Variables
		const {cliente_id, email} = req.cookies;

		// Extiende la vigencia de las cookies
		if (cliente_id) res.cookie("cliente_id", cliente_id, {maxAge}); // un año
		if (email) res.cookie("email", email, {maxAge}); // un año

		// Prepara las cookies de 'cliente_id' y 'email'
		if (cliente_id) req.originalUrl += "&cliente_id=" + cliente_id;
		if (email) req.originalUrl += "&email=" + email;

		// Otras
		if (!cliente_id && !email) req.originalUrl += "&sinCookie=true"; // Si no tiene ninguna de ellas, envía la cookie 'sinCookie'
		req.originalUrl = req.originalUrl.replace("pideCookies=true&", ""); // Limpia el url
	}

	// Redirige a 'peliculasconvalorescatolicos'
	return res.redirect(urlHost + req.originalUrl);
});
