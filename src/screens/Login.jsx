import React, { useState, useEffect } from 'react';

import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({navigation}) => {
   

    //states
    //login states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //error state
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        if (auth.currentUser) {
            navigation.navigate('Home');
        }
    }, [])

    //function to log in
    const loginWithEmail = async() => {
        //error handling
        //check if email is empty
        if (email === '') {
            //problem
            setErrMsg('Email is required to log in');
        } else {
            //check if password is empty
            if (password === '') {
                //problem
                setErrMsg('Password is required to login')
            } else {
                await signInWithEmailAndPassword(auth, email, password).then(
                    userCridential => {
                        navigation.navigate('Home')
                    }
                ).catch(
                    err => {
                        setErrMsg(err.message);
                    }
                )
            }
        }
    }


  return (
    <View style={styles.container}>
        <Header title='Login' />
        <View>
            {errMsg === '' ? (<Text style={styles.goodErr}>Good to go</Text>) : (<Text style={styles.badErr}>{errMsg}</Text>)}
        </View>
        <View>
            <View>
                <Text>Email</Text>
                <TextInput onChangeText={value => setEmail(value)} />
            </View>

            <View>
                <Text>Password:</Text>
                <TextInput onChangeText={value => setPassword(value)} />
            </View>

            <TouchableOpacity style={{color: 'black',}} title='Login' onPress={loginWithEmail}>Login</TouchableOpacity>
            <View>
                <Text>Don't have an account?</Text>
                <Button title='Register' onPress={() => navigation.navigate('Register')} />
            </View>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    badErr: {
        backgroundColor: '#ff0000',
        color: '#ffffff',
    },
    goodErr: {
        backgroundColor: '#00ff00',
        color: '#ffffff',
    },
})

export default Login