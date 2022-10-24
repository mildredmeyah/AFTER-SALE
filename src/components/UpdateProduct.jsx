//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";

// create a component
const UpdateProduct = ({route, navigation }) => {
    const { selectedProd } = route.params;

//   useEffect(()=>{
//     console.log( selectedProd);
//   },[])
    //const navigation = useNavigation()
    const [updateQuantity, setUpdateQuantity] = useState(0);

    //let profit = product.profitEarned

    const calcSellingPrice = () => {
    
        let update = selectedProd.quantity - updateQuantity;

        selectedProd.quantity = update;

        selectedProd.profitEarned = selectedProd.profitEarned + (updateQuantity * selectedProd.productProfit);
    } 
    
    const addProduct = () => {
        if(updateQuantity === '' || updateQuantity < 0) {
            alert("Please insert a product name");
            //don't allow
        } else {
            calcSellingPrice();
             const collectionRef=collection(db,"productss");

             const Products={
                 quantity: update,
                 profitEarned:selectedProd.profitEarned
             };

            
             addDoc(collectionRef, Products).then(()=>{
                 alert("Added transaction successfully");
                 ClearAll();
                 navigation.navigate('Home')
             }).catch((err)=>{
                 console.log(err);
             })
         }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.TextInput}
                placeholder= "Update Quantity"
                value={updateQuantity}
                onChangeText={(Number) => setUpdateQuantity(Number)}
                autoCapitalize= "none"
                
                autoCorrect={false}
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
            <TouchableOpacity
                onPress={addProduct}
                style={styles.button}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#4F4F4F'}}>Update Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Home')}}
                style={styles.buttonClear}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>Clear Inputs</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 580,
        width: 340,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 140,
        marginBottom: 150,
        alignSelf: 'center',
        backgroundColor: '#DFF1F3',
        borderRadius: 20,
    },
    TextInput: {
        width: 200,
        height: 30,
        margin: 12,
        fontSize: 11,
        borderBottomWidth: 1,
        borderColor: '#96DED1',
        color: '#A09999',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlign: 'left',
        borderWidth: 1,
        borderRadius: 4,
    },
    button: {
        marginTop: 5,
        height: 45,
        width: 100,
        backgroundColor: '#96DED1',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 10,
    },
    buttonClear: {
      marginTop: 5,
      marginLeft: 10,
      height: 45,
      width: 80,
      backgroundColor: '#CAC9C9',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      borderRadius: 10,
    },
})

//make this component available to the app
export default UpdateProduct;
