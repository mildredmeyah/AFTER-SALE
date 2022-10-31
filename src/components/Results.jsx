/*/import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { auth, db } from '../config/firebase';
import { getDocs, collection, query, where, } from 'firebase/firestore';

// create a component
const Results = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const productsCollection = collection(db, 'productss')
    const [sumQty,setSumQty] = useState(0)      //Total quantity sold from all the products
    const [sumIncome,setSumIncome] = useState(0) //Total income from all the products
    const [qtyRemain, setQtyRemain] = useState(0) //Total number of quantity remaining from all the products 
    const [profitGained, setProfitGained] = useState(0) //Total profit gained from all the products 

    const getProducts = async() =>{
        const q = query(productsCollection, where('email', '==', auth.currentUser.email));
        const querySnapShots = await getDocs(q);
        
  
        let tmpProducts = [];
        let sumQty = 0
        let sumIncome = 0
        let sumRemain = 0
        let sumProfit = 0
        querySnapShots.forEach(
        (product) => {
          tmpProducts.push({...product.data(), id: product.id});
         
          let numIncome = product.data().totIncome    
          sumIncome = sumIncome + numIncome

          let numProfit = product.data().profitEarned    
          sumProfit = sumProfit + numProfit

          let numRemain = product.data().quantity    
          sumRemain = sumRemain + numRemain
          
          let numQty = product.data().quantSold
          sumQty = sumQty + numQty
         
          console.log(sumIncome);
          console.log(sumQty);
          console.log(sumRemain);
          console.log(sumProfit);
        }
        );
    
        setProducts(tmpProducts);
        setSumQty(sumQty)
        setSumIncome(sumIncome)
        setQtyRemain(sumRemain)
        setProfitGained(sumProfit)
        // console.log(tmpProducts);

    }
    useEffect(()=>{
      
        getProducts()
        
      },[])
    return (
        <View style={styles.container}>
            <Text>Total Quantity sold:  {sumQty}</Text>
            <Text>Total Profit gained is: R{(profitGained).toFixed(2)}</Text>
            <Text>Total Quantity remaining:  {qtyRemain}</Text>
            <Text>Total income is: R{sumIncome}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Results;*/





//=================================================================================



