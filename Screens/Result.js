import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';

import { styles } from '../Styles/styles';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'}

export default function ResultScreen({navigation, route}){
    const { wynik } = route.params;
    return (
      <View style={styles.container}>
        <ImageBackground source={image}  resizeMode="cover" style={styles.image}>
          <Image></Image>
          <Text style={styles.question}>Twoja dokładność: {Math.round(wynik)}%</Text>
          {/* sprawdz2() */}
          <Button 
            title= "Wróć"
            onPress={() => navigation.navigate('Home')}
          />
        </ImageBackground>
      </View>
    );
  }