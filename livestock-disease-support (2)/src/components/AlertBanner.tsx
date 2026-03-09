import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { AlertTriangle, X, ChevronRight, ChevronLeft, Bell } from 'lucide-react';
import AlertDetailModal, { type DiseaseAlert } from './AlertDetailModal';

interface AlertBannerProps {
  onNavigateAlerts: () => void;
  onNavigateDisease?: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ onNavigateAlerts, onNavigateDisease }) => {
  const [alerts, setAlerts] = useState<DiseaseAlert[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [selectedAlert, setSelectedAlert] = useState<DiseaseAlert | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetchCriticalAlerts();
    // Poll every 2 minutes for new alerts
    const interval = setInterval(fetchCriticalAlerts, 120000);
    return () => clearInterval(interval);
  }, []);

  const fetchCriticalAlerts = async () => {
    const { data, error } = await supabase
      .from('disease_alerts')
      .select('*')
      .eq('is_active', true)
      .in('severity', ['critical', 'high'])
      .order('severity', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAlerts(data);
    }
  };

  // Auto-rotate alerts every 6 seconds
  useEffect(() => {
    if (visibleAlerts.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % visibleAlerts.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [alerts, dismissed]);

  const handleDismiss = useCallback((alertId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissed(prev => new Set(prev).add(alertId));
    // If we dismissed the current alert, move to next
    setCurrentIndex(0);
  }, []);

  const visibleAlerts = alerts.filter(a => !dismissed.has(a.id));

  if (visibleAlerts.length === 0) return null;

  const currentAlert = visibleAlerts[currentIndex % visibleAlerts.length];
  if (!currentAlert) return null;

  const isCritical = currentAlert.severity === 'critical';

  if (isCollapsed) {
    return (
      <>
        <button
          onClick={() => setIsCollapsed(false)}
          className={`w-full flex items-center justify-center gap-2 py-1.5 text-xs font-medium transition-colors ${
            isCritical 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <Bell className="w-3 h-3" />
          <span>{visibleAlerts.length} active outbreak {visibleAlerts.length === 1 ? 'alert' : 'alerts'}</span>
          <ChevronRight className="w-3 h-3 rotate-90" />
        </button>
        {selectedAlert && (
          <AlertDetailModal 
            alert={selectedAlert} 
            onClose={() => setSelectedAlert(null)}
            onNavigateDisease={onNavigateDisease}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div 
        className={`relative overflow-hidden transition-all ${
          isCritical 
            ? 'bg-gradient-to-r from-red-700 via-red-600 to-red-700' 
            : 'bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600'
        }`}
      >
        {/* Animated pulse background for critical */}
        {isCritical && (
          <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
        )}

        <div className="relative z-10 px-4 py-2.5 lg:px-6">
          <div className="flex items-center gap-3 max-w-6xl mx-auto">
            {/* Alert icon with pulse */}
            <div className="flex-shrink-0 relative">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isCritical ? 'bg-white/20' : 'bg-white/20'
              }`}>
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              {isCritical && (
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
              )}
            </div>

            {/* Alert content - clickable */}
            <button 
              onClick={() => setSelectedAlert(currentAlert)}
              className="flex-1 min-w-0 text-left group"
            >
              <div className="flex items-center gap-2">
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  isCritical ? 'bg-red-900/40 text-red-100' : 'bg-orange-900/30 text-orange-100'
                }`}>
                  {currentAlert.severity}
                </span>
                <span className="text-white/70 text-xs hidden sm:inline">
                  {currentAlert.affected_area}
                </span>
              </div>
              <p className="text-white text-sm font-semibold truncate group-hover:underline mt-0.5">
                {currentAlert.title}
              </p>
            </button>

            {/* Navigation arrows */}
            {visibleAlerts.length > 1 && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(prev => (prev - 1 + visibleAlerts.length) % visibleAlerts.length);
                  }}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-white/60 text-xs font-medium min-w-[2rem] text-center">
                  {(currentIndex % visibleAlerts.length) + 1}/{visibleAlerts.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(prev => (prev + 1) % visibleAlerts.length);
                  }}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            {/* View all button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateAlerts();
              }}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-medium transition-colors flex-shrink-0"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>

            {/* Collapse / Dismiss */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(true);
                }}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/70 hover:text-white hidden sm:block"
                title="Minimize"
              >
                <ChevronLeft className="w-4 h-4 -rotate-90" />
              </button>
              <button
                onClick={(e) => handleDismiss(currentAlert.id, e)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors text-white/70 hover:text-white"
                title="Dismiss this alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress dots for multiple alerts */}
        {visibleAlerts.length > 1 && (
          <div className="flex justify-center gap-1.5 pb-1.5">
            {visibleAlerts.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all ${
                  i === currentIndex % visibleAlerts.length
                    ? 'w-4 bg-white/80'
                    : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
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
    </>
  );
};

export default AlertBanner;
