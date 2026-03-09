import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Search, Save, Loader2, AlertTriangle, Bell, BellOff, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AlertRecord {
  id: string;
  title: string;
  disease_name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affected_area: string;
  description: string;
  recommendations: string | null;
  is_active: boolean;
  reported_cases: number;
  created_at: string;
  updated_at: string;
}

const emptyAlert = {
  title: '',
  disease_name: '',
  severity: 'medium' as const,
  affected_area: '',
  description: '',
  recommendations: '',
  reported_cases: 0,
  is_active: true,
};

const severityOptions = [
  { value: 'low', label: 'Low', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700 border-red-200' },
];

const areaOptions = [
  'Bulawayo City',
  'Bulawayo Province',
  'Matabeleland North',
  'Matabeleland South',
  'Midlands',
  'Mashonaland West',
  'Mashonaland East',
  'Mashonaland Central',
  'Manicaland',
  'Masvingo',
  'Nationwide',
];

const AdminAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyAlert);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('disease_alerts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Error', description: 'Failed to load alerts', variant: 'destructive' });
    } else {
      setAlerts(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.disease_name || !form.affected_area || !form.description) {
      toast({ title: 'Validation Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const payload = {
      title: form.title,
      disease_name: form.disease_name,
      severity: form.severity,
      affected_area: form.affected_area,
      description: form.description,
      recommendations: form.recommendations || null,
      reported_cases: form.reported_cases,
      is_active: form.is_active,
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase.from('disease_alerts').update(payload).eq('id', editingId);
      if (error) {
        toast({ title: 'Error', description: 'Failed to update alert', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Alert updated successfully' });
      }
    } else {
      const { error } = await supabase.from('disease_alerts').insert(payload);
      if (error) {
        toast({ title: 'Error', description: 'Failed to send alert', variant: 'destructive' });
      } else {
        toast({ title: 'Alert Sent', description: 'Disease outbreak alert has been published' });
      }
    }

    setSaving(false);
    resetForm();
    fetchAlerts();
  };

  const handleEdit = (alert: AlertRecord) => {
    setEditingId(alert.id);
    setForm({
      title: alert.title,
      disease_name: alert.disease_name,
      severity: alert.severity,
      affected_area: alert.affected_area,
      description: alert.description,
      recommendations: alert.recommendations || '',
      reported_cases: alert.reported_cases,
      is_active: alert.is_active,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleActive = async (alert: AlertRecord) => {
    const { error } = await supabase
      .from('disease_alerts')
      .update({ is_active: !alert.is_active, updated_at: new Date().toISOString() })
      .eq('id', alert.id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to update alert status', variant: 'destructive' });
    } else {
      toast({ title: 'Updated', description: `Alert ${!alert.is_active ? 'activated' : 'deactivated'}` });
      fetchAlerts();
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('disease_alerts').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete alert', variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Alert removed successfully' });
      fetchAlerts();
    }
    setDeleteConfirm(null);
  };

  const resetForm = () => {
    setForm(emptyAlert);
    setEditingId(null);
    setShowForm(false);
  };

  const getSeverityStyle = (severity: string) => {
    return severityOptions.find(s => s.value === severity)?.color || 'bg-gray-100 text-gray-700';
  };

  const filtered = alerts.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.disease_name.toLowerCase().includes(search.toLowerCase()) ||
    a.affected_area.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = alerts.filter(a => a.is_active).length;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-500">Total Alerts</p>
          <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-red-600">{activeCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-500">Critical</p>
          <p className="text-2xl font-bold text-red-700">{alerts.filter(a => a.severity === 'critical' && a.is_active).length}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-500">Resolved</p>
          <p className="text-2xl font-bold text-green-600">{alerts.length - activeCount}</p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400 focus:border-red-400"
          />
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" /> Send New Alert
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {editingId ? 'Edit Alert' : 'Send Disease Outbreak Alert'}
            </h3>
            <button onClick={resetForm} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Alert Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
                  placeholder="e.g., FMD Outbreak - Matabeleland South"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Disease Name *</label>
                <input
                  type="text"
                  value={form.disease_name}
                  onChange={e => setForm(p => ({ ...p, disease_name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
                  placeholder="e.g., Foot and Mouth Disease"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Severity *</label>
                <div className="flex flex-wrap gap-2">
                  {severityOptions.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, severity: opt.value as any }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        form.severity === opt.value ? opt.color : 'bg-white border-gray-300 text-gray-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Affected Area *</label>
                <select
                  value={form.affected_area}
                  onChange={e => setForm(p => ({ ...p, affected_area: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400 bg-white"
                  required
                >
                  <option value="">Select area...</option>
                  {areaOptions.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Reported Cases</label>
                <input
                  type="number"
                  min="0"
                  value={form.reported_cases}
                  onChange={e => setForm(p => ({ ...p, reported_cases: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description *</label>
              <textarea
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
                rows={3}
                placeholder="Describe the outbreak situation, affected livestock, and current status..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Recommendations</label>
              <textarea
                value={form.recommendations}
                onChange={e => setForm(p => ({ ...p, recommendations: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-400"
                rows={3}
                placeholder="What should farmers do? Vaccination advice, movement restrictions, etc."
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-gray-600">Status:</label>
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, is_active: true }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  form.is_active ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-gray-300 text-gray-600'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setForm(p => ({ ...p, is_active: false }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  !form.is_active ? 'bg-green-100 border-green-300 text-green-700' : 'bg-white border-gray-300 text-gray-600'
                }`}
              >
                Resolved
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {editingId ? 'Update Alert' : 'Send Alert'}
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
          <Loader2 className="w-6 h-6 animate-spin text-red-600" />
          <span className="ml-2 text-sm text-gray-500">Loading alerts...</span>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Alert</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Severity</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Area</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Cases</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(alert => (
                  <tr key={alert.id} className={`hover:bg-gray-50 transition-colors ${!alert.is_active ? 'opacity-60' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          alert.is_active ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          <AlertTriangle className={`w-4 h-4 ${alert.is_active ? 'text-red-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{alert.title}</p>
                          <p className="text-xs text-gray-500">{alert.disease_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityStyle(alert.severity)}`}>
                        {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell text-xs">{alert.affected_area}</td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell font-medium">{alert.reported_cases}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <button
                        onClick={() => handleToggleActive(alert)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                          alert.is_active
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {alert.is_active ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
                        {alert.is_active ? 'Active' : 'Resolved'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => handleEdit(alert)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === alert.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(alert.id)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(alert.id)}
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
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      {search ? 'No alerts match your search' : 'No alerts sent yet. Send one to notify farmers.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            Showing {filtered.length} of {alerts.length} alerts
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAlerts;
