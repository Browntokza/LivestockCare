import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import AdminDiseases from './admin/AdminDiseases';
import AdminVetShops from './admin/AdminVetShops';
import AdminTips from './admin/AdminTips';
import AdminAlerts from './admin/AdminAlerts';
import {
  Shield, BookOpen, MapPin, Lightbulb, AlertTriangle,
  ArrowLeft, BarChart3, Database, Lock, Unlock
} from 'lucide-react';

interface AdminDashboardProps {
  onBack: () => void;
}

type AdminTab = 'overview' | 'diseases' | 'vetshops' | 'tips' | 'alerts';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [stats, setStats] = useState({
    diseases: 0,
    vetShops: 0,
    tips: 0,
    alerts: 0,
    activeAlerts: 0,
  });

  // Simple admin password check (in production, use proper auth)
  const ADMIN_PASSWORD = 'admin2026';

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    const [diseasesRes, shopsRes, tipsRes, alertsRes] = await Promise.all([
      supabase.from('diseases').select('id', { count: 'exact', head: true }),
      supabase.from('vet_shops').select('id', { count: 'exact', head: true }),
      supabase.from('business_tips').select('id', { count: 'exact', head: true }),
      supabase.from('disease_alerts').select('id, is_active'),
    ]);

    setStats({
      diseases: diseasesRes.count || 0,
      vetShops: shopsRes.count || 0,
      tips: tipsRes.count || 0,
      alerts: alertsRes.data?.length || 0,
      activeAlerts: alertsRes.data?.filter(a => a.is_active).length || 0,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; color: string; shortLabel: string }[] = [
    { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: <BarChart3 className="w-4 h-4" />, color: 'text-gray-600' },
    { id: 'diseases', label: 'Disease Library', shortLabel: 'Diseases', icon: <BookOpen className="w-4 h-4" />, color: 'text-emerald-600' },
    { id: 'vetshops', label: 'Vet Shops', shortLabel: 'Shops', icon: <MapPin className="w-4 h-4" />, color: 'text-teal-600' },
    { id: 'tips', label: 'Business Tips', shortLabel: 'Tips', icon: <Lightbulb className="w-4 h-4" />, color: 'text-indigo-600' },
    { id: 'alerts', label: 'Outbreak Alerts', shortLabel: 'Alerts', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-600' },
  ];

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-full bg-gray-50 flex flex-col">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 lg:p-6">
          <div className="max-w-lg mx-auto">
            <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to App
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Livestock Care Zimbabwe</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-sm">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Admin Access</h2>
              <p className="text-sm text-gray-500 mt-1">Enter the admin password to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setPasswordError(false); }}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-amber-400 focus:border-amber-400 ${
                    passwordError ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter admin password"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-600 mt-1">Incorrect password. Please try again.</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl font-semibold text-sm hover:from-amber-600 hover:to-orange-700 transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" /> Access Dashboard
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              Default password: admin2026
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 lg:p-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-3 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to App
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">Manage content and send alerts</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-300 font-medium">Connected to Database</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 -mt-3">
        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-4 overflow-hidden">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 lg:px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? `${tab.color} border-current bg-gray-50`
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-8">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                <button
                  onClick={() => setActiveTab('diseases')}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.diseases}</p>
                  <p className="text-xs text-gray-500">Diseases</p>
                </button>

                <button
                  onClick={() => setActiveTab('vetshops')}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.vetShops}</p>
                  <p className="text-xs text-gray-500">Vet Shops</p>
                </button>

                <button
                  onClick={() => setActiveTab('tips')}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Lightbulb className="w-5 h-5 text-indigo-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.tips}</p>
                  <p className="text-xs text-gray-500">Business Tips</p>
                </button>

                <button
                  onClick={() => setActiveTab('alerts')}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stats.alerts}</p>
                  <p className="text-xs text-gray-500">Total Alerts</p>
                </button>

                <button
                  onClick={() => setActiveTab('alerts')}
                  className="bg-white border border-red-200 rounded-xl p-4 hover:shadow-md transition-all text-left group col-span-2 lg:col-span-1"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{stats.activeAlerts}</p>
                  <p className="text-xs text-gray-500">Active Alerts</p>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-gray-500" /> Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => setActiveTab('diseases')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Add Disease</p>
                      <p className="text-xs text-gray-500">Add to disease library</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('vetshops')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Add Vet Shop</p>
                      <p className="text-xs text-gray-500">Register new location</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('tips')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Publish Tip</p>
                      <p className="text-xs text-gray-500">Share farming advice</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('alerts')}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Send Alert</p>
                      <p className="text-xs text-gray-500">Disease outbreak warning</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Admin Info */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
                <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Admin Panel Information
                </h3>
                <div className="text-sm text-amber-700 space-y-1">
                  <p>This dashboard allows you to manage all content in the Livestock Care Zimbabwe app.</p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-xs">
                    <li><strong>Disease Library:</strong> Add, edit, or remove diseases with full veterinary details</li>
                    <li><strong>Vet Shops:</strong> Manage veterinary shop listings with locations and services</li>
                    <li><strong>Business Tips:</strong> Publish and manage farming advice articles</li>
                    <li><strong>Outbreak Alerts:</strong> Send disease outbreak warnings to all farmers</li>
                  </ul>
                  <p className="mt-2 text-xs">All changes are saved directly to the database and reflected in the app immediately.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diseases' && <AdminDiseases />}
          {activeTab === 'vetshops' && <AdminVetShops />}
          {activeTab === 'tips' && <AdminTips />}
          {activeTab === 'alerts' && <AdminAlerts />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
