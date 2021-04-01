import DeckOfCards from "./api";

const checkDeck = async (deck) => {
    if(deck.length < 10 || !deck){
        deck = await DeckOfCards.generateDeck();
    }
    return deck;
}

export default checkDeck;