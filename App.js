/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';
import Splash from './src/splash';
import Main from './src/main';

import Orientation from 'react-native-orientation-locker';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


Orientation.lockToLandscape();

const App = () => {

  const Stack = createStackNavigator();
  console.disableYellowBox = true;

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
};

export default App;
