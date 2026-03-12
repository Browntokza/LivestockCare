import React, { useMemo, useState } from 'react';
import { vetDoctors } from '@/data/vetContacts';
import { Phone, MessageCircle, ShieldAlert } from 'lucide-react';

const VetDoctorsDirectory: React.FC = () => {
  const [species, setSpecies] = useState('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  const speciesOptions = ['All', ...new Set(vetDoctors.flatMap(v => v.speciesSpecialization))];

  const filtered = useMemo(
    () => vetDoctors.filter(v => (species === 'All' || v.speciesSpecialization.includes(species)) && (!emergencyOnly || v.emergencyAvailable)),
    [species, emergencyOnly]
  );

  return (
    <div className="p-4 lg:p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Veterinary Doctors</h1>
      <div className="flex gap-2 flex-wrap">
        <select className="border rounded-lg px-3 py-2" value={species} onChange={e => setSpecies(e.target.value)}>
          {speciesOptions.map(s => <option key={s}>{s}</option>)}
        </select>
        <button onClick={() => setEmergencyOnly(v => !v)} className={`px-3 py-2 rounded-lg border ${emergencyOnly ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white'}`}>
          Emergency only
        </button>
      </div>
      <div className="grid gap-3">
        {filtered.map(doctor => (
          <div key={doctor.id} className="bg-white border rounded-xl p-4">
            <div className="flex justify-between gap-3">
              <div>
                <h2 className="font-semibold">{doctor.name}</h2>
                <p className="text-sm text-gray-600">{doctor.title} • {doctor.area} • {doctor.affiliation}</p>
                <p className="text-xs text-gray-500 mt-1">Specializes: {doctor.speciesSpecialization.join(', ')}</p>
                {!doctor.verified && <p className="text-xs text-amber-700 mt-2 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> verify before production</p>}
              </div>
              <div className="flex gap-2">
                <a href={`tel:${doctor.phone}`} className="p-2 border rounded-lg"><Phone className="w-4 h-4" /></a>
                {doctor.whatsapp && <a href={`https://wa.me/${doctor.whatsapp.replace(/\D/g, '')}`} className="p-2 border rounded-lg"><MessageCircle className="w-4 h-4" /></a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VetDoctorsDirectory;
