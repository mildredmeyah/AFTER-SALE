import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const Header = ({title}) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.profile}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            >
            <Feather name="user" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      padding: 15,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#96DED1'
    },
    profile:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    text:{
      fontWeight: 'bold',
      fontSize: 20,
    }
})

export default Header