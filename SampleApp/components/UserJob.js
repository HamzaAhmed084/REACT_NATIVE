import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

export default function UserJob() {
  const route = useRoute();
  let countData = route.params.jobCount;
  countData = countData +1;
  const [jobCount, setJobCount] = useState(countData);

  const [data, setData] = useState([]);
  let id = route.params.id;

  const fetchUserData = () => {
    fetch(`http://192.168.43.84:4000/user/userJob/` + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        setData(myJson);
      });
  };
  // console.log(data);
  useEffect(() => {
    fetchUserData();
  }, []);
  const completedJob = id => {
    // console.log(id);
    fetch(`http://192.168.43.84:4000/toDo/jobCompleted/` + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        try {
          if (response.status === 200) {
            // alert('job Completed');
            let jobcount = jobCount + 1;
            setJobCount(jobcount);
            // console.log(jobCount);

            fetchUserData();
          }
          console.log('this' + jobCount);

          fetch('http://192.168.43.84:4000/user/jobCount/' + route.params.id, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jobCount,
            }),
          });
        } catch (e) {
          console.log(e);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  //    let arr = Object.entries(data[0].toDo);
  console.log(jobCount);
  return (
    <View>
      {/* <Text>Id: {route.params.id}</Text> */}
      {/* <Text>Job:{data[0].toDo[0].job}</Text>

            <Text>Discription:{data[0].toDo[0].discription}</Text> */}
      {/* <Text>{arr.name}</Text> */}
      {/* {singleData.map((item,key)=>{
                <Text key={key}>{item}</Text> 
            })} */}

      {/* {arr.forEach(item => {
        let singleData = Object.entries(item[1]);
            singleData.map((item,key)=>{
                <Text key={key}>{item}</Text>
            })
      })
      } */}
      {/* <Text>Job Completed: {jobCount-1}</Text> */}
      {data.map((element, key) => {
        return (
          <View
            key={key}
            style={{
              borderColor: 'black',
              borderBottomWidth: 1,
              borderTopWidth: 0,
              borderBottomWidth: 10,
              margin: 10,
            }}>
            <Text style={{fontSize: 20, color: '#9a4', fontWeight: 'bold'}}>
              {element.job}

            </Text>
            <Text style={{fontSize: 16, color: '#2a2', fontWeight: 'bold'}}>
              {element.discription}
            </Text>
            <Button
              title="completed"
              onPress={event => {
                event.preventDefault();
                // setJobId(element.id);
                completedJob(element.id);
              }}
          
            />
            
          </View>
        );
      })}
    </View>
  );
}
