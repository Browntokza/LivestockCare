export interface WormTreatment {
  cattleAndSheep: string[];
  donkeys: string[];
  dogs: string[];
  chicken: string[];
}

export interface Worm {
  id: string;
  name: string;
  foundAndInfestation: string;
  effects: string[];
  sourceOfInfection: string;
  treatment: WormTreatment;
  treatmentNotes?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  icon: string; // emoji-free identifier for icon selection
}

export const worms: Worm[] = [
  {
    id: 'round-worm-hookworm',
    name: 'Round Worm and Hookworm',
    foundAndInfestation: 'Stomach and intestines',
    effects: [
      'Weight loss',
      'Anaemia',
      'Scours (diarrhoea)',
    ],
    sourceOfInfection: 'Eggs picked up from grass or larvae penetrate the skin in damp areas and kraals',
    treatment: {
      cattleAndSheep: ['Systamex', 'Nilzan Drench', 'Bimectin', 'Nilzan Bolus'],
      donkeys: ['Systamex', 'Nilzan Bolus'],
      dogs: ['Systemex'],
      chicken: ['Systamex'],
    },
    severity: 'high',
    icon: 'roundworm',
  },
  {
    id: 'tapeworm',
    name: 'Tapeworm (Main Host)',
    foundAndInfestation: 'Intestines',
    effects: [
      'Pot bellies',
      'Weight loss',
      'Digestive disturbances',
    ],
    sourceOfInfection: 'Cysts picked up from mites in the grass',
    treatment: {
      cattleAndSheep: ['Systamex (double dose)'],
      donkeys: ['Systamex'],
      dogs: [],
      chicken: [],
    },
    severity: 'medium',
    icon: 'tapeworm',
  },
  {
    id: 'beef-pork-measles',
    name: 'Beef/Pork Measles',
    foundAndInfestation: 'Little hard cysts in the muscle',
    effects: [
      'Portion or all of the carcass will be condemned',
    ],
    sourceOfInfection: 'Cattle grazing where humans with tapeworm have left faeces on the pasture',
    treatment: {
      cattleAndSheep: [],
      donkeys: [],
      dogs: [],
      chicken: [],
    },
    treatmentNotes: 'No treatment for affected animals therefore it is very important to prevent tapeworm infestation. The condition in humans requires medical treatment. Educate humans to use blair toilets.',
    severity: 'critical',
    icon: 'measles',
  },
  {
    id: 'liver-fluke',
    name: 'Liver Fluke',
    foundAndInfestation: 'Adult fluke in the liver',
    effects: [
      'Liver damage',
      'Digestive disturbances',
      'Weight loss',
      'Bottle jaw — swellings below the jaw',
    ],
    sourceOfInfection: 'Larvae on grass are eaten in wet areas where infected snails are present',
    treatment: {
      cattleAndSheep: ['Systamex Plus Fluke', 'Nilzan Bolus', 'Bimectin Plus'],
      donkeys: [],
      dogs: [],
      chicken: [],
    },
    severity: 'high',
    icon: 'fluke',
  },
  {
    id: 'conical-fluke',
    name: 'Conical Fluke (Paramphistomes)',
    foundAndInfestation: 'Adult fluke in the stomachs of cattle and sheep. Larvae in the intestinal lining.',
    effects: [
      'Larvae causes severe scours in young stock',
      'Death',
    ],
    sourceOfInfection: 'Larvae on grass are eaten in wet areas where infected snails are present',
    treatment: {
      cattleAndSheep: [],
      donkeys: [],
      dogs: [],
      chicken: [],
    },
    severity: 'critical',
    icon: 'conical',
  },
  {
    id: 'screw-worm',
    name: 'Screw Worm',
    foundAndInfestation: 'In wounds',
    effects: [
      'Maggots burrow into the wound, increasing its size',
    ],
    sourceOfInfection: 'Flies lay eggs around sores',
    treatment: {
      cattleAndSheep: [],
      donkeys: ['EX-IT'],
      dogs: [],
      chicken: [],
    },
    severity: 'high',
    icon: 'screwworm',
  },
];

export const wormNotes: string[] = [
  'Mixed infestations of round worm, hookworm and fluke may be treated with Systamex Plus Fluke, Nilzan Bolus or Bimectin Plus.',
  'Worms are a serious threat to the value of your cattle. Prevention is always better and cheaper than cure.',
];

export const animalTypes = ['Cattle and Sheep', 'Donkeys', 'Dogs', 'Chicken'] as const;
export type AnimalType = typeof animalTypes[number];
