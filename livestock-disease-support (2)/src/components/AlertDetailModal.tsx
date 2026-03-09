import React from 'react';
import { 
  X, AlertTriangle, MapPin, Calendar, Users, Shield, 
  Clock, ChevronRight, ExternalLink, Phone
} from 'lucide-react';

export interface DiseaseAlert {
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

interface AlertDetailModalProps {
  alert: DiseaseAlert | null;
  onClose: () => void;
  onNavigateDisease?: () => void;
}

const severityConfig = {
  low: {
    label: 'Low',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: 'text-blue-600',
    gradient: 'from-blue-600 to-blue-700',
  },
  medium: {
    label: 'Medium',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: 'text-yellow-600',
    gradient: 'from-yellow-500 to-orange-600',
  },
  high: {
    label: 'High',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    badge: 'bg-orange-100 text-orange-800 border-orange-300',
    icon: 'text-orange-600',
    gradient: 'from-orange-500 to-red-600',
  },
  critical: {
    label: 'Critical',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-800 border-red-300',
    icon: 'text-red-600',
    gradient: 'from-red-600 to-red-800',
  },
};

const AlertDetailModal: React.FC<AlertDetailModalProps> = ({ alert, onClose, onNavigateDisease }) => {
  if (!alert) return null;

  const config = severityConfig[alert.severity] || severityConfig.medium;
  const createdDate = new Date(alert.created_at);
  const timeAgo = getTimeAgo(createdDate);
  const recommendations = alert.recommendations
    ? alert.recommendations.split('.').filter(s => s.trim().length > 0)
    : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full sm:max-w-lg lg:max-w-2xl max-h-[90vh] bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-bottom-4 duration-300 overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} px-5 py-4 text-white relative overflow-hidden flex-shrink-0`}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-8" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      alert.is_active ? 'bg-white/25 text-white' : 'bg-green-400/30 text-green-100'
                    }`}>
                      {alert.is_active ? `${config.label} Severity` : 'Resolved'}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold leading-tight">{alert.title}</h2>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-xl transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Meta info row */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{alert.affected_area}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeAgo}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>{alert.reported_cases} reported cases</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-5 space-y-5">
            {/* Disease Name Card */}
            <div className={`${config.bg} ${config.border} border rounded-xl p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Disease</p>
                  <p className={`text-lg font-bold ${config.text}`}>{alert.disease_name}</p>
                </div>
                {onNavigateDisease && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateDisease();
                    }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium ${config.badge} border hover:opacity-80 transition-opacity`}
                  >
                    Learn More <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Status Badge */}
            {!alert.is_active && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">Outbreak Resolved</p>
                  <p className="text-sm text-green-600">This alert has been marked as resolved by veterinary authorities.</p>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <div className="w-1 h-5 rounded-full bg-gray-300" />
                Situation Report
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">{alert.description}</p>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <div className={`w-1 h-5 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500' : 
                    alert.severity === 'high' ? 'bg-orange-500' : 
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  Recommendations for Farmers
                </h3>
                <div className="space-y-2">
                  {recommendations.map((rec, i) => (
                    <div 
                      key={i} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${config.bg} border ${config.border}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${config.badge}`}>
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">{rec.trim()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-xl font-bold text-gray-900">{alert.reported_cases}</p>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Cases</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <MapPin className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-sm font-bold text-gray-900 leading-tight">{alert.affected_area}</p>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Region</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 text-center">
                <Calendar className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                <p className="text-sm font-bold text-gray-900">{createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                <p className="text-[10px] text-gray-500 uppercase font-semibold">Reported</p>
              </div>
            </div>

            {/* Emergency Contact */}
            {alert.is_active && (alert.severity === 'critical' || alert.severity === 'high') && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Phone className="w-4 h-4 text-red-600" />
                  <h4 className="font-bold text-red-800 text-sm">Emergency Contacts</h4>
                </div>
                <div className="space-y-2">
                  <a 
                    href="tel:+2632928823456" 
                    className="flex items-center justify-between p-2 bg-white rounded-lg border border-red-100 hover:border-red-300 transition-colors"
                  >
                    <span className="text-sm text-red-700">Dept. of Veterinary Services</span>
                    <span className="text-sm font-bold text-red-800">+263 29 288 2345</span>
                  </a>
                  <a 
                    href="tel:+263242700601" 
                    className="flex items-center justify-between p-2 bg-white rounded-lg border border-red-100 hover:border-red-300 transition-colors"
                  >
                    <span className="text-sm text-red-700">Disease Outbreak Hotline</span>
                    <span className="text-sm font-bold text-red-800">+263 242 700 601</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
            {alert.is_active && (
              <a
                href="tel:+2632928823456"
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Report Case
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default AlertDetailModal;
