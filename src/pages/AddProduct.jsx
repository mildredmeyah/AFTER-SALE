import React, {useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import InputGroup from './components/InputGroup';

import { db, auth } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';

const AddProduct = ({navigation}) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    //error message state
    const [err, setErr] = useState('');

    //products ref table
    const productCollection = collection(db, 'productss');

    //fucntion to add a new product
    const addProduct = () => {
        //validation
        //check empty fields
        if (name === '') {
          //bad
          setErr('Name of the product is required');
        } else {
          
          if (price <= 0 || price === NaN) {
            //bad
            setErr('Product price must be greater than 0')
          } else {
            let newProduct = {name: name, description: description, price: Number(price), quantity: 0, email: auth.currentUser.email};
            addDoc(productCollection, newProduct).then(
              () => {
                alert(name + ' successfully added to database');
                clearAll();
                navigation.navigate('ViewProducts');
              }
            ).catch(
              error => {
                setErr(error.message);
              }
            )
          }
        }
    }

    //function to clear all fields
    const clearAll = () => {
      setName('');
      setDescription('');
      setPrice(0);
      setErr('');
    }
  return (
    <View>
        <Text>Add new product</Text>
        <View>{err}</View>
        <View>
            <InputGroup text='Product Name:' set={setName} newValue={name}  />
            <InputGroup text='Product Description:' set={setDescription} newValue={description}  />
            <InputGroup text='Product Price:' set={setPrice} newValue={price} />
        </View>
        <View>
            <Button title='Add Product' onPress={addProduct} />
        </View>
    </View>
  )
}

export default AddProduct