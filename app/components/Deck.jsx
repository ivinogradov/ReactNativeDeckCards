import React, { useEffect, useState } from 'react';
import  { View, Text } from 'react-native';
import Card from './Card';
import { NEW_DECK_URL } from '../urls';

const Deck = () => {
    const [deckId, setDeckId] = useState(null);

    // call once on component mount
    useEffect(() => {
        /**
         * Creates new deck of cards
         * @param {function} callback called with the ID of the deck passed as a parameter
         */
        const loadNewDeck = async (callback) => {
            const response = await fetch(NEW_DECK_URL);
            const jsonObject = await response.json();
            if (jsonObject && jsonObject.success) {
                callback(jsonObject.deck_id);
            }
        }
        loadNewDeck(setDeckId);
    }, []);

    return(
        <View>
            <Text>You've got a deck:{deckId}</Text>
            <Card />
        </View>
    );
}

export default Deck;