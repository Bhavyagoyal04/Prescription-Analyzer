import { useState } from 'react';
import prescriptionController from '../controllers/PrescriptionController';
import { createPreviewUrl, revokePreviewUrl } from '../utils/imageUtils';

/**
 * Custom hook for prescription analysis
 */
export const usePrescriptionAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Handle file selection
   */
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(createPreviewUrl(file));
      setError(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  /**
   * Analyze prescription
   */
  const analyzePrescription = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    const result = await prescriptionController.analyzePrescription(selectedFile);

    if (result.success) {
      setAnalysisResult(result.rawText);
      setShowModal(true);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  /**
   * Clear selection
   */
  const clearSelection = () => {
    if (previewUrl) {
      revokePreviewUrl(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
  };

  /**
   * Close modal
   */
  const closeModal = () => {
    setShowModal(false);
  };

  /**
   * Check if API is configured
   */
  const isConfigured = prescriptionController.isConfigured();

  return {
    selectedFile,
    previewUrl,
    isLoading,
    showModal,
    analysisResult,
    error,
    isConfigured,
    handleFileSelect,
    analyzePrescription,
    clearSelection,
    closeModal
  };
};