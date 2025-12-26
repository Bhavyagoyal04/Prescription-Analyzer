import { AlertCircle } from 'lucide-react';
import UploadArea from '../components/UploadArea';
import ImagePreview from '../components/ImagePreview';
import ErrorAlert from '../components/ErrorAlert';
import ResultModal from '../components/ResultModal';
import { usePrescriptionAnalyzer } from '../../hooks/usePrescriptionAnalyzer';
import { useAlternatives } from '../../hooks/useAlternatives';

const PrescriptionAnalyzer = () => {
  const {
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
  } = usePrescriptionAnalyzer();

  const alternativesState = useAlternatives();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-8 px-4"
      style={{ backgroundImage: "url('/bg-medical.jpg')" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Prescription Analyzer
          </h1>
          <p className="text-gray-600">
            Upload a doctor's prescription image for AI-powered analysis
          </p>
        </div>

        {/* API Key Warning */}
        {!isConfigured && (
          <div className="max-w-5xl mx-auto mb-6 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Configuration Error</h3>
                <p className="text-red-800 text-sm">
                  The Gemini API key environment variable is not set. Please add{' '}
                  <code className="bg-red-100 px-2 py-1 rounded">VITE_GEMINI_API_KEY</code> to your{' '}
                  <code className="bg-red-100 px-2 py-1 rounded">.env.local</code> file.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {!previewUrl ? (
            <UploadArea onFileSelect={handleFileSelect} />
          ) : (
            <ImagePreview
              previewUrl={previewUrl}
              onClear={clearSelection}
              onFileChange={handleFileChange}
              onAnalyze={analyzePrescription}
              isLoading={isLoading}
            />
          )}

          <ErrorAlert message={error} />
        </div>
      </div>

      {/* Result Modal */}
      <ResultModal
        isOpen={showModal}
        onClose={closeModal}
        result={analysisResult}
        onFetchAlternatives={alternativesState.fetchAlternatives}
        alternativesState={{
          showAlternatives: alternativesState.showAlternatives,
          selectedMedication: alternativesState.selectedMedication,
          data: alternativesState.alternatives,
          isLoading: alternativesState.isLoading,
          onClose: alternativesState.closeAlternatives
        }}
      />
    </div>
  );
};

export default PrescriptionAnalyzer;