export interface Disease {
  id: string;
  name: string;
  localName?: string;
  category: 'Bacterial' | 'Viral' | 'Parasitic' | 'Fungal';
  animalsAffected: string[];
  cause: string;
  symptoms: string[];
  transmission: string;
  treatment: string;
  prevention: string;
  vaccinationAvailable: boolean;
  vaccinationDetails?: string;
  emergencySteps: string[];
}

export const diseases: Disease[] = [
  {
    id: 'anaplasmosis',
    name: 'Anaplasmosis (Gall Sickness)',
    localName: 'Gall Sickness',
    category: 'Parasitic',
    animalsAffected: ['Cattle', 'Goats', 'Sheep'],
    cause: 'Anaplasma marginale bacteria transmitted by ticks (Boophilus species)',
    symptoms: ['High fever (40-41°C)', 'Pale or yellow mucous membranes (jaundice)', 'Loss of appetite', 'Weakness and depression', 'Rapid breathing', 'Dark brown urine', 'Constipation followed by diarrhea', 'Drop in milk production', 'Abortion in pregnant cows'],
    transmission: 'Transmitted primarily by tick bites (Boophilus decoloratus). Can also spread through contaminated needles, dehorning equipment, and biting flies.',
    treatment: 'Oxytetracycline (long-acting) at 20mg/kg body weight intramuscularly. Imidocarb dipropionate injection. Supportive therapy with blood tonics and iron supplements. Keep animal in shade with access to water.',
    prevention: 'Regular tick control through dipping or pour-on acaricides. Maintain dipping schedules especially in summer. Use clean needles for each animal. Vaccinate calves between 4-9 months of age.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Live attenuated vaccine available. Vaccinate calves at 4-9 months. Annual booster recommended in endemic areas.',
    emergencySteps: ['Isolate the affected animal immediately', 'Move animal to shade and provide fresh water', 'Contact veterinarian urgently', 'Administer oxytetracycline if available', 'Do NOT stress the animal - avoid unnecessary movement', 'Monitor temperature every 4 hours']
  },
  {
    id: 'anthrax',
    name: 'Anthrax',
    category: 'Bacterial',
    animalsAffected: ['Cattle', 'Goats', 'Sheep', 'Pigs', 'Horses'],
    cause: 'Bacillus anthracis bacteria. Spores can survive in soil for decades.',
    symptoms: ['Sudden death (often first sign)', 'High fever', 'Swelling of neck, chest, and flanks', 'Bleeding from nose, mouth, and anus', 'Dark, tarry blood that does not clot', 'Staggering and trembling before collapse', 'Bloating after death'],
    transmission: 'Animals ingest spores from contaminated soil or water. Spores can be brought to surface by flooding, digging, or drought. Can also spread through contaminated feed and biting flies.',
    treatment: 'High doses of penicillin if caught early. Oxytetracycline as alternative. Treatment is often too late as death occurs rapidly. NOTIFY VETERINARY AUTHORITIES IMMEDIATELY - Anthrax is a notifiable disease.',
    prevention: 'Annual vaccination with Sterne spore vaccine. Vaccinate all livestock in endemic areas. Do NOT open carcasses of suspected anthrax deaths. Burn or deeply bury carcasses with quicklime. Quarantine affected areas.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Sterne strain 34F2 spore vaccine. Vaccinate annually, ideally before the rainy season. Do not vaccinate within 2 weeks of antibiotic treatment.',
    emergencySteps: ['DO NOT open or cut the carcass', 'Report to veterinary authorities immediately', 'Quarantine the area - restrict animal and human movement', 'Burn or deeply bury the carcass with quicklime', 'Disinfect the area with 10% formalin', 'Vaccinate all other livestock in the area', 'This is a NOTIFIABLE disease - report to Department of Veterinary Services']
  },
  {
    id: 'blackleg',
    name: 'Blackleg',
    category: 'Bacterial',
    animalsAffected: ['Cattle', 'Sheep', 'Goats'],
    cause: 'Clostridium chauvoei bacteria found in soil. Spores enter through wounds or ingestion.',
    symptoms: ['Sudden death in young cattle (6 months to 2 years)', 'High fever (41°C)', 'Lameness and swelling of muscles (usually hindquarters)', 'Affected muscles are dark, dry, and spongy', 'Gas bubbles under skin (crackling sound when pressed)', 'Loss of appetite', 'Depression and reluctance to move'],
    transmission: 'Bacteria spores persist in soil for years. Animals ingest spores while grazing. Spores can enter through wounds. Most common in young, well-nourished cattle on lush pastures.',
    treatment: 'High doses of penicillin if caught very early. Usually fatal by the time symptoms appear. Anti-inflammatory drugs may help. Surgical drainage of affected muscles rarely successful.',
    prevention: 'Vaccinate all calves at 3-4 months of age with Blanthax or multivalent clostridial vaccine. Booster at weaning. Annual revaccination. Avoid grazing on known contaminated pastures.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Blanthax vaccine (combined Blackleg and Anthrax). First dose at 3-4 months, booster at 6 months. Annual revaccination. Can use multivalent clostridial vaccines.',
    emergencySteps: ['Administer penicillin immediately at high dose', 'Contact veterinarian urgently', 'Vaccinate all unvaccinated cattle in the herd', 'Do not butcher or consume meat from affected animals', 'Burn or deeply bury carcasses', 'Disinfect contaminated areas']
  },
  {
    id: 'botulism',
    name: 'Botulism',
    category: 'Bacterial',
    animalsAffected: ['Cattle', 'Goats', 'Sheep', 'Poultry', 'Horses'],
    cause: 'Clostridium botulinum toxin. Cattle ingest toxin from decaying carcasses, spoiled feed, or contaminated water.',
    symptoms: ['Progressive paralysis starting from hindquarters', 'Difficulty swallowing', 'Drooling saliva', 'Tongue paralysis (tongue hangs out)', 'Stiff gait progressing to recumbency', 'Cannot stand or raise head', 'Death from respiratory paralysis'],
    transmission: 'Ingestion of preformed toxin in decomposing animal or plant material. Phosphorus-deficient cattle chew bones (osteophagia) and may ingest toxin from decomposing carcasses.',
    treatment: 'No effective treatment once symptoms appear. Antitoxin may help if given very early. Supportive care: fluids, shade, turning recumbent animals. Laxatives to remove toxin from gut.',
    prevention: 'Vaccinate with botulism toxoid (Types C and D). Remove all carcasses and bones from pastures. Provide adequate phosphorus supplementation (bone meal or dicalcium phosphate). Ensure clean water sources.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Botulism toxoid vaccine (Types C and D). Two initial doses 4-6 weeks apart. Annual booster. Essential in phosphorus-deficient areas.',
    emergencySteps: ['Remove all animals from the contaminated area', 'Identify and remove the source of toxin', 'Provide supportive care - shade, water, soft bedding', 'Contact veterinarian for antitoxin', 'Vaccinate unaffected animals immediately', 'Supplement phosphorus to prevent bone chewing']
  },
  {
    id: 'dermatophilosis',
    name: 'Dermatophilosis',
    category: 'Bacterial',
    animalsAffected: ['Cattle', 'Goats', 'Sheep', 'Horses'],
    cause: 'Dermatophilus congolensis bacteria. Activated by prolonged wetting of skin.',
    symptoms: ['Crusty, scab-like lesions on skin', 'Matted hair with paintbrush-like tufts', 'Lesions mainly on back, neck, and legs', 'Skin thickening and wrinkling', 'Weight loss', 'Secondary infections', 'Reduced hide quality'],
    transmission: 'Spread by direct contact, ticks, and biting flies. Prolonged rain and wet conditions activate dormant organisms on skin. Tick damage to skin allows bacterial entry.',
    treatment: 'Long-acting oxytetracycline injection. Procaine penicillin with streptomycin. Topical treatment with iodine or copper sulfate solution. Remove scabs gently and apply antiseptic.',
    prevention: 'Regular tick control through dipping. Provide shelter during prolonged rain. Avoid overcrowding. Cull chronically affected animals. Maintain good nutrition to boost immunity.',
    vaccinationAvailable: false,
    emergencySteps: ['Isolate affected animals', 'Administer long-acting oxytetracycline', 'Gently remove scabs and apply iodine solution', 'Improve tick control program', 'Provide shelter from rain', 'Improve nutrition']
  },
  {
    id: 'fmd',
    name: 'Foot and Mouth Disease',
    category: 'Viral',
    animalsAffected: ['Cattle', 'Goats', 'Sheep', 'Pigs'],
    cause: 'Foot and Mouth Disease virus (Aphthovirus). Highly contagious.',
    symptoms: ['Fever (40-41°C)', 'Blisters (vesicles) on tongue, lips, and gums', 'Blisters between hooves and on coronary band', 'Excessive drooling and salivation', 'Lameness and reluctance to walk', 'Smacking of lips', 'Loss of appetite', 'Drop in milk production', 'Weight loss'],
    transmission: 'Highly contagious through direct contact, aerosol (wind-borne over long distances), contaminated feed, water, equipment, vehicles, and clothing. Virus can survive in environment for weeks.',
    treatment: 'No specific treatment. Supportive care only. Wash lesions with mild antiseptic. Provide soft feed and clean water. Anti-inflammatory drugs for pain. Secondary bacterial infections treated with antibiotics.',
    prevention: 'Vaccination with appropriate serotype vaccine. Movement control and quarantine. Report immediately to veterinary authorities. Disinfect equipment and vehicles. This is a NOTIFIABLE disease with trade implications.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Inactivated vaccine available for SAT1, SAT2, SAT3 serotypes common in Zimbabwe. Vaccinate twice yearly in high-risk areas. Mandatory vaccination in FMD control zones.',
    emergencySteps: ['REPORT IMMEDIATELY to Department of Veterinary Services', 'Quarantine all affected and in-contact animals', 'Stop all animal movement in and out of farm', 'Disinfect all equipment, vehicles, and clothing', 'Do NOT move animals to market or dip tank', 'This is a NOTIFIABLE disease - failure to report is a criminal offense']
  },
  {
    id: 'fowlpox',
    name: 'Fowl Pox',
    category: 'Viral',
    animalsAffected: ['Poultry'],
    cause: 'Avipoxvirus. Spread by mosquitoes and direct contact.',
    symptoms: ['Wart-like nodules on comb, wattles, and face (dry form)', 'Yellow plaques in mouth and throat (wet form)', 'Difficulty breathing (wet form)', 'Reduced egg production', 'Weight loss', 'Swollen eyes', 'Depression'],
    transmission: 'Spread by mosquitoes (main vector), direct contact with infected birds, contaminated equipment, and aerosol. Virus enters through skin wounds or mucous membranes.',
    treatment: 'No specific antiviral treatment. Remove plaques from mouth carefully and apply iodine. Provide vitamins A and E in water. Antibiotics for secondary bacterial infections. Isolate affected birds.',
    prevention: 'Vaccinate chicks at 6-8 weeks using wing-web method. Revaccinate at point of lay. Control mosquitoes. Maintain good hygiene. Remove and isolate sick birds promptly.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Live attenuated fowl pox vaccine. Administer by wing-web stab at 6-8 weeks. Revaccinate at 16-18 weeks (point of lay). Check for vaccine take after 7 days.',
    emergencySteps: ['Isolate affected birds immediately', 'Apply iodine to skin lesions', 'Remove wet pox plaques carefully and apply iodine', 'Add vitamins to drinking water', 'Vaccinate all unaffected birds', 'Control mosquitoes in the area']
  },
  {
    id: 'heartwater',
    name: 'Heartwater',
    category: 'Bacterial',
    animalsAffected: ['Cattle', 'Goats', 'Sheep'],
    cause: 'Ehrlichia ruminantium (formerly Cowdria ruminantium). Transmitted by Amblyomma ticks (bont ticks).',
    symptoms: ['High fever (41-42°C)', 'Loss of appetite', 'Nervous signs - walking in circles, high-stepping gait', 'Chewing movements', 'Convulsions and paddling', 'Fluid accumulation around heart (pericardial effusion)', 'Diarrhea', 'Rapid death in acute cases'],
    transmission: 'Transmitted exclusively by Amblyomma hebraeum (bont tick) and related species. Nymphs and adults transmit the organism. Not spread by direct contact between animals.',
    treatment: 'Oxytetracycline (long-acting) at 20mg/kg - must be given early. Doxycycline. Treatment must begin before nervous signs appear. Once convulsions start, prognosis is very poor.',
    prevention: 'Strict tick control targeting Amblyomma ticks. Regular dipping. Infection and treatment method for immunization in endemic areas. Maintain some tick challenge for natural immunity (endemic stability).',
    vaccinationAvailable: false,
    vaccinationDetails: 'No conventional vaccine available. Infection-and-treatment method used: deliberate infection with blood stabilate followed by tetracycline treatment.',
    emergencySteps: ['Administer long-acting oxytetracycline IMMEDIATELY', 'Keep animal calm and in shade', 'Reduce stress - do not move animal', 'Contact veterinarian urgently', 'Intensify tick control on all animals', 'Monitor other animals for fever']
  },
  {
    id: 'gumboro',
    name: 'Bovine Gumboro (Infectious Bursal Disease)',
    category: 'Viral',
    animalsAffected: ['Poultry'],
    cause: 'Infectious Bursal Disease Virus (IBDV). Attacks the immune system of young birds.',
    symptoms: ['Sudden onset of depression', 'Ruffled feathers', 'Watery diarrhea (white/watery droppings)', 'Dehydration', 'Trembling', 'Swollen and inflamed bursa of Fabricius', 'High mortality in 3-6 week old chicks', 'Immunosuppression in survivors'],
    transmission: 'Highly contagious through direct contact, contaminated feed, water, litter, and equipment. Virus is very resistant and can persist in poultry houses for months.',
    treatment: 'No specific treatment. Supportive care with electrolytes and vitamins in water. Maintain warmth and reduce stress. Antibiotics for secondary infections. Good nursing care essential.',
    prevention: 'Vaccination program: live vaccine at 10-14 days and 21-28 days. Ensure maternal antibody levels considered in vaccination timing. Strict biosecurity. Thorough cleaning and disinfection between flocks.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Live attenuated vaccines (intermediate and hot strains). First dose at 10-14 days, second at 21-28 days via drinking water. Timing depends on maternal antibody levels.',
    emergencySteps: ['Isolate affected flock', 'Provide electrolytes and vitamins in water', 'Maintain warmth and reduce stress', 'Treat secondary infections with antibiotics', 'Improve biosecurity measures', 'Vaccinate replacement flocks properly']
  },
  {
    id: 'lsd',
    name: 'Lumpy Skin Disease',
    category: 'Viral',
    animalsAffected: ['Cattle'],
    cause: 'Lumpy Skin Disease virus (Capripoxvirus). Spread by biting insects.',
    symptoms: ['Fever (40-41°C)', 'Firm, round skin nodules (2-5cm diameter) all over body', 'Nodules may ulcerate and become infected', 'Swollen lymph nodes', 'Swelling of legs and brisket', 'Nasal and eye discharge', 'Loss of appetite', 'Drop in milk production', 'Damage to hide'],
    transmission: 'Spread primarily by biting flies (Stomoxys), mosquitoes, and ticks. Can also spread through direct contact and contaminated equipment. More common in wet, warm seasons.',
    treatment: 'No specific antiviral treatment. Antibiotics for secondary bacterial infections. Anti-inflammatory drugs. Wound care for ulcerated nodules. Fly repellents on lesions. Supportive care with good nutrition.',
    prevention: 'Vaccination with Neethling strain vaccine. Control biting insects. Quarantine new animals for 28 days. Report to veterinary authorities. This is a NOTIFIABLE disease.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Neethling strain live attenuated vaccine. Vaccinate annually before the rainy/fly season. Calves can be vaccinated from 3 months of age.',
    emergencySteps: ['Report to veterinary authorities - NOTIFIABLE disease', 'Isolate affected animals', 'Control biting insects aggressively', 'Apply wound care to ulcerated nodules', 'Vaccinate unaffected animals', 'Restrict animal movement']
  },
  {
    id: 'mange',
    name: 'Mange',
    category: 'Parasitic',
    animalsAffected: ['Cattle', 'Goats', 'Sheep', 'Pigs'],
    cause: 'Mange mites (Sarcoptes, Psoroptes, Chorioptes, Demodex species) that burrow into or live on the skin.',
    symptoms: ['Intense itching and scratching', 'Hair loss (alopecia)', 'Thickened, wrinkled skin', 'Crusty, scaly lesions', 'Skin redness and inflammation', 'Weight loss due to constant irritation', 'Secondary bacterial skin infections', 'Reduced productivity'],
    transmission: 'Direct contact between animals. Shared equipment, rubbing posts, and housing. Overcrowding increases spread. Mites can survive off-host for several days.',
    treatment: 'Ivermectin injection (200mcg/kg) - repeat after 14 days. Amitraz dip or spray. Topical application of acaricides. Treat all in-contact animals simultaneously. Clean and disinfect housing.',
    prevention: 'Regular dipping with appropriate acaricides. Quarantine and treat new animals before introduction. Avoid overcrowding. Maintain good nutrition. Inspect animals regularly for early signs.',
    vaccinationAvailable: false,
    emergencySteps: ['Isolate severely affected animals', 'Administer ivermectin injection', 'Treat all in-contact animals', 'Clean and disinfect housing and equipment', 'Repeat treatment after 14 days', 'Improve nutrition to boost recovery']
  },
  {
    id: 'orf',
    name: 'Orf (Contagious Ecthyma)',
    category: 'Viral',
    animalsAffected: ['Goats', 'Sheep'],
    cause: 'Orf virus (Parapoxvirus). Can also infect humans (zoonotic).',
    symptoms: ['Scabby, crusty lesions around mouth and nostrils', 'Lesions on lips, gums, and tongue', 'Difficulty eating and nursing', 'Weight loss especially in lambs/kids', 'Lesions on udder of nursing mothers', 'Lesions on feet between hooves', 'Secondary bacterial infections'],
    transmission: 'Direct contact with infected animals or contaminated environment. Virus is very resistant and can survive in scabs and on pastures for months to years. Can infect humans through skin abrasions.',
    treatment: 'No specific antiviral treatment. Apply gentian violet or iodine to lesions. Soften scabs with glycerin. Provide soft feed for animals with mouth lesions. Antibiotics for secondary infections. Ensure lambs/kids can nurse.',
    prevention: 'Vaccinate in endemic areas using scarification method. Isolate affected animals. Wear gloves when handling (zoonotic risk). Do not introduce animals from infected flocks without quarantine.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Live vaccine applied by scarification on inner thigh. Vaccinate lambs/kids at 6-8 weeks. Annual revaccination of breeding stock before lambing/kidding season.',
    emergencySteps: ['Isolate affected animals', 'Wear gloves - this disease can infect humans', 'Apply gentian violet or iodine to lesions', 'Ensure young animals can still nurse', 'Provide soft, palatable feed', 'Monitor for secondary infections']
  },
  {
    id: 'pulpykidney',
    name: 'Pulpy Kidney Disease',
    category: 'Bacterial',
    animalsAffected: ['Cattle', 'Goats', 'Sheep'],
    cause: 'Clostridium perfringens Type D toxin. Triggered by sudden changes in diet, especially high-grain diets.',
    symptoms: ['Sudden death (often the only sign)', 'Convulsions and paddling', 'Green, pasty diarrhea', 'Abdominal pain', 'Staggering and incoordination', 'Rapid breathing', 'Kidney becomes soft and pulpy after death'],
    transmission: 'Not transmitted between animals. Clostridium perfringens is a normal gut inhabitant. Disease occurs when bacteria multiply rapidly due to dietary changes (lush pasture, grain overload).',
    treatment: 'Usually fatal before treatment possible. Clostridium antitoxin if caught early. Oral antibiotics (penicillin). Reduce grain/concentrate intake immediately. Provide roughage.',
    prevention: 'Vaccinate with multivalent clostridial vaccine (Multivax/Covexin). Introduce dietary changes gradually over 2-3 weeks. Avoid sudden access to lush pasture or grain. Ensure adequate roughage.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Multivalent clostridial vaccine (includes Type D). Two doses 4-6 weeks apart initially. Annual booster before high-risk periods. Vaccinate ewes/does 4-6 weeks before lambing/kidding.',
    emergencySteps: ['Remove animals from lush pasture or grain source', 'Administer clostridial antitoxin if available', 'Provide hay/roughage immediately', 'Vaccinate all unvaccinated animals', 'Introduce dietary changes gradually in future', 'Contact veterinarian']
  },
  {
    id: 'rabies',
    name: 'Rabies',
    category: 'Viral',
    animalsAffected: ['Cattle', 'Goats', 'Sheep', 'Pigs', 'Horses', 'Dogs', 'Cats'],
    cause: 'Rabies virus (Lyssavirus). Always fatal once symptoms appear. Major zoonotic disease.',
    symptoms: ['Behavioral changes - aggression or unusual tameness', 'Excessive salivation and drooling', 'Difficulty swallowing', 'Bellowing with abnormal sound', 'Paralysis starting from hindquarters', 'Straining as if constipated', 'Sexual excitement (mounting other animals)', 'Death within 3-7 days of symptoms'],
    transmission: 'Transmitted through bite of infected animal (mainly jackals, dogs, and mongoose in Zimbabwe). Virus is present in saliva. Incubation period is 2 weeks to several months.',
    treatment: 'NO TREATMENT - Rabies is always fatal once symptoms appear. Euthanasia is recommended. DO NOT handle suspected rabid animals without protection. If bitten, wash wound immediately and seek medical help.',
    prevention: 'Vaccinate all dogs and cats annually. Vaccinate valuable livestock in high-risk areas. Report suspected rabid animals to veterinary authorities. Avoid contact with wild animals behaving abnormally.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Inactivated rabies vaccine. Vaccinate dogs from 3 months, annually. Livestock vaccination in high-risk areas. Post-exposure vaccination not effective in animals.',
    emergencySteps: ['DO NOT touch or approach the suspected rabid animal', 'Keep all people and animals away', 'Report to veterinary authorities IMMEDIATELY', 'If bitten: wash wound with soap and water for 15 minutes', 'Seek medical attention URGENTLY if human is bitten', 'This is a NOTIFIABLE disease and PUBLIC HEALTH EMERGENCY']
  },
  {
    id: 'redwater',
    name: 'Redwater (Babesiosis)',
    category: 'Parasitic',
    animalsAffected: ['Cattle'],
    cause: 'Babesia bovis and Babesia bigemina protozoan parasites transmitted by Boophilus ticks.',
    symptoms: ['High fever (41°C+)', 'Red or dark brown urine (hemoglobinuria)', 'Pale or yellow mucous membranes', 'Loss of appetite', 'Rapid breathing', 'Weakness and depression', 'Constipation', 'Cerebral form: aggression, circling, convulsions (B. bovis)'],
    transmission: 'Transmitted by Boophilus (Rhipicephalus) tick species. B. bovis transmitted by tick larvae, B. bigemina by nymphs and adults. Not spread by direct contact.',
    treatment: 'Diminazene aceturate (Berenil) at 3.5mg/kg intramuscularly. Imidocarb dipropionate at 1.2mg/kg. Supportive care: fluids, blood tonics, shade. Treat early for best results.',
    prevention: 'Regular tick control through dipping (weekly in summer). Maintain endemic stability by allowing some tick exposure. Vaccinate with live attenuated vaccine in high-risk areas. Monitor cattle closely after dipping lapses.',
    vaccinationAvailable: true,
    vaccinationDetails: 'Live attenuated Babesia vaccine available. Vaccinate calves at 4-9 months. Combined with Anaplasma vaccine. Requires cold chain maintenance.',
    emergencySteps: ['Administer Diminazene (Berenil) injection immediately', 'Move animal to shade with fresh water', 'Do NOT stress the animal', 'Contact veterinarian', 'Check and treat other animals showing fever', 'Intensify tick control program immediately']
  },
  {
    id: 'januarydisease',
    name: 'January Disease (Theileriosis)',
    category: 'Parasitic',
    animalsAffected: ['Cattle'],
    cause: 'Theileria parva parasite transmitted by the brown ear tick (Rhipicephalus appendiculatus).',
    symptoms: ['High fever (40-42°C)', 'Swollen lymph nodes (especially parotid - below ear)', 'Difficulty breathing', 'Nasal discharge', 'Eye discharge (tearing)', 'Loss of appetite', 'Diarrhea (sometimes bloody)', 'Emaciation', 'Death within 18-24 days if untreated'],
    transmission: 'Transmitted by the brown ear tick (Rhipicephalus appendiculatus). Called "January Disease" because peak tick activity occurs in January during the rainy season in Zimbabwe.',
    treatment: 'Buparvaquone (Butalex) at 2.5mg/kg intramuscularly - ONLY effective treatment. Must be given early. Oxytetracycline may slow progression. Supportive care essential.',
    prevention: 'Intensive tick control especially during rainy season (November-March). Weekly dipping during high-risk period. Hand-remove ticks from ears. Immunization by infection-and-treatment method available in some areas.',
    vaccinationAvailable: false,
    vaccinationDetails: 'No conventional vaccine. Infection-and-treatment method (ITM) available: deliberate infection with T. parva stabilate followed by simultaneous treatment with long-acting oxytetracycline.',
    emergencySteps: ['Administer Buparvaquone (Butalex) IMMEDIATELY', 'This is the ONLY effective drug - do not delay', 'Contact veterinarian urgently', 'Check ears of all cattle for brown ear ticks', 'Intensify dipping to twice weekly', 'Hand-remove ticks from ears of all cattle']
  }
];

export const getDiseasesByCategory = (category: string) => 
  diseases.filter(d => d.category === category);

export const getDiseasesByAnimal = (animal: string) => 
  diseases.filter(d => d.animalsAffected.includes(animal));

export const searchDiseases = (query: string) => {
  const q = query.toLowerCase();
  return diseases.filter(d => 
    d.name.toLowerCase().includes(q) ||
    d.symptoms.some(s => s.toLowerCase().includes(q)) ||
    d.animalsAffected.some(a => a.toLowerCase().includes(q)) ||
    d.category.toLowerCase().includes(q)
  );
};
