import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, Button, Image} from 'react-native';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const goToSignUp = ()=>{
    navigation.navigate('SignUp', {});
  }

  const submit = async () => {
    let final = await fetch('http://192.168.43.84:4000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      console.log(res);
        if (res.status === 200) {

          navigation.navigate('Home', {
            email: email,

          });
        }
      })
      .then(data => {
        console.log(data);
      });

     


  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize:20, fontWeight:'bold', margin:20,}}>Login Form</Text>
      
      <TextInput
        style={{backgroundColor: '#E6E6E3', width: 200, marginBottom: 20}}
        placeholder="Email"
        value={email}
        onChangeText={e => setEmail(e)}
      />
      <TextInput
        style={{backgroundColor: '#E6E6E3', width: 200, marginBottom: 20}}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={e => setPassword(e)}
      />
      <Button title="Login" onPress={submit} color="green"/>
      <Text style={{margin:20, color:"blue"}} onPress={goToSignUp}>Create a Account</Text>
    </View>
  );
};
export default Login;
