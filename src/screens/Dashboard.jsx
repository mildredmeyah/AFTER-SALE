import React, { useEffect, Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import img1 from "../../assets/pictures/appless.jpeg"
import img2 from '../../assets/pictures/bananas.webp';
import { Feather } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { getDocs, doc, collection, query, where, deleteDoc, onSnapshot } from 'firebase/firestore';
import {getStorage, ref, uploadBytes,getDownloadURL} from 'firebase/storage'

import { async } from '@firebase/util';
// import RoundBtn from './antButton';
const Dashboard = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const productsCollection = collection(db, 'productss')
    const [sumQty, setSumQty] = useState(0)
    const [sumIncome, setSumIncome] = useState(0)
    const storage = getStorage();

    
    const loadImg = async (product) =>{
        const reference = ref(storage,product.data().picture);
       await getDownloadURL(reference).then((x)=>{
           console.log(x);
       })
    } 
    const getProducts = async () => {
        const q = query(productsCollection, where('email', '==', auth.currentUser.email));
        const querySnapShots = await getDocs(q);

        let img =''
        let tmpProducts = [];
        let sumQty = 0
        let sumIncome = 0
          querySnapShots.forEach(
            (product) => {
                 loadImg(product)
               
                tmpProducts.push({ ...product.data(), id: product.id, image:img});
                console.log(tmpProducts);
                let numIncome = product.data().totIncome
                sumIncome = sumIncome + numIncome

                let numQty = product.data().quantity
                sumQty = sumQty + numQty

                console.log(sumIncome);
                console.log(sumQty);
            }
        );

        setProducts(tmpProducts);
        setSumQty(sumQty)
        setSumIncome(sumIncome)
        // console.log(tmpProducts);

    }
    useEffect(() => {

        getProducts()

    }, [])
    useEffect(() => {



    }, [])




    const calSoldQty = async () => {
        console.log("calc");
        let totalQtyItems = []
        // let sum = 0
        const unsub = onSnapshot(collection(db, "productss"),
            { includeMetadataChanges: true },
            (snapshot) => {
                snapshot.forEach((doc) => {
                    console.log(doc.data().quantSold);
                    let num = doc.data().quantSold
                }
                )
                // ...
            }

        )
        console.log(sumQty);


    }

    const renderItem = ({ item }) => (
        <Item product={item} navigation={navigation} />
    );

    const Item = ({ product, navigation }) => (
        <View style={styles.productCard}>
            <TouchableOpacity
                onPress={() => navigation.navigate('ViewProduct', { selectedProd: product })}
                style={styles.view}>
                <Feather name="eye" size={16} color="white" />
                {/* <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text> */}
            </TouchableOpacity>
            <View style={styles.imgBox}>
                <Image
                    style={{
                        flex: 1,
                        height: "100%",
                        width: "100%",
                        borderRadius: '17px',
                    }}
                    source={img1}
                />
            </View>
            <View style={styles.textBox}>
                <Text>{product.productName}</Text>
                <Text>{product.quantity}</Text>
                <Text>Profit</Text>
            </View>
        </View>
    )
    return (
        <View style={styles.container}>

            <Header title='Home' />
      

            <View style={styles.stats}>
    <Text style={{fontWeight:'bold'}}>Stats</Text>
    </View>
            <View style={styles.details}>
                <View style={styles.total}>
                    <Text style={{color:'#A09999'}}>TOTAL INCOME</Text>
       
                    <Text style={{fontWeight:'bold'}}>R {(sumIncome).toFixed(2)}</Text>
                    <View style={styles.inflation}>
        <Image source={{uri:'https://cdn-icons-png.flaticon.com/128/8345/8345465.png'}} style={{width:30, height:25}}
        />
        </View>
                    <Text style={{color:'#96DED1'}}>30%</Text>
                    <Text style={{color:'#A09999'}}>Increase From Yesterday</Text>
                </View>
                <View style={styles.stock}>
                    <Text style={{color:'#A09999'}}>STOCK AVAILABLE</Text>
                    
                    <View style={styles.infla}>
        <Image source={{uri:'https://cdn-icons-png.flaticon.com/128/2618/2618356.png'}} style={{width:30, height:30}}
/>
        </View>
                    <Text style={{fontWeight:'bold'}}>{sumQty} products remaining</Text>
                    <Text style={{color:'#A09999'}}>Need More Stock</Text>
                </View>
            </View>

            <View style={styles.results}>
                <TouchableOpacity
                onPress={() => navigation.navigate('Result')}
                ><Text style={{color:'#96DED1',textDecorationLine: 'underline' }}>See All</Text>
           </TouchableOpacity>
       </View>

        

            {/* Products View */}



            <FlatList data={products} renderItem={renderItem} keyExtractor={item => item.id} />

            {/* <View>
                <ViewAll />
            </View> */}
            <TouchableOpacity
                // onPress={() => alert('Navigate to the add product page')}
                onPress={() => navigation.navigate('AddProduct')}
                style={styles.add}>
                <Feather name="plus" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
};
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    productCard: {
        width: '90%',
        height: 122,
        backgroundColor: '#DFF1F3',
        borderRadius: '20px',
        margin: '16px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SearchBar: {
        borderRadius: '10px',
        margin: '16px',
        width: '105%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    view: {
        content: "",
        position: 'absolute',
        top: "-3px",
        right: "-1px",
        transform: [{ translate: "20%" }],
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#070627",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
    },
    place: {
        fontSize: 20,
        color: 'black',
        width: 353,
        height: 50,
        padding: 20,
        backgroundColor: '#D8D8D8',
        borderRadius: 10,
    },
    icon: {
        content: "",
        left: "-45px",
        width: "45px",
        height: "48px",
        borderRadius: "10%",
        backgroundColor: "#96DED1",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
    },
    imgBox: {
        height: 80,
        width: 90,
        backgroundColor: 'red',
        margin: 10,
        borderRadius: '17px',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    textBox: {
        display: 'flex',
        flexDirection: 'column',
        flex: 2,
        justifyContent: 'center',
    },
    add: {
        content: "",
        position: 'absolute',
        bottom: "10px",
        right: "5px",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#96DED1",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
    },
    profile: {
        content: "",
        position: 'absolute',
        top: "-5px",
        right: "-5px",
        transform: [{ translate: "10%" }],
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#070627",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    total: {
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#171717',
        boxShadow: '1px 1px 1px 1px #D9D9D9',
        marginLeft: '16px',
      paddingLeft:'16px',
        height: 110,
       width: 180,
     
    },
    stock: {
        height: 110,
        width: 160,
         marginLeft: 20,
         borderRadius: 10,
          backgroundColor: 'white',
          boxShadow: '1px 1px 1px 1px #D9D9D9',
          marginRight:'50px'
    },
    infla:{
        backgroundColor:"#C97272",
        width:'20%',
        borderRadius:40
    },
    inflation:{
        backgroundColor:"#96DED1",
        width:35,
        height:35,
        borderRadius:40
    },
    stats: {
        paddingLeft:'10px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    results:{
        left: "340px",
    
        width: "45px",
        height: "12px",
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        display: 'flex',
    }
});

export default Dashboard;