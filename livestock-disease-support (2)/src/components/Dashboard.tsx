import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { worms as wormsData } from '../data/worms';

import { calendarData } from '../data/calendar';
import { diseases } from '../data/diseases';
import { vetShops } from '../data/vetShops';
import AlertDetailModal, { type DiseaseAlert } from './AlertDetailModal';
import { 
  BookOpen, Calendar, Warehouse, MapPin, Lightbulb, Stethoscope, 
  Bell, AlertTriangle, ChevronRight, Shield, Clock, TrendingUp,
  Syringe, Bug, Wifi, WifiOff, Activity, Heart, Zap, ArrowRight,
  Users, Loader2, RefreshCw
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string) => void;
  livestockCount: number;
  isOnline: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, livestockCount, isOnline }) => {
  const [activeAlerts, setActiveAlerts] = useState<DiseaseAlert[]>([]);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<DiseaseAlert | null>(null);

  const currentMonth = new Date().getMonth();
  const monthData = calendarData[currentMonth];
  const urgentActivities = monthData.activities.filter(a => a.category === 'Veterinary');
  const allActivities = monthData.activities;

  useEffect(() => {
    fetchActiveAlerts();
  }, []);

  const fetchActiveAlerts = async () => {
    setAlertsLoading(true);
    const { data, error } = await supabase
      .from('disease_alerts')
      .select('*')
      .eq('is_active', true)
      .order('severity', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setActiveAlerts(data);
    }
    setAlertsLoading(false);
  };

  const getTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const severityConfig: Record<string, { color: string; bg: string; border: string; dot: string }> = {
    critical: { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
    high: { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500' },
    medium: { color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200', dot: 'bg-yellow-500' },
    low: { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  };

  const quickActions = [
    { id: 'diseases', label: 'Disease Library', desc: 'Browse 16 livestock diseases', icon: <BookOpen className="w-6 h-6" />, color: 'from-emerald-500 to-emerald-600', count: `${diseases.length} diseases` },
    { id: 'worms', label: 'Common Worms', desc: 'Worm identification & treatment', icon: <Bug className="w-6 h-6" />, color: 'from-teal-500 to-cyan-600', count: `${wormsData.length} types` },
    { id: 'calendar', label: 'Calendar', desc: 'Monthly management planner', icon: <Calendar className="w-6 h-6" />, color: 'from-blue-500 to-blue-600', count: `${monthData.activities.length} tasks` },
    { id: 'livestock', label: 'My Livestock', desc: 'Manage your herd inventory', icon: <Warehouse className="w-6 h-6" />, color: 'from-amber-500 to-amber-600', count: `${livestockCount} animals` },
    { id: 'vetshops', label: 'Vet Shops', desc: 'Find nearby veterinary shops', icon: <MapPin className="w-6 h-6" />, color: 'from-teal-500 to-teal-600', count: `${vetShops.length} nearby` },
    { id: 'symptom', label: 'Symptom Checker', desc: 'AI-powered disease diagnosis', icon: <Stethoscope className="w-6 h-6" />, color: 'from-violet-500 to-violet-600', count: 'AI Diagnosis' },
  ];

  return (
    <div className="min-h-full bg-gray-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-green-900 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 800 400">
            <defs>
              <pattern id="heroPattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="white" />
                <path d="M 0 30 L 60 30 M 30 0 L 30 60" stroke="white" strokeWidth="0.3" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroPattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 p-5 pb-8 lg:p-8 lg:pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                    <Activity className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">Livestock Care</h1>
                    <p className="text-emerald-200 text-sm lg:text-base font-medium">Zimbabwe - Bulawayo Province</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  isOnline ? 'bg-green-500/30 text-green-200' : 'bg-red-500/30 text-red-200'
                }`}>
                  {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                  {isOnline ? 'Online' : 'Offline'}
                </div>
                <button 
                  onClick={() => onNavigate('alerts')}
                  className="relative p-2.5 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {activeAlerts.length > 0 && (
                    <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-emerald-800 flex items-center justify-center text-[10px] font-bold">
                      {activeAlerts.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 text-center hover:bg-white/15 transition-colors cursor-pointer" onClick={() => onNavigate('livestock')}>
                <Warehouse className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
                <p className="text-2xl lg:text-3xl font-bold">{livestockCount}</p>
                <p className="text-xs lg:text-sm text-emerald-200">Animals</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 text-center hover:bg-white/15 transition-colors cursor-pointer" onClick={() => onNavigate('calendar')}>
                <Syringe className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
                <p className="text-2xl lg:text-3xl font-bold">{urgentActivities.length}</p>
                <p className="text-xs lg:text-sm text-emerald-200">Vet Tasks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 lg:p-4 text-center hover:bg-white/15 transition-colors cursor-pointer" onClick={() => onNavigate('alerts')}>
                <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
                <p className="text-2xl lg:text-3xl font-bold">{activeAlerts.length}</p>
                <p className="text-xs lg:text-sm text-emerald-200">Active Alerts</p>
              </div>
              <div className="hidden lg:block bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/15 transition-colors cursor-pointer" onClick={() => onNavigate('vetshops')}>
                <MapPin className="w-5 h-5 mx-auto mb-1 text-emerald-200" />
                <p className="text-3xl font-bold">{vetShops.length}</p>
                <p className="text-sm text-emerald-200">Vet Shops</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Quick Actions Grid */}
        <div className="px-4 lg:px-8 -mt-4 lg:-mt-5">
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
            {quickActions.map(action => (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="bg-white border border-gray-200 rounded-xl p-3 lg:p-4 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className={`w-12 h-12 lg:w-14 lg:h-14 mx-auto rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-2 group-hover:scale-110 transition-transform shadow-lg`}>
                  {action.icon}
                </div>
                <p className="text-xs lg:text-sm font-bold text-gray-800">{action.label}</p>
                <p className="text-[10px] lg:text-xs text-gray-500 mt-0.5 hidden sm:block">{action.desc}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 sm:hidden">{action.count}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="p-4 lg:p-8 lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Left Column - Alerts & Calendar */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            
            {/* === DISEASE OUTBREAK ALERTS SECTION === */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base lg:text-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  Disease Outbreak Alerts
                  {activeAlerts.length > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                      {activeAlerts.length} active
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => onNavigate('alerts')}
                  className="text-sm text-red-600 font-medium flex items-center gap-1 hover:text-red-700"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {alertsLoading ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin text-red-500 mr-2" />
                  <span className="text-sm text-gray-500">Loading alerts...</span>
                </div>
              ) : activeAlerts.length === 0 ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">No Active Outbreaks</h3>
                    <p className="text-sm text-green-600">There are currently no disease outbreak alerts for your region. Stay vigilant and report any unusual symptoms.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {activeAlerts.slice(0, 4).map(alert => {
                    const config = severityConfig[alert.severity] || severityConfig.medium;
                    const isCritical = alert.severity === 'critical';
                    
                    return (
                      <button
                        key={alert.id}
                        onClick={() => setSelectedAlert(alert)}
                        className={`w-full rounded-xl p-3 lg:p-4 flex items-start gap-3 transition-all group text-left ${
                          isCritical 
                            ? 'bg-red-50 border-2 border-red-300 hover:border-red-400 hover:shadow-lg' 
                            : `bg-white border border-gray-200 hover:shadow-md hover:${config.border}`
                        }`}
                      >
                        {/* Severity indicator */}
                        <div className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                          <AlertTriangle className={`w-5 h-5 ${config.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.color} border ${config.border}`}>
                              {alert.severity}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(alert.created_at)}
                            </span>
                            {isCritical && (
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[10px] text-red-600 font-semibold">URGENT</span>
                              </div>
                            )}
                          </div>
                          <h3 className={`text-sm lg:text-base font-bold group-hover:underline line-clamp-1 ${
                            isCritical ? 'text-red-900' : 'text-gray-900'
                          }`}>
                            {alert.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{alert.description}</p>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {alert.affected_area}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {alert.reported_cases} cases
                            </span>
                          </div>
                        </div>
                        
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                  
                  {activeAlerts.length > 4 && (
                    <button
                      onClick={() => onNavigate('alerts')}
                      className="w-full py-2.5 text-center text-sm text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                    >
                      View {activeAlerts.length - 4} more alerts <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Current Month Alerts */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base lg:text-lg">
                  <Syringe className="w-5 h-5 text-amber-600" />
                  {monthData.month} - Veterinary Tasks
                </h2>
                <button
                  onClick={() => onNavigate('calendar')}
                  className="text-sm text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700"
                >
                  Full Calendar <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                {urgentActivities.map((activity, i) => (
                  <button
                    key={i}
                    onClick={() => onNavigate('calendar')}
                    className="w-full bg-white border border-gray-200 rounded-xl p-3 lg:p-4 flex items-center gap-3 hover:shadow-md hover:border-red-200 transition-all"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                      <Syringe className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm lg:text-base font-medium text-gray-900 truncate">{activity.activity}</p>
                      <p className="text-xs text-gray-500">{activity.category} - {monthData.month}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* All Monthly Activities */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base lg:text-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  All {monthData.month} Activities
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {allActivities.filter(a => a.category !== 'Veterinary').map((activity, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      activity.category === 'Management' ? 'bg-blue-500' :
                      activity.category === 'Feeding' ? 'bg-green-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{activity.activity}</p>
                      <p className="text-xs text-gray-500">{activity.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disease Spotlight */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-base lg:text-lg">
                  <Bug className="w-5 h-5 text-emerald-600" />
                  Disease Spotlight
                </h2>
                <button
                  onClick={() => onNavigate('diseases')}
                  className="text-sm text-emerald-600 font-medium flex items-center gap-1 hover:text-emerald-700"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
                {diseases.slice(0, 6).map(disease => (
                  <button
                    key={disease.id}
                    onClick={() => onNavigate('diseases')}
                    className="flex-shrink-0 w-48 lg:w-auto bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-md hover:border-emerald-300 transition-all"
                  >
                    <div className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium mb-2 ${
                      disease.category === 'Bacterial' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      disease.category === 'Viral' ? 'bg-rose-100 text-rose-700 border-rose-200' :
                      'bg-teal-100 text-teal-700 border-teal-200'
                    }`}>
                      {disease.category}
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{disease.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{disease.animalsAffected.slice(0, 2).join(', ')}</p>
                    {disease.vaccinationAvailable && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                        <Syringe className="w-3 h-3" />
                        <span>Vaccine available</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Tips, Emergency, Symptom Checker */}
          <div className="space-y-4 lg:space-y-6 mt-4 lg:mt-0">
            {/* AI Symptom Checker CTA */}
            <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-xl p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Stethoscope className="w-6 h-6" />
                  <h3 className="font-bold text-lg">AI Symptom Checker</h3>
                </div>
                <p className="text-violet-200 text-sm mb-4">
                  Describe your animal's symptoms and get instant disease suggestions powered by AI.
                </p>
                <button
                  onClick={() => onNavigate('symptom')}
                  className="bg-white text-violet-700 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-violet-50 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Check Symptoms Now
                </button>
              </div>
            </div>

            {/* Outbreak Alert Quick Summary */}
            {activeAlerts.length > 0 && (
              <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-xl p-5 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-bold">Outbreak Summary</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-white/15 rounded-lg p-2 text-center">
                      <p className="text-xl font-bold">{activeAlerts.filter(a => a.severity === 'critical').length}</p>
                      <p className="text-[10px] text-red-200 uppercase font-semibold">Critical</p>
                    </div>
                    <div className="bg-white/15 rounded-lg p-2 text-center">
                      <p className="text-xl font-bold">{activeAlerts.reduce((sum, a) => sum + a.reported_cases, 0)}</p>
                      <p className="text-[10px] text-red-200 uppercase font-semibold">Total Cases</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('alerts')}
                    className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    View All Alerts <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Tip of the Day */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-bold">Tip of the Day</h3>
              </div>
              <p className="text-sm text-indigo-100 leading-relaxed">
                Regular tick control is the single most important disease prevention measure for cattle in Zimbabwe. 
                Weekly dipping during the rainy season can prevent Redwater, Heartwater, January Disease, and Anaplasmosis.
              </p>
              <button
                onClick={() => onNavigate('tips')}
                className="mt-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                Read More Tips <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-red-800">Emergency Contacts</h3>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">Dept. of Veterinary Services</span>
                  <a href="tel:+2632928823456" className="text-sm font-bold text-red-800 hover:underline">
                    +263 29 288 2345
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-red-700">Disease Outbreak Hotline</span>
                  <a href="tel:+263242700601" className="text-sm font-bold text-red-800 hover:underline">
                    +263 242 700 601
                  </a>
                </div>
              </div>
              <button
                onClick={() => onNavigate('symptom')}
                className="w-full mt-3 bg-red-600 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition-colors"
              >
                <Stethoscope className="w-4 h-4" />
                Use Symptom Checker
              </button>
            </div>

            {/* Nearest Vet Shop */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-gray-800">Nearest Vet Shops</h3>
              </div>
              <div className="space-y-2">
                {vetShops.slice(0, 3).map(shop => (
                  <button
                    key={shop.id}
                    onClick={() => onNavigate('vetshops')}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{shop.name}</p>
                      <p className="text-xs text-gray-500 truncate">{shop.address}</p>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => onNavigate('vetshops')}
                className="w-full mt-2 text-sm text-teal-600 font-medium flex items-center justify-center gap-1 py-2 hover:bg-teal-50 rounded-lg transition-colors"
              >
                View All Vet Shops <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Health Check */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-emerald-800">Quick Health Reminders</h3>
              </div>
              <ul className="space-y-2 text-sm text-emerald-700">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Check animals daily for signs of illness
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Ensure clean water is always available
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Normal cattle temperature: 38.5-39.5°C
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  Isolate sick animals immediately
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          onNavigateDisease={() => onNavigate('diseases')}
        />
      )}
    </div>
  );
};

export default Dashboard;
