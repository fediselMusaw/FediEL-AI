
```javascript
// ===============================
// FediEL-Chem 2026
// By Fedisel Musaw
// ===============================

// Traduction FR -> EN

const dicoChimie = {
    "eau":"water",
    "glucose":"glucose",
    "éthanol":"ethanol",
    "aspirine":"aspirin",
    "caféine":"caffeine",
    "paracétamol":"paracetamol",
    "ibuprofène":"ibuprofen",
    "méthane":"methane",
    "propane":"propane",
    "butane":"butane",
    "dioxyde de carbone":"carbon dioxide",
    "dioxygène":"oxygen",
    "diazote":"nitrogen",
    "ammoniac":"ammonia",
    "acétone":"acetone",
    "benzène":"benzene",
    "glycérol":"glycerol",
    "chlorure de sodium":"sodium chloride",
    "méthanol":"methanol",
    "glycine":"glycine",
    "alanine":"alanine",
    "urée":"urea",
    "fructose":"fructose",
    "galactose":"galactose",
    "cholestérol":"cholesterol",
    "adrénaline":"adrenaline",
    "vitamine c":"ascorbic acid",
    "testostérone":"testosterone",
    "cortisol":"cortisol"
};

// ===============================
// Changement de langue
// ===============================

function setLang(lang){

    document.querySelectorAll("[data-en]").forEach(el => {

        const text =
            el.getAttribute("data-" + lang);

        if(text){
            el.innerText = text;
        }

    });
}

// ===============================
// Navigation entre sections
// ===============================

function show(id){

    document
    .querySelectorAll(".section")
    .forEach(section => {
        section.classList.remove("active");
    });

    const target =
        document.getElementById(id);

    if(target){
        target.classList.add("active");
    }
}

// ===============================
// Recherche Molécule PubChem
// ===============================

async function rechercherMolecule(){

    const input =
        document
        .getElementById("molInput")
        .value
        .trim()
        .toLowerCase();

    const resultatDiv =
        document.getElementById("molResult");

    if(!input){

        resultatDiv.innerHTML =
            "Please enter a molecule name.";

        return;
    }

    const nomAnglais =
        dicoChimie[input] || input;

    resultatDiv.innerHTML =
        "<em>Searching molecule...</em>";

    try{

        const response =
            await fetch(
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${nomAnglais}/property/MolecularFormula,MolecularWeight/JSON`
            );

        if(!response.ok){
            throw new Error("Not found");
        }

        const data =
            await response.json();

        const props =
            data.PropertyTable.Properties[0];

        const imageUrl =
            `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${nomAnglais}/PNG`;

        resultatDiv.innerHTML = `

            <img
                src="${imageUrl}"
                width="220"
                alt="${nomAnglais}"
            >

            <br><br>

            <strong>Name:</strong>
            ${nomAnglais}

            <br>

            <strong>Formula:</strong>
            ${props.MolecularFormula}

            <br>

            <strong>Molecular Weight:</strong>
            ${props.MolecularWeight} g/mol

        `;

    }

    catch(error){

        resultatDiv.innerHTML =

        "Molécule introuvable / Molecule not found.";

        console.error(error);
    }
}

console.log("FediEL-Chem loaded successfully");
```
const labTools = {
  beaker: {
    name: "Beaker",
    image: "images/beaker.png",
    use: "Used to hold, mix, and heat liquids.",
    precaution: "Not suitable for precise volume measurements."
  },

  erlenmeyer: {
    name: "Erlenmeyer Flask",
    image: "images/erlenmeyer.png",
    use: "Used for mixing and storing solutions.",
    precaution: "Do not seal while heating."
  },

  burette: {
    name: "Burette",
    image: "images/burette.png",
    use: "Used in titration experiments.",
    precaution: "Check for air bubbles before use."
  },

  pipette: {
    name: "Pipette",
    image: "images/pipette.png",
    use: "Transfers precise liquid volumes.",
    precaution: "Use the correct pipette filler."
  },

  graduatedCylinder: {
    name: "Graduated Cylinder",
    image: "images/graduated-cylinder.png",
    use: "Measures liquid volume.",
    precaution: "Read volume at eye level."
  },

  funnel: {
    name: "Funnel",
    image: "images/funnel.png",
    use: "Transfers liquids and assists filtration.",
    precaution: "Use proper filter paper if filtering."
  },

  balance: {
    name: "Electronic Balance",
    image: "images/balance.png",
    use: "Measures mass accurately.",
    precaution: "Calibrate before use."
  },

  thermometer: {
    name: "Thermometer",
    image: "images/thermometer.png",
    use: "Measures temperature.",
    precaution: "Avoid sudden temperature shocks."
  },

  stirringRod: {
    name: "Glass Stirring Rod",
    image: "images/stirring-rod.png",
    use: "Mixes solutions.",
    precaution: "Handle carefully to avoid breakage."
  },

  ringStand: {
    name: "Ring Stand",
    image: "images/ring-stand.png",
    use: "Supports laboratory apparatus.",
    precaution: "Ensure stability before heating."
  },

  testTube: {
    name: "Test Tube",
    image: "images/test-tube.png",
    use: "Holds small quantities of chemicals.",
    precaution: "Point away when heating."
  },

  watchGlass: {
    name: "Watch Glass",
    image: "images/watch-glass.png",
    use: "Evaporates small samples.",
    precaution: "Handle carefully."
  },

  crucible: {
    name: "Crucible",
    image: "images/crucible.png",
    use: "Heats substances at high temperatures.",
    precaution: "Use crucible tongs."
  },

  tongs: {
    name: "Crucible Tongs",
    image: "images/tongs.png",
    use: "Handles hot equipment.",
    precaution: "Ensure a firm grip."
  },

  washBottle: {
    name: "Wash Bottle",
    image: "images/wash-bottle.png",
    use: "Dispenses distilled water.",
    precaution: "Label contents clearly."
  }
};

function showLabTool(toolId) {
  const tool = labTools[toolId];

  document.getElementById("labResult").innerHTML = `
    <h3>${tool.name}</h3>
    <img src="${tool.image}" alt="${tool.name}" width="220">
    <p><strong>Use:</strong> ${tool.use}</p>
    <p><strong>Precaution:</strong> ${tool.precaution}</p>
  `;
}
