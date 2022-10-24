import React, { useEffect, Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image,FlatList } from 'react-native';
import Header from '../components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import img1 from "../../assets/pictures/appless.jpeg"
import img2 from '../../assets/pictures/bananas.webp';
import { Feather } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import AddProduct from '../components/AddProduct';
import ViewAll from '../components/view';
import { auth, db } from '../config/firebase';
import { getDocs, doc, collection, query, where, deleteDoc } from 'firebase/firestore';
// import RoundBtn from './antButton';
const Dashboard = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const productsCollection = collection(db, 'productss')

    const getProducts = async() =>{
        const q = query(productsCollection, where('email', '==', auth.currentUser.email));
        const querySnapShots = await getDocs(q);
    
        let tmpProducts = [];
    
        querySnapShots.forEach(
        (product) => {
          tmpProducts.push({...product.data(), id: product.id});
        }
        );
    
        setProducts(tmpProducts);
    }
    useEffect(()=>{
        // console.log( auth.currentUser.email);
        getProducts();
      },[])
      
  const renderItem = ({item}) => (
    <Item product={item} navigation={navigation} />
  );

  const Item = ({product, navigation}) =>(
    <View style={styles.productCard}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('viewProduct',{selectedProd:product})}
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
            <View style={styles.profile}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ProfileScreen')}
                    style={styles.profile}>
                    <Feather name="user" size={16} color="white" />
                </TouchableOpacity>
            </View>
            <br></br>
            <br></br>
            <br></br>
            <View style={styles.stats}>
                <Text >Stats</Text>
                <TouchableOpacity
                    // onPress={() => alert('Navigate to the view all products')}
                    onPress={() => navigation.navigate('Result')}
                ><Text style={{ color: '#96DED1', textDecorationLine: 'underline' }}>see all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.details}>
                <View style={styles.total}>
                    <Text>TOTAL INCOME</Text>
                    <Text>R1400</Text>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5116/5116338.png' }} style={{ width: 30, height: 30 }}
                    />
                    <Text>30% Increase From Last Month</Text>
                </View>
                <View style={styles.stock}>
                    <Text>STOCK</Text>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/128/7125/7125797.png' }} style={{ width: 30, height: 30 }}
                    />
                    <Text>R3</Text>
                    <Text>Need More Stock</Text>
                </View>
            </View>
            <View style={styles.SearchBar}>
                <TextInput placeholder="search here" style={{ width: 353, height: 50, backgroundColor: '#D8D8D8', borderRadius: 10, padding: 10 }} />
                <TouchableOpacity style={styles.icon}>
                    <Feather name="search" size={20} color="black" />
                    {/* <Text style={{ fontSize: 20, color: '#fff' }}>Pick a photo</Text> */}
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
        bottom: "-3px",
        right: "-1px",
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
        boxShadow: '4px 4px 4px 4px gray',
        margin: '16px',
        //   shadowOffset: {width: 5, height: 4},
        //   shadowOpacity: 0.2,
        //   shadowRadius: 3,
        //   justifyContent:'center',
    },
    stock: {
        height: 110,
        width: 130,
        marginLeft: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '4px 4px 4px 4px gray',
        margin: '16px',
    },
    stats: {
        margin: '16px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default Dashboard;