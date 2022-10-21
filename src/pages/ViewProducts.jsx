import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, View, Text, Button } from 'react-native';
import { auth, db } from '../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

const Item = ({product, navigation}) => (

  <View>
      <View>
        <Text>{product.name + ' ' + product.quantity}</Text>
      </View>
      <View>
        <Button title='Edit' />
        <Button title='Stock' onPress={()=>navigation.navigate('StockProduct')} />
        <Button title='Sell' onPress={()=>navigation.navigate('SellProduct')} />
      </View>
  </View>
)



const ViewProducts = ({navigation}) => {

  const [products, setProducts] = useState([]);

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
}

export default ViewProducts