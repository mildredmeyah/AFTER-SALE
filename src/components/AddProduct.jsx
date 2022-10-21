import React, {useState} from 'react';
import { Text, View, TextInput, Button } from 'react-native';

const AddProduct = ({addProduct}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

    const add = () => {
        //check if fields are empty
        if (name === '') {
            //bad
            alert('Product name is required to add product')
        } else {
            if (description === '') {
                //bad
                alert('Product Description is required to add product')
            } else {
                if (cost === '' || cost <= 0) {
                    //bad
                    alert('Product cost is required to add product')
                } else {
                    if (price === '' || price <= 0) {
                        //bad
                        alert('Product price is required to add product')
                    } else {
                        if (quantity === '' || quantity <= 0) {
                            //bad
                            alert('Product quantity is required to add product')
                        }  else {
                            //good
                            if (addProduct(name, description, Number(cost), Number(price), Number(quantity))) {
                                clearFields();
                            }
                        }
                    }
                }
            }
        }
    }

    const clearFields = () => {
        setName('');
        setDescription('');
        setCost(0);
        setPrice(0);
        setQuantity(0);
    }
  return (
    <View>
        <View>
            <Text>Name</Text>
            <TextInput onChangeText={value => setName(value)} value={name}  />
        </View>

        <View>
            <Text>Description</Text>
            <TextInput onChangeText={value => setDescription(value)} value={description} />
        </View>

        <View>
            <Text>Cost (Bulk)</Text>
            <TextInput onChangeText={value => setCost(value)} value={cost} />
        </View>

        <View>
            <Text>Price (single)</Text>
            <TextInput onChangeText={value => setPrice(value)} value={price} />
        </View>

        <View>
            <Text>Quantity</Text>
            <TextInput onChangeText={value => setQuantity(value)} value={quantity} />
        </View>
        <Button title='Add Product' onPress={add} />
    </View>
  )
}

export default AddProduct