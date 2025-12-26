import geminiService from '../services/geminiService';
import { AlternativesResponseModel } from '../models/AlternativeModel';

/**
 * Alternative Controller
 * Handles business logic for medication alternatives
 */
class AlternativeController {
  /**
   * Fetch alternatives for a medication
   */
  async fetchAlternatives(medicationName) {
    try {
      if (!medicationName || medicationName.trim() === '') {
        throw new Error('Medication name is required');
      }

      // Check API configuration
      if (!geminiService.isConfigured()) {
        throw new Error('Gemini API key is not configured. Please check your environment variables.');
      }

      // Call Gemini API
      const responseText = await geminiService.fetchAlternatives(medicationName);

      // Clean up response (remove markdown code blocks if present)
      const cleanedText = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      // Parse JSON response
      let jsonData;
      try {
        jsonData = JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Raw text:', cleanedText);
        throw new Error('Failed to parse API response. Please try again.');
      }

      // Create model from response
      const alternativesModel = AlternativesResponseModel.parseFromJSON(jsonData, medicationName);

      // Validate model
      if (!alternativesModel.hasAlternatives()) {
        throw new Error('No alternatives found for this medication.');
      }

      return {
        success: true,
        data: alternativesModel
      };

    } catch (error) {
      console.error('Alternatives fetch error:', error);
      
      return {
        success: false,
        error: this.handleError(error)
      };
    }
  }

  /**
   * Handle errors and return user-friendly messages
   */
  handleError(error) {
    if (error.name === 'AbortError') {
      return 'Request timed out. Please try again.';
    } else if (error.message === 'Failed to fetch') {
      return 'Connection failed. Please check your internet connection.';
    }
    
    return error.message || 'Failed to fetch alternatives';
  }
}

export default new AlternativeController();