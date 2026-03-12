import React, { useMemo, useState } from 'react';
import { vetOffices } from '@/data/vetContacts';
import { Phone, MapPinned } from 'lucide-react';

const VetOfficesDirectory: React.FC = () => {
  const [district, setDistrict] = useState('All');
  const districts = ['All', ...new Set(vetOffices.map(o => o.district))];

  const filtered = useMemo(() => vetOffices.filter(o => district === 'All' || o.district === district), [district]);

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Veterinary Offices</h1>
      <select className="border rounded-lg px-3 py-2" value={district} onChange={e => setDistrict(e.target.value)}>
        {districts.map(d => <option key={d}>{d}</option>)}
      </select>
      <div className="grid gap-3">
        {filtered.map(office => (
          <div key={office.id} className="bg-white border rounded-xl p-4">
            <h2 className="font-semibold">{office.officeName}</h2>
            <p className="text-sm text-gray-600">{office.province} • {office.district}</p>
            <p className="text-sm text-gray-600">{office.address}</p>
            <p className="text-xs text-gray-500">{office.openingHours}</p>
            <div className="flex gap-2 mt-3">
              <a href={`tel:${office.phone}`} className="px-3 py-2 border rounded-lg text-sm inline-flex items-center gap-1"><Phone className="w-4 h-4" /> Call</a>
              <button className="px-3 py-2 border rounded-lg text-sm inline-flex items-center gap-1"><MapPinned className="w-4 h-4" /> Map</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetOfficesDirectory;
