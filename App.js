import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ImageBackground, Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import AppNavigator from './navigator/AppNavigator';

export default function App(){
    return(
        <AppNavigator/>
    );
}