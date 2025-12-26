import { API_CONFIG } from '../services/apiConfig';

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (!API_CONFIG.VALID_IMAGE_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)' 
    };
  }

  if (file.size > API_CONFIG.MAX_FILE_SIZE) {
    return { 
      isValid: false, 
      error: 'Image size must be less than 20MB' 
    };
  }

  return { isValid: true };
};

/**
 * Convert image file to base64
 */
export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      try {
        const base64 = reader.result.split(',')[1];
        if (!base64) {
          reject(new Error('Failed to convert image to base64'));
          return;
        }
        resolve(base64);
      } catch (err) {
        reject(new Error('Error processing image data'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Create preview URL for image
 */
export const createPreviewUrl = (file) => {
  if (!file || !file.type.startsWith('image/')) {
    return null;
  }
  return URL.createObjectURL(file);
};

/**
 * Revoke preview URL to free memory
 */
export const revokePreviewUrl = (url) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};