import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Search, ChevronDown, ChevronUp, Save, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface DiseaseRecord {
  id: string;
  name: string;
  local_name: string | null;
  category: string;
  animals_affected: string[];
  cause: string;
  symptoms: string[];
  transmission: string;
  treatment: string;
  prevention: string;
  vaccination_available: boolean;
  vaccination_details: string | null;
  emergency_steps: string[];
  created_at: string;
}

const emptyDisease = {
  name: '',
  local_name: '',
  category: 'Bacterial',
  animals_affected: [] as string[],
  cause: '',
  symptoms: [] as string[],
  transmission: '',
  treatment: '',
  prevention: '',
  vaccination_available: false,
  vaccination_details: '',
  emergency_steps: [] as string[],
};

const categories = ['Bacterial', 'Viral', 'Parasitic', 'Fungal'];
const animalOptions = ['Cattle', 'Goats', 'Sheep', 'Pigs', 'Poultry', 'Horses', 'Dogs', 'Cats'];

const AdminDiseases: React.FC = () => {
  const [diseases, setDiseases] = useState<DiseaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyDisease);
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [symptomsText, setSymptomsText] = useState('');
  const [emergencyText, setEmergencyText] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('diseases')
      .select('*')
      .order('name');
    if (error) {
      toast({ title: 'Error', description: 'Failed to load diseases', variant: 'destructive' });
    } else {
      setDiseases(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.cause || !form.category) {
      toast({ title: 'Validation Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name,
      local_name: form.local_name || null,
      category: form.category,
      animals_affected: form.animals_affected,
      cause: form.cause,
      symptoms: symptomsText.split('\n').filter(s => s.trim()),
      transmission: form.transmission,
      treatment: form.treatment,
      prevention: form.prevention,
      vaccination_available: form.vaccination_available,
      vaccination_details: form.vaccination_details || null,
      emergency_steps: emergencyText.split('\n').filter(s => s.trim()),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase.from('diseases').update(payload).eq('id', editingId);
      if (error) {
        toast({ title: 'Error', description: 'Failed to update disease', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Disease updated successfully' });
      }
    } else {
      const { error } = await supabase.from('diseases').insert(payload);
      if (error) {
        toast({ title: 'Error', description: 'Failed to add disease', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Disease added successfully' });
      }
    }

    setSaving(false);
    resetForm();
    fetchDiseases();
  };

  const handleEdit = (disease: DiseaseRecord) => {
    setEditingId(disease.id);
    setForm({
      name: disease.name,
      local_name: disease.local_name || '',
      category: disease.category,
      animals_affected: disease.animals_affected || [],
      cause: disease.cause,
      symptoms: disease.symptoms || [],
      transmission: disease.transmission,
      treatment: disease.treatment,
      prevention: disease.prevention,
      vaccination_available: disease.vaccination_available,
      vaccination_details: disease.vaccination_details || '',
      emergency_steps: disease.emergency_steps || [],
    });
    setSymptomsText((disease.symptoms || []).join('\n'));
    setEmergencyText((disease.emergency_steps || []).join('\n'));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('diseases').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete disease', variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Disease removed successfully' });
      fetchDiseases();
    }
    setDeleteConfirm(null);
  };

  const resetForm = () => {
    setForm(emptyDisease);
    setSymptomsText('');
    setEmergencyText('');
    setEditingId(null);
    setShowForm(false);
  };

  const toggleAnimal = (animal: string) => {
    setForm(prev => ({
      ...prev,
      animals_affected: prev.animals_affected.includes(animal)
        ? prev.animals_affected.filter(a => a !== animal)
        : [...prev.animals_affected, animal],
    }));
  };

  const filtered = diseases.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search diseases..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          />
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Disease
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">
              {editingId ? 'Edit Disease' : 'Add New Disease'}
            </h3>
            <button onClick={resetForm} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Disease Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Local Name</label>
                <input
                  type="text"
                  value={form.local_name}
                  onChange={e => setForm(p => ({ ...p, local_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400 bg-white"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Vaccination Available</label>
                <div className="flex items-center gap-3 mt-1">
                  <button type="button" onClick={() => setForm(p => ({ ...p, vaccination_available: true }))}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${form.vaccination_available ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-white border-gray-300 text-gray-600'}`}>
                    Yes
                  </button>
                  <button type="button" onClick={() => setForm(p => ({ ...p, vaccination_available: false }))}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${!form.vaccination_available ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-600'}`}>
                    No
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Animals Affected *</label>
              <div className="flex flex-wrap gap-2">
                {animalOptions.map(animal => (
                  <button
                    key={animal}
                    type="button"
                    onClick={() => toggleAnimal(animal)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      form.animals_affected.includes(animal)
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {animal}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Cause *</label>
              <textarea
                value={form.cause}
                onChange={e => setForm(p => ({ ...p, cause: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Symptoms (one per line) *</label>
                <textarea
                  value={symptomsText}
                  onChange={e => setSymptomsText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                  rows={5}
                  placeholder="High fever&#10;Loss of appetite&#10;Weight loss"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Emergency Steps (one per line)</label>
                <textarea
                  value={emergencyText}
                  onChange={e => setEmergencyText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                  rows={5}
                  placeholder="Isolate the animal&#10;Contact veterinarian&#10;Administer treatment"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Transmission</label>
              <textarea
                value={form.transmission}
                onChange={e => setForm(p => ({ ...p, transmission: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Treatment *</label>
                <textarea
                  value={form.treatment}
                  onChange={e => setForm(p => ({ ...p, treatment: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Prevention *</label>
                <textarea
                  value={form.prevention}
                  onChange={e => setForm(p => ({ ...p, prevention: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                  rows={3}
                  required
                />
              </div>
            </div>

            {form.vaccination_available && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Vaccination Details</label>
                <textarea
                  value={form.vaccination_details}
                  onChange={e => setForm(p => ({ ...p, vaccination_details: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400"
                  rows={2}
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update Disease' : 'Save Disease'}
              </button>
              <button type="button" onClick={resetForm}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="ml-2 text-sm text-gray-500">Loading diseases...</span>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Animals</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Vaccine</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(disease => (
                  <React.Fragment key={disease.id}>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setExpandedRow(expandedRow === disease.id ? null : disease.id)}
                          className="flex items-center gap-2 text-left"
                        >
                          {expandedRow === disease.id ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                          <div>
                            <p className="font-medium text-gray-900">{disease.name}</p>
                            {disease.local_name && <p className="text-xs text-gray-500">{disease.local_name}</p>}
                          </div>
                        </button>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          disease.category === 'Bacterial' ? 'bg-blue-100 text-blue-700' :
                          disease.category === 'Viral' ? 'bg-red-100 text-red-700' :
                          disease.category === 'Parasitic' ? 'bg-amber-100 text-amber-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {disease.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {(disease.animals_affected || []).slice(0, 3).map(a => (
                            <span key={a} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{a}</span>
                          ))}
                          {(disease.animals_affected || []).length > 3 && (
                            <span className="text-xs text-gray-400">+{disease.animals_affected.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          disease.vaccination_available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {disease.vaccination_available ? 'Available' : 'None'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => handleEdit(disease)}
                            className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {deleteConfirm === disease.id ? (
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleDelete(disease.id)}
                                className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700">
                                Confirm
                              </button>
                              <button onClick={() => setDeleteConfirm(null)}
                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setDeleteConfirm(disease.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedRow === disease.id && (
                      <tr>
                        <td colSpan={5} className="px-4 py-3 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Cause:</p>
                              <p className="text-gray-600">{disease.cause}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Transmission:</p>
                              <p className="text-gray-600">{disease.transmission}</p>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Symptoms:</p>
                              <ul className="text-gray-600 list-disc list-inside">
                                {(disease.symptoms || []).map((s, i) => <li key={i}>{s}</li>)}
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-700 mb-1">Treatment:</p>
                              <p className="text-gray-600">{disease.treatment}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      {search ? 'No diseases match your search' : 'No diseases found. Add one to get started.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            Showing {filtered.length} of {diseases.length} diseases
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDiseases;
