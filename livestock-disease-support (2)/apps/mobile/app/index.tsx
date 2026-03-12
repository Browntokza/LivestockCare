import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Livestock Care Zimbabwe</Text>
      <Text style={{ textAlign: 'center' }}>Offline-first mobile scaffold ready for disease, parasites, vet shops, doctors and offices modules.</Text>
      <Link href="/species">Open species</Link>
    </View>
  );
}
