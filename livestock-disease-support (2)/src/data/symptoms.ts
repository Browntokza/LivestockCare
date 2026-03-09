export interface Symptom {
  id: string;
  name: string;
  icon: string;
}

export const commonSymptoms: Symptom[] = [
  { id: 'fever', name: 'High Fever', icon: 'thermometer' },
  { id: 'appetite_loss', name: 'Loss of Appetite', icon: 'x-circle' },
  { id: 'weakness', name: 'Weakness / Depression', icon: 'battery-low' },
  { id: 'diarrhea', name: 'Diarrhea', icon: 'droplets' },
  { id: 'skin_lesions', name: 'Skin Lesions / Nodules', icon: 'circle-dot' },
  { id: 'lameness', name: 'Lameness', icon: 'footprints' },
  { id: 'drooling', name: 'Excessive Drooling', icon: 'droplet' },
  { id: 'swelling', name: 'Swelling', icon: 'maximize' },
  { id: 'red_urine', name: 'Red / Dark Urine', icon: 'flask-round' },
  { id: 'jaundice', name: 'Pale / Yellow Membranes', icon: 'eye' },
  { id: 'breathing', name: 'Difficulty Breathing', icon: 'wind' },
  { id: 'nasal_discharge', name: 'Nasal Discharge', icon: 'cloud' },
  { id: 'sudden_death', name: 'Sudden Death', icon: 'alert-triangle' },
  { id: 'paralysis', name: 'Paralysis / Staggering', icon: 'move' },
  { id: 'hair_loss', name: 'Hair Loss', icon: 'scissors' },
  { id: 'blisters', name: 'Blisters / Vesicles', icon: 'circle' },
  { id: 'bleeding', name: 'Bleeding', icon: 'heart' },
  { id: 'convulsions', name: 'Convulsions', icon: 'zap' },
  { id: 'milk_drop', name: 'Drop in Milk Production', icon: 'trending-down' },
  { id: 'itching', name: 'Intense Itching', icon: 'hand' },
  { id: 'weight_loss', name: 'Weight Loss', icon: 'arrow-down' },
  { id: 'swollen_lymph', name: 'Swollen Lymph Nodes', icon: 'maximize-2' },
  { id: 'eye_discharge', name: 'Eye Discharge', icon: 'eye-off' },
  { id: 'aggression', name: 'Behavioral Changes / Aggression', icon: 'alert-octagon' },
];

export interface SymptomDiseaseMap {
  [symptomId: string]: { diseaseId: string; weight: number }[];
}

