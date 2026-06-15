
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
