export interface CalendarActivity {
  category: 'Management' | 'Feeding' | 'Veterinary' | 'Dosing';
  activity: string;
  color: string;
}

export interface MonthData {
  month: string;
  shortMonth: string;
  activities: CalendarActivity[];
}

export const calendarData: MonthData[] = [
  {
    month: 'January',
    shortMonth: 'Jan',
    activities: [
      { category: 'Management', activity: 'Bulling season continues', color: 'bg-blue-500' },
      { category: 'Feeding', activity: 'Natural grazing - good pasture', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Weekly dipping (tick control critical)', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'January Disease peak - monitor closely', color: 'bg-red-600' },
      { category: 'Veterinary', activity: 'Lumpy Skin Disease vaccination', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Roundworm dosing', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'February',
    shortMonth: 'Feb',
    activities: [
      { category: 'Management', activity: 'Bulling season continues', color: 'bg-blue-500' },
      { category: 'Feeding', activity: 'Natural grazing - peak pasture', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Weekly dipping continues', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Blackleg vaccination (calves)', color: 'bg-orange-500' },
      { category: 'Veterinary', activity: 'Monitor for Redwater', color: 'bg-red-400' },
      { category: 'Dosing', activity: 'Liver fluke treatment', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'March',
    shortMonth: 'Mar',
    activities: [
      { category: 'Management', activity: 'End of bulling season', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Weaning preparation', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Good natural grazing', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Weekly dipping', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Botulism vaccination', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Roundworm dosing', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'April',
    shortMonth: 'Apr',
    activities: [
      { category: 'Management', activity: 'Weaning of calves', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Pregnancy testing', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Start protein supplementation', color: 'bg-green-500' },
      { category: 'Feeding', activity: 'Mineral lick provision', color: 'bg-green-400' },
      { category: 'Veterinary', activity: 'Strategic dipping (fortnightly)', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Blackleg booster vaccination', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Tapeworm dosing', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'May',
    shortMonth: 'May',
    activities: [
      { category: 'Management', activity: 'Culling and selection', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Marketing of cull animals', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Protein supplements (lick)', color: 'bg-green-500' },
      { category: 'Feeding', activity: 'Hay supplementation begins', color: 'bg-green-400' },
      { category: 'Veterinary', activity: 'Strategic dipping', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Contagious abortion vaccination', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Liver fluke treatment', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'June',
    shortMonth: 'Jun',
    activities: [
      { category: 'Management', activity: 'Winter management planning', color: 'bg-blue-500' },
      { category: 'Feeding', activity: 'Protein and mineral supplements', color: 'bg-green-500' },
      { category: 'Feeding', activity: 'Hay and crop residues', color: 'bg-green-400' },
      { category: 'Veterinary', activity: 'Strategic dipping (monthly)', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Rabies vaccination', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Roundworm dosing', color: 'bg-purple-500' },
      { category: 'Management', activity: 'Umkauzan monitoring', color: 'bg-yellow-600' },
    ]
  },
  {
    month: 'July',
    shortMonth: 'Jul',
    activities: [
      { category: 'Management', activity: 'Dry season management', color: 'bg-blue-500' },
      { category: 'Feeding', activity: 'Increase supplementary feeding', color: 'bg-green-500' },
      { category: 'Feeding', activity: 'Protein lick essential', color: 'bg-green-400' },
      { category: 'Veterinary', activity: 'Strategic dipping (monthly)', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Anthrax vaccination', color: 'bg-orange-500' },
      { category: 'Management', activity: 'Poisonous plants monitoring', color: 'bg-yellow-600' },
    ]
  },
  {
    month: 'August',
    shortMonth: 'Aug',
    activities: [
      { category: 'Management', activity: 'Pre-calving preparation', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Body condition scoring', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Maximum supplementation period', color: 'bg-green-500' },
      { category: 'Feeding', activity: 'Phosphorus supplementation', color: 'bg-green-400' },
      { category: 'Veterinary', activity: 'Strategic dipping', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Anthrax booster', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Tapeworm dosing', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'September',
    shortMonth: 'Sep',
    activities: [
      { category: 'Management', activity: 'Calving season begins', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Monitor calving cows', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Continue supplementation', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Resume weekly dipping', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Blackleg vaccination (new calves)', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Roundworm dosing', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'October',
    shortMonth: 'Oct',
    activities: [
      { category: 'Management', activity: 'Calving season continues', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Calf registration and tagging', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Early rains - pasture recovery', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Weekly dipping (rains begin)', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'Botulism vaccination', color: 'bg-orange-500' },
      { category: 'Veterinary', activity: 'Lumpy Skin Disease watch', color: 'bg-red-400' },
      { category: 'Dosing', activity: 'Liver fluke treatment', color: 'bg-purple-500' },
    ]
  },
  {
    month: 'November',
    shortMonth: 'Nov',
    activities: [
      { category: 'Management', activity: 'Bulling season preparation', color: 'bg-blue-500' },
      { category: 'Management', activity: 'Bull soundness testing', color: 'bg-blue-400' },
      { category: 'Feeding', activity: 'Improving natural grazing', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Weekly dipping critical', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'FMD vaccination (if in control zone)', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Roundworm dosing', color: 'bg-purple-500' },
      { category: 'Veterinary', activity: 'January Disease prevention starts', color: 'bg-red-600' },
    ]
  },
  {
    month: 'December',
    shortMonth: 'Dec',
    activities: [
      { category: 'Management', activity: 'Bulling season begins', color: 'bg-blue-500' },
      { category: 'Feeding', activity: 'Good natural grazing', color: 'bg-green-500' },
      { category: 'Veterinary', activity: 'Weekly dipping essential', color: 'bg-red-500' },
      { category: 'Veterinary', activity: 'January Disease - increase dipping', color: 'bg-red-600' },
      { category: 'Veterinary', activity: 'Rabies booster vaccination', color: 'bg-orange-500' },
      { category: 'Dosing', activity: 'Tapeworm dosing', color: 'bg-purple-500' },
    ]
  }
];

export const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'Management': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Feeding': return 'bg-green-100 text-green-800 border-green-200';
    case 'Veterinary': return 'bg-red-100 text-red-800 border-red-200';
    case 'Dosing': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getCategoryIcon = (category: string): string => {
  switch (category) {
    case 'Management': return 'clipboard';
    case 'Feeding': return 'wheat';
    case 'Veterinary': return 'syringe';
    case 'Dosing': return 'pill';
    default: return 'circle';
  }
};
