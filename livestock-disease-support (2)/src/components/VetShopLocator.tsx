import React, { useState, useMemo, useEffect } from 'react';
import { vetShops, VetShop, calculateDistance } from '../data/vetShops';
import { MapPin, Phone, Clock, Navigation, Search, Pill, ExternalLink, X, ChevronLeft, ArrowUpDown } from 'lucide-react';

const VetShopLocator: React.FC = () => {
  const [userLat, setUserLat] = useState<number>(-20.1500);
  const [userLon, setUserLon] = useState<number>(28.5800);
  const [locationStatus, setLocationStatus] = useState<string>('Using default location (Bulawayo CBD)');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState<VetShop | null>(null);
  const [sortBy, setSortBy] = useState<'distance' | 'name'>('distance');

  useEffect(() => {
    if (navigator.geolocation) {
      setLocationStatus('Detecting your location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLon(position.coords.longitude);
          setLocationStatus('Using your current location');
        },
        () => {
          setLocationStatus('Location unavailable - showing Bulawayo CBD');
        }
      );
    }
  }, []);

  const shopsWithDistance = useMemo(() => {
    return vetShops.map(shop => ({
      ...shop,
      distance: calculateDistance(userLat, userLon, shop.latitude, shop.longitude)
    }));
  }, [userLat, userLon]);

  const filteredShops = useMemo(() => {
    let result = shopsWithDistance;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q) ||
        s.availableMedicines.some(m => m.toLowerCase().includes(q)) ||
        s.services.some(sv => sv.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'distance') {
      result = [...result].sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [shopsWithDistance, searchQuery, sortBy]);

  const openGoogleMaps = (shop: VetShop) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${shop.latitude},${shop.longitude}`, '_blank');
  };

  const callShop = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (selectedShop) {
    const shop = shopsWithDistance.find(s => s.id === selectedShop.id) || selectedShop;
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white p-4 lg:p-5 flex items-center gap-3">
          <button onClick={() => setSelectedShop(null)} className="p-2 hover:bg-white/20 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold">{shop.name}</h1>
        </div>

        <div className="p-4 lg:p-6 max-w-4xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
            <div className="space-y-4">
              {/* Distance Card */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600 font-medium">Distance from you</p>
                  <p className="text-3xl font-bold text-teal-800">{shop.distance?.toFixed(1)} km</p>
                </div>
                <button onClick={() => openGoogleMaps(shop)}
                  className="bg-teal-600 text-white px-4 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-teal-700 transition-colors">
                  <Navigation className="w-5 h-5" /> Navigate
                </button>
              </div>

              {/* Contact */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Address</p>
                    <p className="text-gray-800">{shop.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                    <button onClick={() => callShop(shop.phone)} className="text-teal-700 font-medium hover:underline">
                      {shop.phone}
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Opening Hours</p>
                    <p className="text-gray-800">{shop.openingHours}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => callShop(shop.phone)}
                  className="bg-teal-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors">
                  <Phone className="w-5 h-5" /> Call Now
                </button>
                <button onClick={() => openGoogleMaps(shop)}
                  className="bg-white text-teal-700 border-2 border-teal-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-teal-50 transition-colors">
                  <ExternalLink className="w-5 h-5" /> Google Maps
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Available Medicines */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-600" /> Available Medicines
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shop.availableMedicines.map((med, i) => (
                    <span key={i} className="bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1.5 rounded-full text-sm">
                      {med}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-800 mb-3">Services</h3>
                <ul className="space-y-2">
                  {shop.services.map((service, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <div className="w-2 h-2 rounded-full bg-teal-500" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 text-white p-4 lg:p-6 pb-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold mb-1">Vet Shop Locator</h1>
          <div className="flex items-center gap-2 text-teal-200 text-sm mb-4">
            <MapPin className="w-4 h-4" />
            <span>{locationStatus}</span>
          </div>

          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search shops, medicines, services..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Sort */}
        <div className="px-4 lg:px-0 -mt-3 flex gap-2">
          <button onClick={() => setSortBy('distance')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium shadow-sm ${
              sortBy === 'distance' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}>
            <Navigation className="w-4 h-4" /> Nearest First
          </button>
          <button onClick={() => setSortBy('name')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium shadow-sm ${
              sortBy === 'name' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}>
            <ArrowUpDown className="w-4 h-4" /> A-Z
          </button>
        </div>

        {/* Shop List */}
        <div className="p-4 lg:px-0 lg:py-4">
          <p className="text-sm text-gray-500 mb-3">{filteredShops.length} veterinary shops in Bulawayo</p>

          <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
            {filteredShops.map(shop => (
              <button key={shop.id} onClick={() => setSelectedShop(shop)}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-left hover:shadow-md hover:border-teal-300 transition-all group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                      {shop.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{shop.address}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {shop.openingHours.split(',')[0]}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {shop.phone}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {shop.services.slice(0, 2).map((s, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
                      <p className="text-lg font-bold text-teal-700">{shop.distance?.toFixed(1)}</p>
                      <p className="text-xs text-teal-600">km</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetShopLocator;
