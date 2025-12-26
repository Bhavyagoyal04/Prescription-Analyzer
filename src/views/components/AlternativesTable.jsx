import { Loader2, AlertCircle } from 'lucide-react';

const AlternativesTable = ({ alternatives, selectedMedication, isLoading, onBack }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Alternatives for {selectedMedication}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Market alternatives with pricing information
          </p>
        </div>
        <button
          onClick={onBack}
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-4 py-2 rounded-lg font-medium transition-all text-sm"
        >
          ← Back to Results
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
          <p className="text-gray-600">Searching for alternatives...</p>
        </div>
      ) : alternatives ? (
        <div>
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4">
            <p className="text-amber-800 text-sm font-medium">
              ⚠️ This information is for reference only. Always consult your doctor or pharmacist before switching medications.
            </p>
          </div>
          
          {typeof alternatives === 'string' ? (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 text-sm font-medium mb-1">Error Loading Alternatives</p>
                  <p className="text-red-700 text-sm">{alternatives}</p>
                </div>
              </div>
            </div>
          ) : alternatives.alternatives && alternatives.alternatives.length > 0 ? (
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <tr>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">#</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Medicine Name</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Price Range</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Manufacturer</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-white uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {alternatives.alternatives.map((alt, index) => (
                    <tr key={index} className="hover:bg-purple-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700 text-center align-middle">{index + 1}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center align-middle">{alt.name}</td>
                      <td className="px-4 py-3 text-sm text-center align-middle">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          alt.type === 'Generic' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {alt.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-purple-700 text-center align-middle">{alt.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-700 text-center align-middle">{alt.manufacturer}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-center align-middle">{alt.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No alternatives found for this medication.</p>
              <button
                onClick={onBack}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-600 text-center py-8">No alternatives available</p>
      )}
    </div>
  );
};

export default AlternativesTable;