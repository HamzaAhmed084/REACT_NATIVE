import React,{useState} from "react";
import {useNavigation } from "@react-navigation/native"
import {View,Text,TextInput,Button,Image} from 'react-native'
const ListData = ()=>{
    const [name, setName]= useState('');
    const [detail,setDetail] = useState("");
    
   
    const navigation = useNavigation();

    const submit =()=>{
            navigation.navigate("Selected Item Detail",{
            name:name,
            detail:detail
        })
        
    }

    return(
        <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize:20,fontWeight:'bold', alignItems: 'center', justifyContent: 'center', marginBottom:20 }}>Form</Text>
        <TextInput 
            style={{backgroundColor:"#E6E6E3",width:200,marginBottom:15 }}
            placeholder="Enter Item Name"
            value={name}
            onChangeText={(e)=>setName(e)}
          />
        <TextInput 
            style={{backgroundColor:"#E6E6E3",width:200,marginBottom:20 }} 
            placeholder="Enter Item Detail" 
            value={detail}
            onChangeText={(e)=>setDetail(e)}
        />
         <Button title="Submit" onPress={submit}/>

      </View>
    )
}
export default ListData;