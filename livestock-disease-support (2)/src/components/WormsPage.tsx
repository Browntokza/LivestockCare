import React, { useState } from 'react';
import { worms, wormNotes, Worm } from '../data/worms';
import {
  Search, X, ChevronDown, ChevronUp, ChevronLeft,
  AlertTriangle, Shield, Pill, Bug, Info, Eye,
  Filter, BookOpen, Microscope
} from 'lucide-react';

const severityConfig: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  low: { label: 'Low', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  medium: { label: 'Medium', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  high: { label: 'High', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' },
  critical: { label: 'Critical', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
};

const wormIconMap: Record<string, React.ReactNode> = {
  roundworm: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M10 30 C10 20, 15 15, 20 15 C25 15, 30 10, 30 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M12 32 C12 22, 17 17, 22 17 C27 17, 32 12, 32 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
      <circle cx="30" cy="5" r="2.5" fill="currentColor" />
    </svg>
  ),
  tapeworm: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M5 20 C10 10, 15 30, 20 20 C25 10, 30 30, 35 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="5" cy="20" r="3" fill="currentColor" />
      <line x1="12" y1="15" x2="12" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="20" y1="15" x2="20" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      <line x1="28" y1="15" x2="28" y2="25" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    </svg>
  ),
  measles: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      <circle cx="24" cy="16" r="2" fill="currentColor" />
      <circle cx="20" cy="24" r="2" fill="currentColor" />
      <circle cx="28" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="12" cy="24" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  ),
  fluke: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <ellipse cx="20" cy="20" rx="12" ry="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <ellipse cx="20" cy="20" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
      <circle cx="15" cy="17" r="1.5" fill="currentColor" />
      <circle cx="15" cy="23" r="1.5" fill="currentColor" />
      <path d="M32 20 L38 18 M32 20 L38 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  conical: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M20 5 L32 35 L8 35 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
      <circle cx="20" cy="22" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="20" cy="22" r="1" fill="currentColor" />
      <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
  screwworm: (
    <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
      <path d="M20 5 L20 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 10 L26 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 16 L28 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 22 L26 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 28 L24 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="5" r="2.5" fill="currentColor" />
    </svg>
  ),
};

