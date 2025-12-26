import { API_CONFIG } from './apiConfig';

/**
 * Gemini API Service
 * Handles all API calls to Gemini
 */
class GeminiService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    this.baseUrl = API_CONFIG.GEMINI_BASE_URL;
  }

  /**
   * Check if API key is configured
   */
  isConfigured() {
    return !!this.apiKey;
  }

  /**
   * Build API URL
   */
  getApiUrl(model = 'gemini-2.5-flash') {
    return `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`;
  }

  /**
   * Analyze prescription image
   */
  async analyzePrescription(base64Image, mimeType) {
    const url = this.getApiUrl();

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: API_CONFIG.PRESCRIPTION_PROMPT
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image
              }
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    return this.handleResponse(response);
  }

  /**
   * Fetch medication alternatives
   */
  async fetchAlternatives(medicationName) {
    const url = this.getApiUrl();

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: API_CONFIG.getAlternativesPrompt(medicationName)
            }
          ]
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    return this.handleResponse(response);
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw this.createError(response.status, errorData);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Invalid response from Gemini API');
    }

    return text;
  }

  /**
   * Create appropriate error based on status code
   */
  createError(status, errorData) {
    const errorMessages = {
      400: 'Invalid API request. Check your API key and image.',
      401: 'Invalid API key. Please check and try again.',
      403: 'API access denied. Check your API key permissions.',
      429: 'Too many requests. Please wait a moment and try again.',
      500: 'Gemini API server error. Please try again later.'
    };

    const message = errorMessages[status] || errorData.error?.message || `API error: ${status}`;
    return new Error(message);
  }
}

export default new GeminiService();