export const symptomDiseaseMapping: SymptomDiseaseMap = {
  fever: [
    { diseaseId: 'anaplasmosis', weight: 3 },
    { diseaseId: 'anthrax', weight: 3 },
    { diseaseId: 'blackleg', weight: 3 },
    { diseaseId: 'fmd', weight: 3 },
    { diseaseId: 'heartwater', weight: 3 },
    { diseaseId: 'lsd', weight: 3 },
    { diseaseId: 'redwater', weight: 3 },
    { diseaseId: 'januarydisease', weight: 3 },
  ],
  appetite_loss: [
    { diseaseId: 'anaplasmosis', weight: 2 },
    { diseaseId: 'blackleg', weight: 2 },
    { diseaseId: 'fmd', weight: 2 },
    { diseaseId: 'heartwater', weight: 2 },
    { diseaseId: 'lsd', weight: 2 },
    { diseaseId: 'redwater', weight: 2 },
    { diseaseId: 'januarydisease', weight: 2 },
    { diseaseId: 'gumboro', weight: 2 },
  ],
  weakness: [
    { diseaseId: 'anaplasmosis', weight: 2 },
    { diseaseId: 'blackleg', weight: 2 },
    { diseaseId: 'botulism', weight: 3 },
    { diseaseId: 'redwater', weight: 2 },
    { diseaseId: 'januarydisease', weight: 2 },
  ],
  diarrhea: [
    { diseaseId: 'anaplasmosis', weight: 1 },
    { diseaseId: 'gumboro', weight: 3 },
    { diseaseId: 'januarydisease', weight: 2 },
    { diseaseId: 'pulpykidney', weight: 3 },
  ],
  skin_lesions: [
    { diseaseId: 'dermatophilosis', weight: 3 },
    { diseaseId: 'lsd', weight: 3 },
    { diseaseId: 'mange', weight: 3 },
    { diseaseId: 'orf', weight: 3 },
    { diseaseId: 'fowlpox', weight: 3 },
  ],
  lameness: [
    { diseaseId: 'blackleg', weight: 3 },
    { diseaseId: 'fmd', weight: 3 },
    { diseaseId: 'orf', weight: 1 },
  ],
  drooling: [
    { diseaseId: 'fmd', weight: 3 },
    { diseaseId: 'botulism', weight: 3 },
    { diseaseId: 'rabies', weight: 3 },
  ],
  swelling: [
    { diseaseId: 'anthrax', weight: 3 },
    { diseaseId: 'blackleg', weight: 3 },
    { diseaseId: 'lsd', weight: 2 },
  ],
  red_urine: [
    { diseaseId: 'anaplasmosis', weight: 3 },
    { diseaseId: 'redwater', weight: 3 },
  ],
  jaundice: [
    { diseaseId: 'anaplasmosis', weight: 3 },
    { diseaseId: 'redwater', weight: 2 },
  ],
  breathing: [
    { diseaseId: 'heartwater', weight: 2 },
    { diseaseId: 'januarydisease', weight: 2 },
    { diseaseId: 'fowlpox', weight: 3 },
    { diseaseId: 'pulpykidney', weight: 2 },
  ],
  nasal_discharge: [
    { diseaseId: 'lsd', weight: 2 },
    { diseaseId: 'januarydisease', weight: 2 },
    { diseaseId: 'fmd', weight: 1 },
  ],
  sudden_death: [
    { diseaseId: 'anthrax', weight: 3 },
    { diseaseId: 'blackleg', weight: 3 },
    { diseaseId: 'pulpykidney', weight: 3 },
    { diseaseId: 'botulism', weight: 2 },
  ],
  paralysis: [
    { diseaseId: 'botulism', weight: 3 },
    { diseaseId: 'rabies', weight: 3 },
    { diseaseId: 'heartwater', weight: 2 },
  ],
  hair_loss: [
    { diseaseId: 'dermatophilosis', weight: 3 },
    { diseaseId: 'mange', weight: 3 },
  ],
  blisters: [
    { diseaseId: 'fmd', weight: 3 },
    { diseaseId: 'orf', weight: 2 },
    { diseaseId: 'fowlpox', weight: 2 },
  ],
  bleeding: [
    { diseaseId: 'anthrax', weight: 3 },
    { diseaseId: 'januarydisease', weight: 1 },
  ],
  convulsions: [
    { diseaseId: 'heartwater', weight: 3 },
    { diseaseId: 'pulpykidney', weight: 3 },
    { diseaseId: 'redwater', weight: 2 },
  ],
  milk_drop: [
    { diseaseId: 'fmd', weight: 2 },
    { diseaseId: 'lsd', weight: 2 },
    { diseaseId: 'anaplasmosis', weight: 1 },
  ],
  itching: [
    { diseaseId: 'mange', weight: 3 },
    { diseaseId: 'dermatophilosis', weight: 1 },
  ],
  weight_loss: [
    { diseaseId: 'januarydisease', weight: 2 },
    { diseaseId: 'mange', weight: 2 },
    { diseaseId: 'dermatophilosis', weight: 2 },
    { diseaseId: 'orf', weight: 2 },
  ],
  swollen_lymph: [
    { diseaseId: 'januarydisease', weight: 3 },
    { diseaseId: 'lsd', weight: 2 },
  ],
  eye_discharge: [
    { diseaseId: 'januarydisease', weight: 2 },
    { diseaseId: 'lsd', weight: 2 },
  ],
  aggression: [
    { diseaseId: 'rabies', weight: 3 },
    { diseaseId: 'heartwater', weight: 1 },
    { diseaseId: 'redwater', weight: 1 },
  ],
};

export const diagnoseFromSymptoms = (selectedSymptomIds: string[]): { diseaseId: string; score: number; maxScore: number; percentage: number }[] => {
  const scores: { [diseaseId: string]: number } = {};
  const maxPossible: { [diseaseId: string]: number } = {};

  // Calculate max possible score for each disease
  Object.values(symptomDiseaseMapping).forEach(mappings => {
    mappings.forEach(({ diseaseId, weight }) => {
      maxPossible[diseaseId] = (maxPossible[diseaseId] || 0) + weight;
    });
  });

  // Calculate actual scores based on selected symptoms
  selectedSymptomIds.forEach(symptomId => {
    const mappings = symptomDiseaseMapping[symptomId];
    if (mappings) {
      mappings.forEach(({ diseaseId, weight }) => {
        scores[diseaseId] = (scores[diseaseId] || 0) + weight;
      });
    }
  });

  return Object.entries(scores)
    .map(([diseaseId, score]) => ({
      diseaseId,
      score,
      maxScore: maxPossible[diseaseId] || 1,
      percentage: Math.round((score / (maxPossible[diseaseId] || 1)) * 100)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};
