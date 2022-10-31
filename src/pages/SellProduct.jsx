import React, { useState} from 'react';
import { View, Text, Button } from 'react-native';
import InputGroup from './components/InputGroup';

const SellProduct = ({productId, price}) => {
    const [quantity, setQuantity] = useState(0);
  return (
    <View>
        <View>
            <Text>Product Id</Text>
            <Text>{productId}</Text>
            <Text>{price}</Text>
        </View>
        <View>
            <InputGroup text='Quantity' setStateMethod={setQuantity} newValue={quantity} />
        </View>
        <View>
            <Button title='Sell Product' />
        </View>
    </View>
  )
}

export default SellProduct