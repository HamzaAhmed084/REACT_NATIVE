import React from "react";
import {View, Text} from 'react-native'; 
import {useRoute} from '@react-navigation/native';

export default function DetailItem(){
    const route = useRoute();
    return(
        <View>
            <Text>Name:{route.params.name}</Text>
            <Text>Detail:{route.params.detail}</Text>
        </View>
        )
}