import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { FancyAlert } from 'react-native-expo-fancy-alerts';



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

    var sellingPrice = 0
    var targetProfit = 0
    var profitProduct = 0

    const [visible, setVisible] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
        calcSellingPrice(percentage,costPerBulk,quantity)
        setVisible(!visible);
    }, [visible]);

    const onRequestClose = React.useCallback(
        () =>{
            
        }
    )

    const calcSellingPrice = (percentage, costPerBulk, quantity) => {

        let profit = (costPerBulk * (percentage / 100)).toFixed(2)
        console.log('Profit: R' +profit);
        let totalIncome = ((parseInt(costPerBulk) + parseInt(profit))).toFixed(2);
        console.log('Total income: R' + totalIncome);

        let sellPrice = ((totalIncome / quantity)).toFixed(2);
        console.log('Selling Price: R' + sellPrice);

        let profitPerProduct = (profit / quantity).toFixed(2);
        console.log('profit per product R' + profitPerProduct);
        sellingPrice = sellPrice
        targetProfit = profit
        profitProduct = profitPerProduct
    }

    const addProduct = async () => {
        if (productName === '') {
            alert("Please insert a product name");
            //don't allow
        } else {
            if (quantity === '') {
                //don't allow
            } else {
                if (costPerBulk === '' || costPerBulk < 1) {
                    alert("Please insert a Selling price of more than 1");
                    //don't allow
                } else {
                    if (quantity === '' || quantity < 1) {
                        alert("Please insert a quantity of 1 or more");
                        //don't allow
                    } else if (percentage === '') {
                        alert("Please insert a percentage");
                        //don't allow
                    } else {
                        await calcSellingPrice(percentage, costPerBulk, quantity);
                        const collectionRef = collection(db, "productss");

                        const Products = {
                            productName: productName,
                            costPerBulk: costPerBulk,
                            quantity: quantity,
                            sellingPrice: sellingPrice,
                            bulkProfit: targetProfit,
                            productProfit: profitProduct,
                            email: email,
                            profitEarned: 0.00
                        };


                        addDoc(collectionRef, Products).then(() => {
                            alert("Added transaction successfully");
                            ClearAll();
                            navigation.navigate('Home')
                        }).catch((err) => {
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
                    placeholder="Enter product name"
                    value={productName}
                    onChangeText={(Text) => setProductName(Text)}
                    autoCapitalize="none"
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
                    placeholder="Enter product description"
                    value={productDesc}
                    onChangeText={(Text) => setProductDesc(Text)}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <TextInput style={styles.TextInput}
                    placeholder="Quantity"
                    value={quantity}
                    onChangeText={(Number) => setQuantity(Number)}
                    autoCapitalize="none"

                    autoCorrect={false}
                />
                <TextInput style={styles.TextInput}
                    placeholder="Enter cost per bulk"
                    value={costPerBulk}
                    onChangeText={(Number) => setCostPerBulk(Number)}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <Text style={{ marginLeft: 14 }}>Enter % you want to earn</Text>
                <TextInput style={styles.TextInput}
                    placeholder="Percentage"
                    value={[percentage]}
                    onChangeText={(Number) => setPercentage(Number)}
                    autoCapitalize="none"
                    autoCorrect={false} />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                <TouchableOpacity
                    onPress={addProduct}
                    style={styles.button}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4F4F4F' }}>Capture Product</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Home') }}
                    style={styles.buttonClear}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Clear Inputs</Text>
                </TouchableOpacity>
            </View>

            <FancyAlert
                visible={visible}
                icon={<View style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#7EE0D1',
                    borderRadius: 50,
                    width: '100%',
                }}><Text>AS</Text></View>}
                style={{ backgroundColor: 'white' }}

            >
                <Text style={styles.contentText}>Your profit will Be <span>{profitProduct}</span></Text>
                <Text style={styles.contentText}>Your selling price per product will Be <span>{sellingPrice}</span></Text>

                <View style={styles.btns}>
                    <TouchableOpacity style={styles.btn} onPress={() => { console.log('save'); }}>
                        <Text style={styles.btnText}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} >
                        <Text style={styles.btnText}>recapture</Text>
                    </TouchableOpacity>
                </View>

            </FancyAlert>

            {/* <TouchableOpacity onPress={toggleAlert}>
                <Text>Tap me</Text>
            </TouchableOpacity> */}
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
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -16,
        marginBottom: 16,
    },
    contentText: {
        textAlign: 'center',
    },
    btn: {
        borderRadius: 32,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',

        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
        // alignSelf: 'stretch',
        backgroundColor: '#7EE0D1',
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 6,
        minWidth: '30%',
        paddingHorizontal: 16,
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        // marginRight: 10,
        justifyContent: 'space-between'
    },
    btnText: {
        color: '#FFFFFF',
    },
})