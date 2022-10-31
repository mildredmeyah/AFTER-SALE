import React from 'react'
import { View, Button } from 'react-native'

const Home = ({navigation}) => {
  return (
    <View>
        <View>
            <Button title='Add Product' onPress={()=> navigation.navigate('AddProduct')} />
            <Button title='View Products' onPress={()=> navigation.navigate('viewProduct')} />
            <Button title='Results' onPress={()=> navigation.navigate('Results')} />
        </View>
    </View>
  )
}

export default Home