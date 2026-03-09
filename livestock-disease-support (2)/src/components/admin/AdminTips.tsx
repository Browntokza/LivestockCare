import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Search, Save, Loader2, Lightbulb, Eye } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TipRecord {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  icon: string | null;
  created_at: string;
}

const emptyTip = {
  title: '',
  category: '',
  summary: '',
  content: '',
  icon: 'lightbulb',
};

const tipCategories = [
  'Cattle Fattening',
  'Mortality Reduction',
  'Feed Optimization',
  'Record Keeping',
  'Breeding Management',
  'Market Access',
  'Disease Risk',
  'Goat Farming',
  'Poultry Farming',
  'General',
];

const AdminTips: React.FC = () => {
  const [tips, setTips] = useState<TipRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTip);
  const [search, setSearch] = useState('');
  const [previewContent, setPreviewContent] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('business_tips')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Error', description: 'Failed to load tips', variant: 'destructive' });
    } else {
      setTips(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.summary || !form.content) {
      toast({ title: 'Validation Error', description: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setSaving(true);

    const payload = {
      title: form.title,
      category: form.category,
      summary: form.summary,
      content: form.content,
      icon: form.icon || 'lightbulb',
      updated_at: new Date().toISOString(),
    };

    if (editingId) {
      const { error } = await supabase.from('business_tips').update(payload).eq('id', editingId);
      if (error) {
        toast({ title: 'Error', description: 'Failed to update tip', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Business tip updated successfully' });
      }
    } else {
      const { error } = await supabase.from('business_tips').insert(payload);
      if (error) {
        toast({ title: 'Error', description: 'Failed to add tip', variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: 'Business tip published successfully' });
      }
    }

    setSaving(false);
    resetForm();
    fetchTips();
  };

  const handleEdit = (tip: TipRecord) => {
    setEditingId(tip.id);
    setForm({
      title: tip.title,
      category: tip.category,
      summary: tip.summary,
      content: tip.content,
      icon: tip.icon || 'lightbulb',
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('business_tips').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error', description: 'Failed to delete tip', variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Business tip removed successfully' });
      fetchTips();
    }
    setDeleteConfirm(null);
  };

  const resetForm = () => {
    setForm(emptyTip);
    setEditingId(null);
    setShowForm(false);
  };

  const filtered = tips.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tips..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Publish New Tip
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between">
            <h3 className="text-white font-semibold text-sm">
              {editingId ? 'Edit Business Tip' : 'Publish New Business Tip'}
            </h3>
            <button onClick={resetForm} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 bg-white"
                  required
                >
                  <option value="">Select category...</option>
                  {tipCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Summary *</label>
              <input
                type="text"
                value={form.summary}
                onChange={e => setForm(p => ({ ...p, summary: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400"
                placeholder="Brief description for the tip card..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Content * <span className="text-gray-400 font-normal">(supports **bold** and line breaks)</span>
              </label>
              <textarea
                value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 font-mono"
                rows={12}
                placeholder="Write the full article content here...&#10;&#10;**Section Heading**&#10;- Point 1&#10;- Point 2"
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? 'Update Tip' : 'Publish Tip'}
              </button>
              <button type="button" onClick={resetForm}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Preview Modal */}
      {previewContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setPreviewContent(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Content Preview</h3>
              <button onClick={() => setPreviewContent(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-4 prose prose-sm max-w-none whitespace-pre-wrap text-gray-700">
              {previewContent}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="ml-2 text-sm text-gray-500">Loading tips...</span>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Summary</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Published</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(tip => (
                  <tr key={tip.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Lightbulb className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1">{tip.title}</p>
                          <p className="text-xs text-gray-500 md:hidden">{tip.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                        {tip.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell max-w-[250px] truncate text-xs">
                      {tip.summary}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden lg:table-cell text-xs">
                      {new Date(tip.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setPreviewContent(tip.content)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(tip)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Pencil className="w-4 h-4" />
                        </button>
                        {deleteConfirm === tip.id ? (
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleDelete(tip.id)}
                              className="px-2 py-1 bg-red-600 text-white rounded text-xs font-medium hover:bg-red-700">
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirm(null)}
                              className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs font-medium hover:bg-gray-300">
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button onClick={() => setDeleteConfirm(tip.id)}
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
                      {search ? 'No tips match your search' : 'No tips found. Publish one to get started.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
            Showing {filtered.length} of {tips.length} business tips
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTips;
