export const NEW_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/';

export const getDrawCardsURL = (deckId, numberOfCards) =>
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`;

export const returnCardsURL = (deckId) => `https://deckofcardsapi.com/api/deck/${deckId}/return/`;