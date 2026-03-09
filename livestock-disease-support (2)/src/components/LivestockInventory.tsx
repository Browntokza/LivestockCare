import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Trash2, X, ChevronDown, Filter, BarChart3, Save, Download, Upload } from 'lucide-react';

export interface LivestockAnimal {
  id: string;
  animalId: string;
  species: string;
  breed: string;
  gender: string;
  age: string;
  tagNumber: string;
  vaccinationStatus: string;
  healthNotes: string;
  location: string;
  dateAcquired: string;
  estimatedValue: number;
  status: string;
}

const speciesOptions = ['Cattle', 'Goat', 'Sheep', 'Pig', 'Poultry'];
const genderOptions = ['Male', 'Female'];
const statusOptions = ['Active', 'Sold', 'Deceased', 'Transferred'];
const vaccinationOptions = ['Fully Vaccinated', 'Partially Vaccinated', 'Not Vaccinated', 'Overdue'];

const defaultAnimal: Omit<LivestockAnimal, 'id'> = {
  animalId: '', species: 'Cattle', breed: '', gender: 'Male', age: '', tagNumber: '',
  vaccinationStatus: 'Not Vaccinated', healthNotes: '', location: '',
  dateAcquired: new Date().toISOString().split('T')[0], estimatedValue: 0, status: 'Active',
};

