import React from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';


const Item = ({name, quantity}) => (
    <View>
        <Text>{name}</Text>
        <Text>{quantity}</Text>
    </View>
)

const Products = ({items}) => {

    const renderItem = ({item}) => (
        <Item name={item.name} quantity={item.quantity} />
    );

  return (
        
        <SafeAreaView>
            <FlatList data={items} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
        
  )
}

export default Products