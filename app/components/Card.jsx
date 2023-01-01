import React from 'react';
import  { View, Image, Text, StyleSheet } from 'react-native';

const Card = (props) => {
    const { image, suit, value } = props;
    return(
        <View style={styles.container}>
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
            <Text style={{ padding: 10 }}>{value} {suit}</Text>
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({
    container : {
       justifyContent: 'center',
       alignItems: 'center',
    },
    image: {
        height: 300,
        width: 216
    }
});