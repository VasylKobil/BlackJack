const DeckOfCards = {
    generateDeck(){
        return fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52'
        ).then(res => res.json()
        ).then((result) => {
            return result.cards;
            }
        )
    }
}
export default DeckOfCards;