import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import { StyleSheet, Text, View, Dimensions, Button,TouchableOpacity,  SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import CrisisAlertSharpIcon from '@mui/icons-material/CrisisAlertSharp';
import UpdateSharpIcon from '@mui/icons-material/UpdateSharp';
import AutorenewSharpIcon from '@mui/icons-material/AutorenewSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { getDocs, collection, query, where, } from 'firebase/firestore';


export default function Results() {
    const [products, setProducts] = useState([]);
    const productsCollection = collection(db, 'productss')
    const [sumQty,setSumQty] = useState(0)      //Total quantity sold from all the products
    const [sumIncome,setSumIncome] = useState(0) //Total income from all the products
    const [qtyRemain, setQtyRemain] = useState(0) //Total number of quantity remaining from all the products 
    const [profitGained, setProfitGained] = useState(0) //Total profit gained from all the products 

    const getProducts = async() =>{
        const q = query(productsCollection, where('email', '==', auth.currentUser.email));
        const querySnapShots = await getDocs(q);
        
  
        let tmpProducts = [];
        let sumQty = 0
        let sumIncome = 0
        let sumRemain = 0
        let sumProfit = 0
        querySnapShots.forEach(
        (product) => {
          tmpProducts.push({...product.data(), id: product.id});
         
          let numIncome = product.data().totIncome    
          sumIncome = sumIncome + numIncome

          let numProfit = product.data().profitEarned    
          sumProfit = sumProfit + numProfit

          let numRemain = product.data().quantity    
          sumRemain = sumRemain + numRemain
          
          let numQty = product.data().quantSold
          sumQty = sumQty + numQty
         
          console.log(sumIncome);
          console.log(sumQty);
          console.log(sumRemain);
          console.log(sumProfit);
        }
        );
    
        setProducts(tmpProducts);
        setSumQty(sumQty)
        setSumIncome(sumIncome)
        setQtyRemain(sumRemain)
        setProfitGained(sumProfit)
        // console.log(tmpProducts);

    }
    useEffect(()=>{
      
        getProducts()
        
      },[])
  return (
        <View style={styles.container}>
          <View >
                    <View style={styles.para}>
                    <Text style={{fontSize: 20,fontFamily:'bold', }} >The results of all products
                        entered for sale</Text>
                    </View>
                    <View >
                    <Text style={styles.spa}></Text>
                    </View>
                    <View style={styles.yey}>
                    <View>
                      <View style={{backgroundColor: '#96DED1', height: 150, width: 175,marginRight: 15,borderRadius:30,}}>
                        <TouchableOpacity>
                        <AttachMoneySharpIcon size="large"style={{paddingTop:15,opacity:0.7 }} />
                        </TouchableOpacity>
                      <Text style={{color: '#191919', fontSize: 20, alignSelf: 'center', fontFamily:'bold', paddingTop:20,opacity:0.7 }}>Total Profit</Text>
                      <Text style={{color: '#191919', fontSize: 25, alignSelf: 'center',fontFamily:'bold'}}>R{(profitGained).toFixed(2)}</Text>
                      </View>
                      <View style={{paddingTop:20}}>
                      <View style={{backgroundColor: '#D6F8FF', height: 150, width: 175,marginRight: 15,borderRadius:30,  alignSelf: 'center',}}>
                        <TouchableOpacity>
                        <AddReactionIcon size="large"style={{paddingTop:15,opacity:0.7 }} />
                        </TouchableOpacity>
                      <Text style={{color: '#191919', fontSize: 20, alignSelf: 'center', fontFamily:'bold', paddingTop:20,opacity:0.7}}>Total Income</Text>
                      <Text style={{color: '#191919', fontSize: 25, alignSelf: 'center',fontFamily:'bold'}}>R{sumIncome}</Text>
                      </View>
                      </View>
                    </View>
                    <View style={styles.pl}>
                    <View style={{backgroundColor: '#B4C9FF', height: 150, width: 175,borderRadius:30,}}>
                    <TouchableOpacity>
                    <CrisisAlertSharpIcon size="large"style={{paddingTop:15,opacity:0.7 }} />
                      </TouchableOpacity>
                    <Text style={{color: '#191919', fontSize: 20, alignSelf: 'center', fontFamily:'bold', paddingTop:20,opacity:0.7}}>Total Remainig Quantity</Text>
                    <Text style={{color: '#191919', fontSize: 25, alignSelf: 'center',fontFamily:'bold'}}>{qtyRemain}</Text>
                    </View>
                    <View style={{paddingTop:20}}>
                    <View style={{backgroundColor: '#E6DBFF', height: 150, width: 175, paddingTop:15,borderRadius:30,}}>
                    <TouchableOpacity>
                    <UpdateSharpIcon size="large"style={{paddingTop:15,opacity:0.7 }} />
                      </TouchableOpacity>
                    <Text style={{color: '#191919', fontSize: 20, alignSelf: 'center', fontFamily:'bold', paddingTop:25,opacity:0.7}}>Total Sold Quantity</Text>
                    <Text style={{color: '#191919', fontSize: 25, alignSelf: 'center',fontFamily:'bold'}}>{sumQty}</Text>
                    </View>
                    </View>
                    </View>
                    </View>
          </View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height:1000,
    paddingTop:100,
  },
  hed:{
    backgroundColor:'#96DED1',
  },
  para:{
    backgroundColor: '#D6F8FF',
    height: 70,
    width:409,
    marginLeft:12,
    alignItems: 'center',
    justifyContent: 'center',
     alignSelf: 'center',
  },
  Graph:{
    marginTop: 20,
    width:361,
    height:207,
  },
  period:{
    marginTop: 20,
  },
  spa:{
    backgroundColor: '#9FD1FF',
    width: 409,
    height: 30,
    marginLeft:10,
    alignSelf: 'center',
  },
  p:{
    width:205,
    height: 100,
    backgroundColor:'#B4C9FF',
    alignSelf:'center',
    fontSize:25,
    marginLeft:30,
  },
  l:{
    width: 204,
    height: 100,
    backgroundColor:'#E6DBFF',
    fontSize:25,
    fontFamily:'bold',
    backgroundColor:'#E6DBFF',
    fontFamily:'bold',
    paddingTop:15,
  },
  pl:{
    marginLeft:30,
    alignSelf: 'center',
  },
  trans:{
    alignSelf: 'center',
    flexDirection:"row",
    paddingTop:20,
  },
  yey:{
    alignSelf: 'center',
    flexDirection:"row",
    paddingTop:30,
  },
});
