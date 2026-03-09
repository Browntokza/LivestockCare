import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import DiseaseLibrary from './DiseaseLibrary';
import CalendarView from './CalendarView';
import LivestockInventory from './LivestockInventory';
import VetShopLocator from './VetShopLocator';
import BusinessTipsView from './BusinessTipsView';
import SymptomChecker from './SymptomChecker';
import SettingsView from './SettingsView';
import AdminDashboard from './AdminDashboard';
import AlertBanner from './AlertBanner';
import AlertsPage from './AlertsPage';
import WormsPage from './WormsPage';
import { 
  Home, BookOpen, Calendar, Warehouse, MapPin, 
  Lightbulb, Settings, Stethoscope, Menu, X, 
  Activity, Wifi, WifiOff, ChevronRight, Shield, AlertTriangle, Bell, Bug
} from 'lucide-react';

type Page = 'home' | 'diseases' | 'worms' | 'calendar' | 'livestock' | 'vetshops' | 'tips' | 'symptom' | 'settings' | 'admin' | 'alerts';

const pageLabels: Record<Page, string> = {
  home: 'Dashboard',
  diseases: 'Disease Library',
  worms: 'Common Worms',
  calendar: 'Management Calendar',
  livestock: 'My Livestock',
  vetshops: 'Vet Shop Locator',
  tips: 'Business Tips',
  symptom: 'Symptom Checker',
  settings: 'Settings',
  admin: 'Admin Dashboard',
  alerts: 'Disease Alerts',
};

