import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import HeartChart  from '../components/charts/HeartChart';
import SkinChart  from '../components/charts/SkinChart';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <HeartChart></HeartChart>
      <SkinChart></SkinChart>
      </View>
      <View style={styles.bottomContainer}>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  topContainer:{
    flex:1,
    height:"50%",
    backgroundColor: '#000',
    paddingVertical:50,

  },
  bottomContainer:{
    flex:1,
    height:"50%",
    backgroundColor: '#eee',
  }
});
