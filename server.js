const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

// Sert les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, "public")));

// Route pour la page d'accueil
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`FediEl Assistant running at http://localhost:${PORT}`);
});