const AppLayout: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showSidebar, setShowSidebar] = useState(false);
  const [diseaseId, setDiseaseId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page as Page);
    setShowSidebar(false);
    setDiseaseId(undefined);
  };

  const navigateToDisease = (id: string) => {
    setDiseaseId(id);
    setCurrentPage('diseases');
  };

  const bottomNavItems: { id: Page; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-5 h-5" /> },
    { id: 'diseases', label: 'Diseases', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'livestock', label: 'Livestock', icon: <Warehouse className="w-5 h-5" /> },
    { id: 'vetshops', label: 'Vet Shops', icon: <MapPin className="w-5 h-5" /> },
  ];

  const sidebarItems: { id: Page; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'home', label: 'Dashboard', icon: <Home className="w-5 h-5" />, color: 'text-emerald-600' },
    { id: 'alerts', label: 'Disease Alerts', icon: <AlertTriangle className="w-5 h-5" />, color: 'text-red-600' },
    { id: 'diseases', label: 'Disease Library', icon: <BookOpen className="w-5 h-5" />, color: 'text-emerald-600' },
    { id: 'worms', label: 'Common Worms', icon: <Bug className="w-5 h-5" />, color: 'text-teal-600' },
    { id: 'calendar', label: 'Management Calendar', icon: <Calendar className="w-5 h-5" />, color: 'text-blue-600' },
    { id: 'livestock', label: 'My Livestock', icon: <Warehouse className="w-5 h-5" />, color: 'text-amber-600' },
    { id: 'vetshops', label: 'Vet Shop Locator', icon: <MapPin className="w-5 h-5" />, color: 'text-teal-600' },
    { id: 'tips', label: 'Business Tips', icon: <Lightbulb className="w-5 h-5" />, color: 'text-indigo-600' },
    { id: 'symptom', label: 'Symptom Checker', icon: <Stethoscope className="w-5 h-5" />, color: 'text-violet-600' },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" />, color: 'text-gray-600' },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard onNavigate={navigate} livestockCount={5} isOnline={isOnline} />;
      case 'alerts':
        return <AlertsPage onNavigateDisease={() => navigate('diseases')} />;
      case 'diseases':
        return <DiseaseLibrary initialDiseaseId={diseaseId} />;
      case 'worms':
        return <WormsPage />;
      case 'calendar':
        return <CalendarView />;
      case 'livestock':
        return <LivestockInventory />;
      case 'vetshops':
        return <VetShopLocator />;
      case 'tips':
        return <BusinessTipsView />;
      case 'symptom':
        return <SymptomChecker onViewDisease={navigateToDisease} />;
      case 'settings':
        return <SettingsView isOnline={isOnline} onNavigateAdmin={() => navigate('admin')} />;
      case 'admin':
        return <AdminDashboard onBack={() => navigate('settings')} />;
      default:
        return <Dashboard onNavigate={navigate} livestockCount={5} isOnline={isOnline} />;
    }
  };

  // If on admin page, render full-screen without sidebar/nav
  if (currentPage === 'admin') {
    return (
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <main className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className="flex-1 overflow-y-auto">
            {renderPage()}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-200">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Livestock Care</h1>
              <p className="text-xs text-gray-500">Zimbabwe - Bulawayo</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Main Menu</p>
          {sidebarItems.slice(0, 7).map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.id
                  ? item.id === 'alerts' 
                    ? 'bg-red-50 text-red-700 shadow-sm border border-red-100'
                    : 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={currentPage === item.id ? item.color : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === 'alerts' && currentPage !== 'alerts' && (
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              )}
              {currentPage === item.id && (
                <div className={`w-1.5 h-1.5 rounded-full ${item.id === 'alerts' ? 'bg-red-500' : 'bg-emerald-500'}`} />
              )}
            </button>
          ))}

          <div className="pt-3 pb-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Tools</p>
          </div>
          {sidebarItems.slice(7).map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                currentPage === item.id
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className={currentPage === item.id ? item.color : 'text-gray-400'}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {currentPage === item.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
            </button>
          ))}

          {/* Admin Link */}
          <div className="pt-3 pb-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Administration</p>
          </div>
          <button
            onClick={() => navigate('admin')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              currentPage === 'admin'
                ? 'bg-amber-50 text-amber-700 shadow-sm border border-amber-100'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={currentPage === 'admin' ? 'text-amber-600' : 'text-gray-400'}>
              <Shield className="w-5 h-5" />
            </span>
            <span className="flex-1 text-left">Admin Panel</span>
            {currentPage === 'admin' && (
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </button>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-100 space-y-2">
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium ${
            isOnline ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span className="flex-1">{isOnline ? 'Online - Data synced' : 'Offline Mode'}</span>
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          </div>
          <p className="text-[10px] text-gray-400 text-center">v1.0.0 - Bulawayo Province</p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSidebar(false)} />
          <div className="relative w-80 max-w-[85vw] bg-white shadow-2xl z-10 flex flex-col animate-in slide-in-from-left">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-md">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-gray-900 text-sm">Livestock Care</h1>
                  <p className="text-xs text-gray-500">Zimbabwe</p>
                </div>
              </div>
              <button onClick={() => setShowSidebar(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {sidebarItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    currentPage === item.id
                      ? item.id === 'alerts'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={currentPage === item.id ? item.color : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.id === 'alerts' && currentPage !== 'alerts' && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              ))}

              {/* Admin Link in mobile sidebar */}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <button
                  onClick={() => navigate('admin')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-amber-700 hover:bg-amber-50 transition-all"
                >
                  <Shield className="w-5 h-5 text-amber-500" />
                  <span className="flex-1 text-left">Admin Panel</span>
                  <ChevronRight className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            </nav>
            <div className="p-3 border-t border-gray-100">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                isOnline ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                {isOnline ? 'Online' : 'Offline Mode'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 min-w-0">
        {/* Alert Banner - Shows across the app at the very top */}
        <AlertBanner 
          onNavigateAlerts={() => navigate('alerts')}
          onNavigateDisease={() => navigate('diseases')}
        />

        {/* Mobile Top Bar */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <button onClick={() => setShowSidebar(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Livestock Care ZW</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate('alerts')}
              className="relative p-1.5"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          {renderPage()}
        </div>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom shadow-lg">
          <div className="flex items-center justify-around px-1 py-1.5">
            {bottomNavItems.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`flex flex-col items-center py-1.5 px-2 rounded-xl transition-all min-w-0 flex-1 relative ${
                  currentPage === item.id
                    ? item.id === 'alerts' ? 'text-red-600' : 'text-emerald-600'
                    : 'text-gray-400 active:text-gray-600'
                }`}
              >
                <span className={`transition-transform relative ${currentPage === item.id ? 'scale-110' : ''}`}>
                  {item.icon}
                  {item.id === 'alerts' && currentPage !== 'alerts' && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </span>
                <span className={`text-[10px] mt-0.5 font-medium truncate ${
                  currentPage === item.id 
                    ? item.id === 'alerts' ? 'text-red-600' : 'text-emerald-600' 
                    : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
                {currentPage === item.id && (
                  <div className={`w-4 h-0.5 rounded-full mt-0.5 ${item.id === 'alerts' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                )}
              </button>
            ))}
            <button
              onClick={() => navigate('settings')}
              className={`flex flex-col items-center py-1.5 px-2 rounded-xl transition-all min-w-0 flex-1 ${
                currentPage === 'settings' || currentPage === 'tips' || currentPage === 'symptom' || currentPage === 'worms'
                  ? 'text-emerald-600'
                  : 'text-gray-400 active:text-gray-600'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span className={`text-[10px] mt-0.5 font-medium ${
                currentPage === 'settings' || currentPage === 'tips' || currentPage === 'symptom' || currentPage === 'worms' ? 'text-emerald-600' : 'text-gray-400'
              }`}>
                More
              </span>
              {(currentPage === 'settings' || currentPage === 'tips' || currentPage === 'symptom' || currentPage === 'worms') && (
                <div className="w-4 h-0.5 rounded-full bg-emerald-500 mt-0.5" />
              )}
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
};

export default AppLayout;
