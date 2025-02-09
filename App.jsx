import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/home';
import HistoryScreen from './src/screens/history';
import AddTimerScreen from './src/screens/timers';
import { TimerProvider } from './src/components/timerContext';
import SplashScreen from './src/screens/splashScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="AddTimer" component={AddTimerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}

