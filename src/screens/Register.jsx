import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Header from '../components/Header';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({navigation}) => {
    //states for error
    const [errMsg, setErrMsg] = useState('');

    //states for new user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(()=>{
        if (auth.currentUser) {
            navigation.navigate('Home');
        } 
    }, [])

    //function to register new user with email and password
    const registerWithEmail = async() => {
        //check if inputs are empty
        if (email === '') {
            //email empty
            setErrMsg('Email is required to register');
            alert('Email is required to register');
        } else {
            if (password === '') {
                //new password empty
                setErrMsg('Password is required to register');
            } else {
                if (confirmPassword === '') {
                    //confirm password empty
                    setErrMsg('Confirm password is required to register');
                } else {
                    if (password !== confirmPassword) {
                        //pasword does not match
                        setErrMsg('Passwords entered does not match');
                    } else {
                        //good to go
                        await createUserWithEmailAndPassword(auth, email, password).then(
                            userCridential => {
                                setErrMsg('');
                                navigation.navigate('Home');
                            }
                        ).catch(
                            err => {
                                setErrMsg(err.message);
                            }
                        )
                    }
                }
            }
        }
    }
  return (
    
    <View style={styles.container}>
        <Header title='Register' />
        {errMsg !== '' ? (<View><Text style={styles.badErr}>{errMsg}</Text></View>) : (<View><Text style={styles.goodErr}>Good to go</Text></View>) }
        <View>
            <View>
                <Text>Email</Text>
                <TextInput onChangeText={value => setEmail(value)} />
            </View>

            <View>
                <Text>Password:</Text>
                <TextInput onChangeText={value => setPassword(value)} />
            </View>

            <View>
                <Text>Confirm Password:</Text>
                <TextInput onChangeText={value => setConfirmPassword(value)} />
            </View>
            <Button title='Register' onPress={registerWithEmail} />
            <View>
                <Text>Already have an account?</Text>
                <Button title='Login' onPress={() => navigation.navigate('Login')} />
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

export default Register