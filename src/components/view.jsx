//import liraries
import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, View, Text, Button, Alert, TouchableOpacity, } from 'react-native';
import { auth, db } from '../config/firebase';
import { getDocs, doc, collection, query, where, deleteDoc } from 'firebase/firestore';
// import RoundBtn from './antButton';



// create a component



  

const ViewAll = ({ navigation }) => {

  const [products, setProducts] = useState([]);


    const DeleteAlert = ({product}) => {
      Alert.alert(
        'Are You Sure!',
        'This option will delete your product permanantly',
        [
        {
            text: 'Delete',
            onPress: ()  => {
              deleteDoc(doc(db, "cities", "DC"));
            }
        },
        {
            text: 'Cancel',
            onPress: () => console.log('Dont Delete')
        },
        ],
        {
            cancelable: true,
        })
        
      alert('This is shit')
    }
    
    const Item = ({product, navigation}) =>
      (
        
      
          <View>
              <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text>{product.productName + ' ' + product.quantity}</Text>
                <View style={{display: 'flex', flexDirection: 'row', marginRight: '10%'}}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Edit')}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, color: '#96DED1'}}>Edit</Text>
                </TouchableOpacity>
                  {/* <RoundBtn antIconName='delete' style={{backgroundColor: 'red', marginBottom: 15}} onPress={DeleteAlert} /> */}
                  <Button title='Sell' onPress={()=>alert('The id for '+product.productName+' is '+product.id)} />
                </View>
              </View>
          </View>
        )

   

  const productsCollection = collection(db, 'productss')
  //function to fill the products

  const getProducts = async() => {
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

  const renderItem = ({item}) => (
    <Item product={item} navigation={navigation} />
  );

  useEffect(()=>{
    getProducts();
  },[])

  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={renderItem} keyExtractor={item => item.id} />
    </SafeAreaView>
  )
};

// define your styles



//make this component available to the app
export default ViewAll;
