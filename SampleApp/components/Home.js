import React,{useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function Home() {
const route = useRoute();
const [data,setData]=useState({});
const Navigation = useNavigation();
  const goPostJob = () => {
    Navigation.navigate("PostJob",{})
  }
 
  const getUser = ()=>{
    let email = route.params.email;
    console.log(email);
    fetch(`http://192.168.43.84:4000/user/`+email,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((response) => {
      return response.json();
    })
    .then((myJson) => {
      setData(myJson);
    });
   
  }
  // console.log(data.id);
  const getUserJob = () => {
    Navigation.navigate("UserJob",{
      id:data.id,
      jobCount: data.jobCount,
    })
  }

  useEffect(()=>{
    getUser()
  },[])
  console.log(data.jobCount);
  return (
    <View>
      <View
        style={{backgroundColor: '#BAD90E', height: 40, alignItems: 'center',margin:15}}>
        <Text style={{fontSize: 20, margin: 5, fontWeight: 'bold'}}>
          Wellcome {route.params.email} 
        </Text>
      </View>
      <View style={styles.btn}>
        <View style={styles.btns}>
        <Button  color ='red'  title='Job Post' onPress={goPostJob}/>
        </View>
        <View style={styles.btns}>
        <Button title='Jobs' onPress={getUserJob} />
        </View>
      </View>
      <Text style={{fontSize: 20, margin: 10, fontWeight: 'bold',backgroundColor:'#13D90E'}}>Completed Task:                                    {data.jobCount}</Text>

    </View>
  );
}
const styles = StyleSheet.create({
  btns:{
    
    padding: 50,

    
  }
})
