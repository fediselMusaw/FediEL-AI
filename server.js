const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const SYSTEM_PROMPT =
  "You are an expert clinical hospital pharmacist and a brilliant professor of pharmacology. Analyze the user's input strictly for drug-drug interactions, contraindications, mechanism of action overlap, and severe adverse effects. Provide a structured, highly technical yet clear pharmacological report with severity ratings (High, Moderate, Low). IMPORTANT: Always include a dedicated section for students called 'PharmD Study Notes' explaining the core pharmacological mechanism and high-yield exam concepts for these drugs. Always conclude with a standard professional legal medical disclaimer.";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/screen", async (req, res) => {
  const regimen = String(req.body?.regimen || "").trim();

  if (!regimen) {
    return res.status(400).json({
      error: "Please enter a treatment regimen or active compounds to screen."
    });
  }

  if (!GEMINI_API_KEY) {
    return res.status(503).json({
      error:
        "AI service is not configured. Add GEMINI_API_KEY to a .env file, then restart the app."
    });
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    GEMINI_MODEL
  )}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  try {
    const aiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Patient treatment regimen / active compounds:\n${regimen}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          maxOutputTokens: 1600
        },
        stream: false
      })
    });

    const data = await aiResponse.json().catch(() => ({}));

    if (!aiResponse.ok) {
      return res.status(aiResponse.status).json({
        error:
          data?.error?.message ||
          "The AI screening service returned an error. Please try again later."
      });
    }

    const report =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part.text || "")
        .join("\n")
        .trim() || "";

    if (!report) {
      return res.status(502).json({
        error:
          "The AI service responded, but no clinical report was returned. Please try a clearer regimen."
      });
    }

    res.json({ report });
  } catch (error) {
    console.error("AI screening request failed:", error);
    res.status(503).json({
      error:
        "Network connection unavailable or AI service unreachable. Please check your internet connection and try again."
    });
  }
});

app.listen(PORT, () => {
  console.log(`FediEl AI Clinical Pharmacy Assistant running at http://localhost:${PORT}`);
});
