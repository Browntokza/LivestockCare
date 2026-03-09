export interface VetShop {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  openingHours: string;
  availableMedicines: string[];
  services: string[];
  distance?: number;
}

export const vetShops: VetShop[] = [
  {
    id: 'vs1',
    name: 'Bulawayo Veterinary Supplies',
    address: '45 Fort Street, Bulawayo CBD',
    phone: '+263 29 2881234',
    latitude: -20.1500,
    longitude: 28.5800,
    openingHours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-13:00',
    availableMedicines: ['Oxytetracycline', 'Diminazene (Berenil)', 'Ivermectin', 'Buparvaquone (Butalex)', 'Penicillin', 'Multivitamins', 'Acaricides'],
    services: ['Veterinary consultation', 'Animal health products', 'Dipping chemicals', 'Feed supplements']
  },
  {
    id: 'vs2',
    name: 'Farmers World Bulawayo',
    address: '12 Josiah Tongogara Street, Bulawayo',
    phone: '+263 29 2884567',
    latitude: -20.1480,
    longitude: 28.5750,
    openingHours: 'Mon-Fri: 7:30-17:30, Sat: 8:00-14:00',
    availableMedicines: ['Vaccines (Blanthax, Rabies)', 'Antibiotics', 'Dewormers', 'Pour-on acaricides', 'Mineral supplements', 'Wound sprays'],
    services: ['Livestock medicines', 'Feed and supplements', 'Farming equipment', 'Expert advice']
  },
  {
    id: 'vs3',
    name: 'Veterinary Services - Bulawayo Provincial Office',
    address: 'Leopold Takawira Avenue, Bulawayo',
    phone: '+263 29 2882345',
    latitude: -20.1520,
    longitude: 28.5830,
    openingHours: 'Mon-Fri: 8:00-16:30',
    availableMedicines: ['Government subsidized vaccines', 'Anthrax vaccine', 'FMD vaccine', 'Rabies vaccine', 'Blackleg vaccine'],
    services: ['Government veterinary services', 'Disease reporting', 'Vaccination campaigns', 'Livestock movement permits', 'Meat inspection']
  },
  {
    id: 'vs4',
    name: 'Agrivet Pharmacy',
    address: '78 Robert Mugabe Way, Bulawayo',
    phone: '+263 29 2886789',
    latitude: -20.1460,
    longitude: 28.5780,
    openingHours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-12:00',
    availableMedicines: ['Full range antibiotics', 'Antiparasitics', 'Vitamins and minerals', 'Reproductive hormones', 'Wound care products'],
    services: ['Veterinary pharmacy', 'Prescription medicines', 'Animal health advice', 'Bulk orders']
  },
  {
    id: 'vs5',
    name: 'Zimbabwe Farmers Union - Bulawayo Branch',
    address: '23 Samuel Parirenyatwa Street, Bulawayo',
    phone: '+263 29 2883456',
    latitude: -20.1540,
    longitude: 28.5760,
    openingHours: 'Mon-Fri: 8:00-16:00',
    availableMedicines: ['Basic veterinary medicines', 'Dipping chemicals', 'Feed supplements'],
    services: ['Farmer support services', 'Training workshops', 'Market linkages', 'Veterinary referrals']
  },
  {
    id: 'vs6',
    name: 'ProVet Animal Health',
    address: '56 Jason Moyo Street, Bulawayo',
    phone: '+263 29 2887890',
    latitude: -20.1490,
    longitude: 28.5820,
    openingHours: 'Mon-Fri: 7:30-17:00, Sat: 8:00-13:00',
    availableMedicines: ['Buparvaquone', 'Imidocarb', 'Long-acting oxytetracycline', 'Amitraz', 'Vaccines', 'Dewormers'],
    services: ['Veterinary consultation', 'Emergency call-out', 'Livestock medicines', 'Poultry health products']
  },
  {
    id: 'vs7',
    name: 'Matsheumhlope Vet Clinic',
    address: 'Matsheumhlope Shopping Centre, Bulawayo',
    phone: '+263 29 2241567',
    latitude: -20.1380,
    longitude: 28.5900,
    openingHours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-12:00',
    availableMedicines: ['General veterinary medicines', 'Pet medicines', 'Livestock antibiotics', 'Dewormers'],
    services: ['Small animal clinic', 'Livestock consultation', 'Vaccination services', 'Surgery']
  },
  {
    id: 'vs8',
    name: 'Criterion Vet Supplies',
    address: '34 George Silundika Street, Bulawayo',
    phone: '+263 29 2885678',
    latitude: -20.1510,
    longitude: 28.5770,
    openingHours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-13:00',
    availableMedicines: ['Acaricides (dipping chemicals)', 'Antibiotics', 'Anti-inflammatories', 'Vitamins', 'Reproductive aids'],
    services: ['Veterinary supplies', 'Farming chemicals', 'Animal nutrition', 'Technical support']
  },
  {
    id: 'vs9',
    name: 'Nkulumane Agro-Vet',
    address: 'Nkulumane Complex, Bulawayo',
    phone: '+263 29 2401234',
    latitude: -20.1700,
    longitude: 28.5600,
    openingHours: 'Mon-Sat: 8:00-17:00',
    availableMedicines: ['Basic livestock medicines', 'Poultry medicines', 'Dewormers', 'Wound sprays', 'Tick grease'],
    services: ['Affordable vet medicines', 'Poultry supplies', 'Livestock advice', 'Feed sales']
  },
  {
    id: 'vs10',
    name: 'Fivet Animal Health',
    address: '89 Fife Street, Bulawayo',
    phone: '+263 29 2889012',
    latitude: -20.1470,
    longitude: 28.5810,
    openingHours: 'Mon-Fri: 8:00-17:00, Sat: 8:00-12:00',
    availableMedicines: ['Full veterinary range', 'Imported medicines', 'Specialized treatments', 'Diagnostic kits'],
    services: ['Premium veterinary products', 'Laboratory diagnostics', 'Expert consultation', 'Farm visits']
  }
];

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
