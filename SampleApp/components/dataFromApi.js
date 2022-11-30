import React,{useEffect,useState} from "react";
import {View,Text,FlatList,Image,Button} from 'react-native';
import {useNavigation } from "@react-navigation/native"

const APi_data = ()=>{
    const [data,setData] = useState('');

    const navigation = useNavigation();

    
    
    const fetchData = async()=>{
        try{
         const response = await fetch('https://thapatechnical.github.io/userapi/users.json')
            const result = await response.json();
            setData(result);
           
        }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
    const submit = ()=>{
    
       console.log({...data})
        navigation.navigate("showData",{
            
        })
    }
    return(
        <View>
         <Button title="Submit" onPress={submit}/>
        
            <FlatList 
            data={data}
            renderItem={({ item })=>{
                return(
                    <View style={{backgroundColor:'#4fe3'}}>
                        <View>
                        <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
                           style={{marginLeft:50, width: 200, height: 400}} />
                        <Text style={{marginLeft:50}}>{item.name}</Text>
                        <Text style={{marginLeft:50}}>{item.email}</Text>
                        <Text style={{marginLeft:50}}>{item.mobile}</Text>
                        </View>

                    </View>
                )
            }}
            />
        </View>
        )
}

export default APi_data;