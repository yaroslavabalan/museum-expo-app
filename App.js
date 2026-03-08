import React from 'react';
import { Platform, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from './screens/HomeScreen';
import ResultsScreen from './screens/ResultsScreen';
import DetailScreen from './screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
  {Platform.OS === 'ios' && (
        <View style={{ height: 44, backgroundColor: '#d77312' }}>
          <StatusBar barStyle="light-content" />
        </View>
      )}

      <NavigationContainer>
            <Stack.Navigator
        screenOptions={{
          animation: 'fade',
          headerShown: true, 
          headerStyle: { backgroundColor: '#d77312' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Results' }} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Artwork Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}