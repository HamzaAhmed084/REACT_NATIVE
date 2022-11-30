import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, TextInput, Button, Image,BtnDft} from 'react-native';
const PostJob = () => {
  const [job, setJob] = useState('');
  const [discription, setDiscription] = useState('');
  const [User_id, setUid] = useState(0);

  const navigation = useNavigation();

  const submit = async () => {
    let final = await fetch('http://192.168.43.84:4000/toDo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job,
        discription,
        User_id,
      }),
    })
      .then(res => {
        if (res.status === 200) {
            alert('Job posted')
          res.json();
          navigation.navigate('Home', {});
        }
      })
      .then(data => {
        console.log(data);
      });
  };

  
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={{fontSize:20, fontWeight:'bold', margin:20,}}>PostJob Form</Text>
      <TextInput
        style={{backgroundColor: '#E6E6E3', width: 200, marginBottom: 15}}
        placeholder="Job Title"
        value={job}
        onChangeText={e => setJob(e)}
      />
      <TextInput
        style={{backgroundColor: '#E6E6E3', width: 200, marginBottom: 20}}
        placeholder="Job Discription"
        value={discription}
        onChangeText={e => setDiscription(e)}
      />
      <TextInput
        style={{backgroundColor: '#E6E6E3', width: 200, marginBottom: 20}}
        placeholder="User Id"
        value={User_id}
        onChangeText={e => setUid(e)}
      />
      <Button title="Submit" onPress={submit} />
    </View>
  );
};
export default PostJob;
