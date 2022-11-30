import React from "react";
import {View, Text} from 'react-native'; 
import {useRoute} from '@react-navigation/native';

export default function ShowData(){
    const route = useRoute();
    return(
        <View>
            <Text>Name:{route.params.name}</Text>
            <Text>Email:{route.params.email}</Text>
            <Text>mobile:{route.params.mobile}</Text>

        </View>
        )
}