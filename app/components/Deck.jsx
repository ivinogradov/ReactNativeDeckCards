import React, { useEffect, useState } from 'react';
import  { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from './Card';
import { NEW_DECK_URL, getDrawCardsURL } from '../urls';

const NUMBER_OF_CARDS_TO_DRAW = 5;

const Deck = () => {
    const [deckId, setDeckId] = useState();
    const [cards, setCards] = useState([]);

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

    // call every time for each deckId update
    useEffect(() => {
        const drawCards = async(callback) => {
            if (!deckId) {
                return;
            }
            const response = await fetch(getDrawCardsURL(deckId, NUMBER_OF_CARDS_TO_DRAW));
            const jsonObject = await response.json();
            if (jsonObject && jsonObject.cards) {
                callback(jsonObject.cards);
            }
        }
        drawCards(setCards);
    }, [deckId]);

    return(
        <View style={styles.container}>
            <Text>You've got a deck with ID: {deckId}</Text>
            <FlatList
                style={{ width: '100%' }}
                horizontal={true}
                data={cards}
                renderItem={({item, index})=>(
                    <View style={styles.rowStyle}>
                        <Card
                            image={item.image}
                            suit={item.suit}
                            value={item.value}
                        />
                    </View>
                )}
                keyExtractor={(item, index)=> item.code.toString() }
            />
        </View>
    );
}

export default Deck;

const styles = StyleSheet.create({
    rowStyle: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
});