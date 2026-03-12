export interface VetDoctor {
  id: string;
  name: string;
  title: string;
  area: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  affiliation: 'government' | 'private' | 'clinic';
  speciesSpecialization: string[];
  emergencyAvailable: boolean;
  notes?: string;
  verified: boolean;
}

export interface VetOffice {
  id: string;
  officeName: string;
  officeType: string;
  province: string;
  district: string;
  address: string;
  phone: string;
  email?: string;
  openingHours: string;
  officerInCharge?: string;
  latitude?: number;
  longitude?: number;
  verified: boolean;
}

export const vetDoctors: VetDoctor[] = [
  { id: 'doc-1', name: 'Dr. N. Moyo', title: 'BVSc', area: 'Bulawayo CBD', phone: '+263 77 200 1001', whatsapp: '+263 77 200 1001', affiliation: 'private', speciesSpecialization: ['Cattle', 'Goats', 'Sheep'], emergencyAvailable: true, notes: 'verify before production', verified: false },
  { id: 'doc-2', name: 'Dr. T. Ncube', title: 'DVM', area: 'Nkulumane', phone: '+263 77 200 1002', whatsapp: '+263 77 200 1002', affiliation: 'clinic', speciesSpecialization: ['Dogs', 'Chicken'], emergencyAvailable: true, notes: 'verify before production', verified: false },
  { id: 'doc-3', name: 'Dr. S. Sibanda', title: 'BVSc', area: 'Luveve', phone: '+263 77 200 1003', affiliation: 'government', speciesSpecialization: ['Cattle', 'Donkeys'], emergencyAvailable: false, notes: 'verify before production', verified: false },
  { id: 'doc-4', name: 'Dr. L. Dube', title: 'MVSc', area: 'Mpopoma', phone: '+263 77 200 1004', whatsapp: '+263 77 200 1004', affiliation: 'private', speciesSpecialization: ['Goats', 'Sheep', 'Rabbits'], emergencyAvailable: true, notes: 'verify before production', verified: false },
  { id: 'doc-5', name: 'Dr. P. Mlalazi', title: 'BVSc', area: 'Cowdray Park', phone: '+263 77 200 1005', affiliation: 'government', speciesSpecialization: ['Chicken', 'Guinea fowl'], emergencyAvailable: false, notes: 'verify before production', verified: false },
  { id: 'doc-6', name: 'Dr. B. Ndlovu', title: 'BVSc', area: 'Khumalo', phone: '+263 77 200 1006', whatsapp: '+263 77 200 1006', affiliation: 'private', speciesSpecialization: ['Dogs', 'Cattle'], emergencyAvailable: true, notes: 'verify before production', verified: false },
  { id: 'doc-7', name: 'Dr. R. Mpofu', title: 'DVM', area: 'Pumula', phone: '+263 77 200 1007', affiliation: 'clinic', speciesSpecialization: ['Goats', 'Sheep'], emergencyAvailable: false, notes: 'verify before production', verified: false },
  { id: 'doc-8', name: 'Dr. J. Maphosa', title: 'BVSc', area: 'Tshabalala', phone: '+263 77 200 1008', affiliation: 'government', speciesSpecialization: ['Cattle', 'Chicken'], emergencyAvailable: true, notes: 'verify before production', verified: false },
  { id: 'doc-9', name: 'Dr. E. Nkomo', title: 'BVSc', area: 'Entumbane', phone: '+263 77 200 1009', affiliation: 'private', speciesSpecialization: ['Donkeys', 'Rabbits'], emergencyAvailable: false, notes: 'verify before production', verified: false },
  { id: 'doc-10', name: 'Dr. M. Hove', title: 'DVM', area: 'Belmont', phone: '+263 77 200 1010', whatsapp: '+263 77 200 1010', affiliation: 'clinic', speciesSpecialization: ['Cattle', 'Goats', 'Sheep'], emergencyAvailable: true, notes: 'verify before production', verified: false }
];

export const vetOffices: VetOffice[] = [
  { id: 'office-1', officeName: 'DVS Bulawayo Provincial Office', officeType: 'Government', province: 'Bulawayo', district: 'Bulawayo', address: 'L. Takawira Ave, Bulawayo', phone: '+263 29 000 1101', email: 'bulawayo.dvs@gov.zw', openingHours: 'Mon-Fri 08:00-16:30', officerInCharge: 'verify before production', verified: false },
  { id: 'office-2', officeName: 'DVS Umguza District Office', officeType: 'Government', province: 'Matabeleland North', district: 'Umguza', address: 'Esigodini Road Service Centre', phone: '+263 29 000 1102', openingHours: 'Mon-Fri 08:00-16:30', officerInCharge: 'verify before production', verified: false },
  { id: 'office-3', officeName: 'DVS Insiza District Office', officeType: 'Government', province: 'Matabeleland South', district: 'Insiza', address: 'Filabusi Centre', phone: '+263 29 000 1103', openingHours: 'Mon-Fri 08:00-16:30', verified: false },
  { id: 'office-4', officeName: 'DVS Umzingwane District Office', officeType: 'Government', province: 'Matabeleland South', district: 'Umzingwane', address: 'Esigodini District Offices', phone: '+263 29 000 1104', openingHours: 'Mon-Fri 08:00-16:30', verified: false },
  { id: 'office-5', officeName: 'DVS Bubi District Office', officeType: 'Government', province: 'Matabeleland North', district: 'Bubi', address: 'Inyathi Growth Point', phone: '+263 29 000 1105', openingHours: 'Mon-Fri 08:00-16:30', verified: false },
  { id: 'office-6', officeName: 'Bulawayo City Vet Unit', officeType: 'Municipal', province: 'Bulawayo', district: 'Bulawayo', address: 'City Health Complex, Bulawayo', phone: '+263 29 000 1106', openingHours: 'Mon-Fri 08:00-16:00', verified: false },
  { id: 'office-7', officeName: 'Infectious Disease Response Desk', officeType: 'Emergency', province: 'Bulawayo', district: 'Bulawayo', address: 'Provincial Office Annex', phone: '+263 29 000 1107', openingHours: '24/7 hotline', verified: false },
  { id: 'office-8', officeName: 'Matobo Veterinary Office', officeType: 'Government', province: 'Matabeleland South', district: 'Matobo', address: 'Mphoengs Service Centre', phone: '+263 29 000 1108', openingHours: 'Mon-Fri 08:00-16:30', verified: false },
  { id: 'office-9', officeName: 'Nyamandlovu Veterinary Office', officeType: 'Government', province: 'Matabeleland North', district: 'Umguza', address: 'Nyamandlovu Business Centre', phone: '+263 29 000 1109', openingHours: 'Mon-Fri 08:00-16:30', verified: false },
  { id: 'office-10', officeName: 'Lupane Regional Veterinary Liaison', officeType: 'Government', province: 'Matabeleland North', district: 'Lupane', address: 'Lupane District Service Offices', phone: '+263 29 000 1110', openingHours: 'Mon-Fri 08:00-16:30', verified: false }
];
