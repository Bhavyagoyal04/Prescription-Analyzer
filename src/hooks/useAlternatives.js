import { useState } from 'react';
import alternativeController from '../controllers/AlternativeController';

/**
 * Custom hook for fetching medication alternatives
 */
export const useAlternatives = () => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [alternatives, setAlternatives] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetch alternatives for medication
   */
  const fetchAlternatives = async (medicationName) => {
    setIsLoading(true);
    setSelectedMedication(medicationName);
    
    const result = await alternativeController.fetchAlternatives(medicationName);
    
    if (result.success) {
      setAlternatives(result.data);
      setShowAlternatives(true);
    } else {
      setAlternatives(result.error);
      setShowAlternatives(true);
    }
    
    setIsLoading(false);
  };

  /**
   * Close alternatives view
   */
  const closeAlternatives = () => {
    setShowAlternatives(false);
    setSelectedMedication(null);
    setAlternatives(null);
  };

  /**
   * Reset state
   */
  const reset = () => {
    setShowAlternatives(false);
    setSelectedMedication(null);
    setAlternatives(null);
    setIsLoading(false);
  };

  return {
    showAlternatives,
    selectedMedication,
    alternatives,
    isLoading,
    fetchAlternatives,
    closeAlternatives,
    reset
  };
};