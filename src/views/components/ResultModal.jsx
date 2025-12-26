import { useState } from 'react';
import { X, FileText, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import AlternativesTable from './AlternativesTable';

const ResultModal = ({ 
  isOpen, 
  onClose, 
  result, 
  onFetchAlternatives, 
  alternativesState 
}) => {
  const [showRaw, setShowRaw] = useState(false);

  if (!isOpen) return null;

  const parseResult = (text) => {
    if (!text) return null;
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map((line) => {
      const match = line.match(/^(\d+\))\s*(.+?):\s*(.+)$/);
      if (match) {
        return { number: match[1], label: match[2], value: match[3] };
      }
      return { raw: line };
    });
  };

  const parsedData = typeof result === "string" ? parseResult(result) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Prescription Analysis</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          {result ? (
            <div className="p-6">
              {/* Toggle Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => setShowRaw(!showRaw)}
                  className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-all"
                >
                  {showRaw ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide Raw Response
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show Raw Response
                    </>
                  )}
                </button>
              </div>

              {/* Content */}
              {showRaw ? (
                <pre className="bg-gray-900 text-green-400 p-5 rounded-xl overflow-x-auto text-xs leading-relaxed font-mono shadow-inner">
                  {JSON.stringify(result, null, 2)}
                </pre>
              ) : alternativesState.showAlternatives ? (
                <AlternativesTable 
                  alternatives={alternativesState.data}
                  selectedMedication={alternativesState.selectedMedication}
                  isLoading={alternativesState.isLoading}
                  onBack={alternativesState.onClose}
                />
              ) : parsedData ? (
                <PrescriptionDetails 
                  parsedData={parsedData}
                  onFetchAlternatives={onFetchAlternatives}
                  isLoadingAlternatives={alternativesState.isLoading}
                  selectedMedication={alternativesState.selectedMedication}
                />
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                  {typeof result === "string" ? result : result.text || "No analysis text available"}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No analysis data available</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-5 flex justify-between items-center">
          <p className="text-xs text-gray-500">
            ⚠️ Always verify prescription details with a healthcare professional
          </p>
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Prescription Details Component
const PrescriptionDetails = ({ parsedData, onFetchAlternatives, isLoadingAlternatives, selectedMedication }) => {
  const medSection = parsedData.find(item => item.label && item.label.toLowerCase().includes('medication'));
  const dosageSection = parsedData.find(item => item.label && item.label.toLowerCase().includes('dosage'));
  const frequencySection = parsedData.find(item => item.label && item.label.toLowerCase().includes('frequency'));
  const durationSection = parsedData.find(item => item.label && item.label.toLowerCase().includes('duration'));
  const warningsSection = parsedData.find(item => item.label && item.label.toLowerCase().includes('warning'));

  const meds = medSection ? medSection.value.split(',').map(m => m.trim()).filter(m => m && m !== 'N/A') : [];
  const dosages = dosageSection ? dosageSection.value.split(',').map(m => m.trim()) : [];
  const frequencies = frequencySection ? frequencySection.value.split(',').map(m => m.trim()) : [];
  const durations = durationSection ? durationSection.value.split(',').map(m => m.trim()) : [];

  return (
    <div className="space-y-6">
      {/* Patient and Doctor Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parsedData.filter(item => 
          item.label && !item.label.toLowerCase().includes('medication') && 
          !item.label.toLowerCase().includes('dosage') &&
          !item.label.toLowerCase().includes('frequency') &&
          !item.label.toLowerCase().includes('duration') &&
          !item.label.toLowerCase().includes('warning')
        ).map((item, index) => (
          <div 
            key={index}
            className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4"
          >
            <p className="text-xs font-semibold text-gray-600 mb-1">
              {item.label}
            </p>
            <p className="text-base text-gray-800 font-medium">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Medications Table */}
      {meds.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Prescribed Medications</h3>
          <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm mb-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                <tr>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">#</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Medication Name</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Dosage</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Frequency</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {meds.map((med, index) => (
                  <tr key={index} className="hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 text-center align-middle">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center align-middle">{med}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center align-middle">{dosages[index] || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center align-middle">{frequencies[index] || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-center align-middle">{durations[index] || 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-center align-middle">
                      <button
                        onClick={() => onFetchAlternatives(med)}
                        disabled={isLoadingAlternatives}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 mx-auto"
                      >
                        {isLoadingAlternatives && selectedMedication === med ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          'Find Alternatives'
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Warnings Section */}
      {warningsSection && warningsSection.value !== 'N/A' && (
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
          <p className="text-xs font-semibold text-amber-800 mb-1">
            ⚠️ {warningsSection.label}
          </p>
          <p className="text-sm text-amber-900">
            {warningsSection.value}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultModal;