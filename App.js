import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox} from 'react-native';
import Navigator from './index';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <View style={styles.container}>
       <Navigator></Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


