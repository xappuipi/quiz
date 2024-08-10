import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QuizScr from '../Screens/Quiz';
import ResultScreen from '../Screens/Result';
import HomeScreen from '../Screens/HomeScreen'

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName = 'Home'>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Quiz" component={QuizScr} />
      <Stack.Screen name="Result" component={ResultScreen} /> 
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default AppNavigator;