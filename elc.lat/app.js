"use strict"; // 2025-ago-26
console.clear();

// Requires
const path = require("path");
const express = require("express");
const app = express();

// Entornos
const carpeta = path.basename(path.join(__dirname));
const entProd = carpeta == "1-Actual";
const entPrueba = carpeta == "2-Prueba";

// Listener
const puerto = entProd ? 4204 : entPrueba ? 4201 : 80;
app.listen(puerto, () => console.log("ELC Redirecciona - Servidor funcionando..."));

// Redirige a 'peliculas.elc'
const inicio = "https://peliculas";
const url = ".evangelicemoslacultura.com";
const urlHost = inicio + (entProd ? url : entPrueba ? "2" + url : url + ":3006");
app.use((req, res) => {
	console.log(23, new Date());
	res.redirect(urlHost + req.originalUrl);
});
