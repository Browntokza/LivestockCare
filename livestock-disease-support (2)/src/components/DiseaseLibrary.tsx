import React, { useState, useMemo } from 'react';
import { diseases, Disease, searchDiseases } from '../data/diseases';
import { Search, ChevronLeft, AlertTriangle, Shield, Syringe, Bug, Filter, ChevronDown, ChevronUp, X } from 'lucide-react';


const categoryColors: Record<string, string> = {
  Bacterial: 'bg-amber-100 text-amber-800 border-amber-300',
  Viral: 'bg-rose-100 text-rose-800 border-rose-300',
  Parasitic: 'bg-teal-100 text-teal-800 border-teal-300',
  Fungal: 'bg-purple-100 text-purple-800 border-purple-300',
};

const categoryIcons: Record<string, React.ReactNode> = {
  Bacterial: <Bug className="w-4 h-4" />,
  Viral: <Bug className="w-4 h-4" />,
  Parasitic: <Bug className="w-4 h-4" />,
  Fungal: <Bug className="w-4 h-4" />,
};


interface DiseaseDetailProps {
  disease: Disease;
  onBack: () => void;
}

const DiseaseDetail: React.FC<DiseaseDetailProps> = ({ disease, onBack }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>('symptoms');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const Section = ({ id, title, icon, children, urgent }: { id: string; title: string; icon: React.ReactNode; children: React.ReactNode; urgent?: boolean }) => (
    <div className={`border rounded-xl overflow-hidden mb-3 ${urgent ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <button
        onClick={() => toggleSection(id)}
        className={`w-full flex items-center justify-between p-4 text-left font-semibold ${urgent ? 'text-red-800' : 'text-gray-800'}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{title}</span>
        </div>
        {expandedSection === id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      {expandedSection === id && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-700 to-emerald-800 text-white p-4 lg:p-5 flex items-center gap-3 shadow-lg">
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h2 className="text-lg lg:text-xl font-bold leading-tight">{disease.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[disease.category]}`}>
              {disease.category}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6 max-w-5xl mx-auto">
        {/* Top Info Cards - Desktop Grid */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-3 lg:space-y-0 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm uppercase tracking-wide">Animals Affected</h3>
            <div className="flex flex-wrap gap-2">
              {disease.animalsAffected.map(animal => (
                <span key={animal} className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm font-medium">
                  {animal}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm uppercase tracking-wide">Cause</h3>
            <p className="text-gray-700 leading-relaxed text-sm">{disease.cause}</p>
          </div>
        </div>

        {/* Sections - Desktop Two Column */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-4">
          <div>
            <Section id="symptoms" title="Symptoms" icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}>
              <ul className="space-y-2 mt-3">
                {disease.symptoms.map((symptom, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{symptom}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="transmission" title="Mode of Transmission" icon={<Bug className="w-5 h-5 text-purple-600" />}>
              <p className="text-gray-700 leading-relaxed mt-3 text-sm">{disease.transmission}</p>
            </Section>

            <Section id="treatment" title="Treatment" icon={<Syringe className="w-5 h-5 text-blue-600" />}>
              <p className="text-gray-700 leading-relaxed mt-3 text-sm">{disease.treatment}</p>
            </Section>
          </div>

          <div>
            <Section id="prevention" title="Prevention" icon={<Shield className="w-5 h-5 text-green-600" />}>
              <p className="text-gray-700 leading-relaxed mt-3 text-sm">{disease.prevention}</p>
              {disease.vaccinationAvailable && (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Syringe className="w-4 h-4 text-green-700" />
                    <span className="font-semibold text-green-800 text-sm">Vaccination Available</span>
                  </div>
                  <p className="text-green-700 text-sm">{disease.vaccinationDetails}</p>
                </div>
              )}
            </Section>

            <Section id="emergency" title="Emergency Action Steps" icon={<AlertTriangle className="w-5 h-5 text-red-600" />} urgent>
              <ol className="space-y-3 mt-3">
                {disease.emergencySteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="text-red-800 font-medium pt-0.5 text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DiseaseLibraryProps {
  initialDiseaseId?: string;
  onSelectDisease?: (id: string) => void;
}

const DiseaseLibrary: React.FC<DiseaseLibraryProps> = ({ initialDiseaseId, onSelectDisease }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(
    initialDiseaseId ? diseases.find(d => d.id === initialDiseaseId) || null : null
  );
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterAnimal, setFilterAnimal] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Bacterial', 'Viral', 'Parasitic'];
  const animals = ['All', 'Cattle', 'Goats', 'Sheep', 'Pigs', 'Poultry', 'Horses'];

  const filteredDiseases = useMemo(() => {
    let result = searchQuery ? searchDiseases(searchQuery) : diseases;
    if (filterCategory !== 'All') {
      result = result.filter(d => d.category === filterCategory);
    }
    if (filterAnimal !== 'All') {
      result = result.filter(d => d.animalsAffected.includes(filterAnimal));
    }
    return result;
  }, [searchQuery, filterCategory, filterAnimal]);

  if (selectedDisease) {
    return <DiseaseDetail disease={selectedDisease} onBack={() => setSelectedDisease(null)} />;
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 text-white p-4 lg:p-6 pb-6 lg:pb-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold mb-1">Disease Library</h1>
          <p className="text-emerald-200 text-sm lg:text-base mb-4">16 livestock diseases with full treatment guides</p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search diseases, symptoms, animals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Filters */}
        <div className="px-4 lg:px-0 -mt-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(filterCategory !== 'All' || filterAnimal !== 'All') && (
                <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">Active</span>
              )}
            </button>

            {/* Quick category pills on desktop */}
            <div className="hidden lg:flex gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat === filterCategory ? 'All' : cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filterCategory === cat
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {showFilters && (
            <div className="mt-3 bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Disease Type</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterCategory === cat ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Animal Type</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {animals.map(animal => (
                    <button
                      key={animal}
                      onClick={() => setFilterAnimal(animal)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterAnimal === animal ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {animal}
                    </button>
                  ))}
                </div>
              </div>
              {(filterCategory !== 'All' || filterAnimal !== 'All') && (
                <button
                  onClick={() => { setFilterCategory('All'); setFilterAnimal('All'); }}
                  className="text-sm text-red-600 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Disease List */}
        <div className="p-4 lg:px-0 lg:py-4">
          <p className="text-sm text-gray-500 mb-3">{filteredDiseases.length} diseases found</p>
          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {filteredDiseases.map(disease => (
              <button
                key={disease.id}
                onClick={() => {
                  setSelectedDisease(disease);
                  onSelectDisease?.(disease.id);
                }}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-md hover:border-emerald-300 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {disease.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColors[disease.category]}`}>
                        {categoryIcons[disease.category]}
                        <span>{disease.category}</span>
                      </span>
                      {disease.vaccinationAvailable && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 font-medium flex items-center gap-1">
                          <Syringe className="w-3 h-3" />
                          Vaccine
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {disease.animalsAffected.slice(0, 4).map(animal => (
                        <span key={animal} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {animal}
                        </span>
                      ))}
                      {disease.animalsAffected.length > 4 && (
                        <span className="text-xs text-gray-400">+{disease.animalsAffected.length - 4} more</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90 group-hover:text-emerald-600 transition-colors flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseLibrary;