const LivestockInventory: React.FC = () => {
  const [animals, setAnimals] = useState<LivestockAnimal[]>([
    { id: '1', animalId: 'BLW-001', species: 'Cattle', breed: 'Brahman Cross', gender: 'Female', age: '4 years', tagNumber: 'T-001', vaccinationStatus: 'Fully Vaccinated', healthNotes: 'Healthy, good body condition score 3.5', location: 'Paddock A', dateAcquired: '2022-03-15', estimatedValue: 850, status: 'Active' },
    { id: '2', animalId: 'BLW-002', species: 'Cattle', breed: 'Tuli', gender: 'Male', age: '3 years', tagNumber: 'T-002', vaccinationStatus: 'Fully Vaccinated', healthNotes: 'Breeding bull - excellent temperament', location: 'Paddock B', dateAcquired: '2023-01-10', estimatedValue: 1200, status: 'Active' },
    { id: '3', animalId: 'BLW-003', species: 'Cattle', breed: 'Mashona', gender: 'Female', age: '2 years', tagNumber: 'T-003', vaccinationStatus: 'Partially Vaccinated', healthNotes: 'Due for Blackleg booster in April', location: 'Paddock A', dateAcquired: '2024-06-20', estimatedValue: 600, status: 'Active' },
    { id: '4', animalId: 'BLW-004', species: 'Cattle', breed: 'Brahman', gender: 'Female', age: '5 years', tagNumber: 'T-004', vaccinationStatus: 'Fully Vaccinated', healthNotes: 'Pregnant - due September', location: 'Maternity Paddock', dateAcquired: '2021-08-05', estimatedValue: 950, status: 'Active' },
    { id: '5', animalId: 'BLW-005', species: 'Goat', breed: 'Boer Cross', gender: 'Female', age: '1 year', tagNumber: 'G-001', vaccinationStatus: 'Not Vaccinated', healthNotes: 'Needs Pulpy Kidney vaccination', location: 'Goat Pen', dateAcquired: '2025-02-01', estimatedValue: 120, status: 'Active' },
    { id: '6', animalId: 'BLW-006', species: 'Goat', breed: 'Indigenous', gender: 'Male', age: '2 years', tagNumber: 'G-002', vaccinationStatus: 'Fully Vaccinated', healthNotes: 'Buck for breeding', location: 'Goat Pen', dateAcquired: '2024-11-15', estimatedValue: 180, status: 'Active' },
    { id: '7', animalId: 'BLW-007', species: 'Poultry', breed: 'Road Runner', gender: 'Female', age: '6 months', tagNumber: 'P-BATCH-01', vaccinationStatus: 'Fully Vaccinated', healthNotes: 'Batch of 25 layers - good production', location: 'Chicken House', dateAcquired: '2025-09-01', estimatedValue: 200, status: 'Active' },
    { id: '8', animalId: 'BLW-008', species: 'Sheep', breed: 'Dorper Cross', gender: 'Female', age: '3 years', tagNumber: 'S-001', vaccinationStatus: 'Partially Vaccinated', healthNotes: 'Needs deworming', location: 'Sheep Kraal', dateAcquired: '2023-07-20', estimatedValue: 250, status: 'Active' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<LivestockAnimal | null>(null);
  const [formData, setFormData] = useState(defaultAnimal);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('All');
  const [showStats, setShowStats] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredAnimals = useMemo(() => {
    let result = animals;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.animalId.toLowerCase().includes(q) || a.breed.toLowerCase().includes(q) ||
        a.tagNumber.toLowerCase().includes(q) || a.species.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q)
      );
    }
    if (filterSpecies !== 'All') {
      result = result.filter(a => a.species === filterSpecies);
    }
    return result;
  }, [animals, searchQuery, filterSpecies]);

  const stats = useMemo(() => {
    const active = animals.filter(a => a.status === 'Active');
    const bySpecies: Record<string, number> = {};
    active.forEach(a => { bySpecies[a.species] = (bySpecies[a.species] || 0) + 1; });
    const totalValue = active.reduce((sum, a) => sum + a.estimatedValue, 0);
    const vaccinated = active.filter(a => a.vaccinationStatus === 'Fully Vaccinated').length;
    return { total: active.length, bySpecies, totalValue, vaccinated };
  }, [animals]);

  const openAddForm = () => {
    setEditingAnimal(null);
    setFormData({ ...defaultAnimal, animalId: `BLW-${String(animals.length + 1).padStart(3, '0')}` });
    setShowForm(true);
  };

  const openEditForm = (animal: LivestockAnimal) => {
    setEditingAnimal(animal);
    setFormData({ ...animal });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.animalId) return;
    if (editingAnimal) {
      setAnimals(animals.map(a => a.id === editingAnimal.id ? { ...formData, id: editingAnimal.id } : a));
    } else {
      setAnimals([...animals, { ...formData, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setEditingAnimal(null);
  };

  const handleDelete = (id: string) => {
    setAnimals(animals.filter(a => a.id !== id));
    setDeleteConfirm(null);
  };

  const exportCSV = () => {
    const headers = ['Animal ID', 'Species', 'Breed', 'Gender', 'Age', 'Tag Number', 'Vaccination Status', 'Health Notes', 'Location', 'Date Acquired', 'Estimated Value (USD)', 'Status'];
    const rows = animals.map(a => [a.animalId, a.species, a.breed, a.gender, a.age, a.tagNumber, a.vaccinationStatus, a.healthNotes, a.location, a.dateAcquired, a.estimatedValue, a.status]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `livestock_inventory_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const vacStatusColor = (status: string) => {
    switch (status) {
      case 'Fully Vaccinated': return 'bg-green-100 text-green-700 border-green-200';
      case 'Partially Vaccinated': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const speciesIcon = (species: string) => {
    switch (species) {
      case 'Cattle': return 'bg-amber-500';
      case 'Goat': return 'bg-teal-500';
      case 'Sheep': return 'bg-blue-500';
      case 'Pig': return 'bg-pink-500';
      case 'Poultry': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (showForm) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 flex items-center gap-3">
          <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/20 rounded-lg">
            <X className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">{editingAnimal ? 'Edit Animal' : 'Add New Animal'}</h1>
        </div>

        <div className="p-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6 space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Animal ID *</label>
                <input type="text" value={formData.animalId} onChange={e => setFormData({ ...formData, animalId: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Tag Number</label>
                <input type="text" value={formData.tagNumber} onChange={e => setFormData({ ...formData, tagNumber: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Species</label>
                <select value={formData.species} onChange={e => setFormData({ ...formData, species: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white">
                  {speciesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Breed</label>
                <input type="text" value={formData.breed} onChange={e => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" placeholder="e.g., Brahman, Tuli" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Gender</label>
                <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white">
                  {genderOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Age</label>
                <input type="text" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" placeholder="e.g., 2 years" />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Vaccination Status</label>
                <select value={formData.vaccinationStatus} onChange={e => setFormData({ ...formData, vaccinationStatus: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white">
                  {vaccinationOptions.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Location / Farm</label>
                <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" placeholder="e.g., Paddock A" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white">
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Date Acquired</label>
                <input type="date" value={formData.dateAcquired} onChange={e => setFormData({ ...formData, dateAcquired: e.target.value })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Est. Value (USD)</label>
                <input type="number" value={formData.estimatedValue} onChange={e => setFormData({ ...formData, estimatedValue: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase">Health Notes</label>
              <textarea value={formData.healthNotes} onChange={e => setFormData({ ...formData, healthNotes: e.target.value })}
                className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" rows={3} placeholder="Any health observations, vaccination notes..." />
            </div>

            <button onClick={handleSave}
              className="w-full lg:w-auto lg:px-8 bg-amber-600 text-white py-3 rounded-xl font-bold text-base hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
              <Save className="w-5 h-5" />
              {editingAnimal ? 'Update Animal' : 'Add Animal'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 lg:p-6 pb-6 lg:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl lg:text-2xl font-bold">My Livestock</h1>
            <div className="flex gap-2">
              <button onClick={exportCSV} className="hidden sm:flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                <Download className="w-4 h-4" /> Export CSV
              </button>
              <button onClick={openAddForm} className="hidden sm:flex items-center gap-2 bg-white text-amber-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-50 transition-colors">
                <Plus className="w-4 h-4" /> Add Animal
              </button>
            </div>
          </div>
          <p className="text-amber-200 text-sm">{stats.total} active animals | Total value: ${stats.totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Quick Stats */}
        <div className="px-4 lg:px-0 -mt-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" /> Herd Summary
              </h3>
              <button onClick={() => setShowStats(!showStats)} className="text-sm text-gray-500 lg:hidden">
                {showStats ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={`${showStats ? '' : 'hidden lg:block'}`}>
              <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
                <div className="text-center p-2 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-700">{stats.total}</p>
                  <p className="text-xs text-amber-600">Total Active</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">{stats.vaccinated}</p>
                  <p className="text-xs text-green-600">Vaccinated</p>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-700">${stats.totalValue.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">Total Value</p>
                </div>
                {Object.entries(stats.bySpecies).map(([species, count]) => (
                  <div key={species} className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-700">{count}</p>
                    <p className="text-xs text-gray-500">{species}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-4 lg:px-0 lg:py-4 space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search by ID, breed, tag, location..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400" />
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            <button onClick={() => setFilterSpecies('All')}
              className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
                filterSpecies === 'All' ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}>
              <Filter className="w-3.5 h-3.5" /> All ({stats.total})
            </button>
            {speciesOptions.map(s => (
              <button key={s} onClick={() => setFilterSpecies(s)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium ${
                  filterSpecies === s ? 'bg-amber-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
                }`}>
                {s} {stats.bySpecies[s] ? `(${stats.bySpecies[s]})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Animal List */}
        <div className="px-4 lg:px-0 pb-24 lg:pb-8 space-y-3">
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Animal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Species / Breed</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Gender / Age</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Vaccination</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Value</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAnimals.map(animal => (
                  <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${speciesIcon(animal.species)}`} />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{animal.animalId}</p>
                          <p className="text-xs text-gray-500">Tag: {animal.tagNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-800">{animal.species}</p>
                      <p className="text-xs text-gray-500">{animal.breed}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-800">{animal.gender}</p>
                      <p className="text-xs text-gray-500">{animal.age}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{animal.location}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${vacStatusColor(animal.vaccinationStatus)}`}>
                        {animal.vaccinationStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-amber-700 text-sm">${animal.estimatedValue}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEditForm(animal)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(animal.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {deleteConfirm === animal.id && (
                        <div className="absolute right-4 mt-1 bg-white border border-red-200 rounded-lg p-3 shadow-lg z-10">
                          <p className="text-sm text-red-700 font-medium mb-2">Delete?</p>
                          <div className="flex gap-2">
                            <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-xs bg-gray-100 rounded">Cancel</button>
                            <button onClick={() => handleDelete(animal.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded">Delete</button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {filteredAnimals.map(animal => (
              <div key={animal.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${speciesIcon(animal.species)}`} />
                      <h3 className="font-bold text-gray-900">{animal.animalId}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${vacStatusColor(animal.vaccinationStatus)}`}>
                        {animal.vaccinationStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{animal.breed} | {animal.gender} | {animal.age}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>Tag: {animal.tagNumber}</span>
                      <span>|</span>
                      <span>{animal.location}</span>
                      <span>|</span>
                      <span className="font-semibold text-amber-700">${animal.estimatedValue}</span>
                    </div>
                    {animal.healthNotes && <p className="text-xs text-gray-500 mt-1 italic">{animal.healthNotes}</p>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEditForm(animal)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => setDeleteConfirm(animal.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {deleteConfirm === animal.id && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-red-700 font-medium">Delete this animal?</span>
                    <div className="flex gap-2">
                      <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-lg">Cancel</button>
                      <button onClick={() => handleDelete(animal.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg">Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredAnimals.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg font-medium">No animals found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile FAB */}
      <button onClick={openAddForm}
        className="lg:hidden fixed bottom-24 right-6 w-14 h-14 bg-amber-600 text-white rounded-full shadow-xl flex items-center justify-center hover:bg-amber-700 transition-colors z-30">
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
};

export default LivestockInventory;
