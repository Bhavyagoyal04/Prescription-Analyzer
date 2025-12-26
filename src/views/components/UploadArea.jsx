import { Upload } from 'lucide-react';

const UploadArea = ({ onFileSelect }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-3 border-dashed border-indigo-300 rounded-xl p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer bg-indigo-50"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Drop your prescription here or click to browse
        </p>
        <p className="text-sm text-gray-500">
          Supports: JPG, PNG, JPEG, WebP
        </p>
      </label>
    </div>
  );
};

export default UploadArea;