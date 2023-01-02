import React, { useEffect, useState } from 'react';
import  { View, Text, FlatList, StyleSheet } from 'react-native';
import Card from './Card';
import { NEW_DECK_URL, getDrawCardsURL, returnCardsURL } from '../urls';

const NUMBER_OF_CARDS_TO_DRAW = 5;

const Deck = () => {
    const [deckId, setDeckId] = useState();
    const [cards, setCards] = useState([]);
    const [isRefreshing, setRefreshing] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // call once on component mount
    useEffect(() => {
        /**
         * Creates new deck of cards
         */
        const loadNewDeck = async() => {
            const response = await fetch(NEW_DECK_URL);
            const jsonObject = await response.json();
            if (jsonObject && jsonObject.success) {
                setDeckId(jsonObject.deck_id);
            }
        }
        loadNewDeck();
    }, []);

    // call every time for each deckId update
    useEffect(() => {
        /**
         * Draws 5 cards from the deck
         */
        const drawCards = async() => {
            if (!deckId) {
                return;
            }
            const response = await fetch(getDrawCardsURL(deckId, NUMBER_OF_CARDS_TO_DRAW));
            const jsonObject = await response.json();
            if (jsonObject && jsonObject.cards) {
                setCards(jsonObject.cards);
                setRefreshing(false);
            }
        }
        drawCards();
    }, [deckId, refreshKey]);

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
                refreshing={isRefreshing}
                onRefresh={() => {
                    setRefreshing(true);
                    returnCards(deckId).then(setRefreshKey(refreshKey + 1));
                }}
            />
        </View>
    );
}

export default Deck;

/**
 * Returns previously drawn cards to the deck
 */
const returnCards = async(deckId) => {
    await fetch(returnCardsURL(deckId));
}

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