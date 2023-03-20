import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddNewTaskScreen from "./src/screens/AddNewTaskScreen";
import EditTaskScreen from "./src/screens/EditTaskScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tasks"
            component={HomeScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="AddNewTask"
            component={AddNewTaskScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="EditTask"
            component={EditTaskScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
