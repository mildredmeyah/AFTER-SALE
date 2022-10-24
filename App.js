import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Dashboard from './src/screens/Dashboard';

import { auth } from './src/config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import AddProduct from './src/components/AddProduct';
import ViewProducts from './src/pages/ViewProducts';
import Home from './src/pages/Home';


const Stack = createNativeStackNavigator();

export default function App() {
  //function to register new user with email and password
  //function to login user with email and password
  //function to log out the user  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' options={{headerShown: false}}>
          {(props) => <Login {...props} />}
        </Stack.Screen>

        <Stack.Screen name='Register' options={{headerShown: false}}>
          {(props) => <Register {...props} />}
        </Stack.Screen>

        <Stack.Screen name='viewProduct' options={{headerShown: true}}>
          {(props) => <ViewProducts {...props} />}
        </Stack.Screen>

        <Stack.Screen name='AddProduct' options={{headerShown: true}}>
          {(props) => <AddProduct {...props} />}
        </Stack.Screen>

        <Stack.Screen name='Home' options={{title:'Home'}}>
          {(props) => <Dashboard {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
