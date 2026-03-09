import React, { useState } from 'react';
import { 
  User, RefreshCw, Download, Upload, Bell, 
  Shield, HelpCircle, Info, ChevronRight, Check, Wifi, WifiOff,
  Database, Globe
} from 'lucide-react';

interface SettingsViewProps {
  isOnline: boolean;
  onNavigateAdmin?: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ isOnline, onNavigateAdmin }) => {
  const [notifications, setNotifications] = useState(true);
  const [vaccinationReminders, setVaccinationReminders] = useState(true);
  const [dippingReminders, setDippingReminders] = useState(true);
  const [outbreakAlerts, setOutbreakAlerts] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string>('Never');
  const [showSyncSuccess, setShowSyncSuccess] = useState(false);
  const [farmName, setFarmName] = useState('My Farm');
  const [farmLocation, setFarmLocation] = useState('Bulawayo Province');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSync = async () => {
    if (!isOnline) return;
    setSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncing(false);
    setLastSync(new Date().toLocaleString());
    setShowSyncSuccess(true);
    setTimeout(() => setShowSyncSuccess(false), 3000);
  };

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button onClick={() => onChange(!value)}
      className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-emerald-500' : 'bg-gray-300'}`}>
      <div className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform"
        style={{ left: value ? '22px' : '2px' }} />
    </button>
  );

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-4 lg:p-6 pb-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold mb-1">Settings</h1>
          <p className="text-gray-300 text-sm">Manage your app preferences and data</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 lg:p-6 space-y-4 -mt-2">
        {/* Sync Status */}
        <div className={`rounded-xl p-4 border ${isOnline ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              {isOnline ? (
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-green-600" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <WifiOff className="w-5 h-5 text-red-600" />
                </div>
              )}
              <div>
                <p className={`font-semibold ${isOnline ? 'text-green-800' : 'text-red-800'}`}>
                  {isOnline ? 'Connected' : 'Offline Mode'}
                </p>
                <p className="text-xs text-gray-500">Last sync: {lastSync}</p>
              </div>
            </div>
          </div>

          <button onClick={handleSync} disabled={!isOnline || syncing}
            className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
              isOnline ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}>
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Backup Now'}
          </button>

          {showSyncSuccess && (
            <div className="mt-2 bg-green-100 border border-green-300 rounded-lg p-2 flex items-center gap-2 text-green-800 text-sm">
              <Check className="w-4 h-4" /> Data synced successfully!
            </div>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0">
          {/* Profile */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" /> Profile
              </h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Farm Name</label>
                <input type="text" value={farmName} onChange={e => setFarmName(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
                <input type="text" value={farmLocation} onChange={e => setFarmLocation(e.target.value)}
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Phone Number</label>
                <input type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="+263..."
                  className="w-full mt-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-400" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-gray-500" /> Notifications
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              <div className="p-4 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-800">Push Notifications</p><p className="text-xs text-gray-500">Enable all notifications</p></div>
                <Toggle value={notifications} onChange={setNotifications} />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-800">Vaccination Reminders</p><p className="text-xs text-gray-500">7 days before due date</p></div>
                <Toggle value={vaccinationReminders} onChange={setVaccinationReminders} />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-800">Dipping Reminders</p><p className="text-xs text-gray-500">Weekly during rainy season</p></div>
                <Toggle value={dippingReminders} onChange={setDippingReminders} />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div><p className="text-sm font-medium text-gray-800">Disease Outbreak Alerts</p><p className="text-xs text-gray-500">Regional warnings</p></div>
                <Toggle value={outbreakAlerts} onChange={setOutbreakAlerts} />
              </div>
            </div>
          </div>
        </div>

        {/* Data & Sync */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Database className="w-4 h-4 text-gray-500" /> Data & Sync
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <div><p className="text-sm font-medium text-gray-800">Auto Sync</p><p className="text-xs text-gray-500">Sync when internet available</p></div>
              <Toggle value={autoSync} onChange={setAutoSync} />
            </div>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-400" />
                <div className="text-left"><p className="text-sm font-medium text-gray-800">Export Data</p><p className="text-xs text-gray-500">Download livestock records as CSV</p></div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-gray-400" />
                <div className="text-left"><p className="text-sm font-medium text-gray-800">Import Data</p><p className="text-xs text-gray-500">Import from CSV/Excel template</p></div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Admin Panel Access */}
        {onNavigateAdmin && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl overflow-hidden">
            <button
              onClick={onNavigateAdmin}
              className="w-full p-4 flex items-center justify-between hover:from-amber-100 hover:to-orange-100 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-amber-900">Admin Dashboard</p>
                  <p className="text-xs text-amber-700">Manage diseases, vet shops, tips & alerts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-amber-500" />
            </button>
          </div>
        )}

        {/* App Info */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-gray-500" /> About
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">App Version</span>
              <span className="text-sm font-medium text-gray-800">1.0.0</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Disease Database</span>
              <span className="text-sm font-medium text-gray-800">v2026.03 (16 diseases)</span>
            </div>
            <div className="p-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Region</span>
              <span className="text-sm font-medium text-gray-800 flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> Bulawayo, Zimbabwe</span>
            </div>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-800">Help & Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-800">Privacy & Security</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="text-center py-4">
          <p className="text-xs text-gray-400">Livestock Care Zimbabwe v1.0.0</p>
          <p className="text-xs text-gray-400">Empowering farmers through technology</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
