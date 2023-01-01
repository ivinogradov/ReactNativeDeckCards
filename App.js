import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Deck from './app/components/Deck';

export default function App() {
  return (
    <View style={styles.container}>
      <Deck></Deck>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
