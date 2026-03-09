import React, { useState } from 'react';
import { commonSymptoms, diagnoseFromSymptoms } from '../data/symptoms';
import { diseases } from '../data/diseases';
import { Stethoscope, AlertTriangle, ChevronRight, RotateCcw, Check, Info, Zap, Search } from 'lucide-react';

interface SymptomCheckerProps {
  onViewDisease?: (diseaseId: string) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onViewDisease }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [animalType, setAnimalType] = useState<string>('Cattle');
  const [symptomSearch, setSymptomSearch] = useState('');

  const animalTypes = ['Cattle', 'Goats', 'Sheep', 'Pigs', 'Poultry'];

  const filteredSymptoms = symptomSearch
    ? commonSymptoms.filter(s => s.name.toLowerCase().includes(symptomSearch.toLowerCase()))
    : commonSymptoms;

  const toggleSymptom = (id: string) => {
    const newSet = new Set(selectedSymptoms);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedSymptoms(newSet);
    setShowResults(false);
  };

  const results = diagnoseFromSymptoms(Array.from(selectedSymptoms));

  const filteredResults = results.filter(r => {
    const disease = diseases.find(d => d.id === r.diseaseId);
    if (!disease) return false;
    return disease.animalsAffected.some(a => 
      a.toLowerCase() === animalType.toLowerCase() || 
      a.toLowerCase() === animalType.toLowerCase() + 's'
    );
  });

  const getConfidenceColor = (percentage: number) => {
    if (percentage >= 60) return 'bg-red-500';
    if (percentage >= 40) return 'bg-orange-500';
    if (percentage >= 20) return 'bg-amber-500';
    return 'bg-gray-400';
  };

  const getConfidenceLabel = (percentage: number) => {
    if (percentage >= 60) return 'High Match';
    if (percentage >= 40) return 'Moderate Match';
    if (percentage >= 20) return 'Possible Match';
    return 'Low Match';
  };

  const reset = () => {
    setSelectedSymptoms(new Set());
    setShowResults(false);
    setSymptomSearch('');
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-700 to-violet-800 text-white p-4 lg:p-6 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope className="w-5 h-5 lg:w-6 lg:h-6" />
            <h1 className="text-xl lg:text-2xl font-bold">AI Symptom Checker</h1>
          </div>
          <p className="text-violet-200 text-sm lg:text-base">Select observed symptoms to identify possible diseases</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-4">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs lg:text-sm text-amber-800">
            This tool provides guidance only and is not a substitute for professional veterinary diagnosis. Always consult a veterinarian for accurate diagnosis and treatment.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-5 lg:gap-6">
          {/* Left - Symptom Selection */}
          <div className="lg:col-span-3 space-y-4">
            {/* Animal Type */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">What animal is affected?</h3>
              <div className="flex flex-wrap gap-2">
                {animalTypes.map(type => (
                  <button key={type} onClick={() => { setAnimalType(type); setShowResults(false); }}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      animalType === type ? 'bg-violet-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">
                  Select observed symptoms ({selectedSymptoms.size} selected)
                </h3>
                {selectedSymptoms.size > 0 && (
                  <button onClick={reset} className="text-xs text-violet-600 font-medium flex items-center gap-1 hover:text-violet-700">
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              {/* Symptom Search */}
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search symptoms..." value={symptomSearch}
                  onChange={e => setSymptomSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-400 focus:border-violet-400" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredSymptoms.map(symptom => {
                  const isSelected = selectedSymptoms.has(symptom.id);
                  return (
                    <button key={symptom.id} onClick={() => toggleSymptom(symptom.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-left text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-violet-100 text-violet-800 border-2 border-violet-400 shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-2 border-transparent hover:bg-gray-100'
                      }`}>
                      <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                        isSelected ? 'bg-violet-600 text-white' : 'bg-gray-200'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="leading-tight text-xs lg:text-sm">{symptom.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diagnose Button */}
            {selectedSymptoms.size >= 2 && (
              <button onClick={() => setShowResults(true)}
                className="w-full bg-violet-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Zap className="w-5 h-5" />
                Check Possible Diseases
              </button>
            )}

            {selectedSymptoms.size === 1 && (
              <p className="text-center text-sm text-gray-500">Select at least 2 symptoms for diagnosis</p>
            )}
          </div>

          {/* Right - Results */}
          <div className="lg:col-span-2 mt-4 lg:mt-0">
            {showResults && filteredResults.length > 0 && (
              <div className="space-y-3 lg:sticky lg:top-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Results for {animalType}
                </h3>

                {filteredResults.map((result, index) => {
                  const disease = diseases.find(d => d.id === result.diseaseId);
                  if (!disease) return null;

                  return (
                    <div key={result.diseaseId} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                            <h4 className="font-bold text-gray-900 text-sm">{disease.name}</h4>
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${
                            result.percentage >= 60 ? 'bg-red-100 text-red-700' :
                            result.percentage >= 40 ? 'bg-orange-100 text-orange-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {getConfidenceLabel(result.percentage)}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">{result.percentage}%</span>
                          <p className="text-xs text-gray-500">match</p>
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div className={`h-2 rounded-full transition-all duration-500 ${getConfidenceColor(result.percentage)}`}
                          style={{ width: `${result.percentage}%` }} />
                      </div>

                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{disease.cause}</p>

                      <button onClick={() => onViewDisease?.(result.diseaseId)}
                        className="w-full bg-violet-50 text-violet-700 border border-violet-200 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 hover:bg-violet-100 transition-colors">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-800 text-sm">Important Notice</h4>
                      <p className="text-xs text-red-700 mt-1">
                        Contact your nearest veterinarian for proper diagnosis. Delayed treatment can result in animal death.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showResults && filteredResults.length === 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
                <Stethoscope className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-gray-600 font-medium">No matching diseases found</p>
                <p className="text-sm text-gray-500 mt-1">Try different symptoms or animal type</p>
              </div>
            )}

            {!showResults && selectedSymptoms.size === 0 && (
              <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 text-center">
                <Stethoscope className="w-12 h-12 mx-auto mb-3 text-violet-300" />
                <h3 className="font-bold text-violet-800 mb-1">How to Use</h3>
                <ol className="text-sm text-violet-700 text-left space-y-2 mt-3">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                    Select the affected animal type
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                    Choose at least 2 observed symptoms
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                    Click "Check Possible Diseases"
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-violet-200 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                    Review results and consult a vet
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
