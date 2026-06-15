const form = document.querySelector("#screening-form");
const regimenInput = document.querySelector("#regimen");
const runButton = document.querySelector("#run-button");
const statusMessage = document.querySelector("#status");
const reportOutput = document.querySelector("#report");

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const regimen = regimenInput.value.trim();
  if (!regimen) {
    setStatus("Please enter a treatment regimen or active compounds to screen.", true);
    return;
  }

  runButton.disabled = true;
  runButton.textContent = "Screening pharmacology profile...";
  reportOutput.textContent = "";
  setStatus("Connecting to the secure AI screening endpoint...");

  try {
    const response = await fetch("/api/screen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ regimen })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Unable to complete pharmacological screening.");
    }

    reportOutput.textContent = data.report;
    setStatus("Screening complete. Review the AI output with clinical judgment.");
  } catch (error) {
    setStatus(
      error.message ||
        "Network connection unavailable or AI service unreachable. Please try again later.",
      true
    );
  } finally {
    runButton.disabled = false;
    runButton.textContent = "⚡ Run Pharmacological Screening";
  }
});

const dicoChimie = {
    "eau": "water", "glucose": "glucose", "éthanol": "ethanol", "aspirine": "aspirin",
    "caféine": "caffeine", "méthane": "methane", "propane": "propane", "butane": "butane",
    "dioxyde de carbone": "carbon dioxide", "dioxygène": "oxygen", "diazote": "nitrogen",
    "acide sulfurique": "sulfuric acid", "acide chlorhydrique": "hydrochloric acid",
    "ammoniac": "ammonia", "acétone": "acetone", "benzène": "benzene", "glycérol": "glycerol",
    "acide acétique": "acetic acid", "chlorure de sodium": "sodium chloride",
    "méthanol": "methanol", "glycine": "glycine", "alanine": "alanine",
    "phénol": "phenol", "toluène": "toluene", "urée": "urea", "saccharose": "sucrose",
    "fructose": "fructose", "galactose": "galactose", "acide citrique": "citric acid",
    "formaldéhyde": "formaldehyde", "cholestérol": "cholesterol", "adrénaline": "adrenaline",
    "acide lactique": "lactic acid", "vitamine c": "ascorbic acid", "paracétamol": "paracetamol",
    "éthylène": "ethylene", "valine": "valine", "leucine": "leucine", "isoleucine": "isoleucine",
    "sérine": "serine", "thréonine": "threonine", "cystéine": "cysteine", "méthionine": "methionine",
    "acide aspartique": "aspartic acid", "acide glutamique": "glutamic acid", "lysine": "lysine",
    "arginine": "arginine", "histidine": "histidine", "phénylalanine": "phenylalanine",
    "tyrosine": "tyrosine", "tryptophane": "tryptophan", "proline": "proline", "pentane": "pentane",
    "hexane": "hexane", "heptane": "heptane", "octane": "octane", "nonane": "nonane",
    "décane": "decane", "éthylène glycol": "ethylene glycol", "chloroforme": "chloroform",
    "acide formique": "formic acid", "acide butyrique": "butyric acid", "acide palmitique": "palmitic acid",
    "acide stéarique": "stearic acid", "acide oléique": "oleic acid", "naphtalène": "naphthalene",
    "anthracène": "anthracene", "aniline": "aniline", "nitrobenzène": "nitrobenzene",
    "acide benzoïque": "benzoic acid", "benzaldéhyde": "benzaldehyde", "sulfate de cuivre": "copper sulfate",
    "nitrate d'argent": "silver nitrate", "hydroxyde de sodium": "sodium hydroxide",
    "bicarbonate de soude": "sodium bicarbonate", "peroxyde d'hydrogène": "hydrogen peroxide",
    "éther éthylique": "diethyl ether", "isopropanol": "isopropanol", "butan-1-ol": "1-butanol",
    "butan-2-ol": "2-butanol", "acétaldéhyde": "acetaldehyde", "butanal": "butanal",
    "acide propionique": "propionic acid", "valine": "valine", "asparagine": "asparagine",
    "glutamine": "glutamine", "vitamine a": "retinol", "vitamine d": "calciferol",
    "vitamine e": "tocopherol", "vitamine k": "phylloquinone", "acide salicylique": "salicylic acid",
    "vanilline": "vanillin", "ibuprofène": "ibuprofen", "codéine": "codeine",
    "morphine": "morphine", "testostérone": "testosterone", "oestradiol": "estradiol",
    "progestérone": "progesterone", "cortisol": "cortisol"
};

// 2. Fonction de changement de langue
    function setLang(lang) {
        document.querySelectorAll('[data-en]').forEach(el => {
            el.innerText = el.getAttribute('data-' + lang);
        });
    }

    // 3. Fonction pour changer de section
    function show(id) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    }

    // 4. Fonction de recherche PubChem avec dictionnaire
    async function rechercherMolecule() {
        const input = document.getElementById("molInput").value.trim().toLowerCase();
        const resultatDiv = document.getElementById("molResult");
        
        // Traduction via le dictionnaire
        const nomAnglais = dicoChimie[input] || input;

        resultatDiv.innerHTML = "<em>Recherche en cours... / Searching...</em>";

        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${nomAnglais}/property/MolecularFormula,MolecularWeight/JSON`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Non trouvé");
            const data = await response.json();
            
            const props = data.PropertyTable.Properties[0];
            resultatDiv.innerHTML = `
                <strong>Formula:</strong> ${props.MolecularFormula}<br>
                <strong>Molecular Weight:</strong> ${props.MolecularWeight} g/mol
            `;
        } catch (error) {
            resultatDiv.innerHTML = "Molécule introuvable / Molecule not found.";
        }
    }
</script>
