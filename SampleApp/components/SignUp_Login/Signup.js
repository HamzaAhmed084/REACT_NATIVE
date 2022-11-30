import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, Button} from 'react-native';
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const submit = async () => {
    let final = await fetch('http://192.168.43.84:4000/user/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          res.json();
          navigation.navigate('Login', {});
        }
      })
      .then(data => {
        console.log(data);
      });
  };

  const goToLogin = ()=>{
    navigation.navigate('Login', {});
  }
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize:20, fontWeight:'bold', margin:20,}}>Signup Form</Text>
      <TextInput
        style={{backgroundColor: '#E6E6E3', width: 200, marginBottom: 15}}
        placeholder="Name"
        value={name}
        onChangeText={e => setName(e)}
      />
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
      <Button title="Signup" onPress={submit} />
      <Text style={{color:"blue", marginTop:20,}} onPress={goToLogin}>Allready have a account</Text>
    </View>
  );
};
export default Signup;
