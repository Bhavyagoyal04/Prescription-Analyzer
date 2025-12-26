import geminiService from '../services/geminiService';
import { PrescriptionModel } from '../models/PrescriptionModel';
import { validateImageFile, convertImageToBase64 } from '../utils/imageUtils';
import { API_CONFIG } from '../services/apiConfig';

/**
 * Prescription Controller
 * Handles business logic for prescription analysis
 */
class PrescriptionController {
  /**
   * Analyze prescription image
   */
  async analyzePrescription(file) {
    try {
      // Validate file
      const validation = validateImageFile(file);
      if (!validation.isValid) {
        throw new Error(validation.error);
      }

      // Check API configuration
      if (!geminiService.isConfigured()) {
        throw new Error('Gemini API key is not configured. Please check your environment variables.');
      }

      // Convert image to base64
      const base64String = await convertImageToBase64(file);

      // Call Gemini API
      const responseText = await geminiService.analyzePrescription(base64String, file.type);

      // Parse response into model
      const prescriptionData = PrescriptionModel.parseFromText(responseText);

      if (!prescriptionData || !prescriptionData.isValid()) {
        throw new Error('Failed to extract valid prescription data');
      }

      return {
        success: true,
        data: prescriptionData,
        rawText: responseText
      };

    } catch (error) {
      console.error('Prescription analysis error:', error);
      
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
    
    return error.message || 'An error occurred while processing the image';
  }

  /**
   * Validate API configuration
   */
  isConfigured() {
    return geminiService.isConfigured();
  }
}

export default new PrescriptionController();