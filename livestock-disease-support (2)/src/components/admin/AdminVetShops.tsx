import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Search, Save, Loader2, MapPin, Phone } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface VetShopRecord {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  available_medicines: string[];
  services: string[];
  created_at: string;
}

const emptyShop = {
  name: '',
  address: '',
  phone: '',
  latitude: -20.15,
  longitude: 28.58,
  opening_hours: '',
  available_medicines: [] as string[],
  services: [] as string[],
};

const AdminVetShops: React.FC = () => {
  const [shops, setShops] = useState<VetShopRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyShop);
  const [search, setSearch] = useState('');
  const [medicinesText, setMedicinesText] = useState('');
  const [servicesText, setServicesText] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('vet_shops')
      .select('*')
      .order('name');
    if (error) {
      toast({ title: 'Error', description: 'Failed to load vet shops', variant: 'destructive' });
    } else {
      setShops(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) {
      toast({ title: 'Validation Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const payload = {
      name: form.name,
      address: form.address,
      phone: form.phone,
      latitude: form.latitude,
      longitude: form.longitude,
      opening_hours: form.opening_hours,
      available_medicines: medicinesText.split('\n').filter(s => s.trim()),
      services: servicesText.split('\n').filter(s => s.trim()),
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase.from('vet_shops').update(payload).eq('id', editingId);
      if (error) {
        toast({ title: 'Error', description: 'Failed to update vet shop', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Vet shop updated successfully' });
      }
    } else {
      const { error } = await supabase.from('vet_shops').insert(payload);
      if (error) {
        toast({ title: 'Error', description: 'Failed to add vet shop', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Vet shop added successfully' });
      }
    }

    setSaving(false);
    resetForm();
    fetchShops();
  };

  const handleEdit = (shop: VetShopRecord) => {
    setEditingId(shop.id);
    setForm({
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      latitude: shop.latitude,
      longitude: shop.longitude,
      opening_hours: shop.opening_hours || '',
      available_medicines: shop.available_medicines || [],
      services: shop.services || [],
    });
    setMedicinesText((shop.available_medicines || []).join('\n'));
    setServicesText((shop.services || []).join('\n'));
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('vet_shops').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete vet shop', variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Vet shop removed successfully' });
      fetchShops();
    }
    setDeleteConfirm(null);
  };

  const resetForm = () => {
    setForm(emptyShop);
    setMedicinesText('');
    setServicesText('');
    setEditingId(null);
    setShowForm(false);
  };

  const filtered = shops.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search vet shops..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Vet Shop
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">
              {editingId ? 'Edit Vet Shop' : 'Add New Vet Shop'}
            </h3>
            <button onClick={resetForm} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Shop Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                  placeholder="+263..."
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Address *</label>
              <input
                type="text"
                value={form.address}
                onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={form.opening_hours}
                  onChange={e => setForm(p => ({ ...p, opening_hours: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                  placeholder="Mon-Fri: 8:00-17:00"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Latitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.latitude}
                  onChange={e => setForm(p => ({ ...p, latitude: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Longitude</label>
                <input
                  type="number"
                  step="0.0001"
                  value={form.longitude}
                  onChange={e => setForm(p => ({ ...p, longitude: parseFloat(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Available Medicines (one per line)</label>
                <textarea
                  value={medicinesText}
                  onChange={e => setMedicinesText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                  rows={5}
                  placeholder="Oxytetracycline&#10;Ivermectin&#10;Penicillin"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Services (one per line)</label>
                <textarea
                  value={servicesText}
                  onChange={e => setServicesText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-400"
                  rows={5}
                  placeholder="Veterinary consultation&#10;Emergency call-out&#10;Vaccination services"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update Shop' : 'Save Shop'}
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
          <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
          <span className="ml-2 text-sm text-gray-500">Loading vet shops...</span>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Address</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Hours</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(shop => (
                  <tr key={shop.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{shop.name}</p>
                          <p className="text-xs text-gray-500 md:hidden">{shop.address}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-[200px] truncate">{shop.address}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-3 h-3" />
                        {shop.phone}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell text-xs">{shop.opening_hours}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleEdit(shop)}
                          className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === shop.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(shop.id)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(shop.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      {search ? 'No vet shops match your search' : 'No vet shops found. Add one to get started.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            Showing {filtered.length} of {shops.length} vet shops
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVetShops;
