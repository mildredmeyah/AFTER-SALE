import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { FancyAlert } from 'react-native-expo-fancy-alerts';
// import { ImagePicker, launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ConfirmationPopup from "./Popup";

const SERVER_URL = 'http://localhost:19006';



const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });

    return data;
};

const AddProduct = () => {
    const [showPopup,setShowPopup] = useState(false)
    const navigation = useNavigation()
    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('')
    const [quantity, setQuantity] = useState('');
    const [costPerBulk, setCostPerBulk] = useState('');
    const [percentage, setPercentage] = useState('');
    const [email] = useState(auth.currentUser.email);
    const [picture, setPicture] = useState('');

    const [url, setUrl] = useState()
    // const [sellingPrice,setSellingPrice] = useState(0);
    // const [targetProfit, setTargetProfit] = useState(0);
    // const [profitProduct, setProfitProduct] = useState(0);

    var sellingPrice = 0
    var targetProfit = 0
    var profitProduct = 0
    var quantSold = 0;

    const [visible, setVisible] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
        calcSellingPrice(percentage, costPerBulk, quantity)
        setVisible(!visible);
    }, [visible]);

    const onRequestClose = React.useCallback(
        () => {

        }
    )

    const calcSellingPrice = async (percentage, costPerBulk, quantity) => {

        let profit = (costPerBulk * (percentage / 100)).toFixed(2)
        console.log('Profit: R' + profit);
        let totalIncome = ((parseInt(costPerBulk) + parseInt(profit))).toFixed(2);


        let sellPrice = ((totalIncome / quantity)).toFixed(2);
        console.log('Selling Price: R' + sellPrice);

        let profitPerProduct = (profit / quantity).toFixed(2);
        console.log('profit per product R' + profitPerProduct);
        sellingPrice = Number(sellPrice)
        targetProfit = Number(profit)
        profitProduct = Number(profitPerProduct)

   
    }

    const viewProduct = () =>{
        calcSellingPrice(percentage, costPerBulk, quantity).then(() =>{
            console.log(sellingPrice);
            setShowPopup(true)
        })
       
    }

    const addProductData = () => {
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
                        calcSellingPrice(percentage, costPerBulk, quantity);
                        console.log(picture);
                        const collectionRef = collection(db, "productss");

                        const Products = {
                            productName: productName,
                            costPerBulk: Number(costPerBulk),
                            quantity: Number(quantity),
                            sellingPrice: sellingPrice,
                            bulkProfit: targetProfit,
                            productProfit: profitProduct,
                            email: email,
                            profitEarned: 0.00,
                            quantSold: 0,
                            totIncome:0,
                            totalIncome: 0,
                            picture: picture,
                        };



                        addDoc(collectionRef, Products).then(() => {
                            alert("Added transaction successfully");
                            setShowPopup(false)
                            navigation.navigate('Home')
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }
            }
        }
    }

    //upload image to storage firebase
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('sorry we need camera permission to make this work')
                }
            }
        })();
    }, []);


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            const storage = getStorage();
            const ref_con = ref(storage, email + productName);
            const img = await fetch(result.uri);
            const bytes = await img.blob()

            

            await uploadBytes(ref_con, bytes).then((snapshot) => {
                setPicture(snapshot.metadata.fullPath)
                alert("succesfully added")
            })
           
        }
    }

    useEffect(() => {
            const func = async () =>{
              console.log("Fetching picture for the product");
              const storage = getStorage();
              const reference = ref(storage,picture);
              await getDownloadURL(reference).then((x)=>{
                console.log(x);
              })
            }
           if (url == undefined) {func()};
    }, [])
    return (
        <View style={styles.container}>

            <View>
                <Text style={{ marginLeft: 14 }}>Enter Product Name</Text>
                <TextInput style={styles.TextInput}
                    placeholder="Please enter your product name"
                    value={productName}
                    onChangeText={(Text) => setProductName(Text)}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <Text style={{ marginLeft: 14 }}>Enter Product Description</Text>
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
                    placeholder="Please enter the discription of your product name"
                    value={productDesc}
                    onChangeText={(Text) => setProductDesc(Text)}
                    autoCapitalize="none"
                    autoCorrect={false} />
                <Text style={{ marginLeft: 14 }}>Enter Quantity</Text>
                <TextInput style={styles.TextInput}
                    placeholder="50"
                    value={quantity}
                    onChangeText={(Number) => setQuantity(Number)}
                    autoCapitalize="none"

                    autoCorrect={false}
                />
                <Text style={{ marginLeft: 14 }}>Enter cost per Bulk</Text>
                <TextInput style={styles.TextInput}
                    placeholder="Please enter your cost for the whole package"
                    value={costPerBulk}
                    onChangeText={(Number) => setCostPerBulk(Number)}
                    autoCapitalize="none"
                    autoCorrect={false} />

                <Text style={{ marginLeft: 14 }}>Enter % you want to earn</Text>
                <TextInput style={styles.TextInput}
                    placeholder="Please enter the percentage you want to gain for the product"
                    value={[percentage]}
                    onChangeText={(Number) => setPercentage(Number)}
                    autoCapitalize="none"
                    autoCorrect={false} />
            </View>
            <TouchableOpacity
                onPress={pickImage}
                style={{
                    marginTop: 5,
                    marginLeft: 13,
                    marginBottom: 8,
                    height: 45,
                    width: 100,
                    backgroundColor: '#96DED1',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    borderRadius: 10
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Upload an Image</Text>
            </TouchableOpacity>
            <Image source={{uri:picture} }style={{height:10}}/>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                <TouchableOpacity
                    onPress={viewProduct}
                    style={styles.button}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4F4F4F' }}>Capture Product</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Home') }}
                    style={styles.buttonClear}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#fff' }}>Clear Inputs</Text>
                </TouchableOpacity>
            </View>
            <ConfirmationPopup visible={showPopup}>
                    <View>
                        <Text>
                            Your Selling Price Will Be: <span>{sellingPrice}</span>
                        </Text>
                        <Text>
                            Your Profit for This Produc will Be: <span>{targetProfit}</span>
                        </Text>   
                      
         
                    </View>
                    <TouchableOpacity onPress={addProductData} >
                        <Text> Confirm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text> ReCapture</Text>
                    </TouchableOpacity>
            </ConfirmationPopup>
            <TouchableOpacity onPress={()=>{setShowPopup(true)}}>
                        <Text>
                            confirm
                        </Text>
                    </TouchableOpacity>
            

            {/* <TouchableOpacity onPress={toggleAlert}>
                <Text>Tap me</Text>
            </TouchableOpacity> */}
        </View>
    );

}

const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
        method: 'POST',
        body: createFormData(photo, { userId: '123' }),
    })
        .then((response) => response.json())
        .then((response) => {
            console.log('response', response);
        })
        .catch((error) => {
            console.log('error', error);
        });
};

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
        marginBottom: 5,
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