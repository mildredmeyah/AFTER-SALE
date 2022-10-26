import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, SafeAreaView  } from 'react-native';
// import Header from '../components/Header';

import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({navigation}) => {
   

    //states
    //login states
    const [email, setEmail] = useState('paul@paul.com');
    const [password, setPassword] = useState('pppppp');

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
    <View style={{backgroundColor:'white',height:1000,}} >
    <View style={styles.container}>
         {/* <Header title='Login' /> */}
         <View><Text style={styles.head}>Login</Text></View>
        <View>
            {errMsg === '' ? (<Text style={styles.goodErr}></Text>) : (<Text style={styles.badErr}>{errMsg}</Text>)}
        </View>
        <View>
            <View>
                <TextInput  onChangeText={value => setEmail(value)} value={email} style={styles.input}  placeholder='Email' />
            </View>
            <View>
                <TextInput onChangeText={value => setPassword(value)} value={password} style={styles.input}  placeholder='Password' secureTextEntry />
            </View>
            <View style={styles.lgn}>
            <TouchableOpacity style={styles.btn} color="#96DED1"  onPress={loginWithEmail}>
                <Text style={{color:'white'}}>Login</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.acc} >
                <Text  style={styles.reg}  color="#96DED1" title='Register' onPress={() => navigation.navigate('Register')} >Not registered <Text style={styles.ed} >register</Text></Text>
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
        paddingLeft: 20
    },
    acc:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lgn:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reg:{
    },
    fog:{
        color:'#36EBCA',
        marginTop: 20,
        textDecorationLine: 'underline',
        alignItems: 'center',
        justifyContent: 'center',
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
    ed:{
        color:'#36EBCA',
        textDecorationLine: 'underline',
    },
})

export default Login