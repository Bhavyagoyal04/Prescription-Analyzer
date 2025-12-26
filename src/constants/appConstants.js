// src/constants/appConstants.js

/**
 * Application Constants
 */
export const APP_CONSTANTS = {
    APP_NAME: 'Prescription Analyzer',
    APP_DESCRIPTION: "Upload a doctor's prescription image for AI-powered analysis",
    
    // File validation
    MAX_FILE_SIZE_MB: 20,
    SUPPORTED_FORMATS: ['JPG', 'PNG', 'JPEG', 'WebP', 'GIF'],
    
    // UI Messages
    MESSAGES: {
      NO_FILE_SELECTED: 'Please select an image first',
      INVALID_FILE_TYPE: 'Please select a valid image file',
      API_KEY_MISSING: 'Gemini API key is not configured. Please check your environment variables.',
      ANALYSIS_SUCCESS: 'Prescription analyzed successfully',
      ANALYSIS_FAILED: 'Failed to analyze prescription',
      NO_ALTERNATIVES_FOUND: 'No alternatives found for this medication',
      CONSULT_PROFESSIONAL: 'Always verify prescription details with a healthcare professional',
      ALTERNATIVES_DISCLAIMER: 'This information is for reference only. Always consult your doctor or pharmacist before switching medications.'
    },
    
    // API Configuration Keys
    ENV_KEYS: {
      GEMINI_API_KEY: 'VITE_GEMINI_API_KEY'
    }
  };