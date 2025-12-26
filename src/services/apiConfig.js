/**
 * API Configuration
 * Centralized configuration for API endpoints and prompts
 */
export const API_CONFIG = {
    GEMINI_BASE_URL: 'https://generativelanguage.googleapis.com/v1beta',
    
    MAX_FILE_SIZE: 20 * 1024 * 1024, // 20MB
    
    VALID_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
  
    PRESCRIPTION_PROMPT: `You are an expert Medical Transcriptionist. Analyze the uploaded prescription image. 
  Extract the following information. If any item is not visible or illegible, state 'N/A' for that field. 
  
  <OUTPUT_FORMAT>
  1) Patient Name: [Extracted Name or N/A]
  2) Medication Names: [List all names clearly separated by commas, e.g., 'Aspirin, Amoxicillin']
  3) Dosage Information: [List all dosages corresponding to medications, e.g., '500mg, 250mg']
  4) Frequency: [List all frequencies, e.g., 'Twice daily, Once at bedtime']
  5) Duration: [List all durations, e.g., '7 days, Until finished']
  6) Doctor Name/Signature: [Name or N/A]
  7) Date: [Extracted Date in YYYY-MM-DD format or N/A]
  8) Warnings/Contraindications: [List any explicit warnings or N/A]
  </OUTPUT_FORMAT>
  
  Provide ONLY the text within the <OUTPUT_FORMAT> tags.`,
  
    getAlternativesPrompt: (medicationName) => `You are a pharmaceutical database expert specializing in the Indian medicine market. Find alternatives for the medication "${medicationName}".
  
  REQUIREMENTS:
  1. Search for both GENERIC and BRAND NAME alternatives
  2. Focus ONLY on medicines available in India
  3. Include accurate price ranges in Indian Rupees (₹)
  4. Prioritize commonly prescribed and widely available options
  5. Include both cheaper generic versions and premium branded options
  
  OUTPUT FORMAT - Return ONLY valid JSON (no markdown, no backticks, no extra text):
  
  {
    "alternatives": [
      {
        "name": "Exact medicine name as sold in India",
        "type": "Generic" OR "Brand",
        "price": "₹[lowest]-[highest] per [unit, e.g., strip of 10 tablets]",
        "manufacturer": "Actual pharmaceutical company name",
        "note": "Key differentiator - e.g., 'Same salt, lower cost', 'Extended release formula', 'Combination drug', etc."
      }
    ]
  }
  
  GUIDELINES:
  - Provide 6-8 alternatives (mix of generic and branded)
  - Price format: "₹50-80 per strip of 10 tablets" or "₹200-350 per bottle of 100ml"
  - For generics: mention if bioequivalent, cost savings vs brand
  - For brands: mention unique features (e.g., faster absorption, better tolerability)
  - Note any combination drugs or different formulations
  - Mention if medicine is OTC (Over-The-Counter) or requires prescription
  
  CRITICAL: Return ONLY the JSON object. No preamble, no markdown formatting, no explanations.`
};