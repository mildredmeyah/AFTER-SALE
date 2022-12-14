import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity  } from 'react-native';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

const Register = ({navigation}) => {
    //states for error
    const [errMsg, setErrMsg] = useState('');

    //states for new user
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [bio] = useState('');


    //function to register new user with email and password
    const registerWithEmail = async() => {
        console.log(email);
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
                                const collectionRef = collection(db, "profiles");
                                const profile = {
                                  name: name,
                                  address: address,
                                  email: email,
                                  bio: bio,
                                  contact: contact,
                                };
        
                                addDoc(collectionRef, profile).then(() => {
                                    alert("Registered successfully");
                                    navigation.navigate('Home')
                                }).catch((err) => {
                                    console.log(err);
                                })
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
    <View style={{backgroundColor:"white",height:1000,}}>
    <View style={styles.container}>
        <View style={styles.content}>
        <View><Text style={styles.head}>Register</Text></View>
        {errMsg !== '' ? (<View><Text style={styles.badErr}>{errMsg}</Text></View>) : (<View><Text style={styles.goodErr}></Text></View>) }
        <View >
            <View>
                <TextInput style={styles.input} onChangeText={value => setEmail(value)}  placeholder='Enter Email' />
            </View>
            <View>
                <TextInput style={styles.input} onChangeText={value => Number(setContact(value))}  placeholder='Enter Your constact number' />
            </View>
            <View>
                <TextInput style={styles.input} onChangeText={value => setName(value)}  placeholder='Enter Name' />
            </View>
            <View>
                <TextInput style={styles.input} onChangeText={value => setAddress(value)}  placeholder='Enter your shop Address' />
            </View>
            <View>
                <TextInput style={styles.input}  onChangeText={value => setPassword(value)}  secureTextEntry placeholder='Enter Password' />
            </View>
            <View>
                <TextInput style={styles.input}  onChangeText={value => setConfirmPassword(value)}   placeholder='Confirm Password'  secureTextEntry/>
            </View >
            <View style={styles.lgn} >
            <TouchableOpacity style={styles.btn } color="#96DED1" title='Register' onPress={registerWithEmail} >
            <Text style={{color:'Black'}}>Register</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.acc} >
                <Text color="#96DED1"onPress={() => navigation.navigate('Login')}>Already registered <Text style={styles.in} >login</Text></Text>
            </View>
        </View>
        </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        marginLeft: 30,
        backgroundColor: "#DFF1F3",
        height: 500,
        width: 300,
        borderRadius: 20,
    },
    head:{
        fontSize: 30,
        fontWeight: '700',
    },
    badErr: {
        backgroundColor: '#FF0000',
        color: '#FFFFFF',
    },
    goodErr: {
        backgroundColor: '#00FF00',
        color: '#FFFFFF',
    },
    content:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DFF1F3',
    },
    input:{
        borderWidth:  1,
        backgroundColor: '#fff',
        marginTop: 20,
        width:200,
        borderColor:'#96DED1',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 10,
        color:'#A09999',
        paddingLeft: 20,
    },
    btn:{
        borderRadius:35,
        borderRadius: 10,
        width:189,
        height:46,
        color:'white',
        backgroundColor:'#96DED1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lgn:{
        marginTop: 20,
    },
    acc:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    in:{
        color:'#36EBCA',
        textDecorationLine: 'underline',
    },
})

export default Register