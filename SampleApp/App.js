import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailItem from './components/DetailItem.js';
import ShowData from './components/showData';
import Signup from './components/SignUp_Login/Signup';
import Login from './components/SignUp_Login/Login';
import Home from './components/Home.js';
import PostJob from './components/PostJob.js';
import UserJob from './components/UserJob.js';


const Stack = createNativeStackNavigator();

function App() {
  return (
    // <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'yellow',
            },
            headerTintColor: 'black',
          }}>
          <Stack.Screen name="SignUp" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PostJob" component={PostJob} />
          <Stack.Screen name="UserJob" component={UserJob} />

          <Stack.Screen
            name="Selected Item Detail"
            component={DetailItem}
            options={{
              title: 'Item Detail',
            }}
          />
          <Stack.Screen
            name="showData"
            component={ShowData}
            options={{
              title: 'data Detail',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    // </Provider>
  );
}

export default App;
