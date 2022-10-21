import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const InputGroup = ({text, set, newValue}) => {
  return (
    <View>
        <Text>{text}</Text>
        <TextInput onChangeText={value => set(value)} value={newValue} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
})

export default InputGroup