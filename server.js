const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Sert les fichiers statiques (ton site web) directement depuis la racine
app.use(express.static(__dirname));

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`FediEl Assistant running at http://localhost:${PORT}`);
});
