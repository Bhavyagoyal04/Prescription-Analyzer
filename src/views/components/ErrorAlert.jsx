import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
      <p className="text-red-700">{message}</p>
    </div>
  );
};

export default ErrorAlert;