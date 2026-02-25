"use strict"; // redirige
console.clear();

// Requires
const path = require("path");
const express = require("express");
const app = express();

// Entornos
const entProd = true;

// Listener
const puerto = entProd ? 4204 : 80;
app.listen(puerto, () => console.log("ELC Redirecciona - Servidor funcionando..."));

// Redirige a 'peliculas.elc'
const inicio = "https://peliculas";
const elc = ".evangelicemoslacultura.com";
const urlHost = inicio + (entProd ? elc : elc + ":3001");
app.use((req, res) => res.redirect(urlHost + req.originalUrl));
