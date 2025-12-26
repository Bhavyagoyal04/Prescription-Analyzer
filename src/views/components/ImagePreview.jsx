import { X, Loader2 } from 'lucide-react';

const ImagePreview = ({ previewUrl, onClear, onFileChange, onAnalyze, isLoading }) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <img
          src={previewUrl}
          alt="Prescription preview"
          className="w-full max-h-96 object-contain rounded-lg border-2 border-gray-200"
        />
        <button
          onClick={onClear}
          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-4">
        <label
          htmlFor="file-upload-change"
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer text-center"
        >
          Change Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="hidden"
          id="file-upload-change"
        />
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Prescription'
          )}
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;