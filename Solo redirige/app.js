"use strict"; // redirige
console.clear();

// Requires
const express = require("express");
const app = express();

// Entornos
const entProd = true;

// Listener
const puerto = entProd ? 4205 : 80;
app.listen(puerto, () => console.log("ELC Redirecciona - Servidor funcionando..."));

// Redirige a 'peliculas.elc'
const url = "https://peliculasconvalorescatolicos";
const urlHost = url + (entProd ? ".com" : ":3001");
app.use((req, res) => res.redirect(urlHost + req.originalUrl));
