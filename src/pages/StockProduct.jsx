import React, {useState} from 'react'
import { View, Text, Button } from 'react-native'
import InputGroup from './components/InputGroup'

const StockProduct = ({product}) => {

    const [cost, setCost] = useState(0);
    const [quantity, setQuantity] = useState(0);
  return (
    <View>
        <View>
            <Text>Product Id</Text>
            <Text>{product.id}</Text>
        </View>
        <View>
            <InputGroup text='Cost' setStateMethod={setCost} newValue={cost}/>
            <InputGroup text='Quantity' setStateMethod={setQuantity} newValue={quantity} />
        </View>
        <View>
            <Button title='Make Stock' />
        </View>
    </View>
  )
}

export default StockProduct