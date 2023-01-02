export const NEW_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/';

export const getDrawCardsURL = (deckId, numberOfCards) =>
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`;

// Not needed since shuffling without `remaining=true` paramenter automatically returns drawn cards back 
// export const returnCardsURL = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/return/`;

export const shuffleDeck = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`;