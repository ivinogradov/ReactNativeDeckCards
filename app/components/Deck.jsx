import React, { useEffect, useState } from 'react';
import  { View, Text, FlatList } from 'react-native';
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
        <View>
            <Text>You've got a deck:{deckId}</Text>
            <Card />
            <FlatList
                data={cards}
                renderItem={({item, index})=>(
                    <Text>{item.code}</Text>
                )}
                keyExtractor={(item, index)=> {
                    item.code.toString();
                }}
            />
        </View>
    );
}

export default Deck;