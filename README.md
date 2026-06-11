# FediEl-AI Clinical Pharmacy Assistant

A small classroom-demo web app for AI-assisted clinical pharmacy and pharmacovigilance screening.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and add a free Google Gemini API key:

   ```bash
   GEMINI_API_KEY=your_key_here
   ```

3. Start the app:

   ```bash
   npm start
   ```

4. Open `http://localhost:3000`.

The app uses Google Gemini's public REST API and does not download local model files.
