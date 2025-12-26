/**
 * Prescription Data Model
 * Defines the structure and validation for prescription data
 */
export class PrescriptionModel {
    constructor(data = {}) {
      this.patientName = data.patientName || 'N/A';
      this.medications = data.medications || [];
      this.dosages = data.dosages || [];
      this.frequencies = data.frequencies || [];
      this.durations = data.durations || [];
      this.doctorName = data.doctorName || 'N/A';
      this.date = data.date || 'N/A';
      this.warnings = data.warnings || 'N/A';
    }
  
    /**
     * Parse raw text response into structured data
     */
    static parseFromText(text) {
      if (!text) return null;
  
      const lines = text.split('\n').filter(line => line.trim());
      const data = {};
  
      lines.forEach(line => {
        const match = line.match(/^(\d+\))\s*(.+?):\s*(.+)$/);
        if (match) {
          const label = match[2].toLowerCase();
          const value = match[3];
  
          if (label.includes('patient')) {
            data.patientName = value;
          } else if (label.includes('medication')) {
            data.medications = value.split(',').map(m => m.trim()).filter(m => m && m !== 'N/A');
          } else if (label.includes('dosage')) {
            data.dosages = value.split(',').map(m => m.trim());
          } else if (label.includes('frequency')) {
            data.frequencies = value.split(',').map(m => m.trim());
          } else if (label.includes('duration')) {
            data.durations = value.split(',').map(m => m.trim());
          } else if (label.includes('doctor')) {
            data.doctorName = value;
          } else if (label.includes('date')) {
            data.date = value;
          } else if (label.includes('warning')) {
            data.warnings = value;
          }
        }
      });
  
      return new PrescriptionModel(data);
    }
  
    /**
     * Validate prescription data
     */
    isValid() {
      return this.medications.length > 0 || this.patientName !== 'N/A';
    }
  
    /**
     * Get medications count
     */
    getMedicationCount() {
      return this.medications.length;
    }
  
    /**
     * Check if warnings exist
     */
    hasWarnings() {
      return this.warnings !== 'N/A' && this.warnings.trim().length > 0;
    }
  
    /**
     * Convert to plain object
     */
    toJSON() {
      return {
        patientName: this.patientName,
        medications: this.medications,
        dosages: this.dosages,
        frequencies: this.frequencies,
        durations: this.durations,
        doctorName: this.doctorName,
        date: this.date,
        warnings: this.warnings
      };
    }
}