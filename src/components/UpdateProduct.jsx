//import liraries
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../config/firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";

// create a component
const UpdateProduct = ({route, navigation }) => {
    const { selectedProd } = route.params;

  useEffect(()=>{
    console.log( selectedProd);
  },[])
    // const navigation = useNavigation()
    const [updateQuantity, setUpdateQuantity] = useState(0);

    //let profit = product.profitEarned

    const calProfitEarned =async () => {
    
      
        if(updateQuantity === '' || updateQuantity < 0) {
            alert("Please insert a product name");

        }else{
            let newQty = selectedProd.quantity - updateQuantity;
            if(newQty < 0){
                alert('Quantity cannot be less than 0')
                newQty = selectedProd.quantity
            } else{
                console.log(newQty);
                console.log('Check: ' +updateQuantity);
                console.log('Check: ' +selectedProd.quantSold);
    
                // selectedProd.quantity = update;
                
                let newProfitEarned = selectedProd.profitEarned + (updateQuantity * selectedProd.productProfit);
                let sold = Number(selectedProd.quantSold) + Number(updateQuantity)
                const collectionRef=doc(db,"productss", selectedProd.id);
    
                await updateDoc(collectionRef, {
                    quantity:newQty,
                    profitEarned:newProfitEarned,
                    quantSold: sold,
                }    )
    
                  alert("Added transaction successfully");
                  if(newQty < 15){
                    alert('You have only '+ newQty + ' ' + selectedProd.productName + ' left. You need to buy and create a new product of ' + selectedProd.productName)
                  }
                  if(newQty == 0){
                    alert('You need to delete this product')
                    await deleteDoc(doc(db, "productss", selectedProd.id));
                  }
                     navigation.navigate('Home')
            }
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
                onPress={calProfitEarned}
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
