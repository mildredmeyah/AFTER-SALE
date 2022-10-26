import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Button,ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-web';


import { LinearGradient } from 'expo-linear-gradient';





const Splash = ({navigation}) => {


    return (
        <View style={styles.container}>
            <ImageBackground source={{uri:'https://images.pexels.com/photos/8725256/pexels-photo-8725256.jpeg?auto=compress&cs=tinysrgb&w=300'}}
            style={{width:400, height:400}}
            >
<LinearGradient     colors={['rgba(0, 0, 0, 0) 69.79%', '#070627']}
          style={{ padding: 205, alignItems: 'center', borderRadius: 5 }}>

</LinearGradient>
            </ImageBackground>
          
            {/* <Image 
       
       source={{uri: 'https://images.pexels.com/photos/8725256/pexels-photo-8725256.jpeg?auto=compress&cs=tinysrgb&w=300'}}
       
           style = {{ width: 414, height: 590, bottom:100}}
       /> */}
       <br></br>
            <Text style={styles.Text}>The Sales Management App for Street Vendors</Text>
            <br></br>
            <View style={styles.lgn}>
            <TouchableOpacity style={styles.login} color='#96DED1' onPress={() => navigation.navigate('Login')} >
                <Text style={{color:'#fff'}}>LOGIN</Text>

            </TouchableOpacity>
            </View>
            {/* <Button title='Login' onPress={() => navigation.navigate('Login')} color='#96DED1'  />
            */}
            <br></br>
            <Text  style={styles.text} onPress={() =>navigation.navigate('Register')}>Not registerd? <Text style={styles.link}>Register here </Text> 
        </Text>
      
        </View>
      )
    }
    
    
    const styles = StyleSheet.create({
        container: {
         padding:15,
            flex: 1,
            backgroundColor: '#070627',
            shadowColor:'#070627',
            maxHeight:840,
            maxWidth:1000,
            height:896,
            width:424,
             alignItems: 'center',
            justifyContent: 'center',

        },
        // img:{
        //     // background: linear-gradient('180deg', rgba(0, 0, 0, 0), '69.79%', '#070627' ,'100%'), url();
        // },
        Text: {
            marginBottom:40,
            width:332,
            height:46,
            textAlign:'center',
            fontSize:24, 
            color:'#fff' 
        },
        text:{
            width:332,
            height:46,
            borderBottomLeftRadius:'10px',
            borderBottomRightRadius:'10px',
            borderTopLeftRadius:'10px',
            borderTopRightRadius:'10px',
            textAlign:'center',
            fontSize:16, 
            color:'#fff',
        },
        lgn: {
            borderWidth: 1,
            padding: 25,
            borderColor: 'black'
         },
        link:{
            color:'#96DED1',
            textDecorationLine:'underline'
          
            
        }, 
        login:{
            width:189,
            height:46,
            borderRadius:40,
            backgroundColor:'#96DED1',
            alignItems:'center',
            justifyContent:'center',
        }
      
    })
    
    export default Splash