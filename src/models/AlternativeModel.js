/**
 * Alternative Medicine Data Model
 * Defines the structure for medicine alternatives
 */
export class AlternativeModel {
    constructor(data = {}) {
      this.name = data.name || '';
      this.type = data.type || 'Generic';
      this.price = data.price || '';
      this.manufacturer = data.manufacturer || '';
      this.note = data.note || '';
    }
  
    /**
     * Validate alternative data
     */
    isValid() {
      return this.name && this.type && this.price && this.manufacturer;
    }
  
    /**
     * Check if it's a generic medicine
     */
    isGeneric() {
      return this.type.toLowerCase() === 'generic';
    }
  
    /**
     * Check if it's a brand medicine
     */
    isBrand() {
      return this.type.toLowerCase() === 'brand';
    }
  }
  
  /**
   * Alternatives Response Model
   * Container for multiple alternatives
   */
  export class AlternativesResponseModel {
    constructor(data = {}) {
      this.alternatives = (data.alternatives || []).map(alt => new AlternativeModel(alt));
      this.medicationName = data.medicationName || '';
    }
  
    /**
     * Parse JSON response into model
     */
    static parseFromJSON(jsonData, medicationName) {
      return new AlternativesResponseModel({
        alternatives: jsonData.alternatives || [],
        medicationName
      });
    }
  
    /**
     * Get count of alternatives
     */
    getCount() {
      return this.alternatives.length;
    }
  
    /**
     * Get only generic alternatives
     */
    getGenerics() {
      return this.alternatives.filter(alt => alt.isGeneric());
    }
  
    /**
     * Get only brand alternatives
     */
    getBrands() {
      return this.alternatives.filter(alt => alt.isBrand());
    }
  
    /**
     * Check if response has alternatives
     */
    hasAlternatives() {
      return this.alternatives.length > 0;
    }
  
    /**
     * Validate all alternatives
     */
    isValid() {
      return this.alternatives.every(alt => alt.isValid());
    }
}