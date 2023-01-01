export const NEW_DECK_URL = 'https://deckofcardsapi.com/api/deck/new/';

export const getDrawCardsURL = (deckId, numberOfCards) => {
    return `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${numberOfCards}`;
}