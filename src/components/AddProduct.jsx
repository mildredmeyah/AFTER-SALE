import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";



const AddProduct = () => {
    const navigation = useNavigation()
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('')
    const [quantity, setQuantity] = useState(0);
    const [costPerBulk, setCostPerBulk] = useState(0);
    const [percentage, setPercentage] = useState(0);
    const [email] = useState(auth.currentUser.email);
    // const [sellingPrice,setSellingPrice] = useState(0);
    // const [targetProfit, setTargetProfit] = useState(0);
    // const [profitProduct, setProfitProduct] = useState(0);

    var sellingPrice =0
    var targetProfit =0
    var profitProduct =0

    const calcSellingPrice = (percentage,costPerBulk,quantity) => {
    
        let profit = costPerBulk * (percentage/100)
        console.log(profit);
        let totalIncome = (parseInt(costPerBulk) +parseInt( profit));
        console.log(totalIncome);
        
         let sellPrice = (totalIncome/quantity);
        console.log(sellPrice);

        let profitPerProduct = profit / quantity;
        console.log(profitPerProduct);
            sellingPrice =sellPrice
     targetProfit =profit
     profitProduct =profitPerProduct
    }  

    const addProduct = async() => {
        if(productName === '') {
            alert("Please insert a product name");
            //don't allow
        } else {
            if(quantity === '') {
                //don't allow
            } else {
                if(costPerBulk === '' || costPerBulk < 1) {
                    alert("Please insert a Selling price of more than 1");
                    //don't allow
                } else {
                    if(quantity === '' || quantity < 1) {
                        alert("Please insert a quantity of 1 or more");
                        //don't allow
                    } else if(percentage === '') {
                        alert("Please insert a percentage");
                        //don't allow
                    } else {
                       await calcSellingPrice(percentage,costPerBulk,quantity);
                        const collectionRef=collection(db,"productss");

                        const Products={
                            productName:productName,
                            costPerBulk:costPerBulk,
                            quantity: quantity,
                            sellingPrice: sellingPrice,
                            bulkProfit: targetProfit,
                            productProfit: profitProduct,
                            email: email,
                            profitEarned:0
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
            }
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.TextInput}
                placeholder= "Enter product name"
                value={productName}
                onChangeText={(Text) => setProductName(Text)}
                autoCapitalize= "none"
                autoCorrect={false} />
                <TextInput style={{
                    height: 90,
                    width: 200,
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
                }}
                placeholder= "Enter product description"
                value={productDesc}
                onChangeText={(Text) => setProductDesc(Text)}
                autoCapitalize= "none"
                autoCorrect={false} />
                <TextInput style={styles.TextInput}
                placeholder= "Quantity"
                value={quantity}
                onChangeText={(Number) => setQuantity(Number)}
                autoCapitalize= "none"
                
                autoCorrect={false}
                />
                <TextInput style={styles.TextInput}
                placeholder= "Enter cost per bulk"
                value={costPerBulk}
                onChangeText={(Number) => setCostPerBulk(Number)}
                autoCapitalize= "none"
                autoCorrect={false} />
                <Text style={{marginLeft: 14}}>Enter % you want to earn</Text>
                <TextInput style={styles.TextInput}
                placeholder= "Percentage"
                value={[percentage]}
                onChangeText={(Number) => setPercentage(Number)}
                autoCapitalize= "none"
                autoCorrect={false} />
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10}}>
            <TouchableOpacity
                onPress={addProduct}
                style={styles.button}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#4F4F4F'}}>Capture Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Home')}}
                style={styles.buttonClear}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>Clear Inputs</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}
export default AddProduct
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