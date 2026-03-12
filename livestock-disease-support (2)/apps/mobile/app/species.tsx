import { View, Text } from 'react-native';

const species = ['Cattle', 'Goats', 'Sheep', 'Chicken', 'Dogs', 'Donkeys', 'Rabbits', 'Guinea fowl'];

export default function SpeciesScreen() {
  return (
    <View style={{ padding: 16, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Species Library</Text>
      {species.map((item) => (
        <Text key={item} style={{ fontSize: 18 }}>• {item}</Text>
      ))}
    </View>
  );
}
