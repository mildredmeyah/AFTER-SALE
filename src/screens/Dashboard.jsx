import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Header from '../components/Header';

import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import AddProduct from '../components/AddProduct';

const Dashboard = ({navigation}) => {
//states for user email
const [email, setEmail] = useState('');

useEffect(()=>{
  if (auth.currentUser) {
    setEmail(auth.currentUser.email);
  } else {
    navigation.navigate('Login');
  }
}, []);

const logout = async() => {
  await signOut(auth).then(
    ()=> {
      navigation.navigate('Login');
    }
  )
}
const add = async() => {
  await signOut(auth).then(
    ()=> {
      navigation.navigate('AddProduct');
    }
  )
}
 
  return (
    <View style={styles.container}>
        <Header title='Home' />
        <Text>{email}</Text>
        <Button title='Add Product' onPress={add} />
        <Button title='Logout' onPress={logout} />
        <Text>Welcome to the app!</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
})

export default Dashboard