import React, {useState, useEffect} from 'react';
import { SafeAreaView, FlatList, View, Text, Button,StyleSheet,TouchableOpacity } from 'react-native';
import { auth, db } from '../config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

const ViewProduct = ({route, navigation }) => {
  const { selectedProd } = route.params;

  useEffect(()=>{
    console.log( selectedProd);
  },[])
   
  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
        <View style={styles.container}>
            <View>
                <View>
                    <Text>R {selectedProd.profitEarned}  /  R {selectedProd.bulkProfit}</Text>
                </View>
                <View style={{backgroundColor: '#A09999', height: 42, width: 321}}>
                    <Text style={{color: '#fff', fontSize: 24, marginLeft: 10}}>{selectedProd.productName}</Text>
                </View>
                <View style={{backgroundColor: '#D6F8FF', height: 181, width: 321}}>
                    <Text style={{color: '#191919', fontSize: 12}}>{selectedProd.desc}</Text>
                    <Text style={{color: '#191919', fontSize: 12}}>{selectedProd.quantity}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#9FD1FF', height: 44, width: 321}}>
                    <View>
                    <Text style={{color: '#191919', fontSize: 12, marginRight: 70}}>Cost/Single: {selectedProd.sellingPrice}</Text>
                    </View>
                    <View>
                    <Text style={{color: '#191919', fontSize: 12, marginLeft: 70}}>Cost/Bulk: {selectedProd.costPerBulk}</Text>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{backgroundColor: '#B4C9FF', height: 129, width: 163}}>
                    <Text style={{color: '#191919', fontSize: 14, alignSelf: 'center'}}>Quantity</Text>
                    <Text style={{color: '#191919', fontSize: 76, alignSelf: 'center'}}>{selectedProd.quantity}</Text>
                    </View>
                    <View style={{backgroundColor: '#E6DBFF', height: 129, width: 158}}>
                    <Text style={{color: '#191919', fontSize: 14, alignSelf: 'center'}}>Selling Price</Text>
                    <Text style={{color: '#191919', fontSize: 48, alignSelf: 'center'}}>{selectedProd.sellingPrice}</Text>
                    </View>
                </View>
            </View>
            <View style={{flex: 1,height: 72, width: 321}}>
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Update',{selectedProd:selectedProd})}}
                style={styles.buttonEdit}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#4F4F4F'}}>Edit Product</Text>
            </TouchableOpacity>
            {/* <RoundBtn antIconName='delete' style={{backgroundColor: 'red', marginBottom: 15}} onPress={DeleteAlert} /> */}
            {/* <TouchableOpacity
                onPress={DeleteAlert}
                style={styles.buttonDelete}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>Delete</Text>
            </TouchableOpacity> */}
            </View>
            </View>
        </View>
        </SafeAreaView>
  )
}

export default ViewProduct;

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
      borderRadius: 20,
  },
  buttonEdit: {
      marginTop: 15,
      height: 45,
      width: 100,
      backgroundColor: '#96DED1',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'center',
      marginLeft: 30,
      fontWeight: 'bold',
      borderRadius: 10,
  },
  buttonDelete: {
    marginTop: 15,
    marginLeft: 40,
    height: 40,
    width: 100,
    backgroundColor: '#CAC9C9',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    borderRadius: 10,
  },
})