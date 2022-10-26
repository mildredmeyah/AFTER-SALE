import React, {useState,useEffect} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity, Platform } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { getDocs, collection, query, where } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import {getStorage, ref, uploadBytes,getDownloadURL} from 'firebase/storage'

const ProfileScreen = ({navigation }) => {
    const [url, setUrl] = useState()

      //upload image to storage firebase
  useEffect (() =>{
    (async()=>{
      if (Platform.OS !== 'web'){
        const {status } = await ImagePicker.requestCameraPermissionsAsync();
        if(status !== 'granted'){
          alert('sorry we need camera permission to make this work')
        }
      }
    })();
    },[]);
    const pickImage = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      if(!result.cancelled){
    const storage = getStorage();
    const ref_con = ref(storage,'image.jpg');
    const ref_ = ref(storage, new Date().toISOString())
    const img = await fetch(result.uri);
    const bytes = await img.blob()
    await uploadBytes (ref_,bytes)
   alert("succesfully added")
      }
    }
    // fetching image from cloud firestore
    useEffect(()=>{
      const func = async () =>{
        const storage = getStorage();
        const reference = ref(storage,'/reception.jpg');
        await getDownloadURL(reference).then((x)=>{
          setUrl(x)
        })
      }
     if (url == undefined) {func()};
    },[])
  //states for user email
  const [email, setEmail] = useState('');

  const [profile, setProfile] = useState({});
  const productsCollection = collection(db, 'profiles')

    const getProfile = async() =>{
        const q = query(productsCollection, where('email', '==', auth.currentUser.email));
        const querySnapShots = await getDocs(q);
    
        let tmpProfile = [];
    
        querySnapShots.forEach(
        (profile) => {
            console.log(profile.data());
        //   tmpProfile.push({...profile.data(), id: profile.id});
          tmpProfile = profile.data();
          console.log(tmpProfile);
        }
        );
    
        setProfile(tmpProfile);
    }
    useEffect(()=>{
        // console.log( auth.currentUser.email);
        getProfile();
      },[])
      //=================================================================================================
  useEffect(()=>{
    if (auth.currentUser) {
      setEmail(auth.currentUser.email);
    } else {
      navigation.navigate('Login');
    }
  }, []);
  const logout = async() => {
    await signOut(auth).then(
      ()=> {
        navigation.navigate('Splash');
      }
    )
  }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                </View> */}
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        {/* <Image source={require("../../assets/splash.webp")} style={styles.image} ></Image> */}
                        <Image source={{uri:url}} style={styles.image} />
                    </View>
                    {/* <View style={styles.active}></View> */}
                    <TouchableOpacity>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{profile.name}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}> owner</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24,justifyContent:'space-between' }]}>Email Address</Text>
                        <Text style={[styles.text, styles.subText]}>{email}</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1}]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>Address</Text>
                        <Text style={[styles.text, styles.subText]}>{profile.address}</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>Contact</Text>
                        <Text style={[styles.text, styles.subText]}>{profile.contact}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
{/* <TouchableOpacity>
                        <View style={styles.fruitImageContainer}>
                            <Image source={require("../../assets/pictures/appless.jpeg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View style={styles.fruitImageContainer}>
                            <Image source={require("../../assets/pictures/veges.jpeg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        </TouchableOpacity> */}
                    </ScrollView>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Im selling <Text style={{ fontWeight: "400" }}>Fruits</Text> and <Text style={{ fontWeight: "400" }}>Vegetables</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started being <Text style={{ fontWeight: "400" }}>street vendor</Text>
                                <br></br>
                                <Text style={{ fontWeight: "400" }}>around 2019</Text>
                            </Text>
                            <br></br>
                            <View>
                            <TouchableOpacity style={styles.logout} color='#96DED1' onPress={logout} >
                <Text style={{color:'black'}}>LOGOUT</Text>
            </TouchableOpacity>
            <br></br>
            <TouchableOpacity style={styles.cancel} color='#96DED1'  >
                <Text style={{color:'black'}}>DEACTIVATE</Text>
            </TouchableOpacity>
            <br></br>
            <TouchableOpacity style={styles.cancel} color='#96DED1'  >
                <Text style={{color:'black'}}>UPDATE</Text>
            </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding:15,
        flex: 1,
        shadowColor:'#070627',
        maxHeight:840,
        maxWidth:1000,
        height:896,
        width:424,
         alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        borderRadius:100
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 13,
        color: "#AEB5BC",
        fontWeight: "500",
        justifyContent:'space-between'
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden",
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32,
        justifyContent:'space-between'
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    fruitImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 20,
        color:'black'
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    cancel :{
      width:189,
      height:46,
      borderRadius:40,
      backgroundColor:'#96DED1',
      alignItems:'center',
      justifyContent:'center',
  },
  logout:{
    width:189,
    height:46,
    borderRadius:40,
    backgroundColor:'#96DED1',
    alignItems:'center',
    justifyContent:'center',
},
});
export default ProfileScreen;