// Worm Detail View
const WormDetail: React.FC<{ worm: Worm; onBack: () => void }> = ({ worm, onBack }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('effects');
  const sev = severityConfig[worm.severity];

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const hasTreatments =
    worm.treatment.cattleAndSheep.length > 0 ||
    worm.treatment.donkeys.length > 0 ||
    worm.treatment.dogs.length > 0 ||
    worm.treatment.chicken.length > 0;

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-4 lg:p-5 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
            <div className="w-6 h-6">
              {wormIconMap[worm.icon] || <Bug className="w-6 h-6" />}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg lg:text-xl font-bold leading-tight truncate">{worm.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sev.bg} ${sev.color} border ${sev.border}`}>
                {sev.label} Severity
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-4">
        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Microscope className="w-4 h-4 text-teal-600" />
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Found & Infestation</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{worm.foundAndInfestation}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Bug className="w-4 h-4 text-purple-600" />
              <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">Source of Infection</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{worm.sourceOfInfection}</p>
          </div>
        </div>

        {/* Effects Section */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('effects')}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Effects & Symptoms</span>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">
                {worm.effects.length} {worm.effects.length === 1 ? 'effect' : 'effects'}
              </span>
            </div>
            {expandedSection === 'effects' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          {expandedSection === 'effects' && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <ul className="space-y-2 mt-3">
                {worm.effects.map((effect, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{effect}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Treatment Section */}
        <div className={`border rounded-xl overflow-hidden shadow-sm ${hasTreatments ? 'bg-white border-gray-200' : 'bg-red-50 border-red-200'}`}>
          <button
            onClick={() => toggleSection('treatment')}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Pill className="w-5 h-5 text-blue-600" />
              <span>Treatment</span>
              {!hasTreatments && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">No Direct Treatment</span>
              )}
            </div>
            {expandedSection === 'treatment' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          {expandedSection === 'treatment' && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {hasTreatments ? (
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">Animal</th>
                        <th className="text-left py-2 font-semibold text-gray-600 text-xs uppercase tracking-wide">Medicines</th>
                      </tr>
                    </thead>
                    <tbody>
                      {worm.treatment.cattleAndSheep.length > 0 && (
                        <tr className="border-b border-gray-100">
                          <td className="py-2.5 pr-4 font-medium text-gray-700 whitespace-nowrap">Cattle & Sheep</td>
                          <td className="py-2.5">
                            <div className="flex flex-wrap gap-1.5">
                              {worm.treatment.cattleAndSheep.map((med, i) => (
                                <span key={i} className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                      {worm.treatment.donkeys.length > 0 && (
                        <tr className="border-b border-gray-100">
                          <td className="py-2.5 pr-4 font-medium text-gray-700 whitespace-nowrap">Donkeys</td>
                          <td className="py-2.5">
                            <div className="flex flex-wrap gap-1.5">
                              {worm.treatment.donkeys.map((med, i) => (
                                <span key={i} className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                      {worm.treatment.dogs.length > 0 && (
                        <tr className="border-b border-gray-100">
                          <td className="py-2.5 pr-4 font-medium text-gray-700 whitespace-nowrap">Dogs</td>
                          <td className="py-2.5">
                            <div className="flex flex-wrap gap-1.5">
                              {worm.treatment.dogs.map((med, i) => (
                                <span key={i} className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                      {worm.treatment.chicken.length > 0 && (
                        <tr>
                          <td className="py-2.5 pr-4 font-medium text-gray-700 whitespace-nowrap">Chicken</td>
                          <td className="py-2.5">
                            <div className="flex flex-wrap gap-1.5">
                              {worm.treatment.chicken.map((med, i) => (
                                <span key={i} className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
                                  {med}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="mt-3">
                  {worm.treatmentNotes && (
                    <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-red-800 text-sm leading-relaxed">{worm.treatmentNotes}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prevention Tips */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => toggleSection('prevention')}
            className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-green-600" />
              <span>Prevention Tips</span>
            </div>
            {expandedSection === 'prevention' ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          {expandedSection === 'prevention' && (
            <div className="px-4 pb-4 border-t border-gray-100">
              <ul className="space-y-2 mt-3">
                {worm.id === 'round-worm-hookworm' && (
                  <>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Regular deworming schedule every 3-4 months</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Keep kraals clean and dry to reduce larvae survival</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Rotate pastures regularly to break the worm lifecycle</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Avoid overgrazing which increases exposure to larvae</span></li>
                  </>
                )}
                {worm.id === 'tapeworm' && (
                  <>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Regular deworming with appropriate dosage</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Control mite populations in pastures</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Maintain good pasture hygiene</span></li>
                  </>
                )}
                {worm.id === 'beef-pork-measles' && (
                  <>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Ensure proper sanitation — use blair toilets</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Treat humans with tapeworm infections promptly</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Prevent cattle from grazing in areas contaminated by human faeces</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Educate community members about the transmission cycle</span></li>
                  </>
                )}
                {worm.id === 'liver-fluke' && (
                  <>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Avoid grazing in wet, marshy areas where snails thrive</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Drain swampy areas near grazing land where possible</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Strategic deworming before and after the rainy season</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Control snail populations in water sources</span></li>
                  </>
                )}
                {worm.id === 'conical-fluke' && (
                  <>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Keep young stock away from wet grazing areas</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Control snail populations near water sources</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Fence off marshy areas to prevent access</span></li>
                  </>
                )}
                {worm.id === 'screw-worm' && (
                  <>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Treat all wounds promptly to prevent fly infestation</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Apply wound dressing and insect repellent to open sores</span></li>
                    <li className="flex items-start gap-3"><div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" /><span className="text-gray-700 text-sm">Inspect animals regularly for wounds, especially after dehorning or castration</span></li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Treatment Quick Reference Table
const TreatmentTable: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-teal-50 to-emerald-50">
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5 text-teal-700" />
          <h3 className="font-bold text-gray-900">Treatment Quick Reference</h3>
        </div>
        <p className="text-xs text-gray-500 mt-1">Recommended medicines by worm type and animal</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">Worm</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">Cattle & Sheep</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">Donkeys</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">Dogs</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide whitespace-nowrap">Chicken</th>
            </tr>
          </thead>
          <tbody>
            {worms.map((worm, idx) => (
              <tr key={worm.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="py-3 px-4 font-medium text-gray-800 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${severityConfig[worm.severity].dot}`} />
                    <span className="text-xs lg:text-sm">{worm.name.length > 20 ? worm.name.substring(0, 20) + '...' : worm.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {worm.treatment.cattleAndSheep.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {worm.treatment.cattleAndSheep.map((m, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap">{m}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {worm.treatment.donkeys.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {worm.treatment.donkeys.map((m, i) => (
                        <span key={i} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap">{m}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {worm.treatment.dogs.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {worm.treatment.dogs.map((m, i) => (
                        <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full whitespace-nowrap">{m}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">—</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {worm.treatment.chicken.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {worm.treatment.chicken.map((m, i) => (
                        <span key={i} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full whitespace-nowrap">{m}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400 italic">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Worms Page
const WormsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorm, setSelectedWorm] = useState<Worm | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [showTable, setShowTable] = useState(false);

  const filteredWorms = worms.filter(worm => {
    const matchesSearch = searchQuery === '' ||
      worm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worm.effects.some(e => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      worm.foundAndInfestation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worm.sourceOfInfection.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = filterSeverity === 'All' || worm.severity === filterSeverity.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  if (selectedWorm) {
    return <WormDetail worm={selectedWorm} onBack={() => setSelectedWorm(null)} />;
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-teal-700 via-emerald-700 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full border-4 border-white/30" />
          <div className="absolute bottom-2 left-12 w-20 h-20 rounded-full border-4 border-white/20" />
          <div className="absolute top-12 left-1/3 w-16 h-16 rounded-full border-2 border-white/20" />
        </div>
        <div className="relative p-4 lg:p-6 pb-6 lg:pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bug className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">Common Livestock Worms</h1>
                <p className="text-teal-200 text-sm lg:text-base">Identification, effects, and treatment guide</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{worms.length}</p>
                <p className="text-xs text-teal-200">Worm Types</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">{worms.filter(w => w.severity === 'critical' || w.severity === 'high').length}</p>
                <p className="text-xs text-teal-200">High Risk</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-teal-200">Animal Types</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search worms, symptoms, treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm shadow-lg"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-0">
        {/* Filter Bar */}
        <div className="flex items-center gap-3 py-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 font-medium">Severity:</span>
          </div>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterSeverity === sev
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {sev !== 'All' && (
                <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${severityConfig[sev.toLowerCase()]?.dot || ''}`} />
              )}
              {sev}
            </button>
          ))}

          <div className="flex-1" />

          <button
            onClick={() => setShowTable(!showTable)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              showTable
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Treatment Table
          </button>
        </div>

        {/* Treatment Quick Reference Table */}
        {showTable && (
          <div className="mb-4">
            <TreatmentTable />
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-3">{filteredWorms.length} worm{filteredWorms.length !== 1 ? 's' : ''} found</p>

        {/* Worm Cards Grid */}
        <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0 pb-4">
          {filteredWorms.map(worm => {
            const sev = severityConfig[worm.severity];
            const hasTreatments =
              worm.treatment.cattleAndSheep.length > 0 ||
              worm.treatment.donkeys.length > 0 ||
              worm.treatment.dogs.length > 0 ||
              worm.treatment.chicken.length > 0;
            const allTreatments = [
              ...worm.treatment.cattleAndSheep,
              ...worm.treatment.donkeys,
              ...worm.treatment.dogs,
              ...worm.treatment.chicken,
            ];
            const uniqueTreatments = [...new Set(allTreatments)];

            return (
              <button
                key={worm.id}
                onClick={() => setSelectedWorm(worm)}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-lg hover:border-teal-300 transition-all group"
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${sev.bg} ${sev.color} border ${sev.border}`}>
                    <div className="w-7 h-7">
                      {wormIconMap[worm.icon] || <Bug className="w-7 h-7" />}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors text-sm lg:text-base leading-tight">
                        {worm.name}
                      </h3>
                      <Eye className="w-4 h-4 text-gray-300 group-hover:text-teal-500 transition-colors flex-shrink-0 mt-0.5" />
                    </div>

                    {/* Severity Badge */}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border font-medium ${sev.bg} ${sev.color} ${sev.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
                        {sev.label} Severity
                      </span>
                      {!hasTreatments && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 font-medium">
                          No Treatment
                        </span>
                      )}
                    </div>

                    {/* Location */}
                    <p className="text-xs text-gray-500 mt-2">
                      <span className="font-medium text-gray-600">Found in:</span> {worm.foundAndInfestation}
                    </p>

                    {/* Effects Preview */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {worm.effects.slice(0, 2).map((effect, i) => (
                        <span key={i} className="text-xs text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                          {effect.length > 30 ? effect.substring(0, 30) + '...' : effect}
                        </span>
                      ))}
                      {worm.effects.length > 2 && (
                        <span className="text-xs text-gray-400">+{worm.effects.length - 2} more</span>
                      )}
                    </div>

                    {/* Treatments Preview */}
                    {uniqueTreatments.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {uniqueTreatments.slice(0, 3).map((med, i) => (
                          <span key={i} className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                            {med}
                          </span>
                        ))}
                        {uniqueTreatments.length > 3 && (
                          <span className="text-xs text-gray-400">+{uniqueTreatments.length - 3} more</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filteredWorms.length === 0 && (
          <div className="text-center py-12">
            <Bug className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No worms found matching your search</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearchQuery(''); setFilterSeverity('All'); }}
              className="mt-3 text-sm text-teal-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Important Notes Section */}
        <div className="mt-4 mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-amber-700" />
            <h3 className="font-bold text-amber-800">Important Notes</h3>
          </div>
          <ul className="space-y-2">
            {wormNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-amber-800 text-sm leading-relaxed">{note}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Reference Image */}
        <div className="mb-6 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <h3 className="font-semibold text-gray-800 text-sm">Reference Chart</h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Original worm treatment reference table</p>
          </div>
          <div className="p-2">
            <img
              src="https://d64gsuwffb70l.cloudfront.net/69ac3f801a534f2520c9aece_1772984848761_e2b01bce.png"
              alt="Livestock Worms Reference Chart"
              className="w-full rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WormsPage;
