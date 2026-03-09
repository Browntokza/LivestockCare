import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  AlertTriangle, Search, Filter, MapPin, Clock, Users, 
  ChevronRight, Shield, Bell, BellOff, Loader2, RefreshCw,
  TrendingUp, Activity, ChevronDown, Phone, Calendar
} from 'lucide-react';
import AlertDetailModal, { type DiseaseAlert } from './AlertDetailModal';

interface AlertsPageProps {
  onNavigateDisease?: () => void;
}

const severityConfig: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  critical: { label: 'Critical', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
  high: { label: 'High', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' },
  medium: { label: 'Medium', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500' },
  low: { label: 'Low', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
};

const areaOptions = [
  'All Regions',
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

const AlertsPage: React.FC<AlertsPageProps> = ({ onNavigateDisease }) => {
  const [alerts, setAlerts] = useState<DiseaseAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<DiseaseAlert | null>(null);
  const [search, setSearch] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('All Regions');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    const { data, error } = await supabase
      .from('disease_alerts')
      .select('*')
      .order('is_active', { ascending: false })
      .order('severity', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAlerts(data);
    }

    setLoading(false);
    setRefreshing(false);
  };

  // Filter logic
  const filtered = alerts.filter(alert => {
    const matchesSearch = search === '' || 
      alert.title.toLowerCase().includes(search.toLowerCase()) ||
      alert.disease_name.toLowerCase().includes(search.toLowerCase()) ||
      alert.affected_area.toLowerCase().includes(search.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && alert.is_active) || 
      (filterStatus === 'resolved' && !alert.is_active);
    const matchesRegion = filterRegion === 'All Regions' || alert.affected_area === filterRegion;

    return matchesSearch && matchesSeverity && matchesStatus && matchesRegion;
  });

  const activeAlerts = alerts.filter(a => a.is_active);
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;
  const highCount = activeAlerts.filter(a => a.severity === 'high').length;
  const totalCases = activeAlerts.reduce((sum, a) => sum + a.reported_cases, 0);

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-red-700 via-red-800 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 300">
            <defs>
              <pattern id="alertPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#alertPattern)" />
          </svg>
        </div>

        <div className="relative z-10 p-5 pb-6 lg:p-8 lg:pb-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 lg:w-7 lg:h-7" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Disease Outbreak Alerts</h1>
                <p className="text-red-200 text-sm lg:text-base">Stay informed about livestock disease outbreaks in your region</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center hover:bg-white/15 transition-colors">
                <Bell className="w-5 h-5 mx-auto mb-1 text-red-200" />
                <p className="text-2xl font-bold">{activeAlerts.length}</p>
                <p className="text-xs text-red-200">Active Alerts</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center hover:bg-white/15 transition-colors">
                <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-red-200" />
                <p className="text-2xl font-bold">{criticalCount}</p>
                <p className="text-xs text-red-200">Critical</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center hover:bg-white/15 transition-colors">
                <TrendingUp className="w-5 h-5 mx-auto mb-1 text-red-200" />
                <p className="text-2xl font-bold">{highCount}</p>
                <p className="text-xs text-red-200">High Severity</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center hover:bg-white/15 transition-colors">
                <Users className="w-5 h-5 mx-auto mb-1 text-red-200" />
                <p className="text-2xl font-bold">{totalCases}</p>
                <p className="text-xs text-red-200">Total Cases</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-5 lg:py-6">
        {/* Search & Filter Bar */}
        <div className="mb-5 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search alerts by disease, title, or region..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-400 focus:border-red-400 shadow-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shadow-sm ${
                  showFilters ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => fetchAlerts(true)}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Severity</label>
                  <div className="flex flex-wrap gap-1.5">
                    {['all', 'critical', 'high', 'medium', 'low'].map(sev => (
                      <button
                        key={sev}
                        onClick={() => setFilterSeverity(sev)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          filterSeverity === sev
                            ? sev === 'all' ? 'bg-gray-800 text-white border-gray-800' :
                              `${severityConfig[sev]?.bg} ${severityConfig[sev]?.color} ${severityConfig[sev]?.border}`
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {sev === 'all' ? 'All' : severityConfig[sev]?.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Status</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'active', label: 'Active' },
                      { value: 'resolved', label: 'Resolved' },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setFilterStatus(opt.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          filterStatus === opt.value
                            ? opt.value === 'active' ? 'bg-red-50 text-red-700 border-red-200' :
                              opt.value === 'resolved' ? 'bg-green-50 text-green-700 border-green-200' :
                              'bg-gray-800 text-white border-gray-800'
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Region</label>
                  <select
                    value={filterRegion}
                    onChange={e => setFilterRegion(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-red-400"
                  >
                    {areaOptions.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>
              {(filterSeverity !== 'all' || filterStatus !== 'all' || filterRegion !== 'All Regions') && (
                <button
                  onClick={() => { setFilterSeverity('all'); setFilterStatus('all'); setFilterRegion('All Regions'); }}
                  className="mt-3 text-xs text-red-600 font-medium hover:text-red-700"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-red-600 mb-3" />
            <p className="text-sm text-gray-500">Loading outbreak alerts...</p>
          </div>
        ) : (
          <>
            {/* Active Critical Alerts - Highlighted Section */}
            {filtered.some(a => a.is_active && a.severity === 'critical') && (
              <div className="mb-6">
                <h2 className="font-bold text-red-800 flex items-center gap-2 mb-3 text-base">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Critical Alerts - Immediate Action Required
                </h2>
                <div className="space-y-3">
                  {filtered.filter(a => a.is_active && a.severity === 'critical').map(alert => (
                    <button
                      key={alert.id}
                      onClick={() => setSelectedAlert(alert)}
                      className="w-full bg-red-50 border-2 border-red-200 rounded-xl p-4 lg:p-5 text-left hover:border-red-400 hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="px-2 py-0.5 bg-red-200 text-red-800 rounded-full text-[10px] font-bold uppercase tracking-wider">
                              Critical
                            </span>
                            <span className="text-xs text-red-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(alert.created_at)}
                            </span>
                          </div>
                          <h3 className="text-base lg:text-lg font-bold text-red-900 group-hover:underline">{alert.title}</h3>
                          <p className="text-sm text-red-700 mt-1 line-clamp-2">{alert.description}</p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-red-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {alert.affected_area}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" />
                              {alert.reported_cases} cases
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-red-400 flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All Other Alerts */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 text-base">
                  {filterStatus === 'active' ? 'Active Alerts' : 
                   filterStatus === 'resolved' ? 'Resolved Alerts' : 'All Alerts'}
                  <span className="text-gray-400 font-normal ml-2 text-sm">
                    ({filtered.filter(a => !(a.is_active && a.severity === 'critical')).length})
                  </span>
                </h2>
              </div>

              {filtered.filter(a => !(a.is_active && a.severity === 'critical')).length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <Shield className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-700 mb-1">No alerts found</h3>
                  <p className="text-sm text-gray-500">
                    {search || filterSeverity !== 'all' || filterStatus !== 'all' || filterRegion !== 'All Regions'
                      ? 'Try adjusting your filters to see more results.'
                      : 'No disease outbreak alerts have been reported. Stay vigilant!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.filter(a => !(a.is_active && a.severity === 'critical')).map(alert => {
                    const config = severityConfig[alert.severity] || severityConfig.medium;
                    return (
                      <button
                        key={alert.id}
                        onClick={() => setSelectedAlert(alert)}
                        className={`w-full bg-white border rounded-xl p-4 text-left hover:shadow-md transition-all group ${
                          alert.is_active ? 'border-gray-200 hover:border-gray-300' : 'border-gray-100 opacity-75 hover:opacity-100'
                        }`}
                      >
                        <div className="flex items-start gap-3 lg:gap-4">
                          <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            alert.is_active ? config.bg : 'bg-gray-100'
                          }`}>
                            {alert.is_active ? (
                              <AlertTriangle className={`w-5 h-5 ${config.color}`} />
                            ) : (
                              <Shield className="w-5 h-5 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                alert.is_active ? `${config.bg} ${config.color} ${config.border}` : 'bg-green-50 text-green-700 border-green-200'
                              }`}>
                                {alert.is_active ? config.label : 'Resolved'}
                              </span>
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {getTimeAgo(alert.created_at)}
                              </span>
                            </div>
                            <h3 className="text-sm lg:text-base font-bold text-gray-900 group-hover:text-red-700 transition-colors line-clamp-1">
                              {alert.title}
                            </h3>
                            <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2">{alert.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {alert.affected_area}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {alert.reported_cases} cases
                              </span>
                              <span className="flex items-center gap-1">
                                <Activity className="w-3 h-3" />
                                {alert.disease_name}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0 mt-2 group-hover:translate-x-1 group-hover:text-red-400 transition-all" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Emergency Contact Footer */}
            <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800">Report a Suspected Outbreak</h3>
                    <p className="text-sm text-red-600">Contact the Department of Veterinary Services immediately if you notice unusual animal deaths or disease symptoms.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <a
                    href="tel:+2632928823456"
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +263 29 288 2345
                  </a>
                  <a
                    href="tel:+263242700601"
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Hotline: +263 242 700 601
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onNavigateDisease={onNavigateDisease}
        />
      )}
    </div>
  );
};

export default AlertsPage;
