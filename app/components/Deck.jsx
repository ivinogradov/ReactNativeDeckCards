import React from 'react';
import  {View, Text} from 'react-native';
import Card from './Card';

const Deck = () => {
    return(
        <View>
            <Text>This is a deck component</Text>
            <Card />
        </View>
    );
}

export default Deck;