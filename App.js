import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {Provider} from 'react-redux'
import Store from './src/redux/store.js'
import Login from './src/login.js'
import {persistor} from './src/redux/store.js'
import {PersistGate} from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  // Specify custom property
  dark: false,
};

export default function App(){
  return (
    <PaperProvider theme={theme}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
      </PaperProvider>
  );
}


