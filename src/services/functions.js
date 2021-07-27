import {requests} from "./api";

export const list = {
    checkDeck: async function (deck){
        if(deck.length < 10 || !deck){
            let newDeck = await requests.getDeck();
            return newDeck.cards
        }
        return deck;
    },
    calcCards: function(cards, value){
        return Object.keys(cards).reduce((total, card) => {
            let cardVal = cards[card].value;
            if(cardVal === "ACE"){
                cardVal = 1;
            }else if(cardVal === "KING" || cardVal === "QUEEN" || cardVal === "JACK"){
                cardVal = 10;
            }
            cardVal = (cardVal === 1 && value) ? 11 : cardVal;
            return Number(total) + cardVal;
        }, 0);
    },
    checkDealerStatus: function(dealerCards, playerTotal){
        let status = "";
        let value1 = list.calcCards(dealerCards, false);
        let value2 = list.calcCards(dealerCards, true);

        if (Math.min(value1, value2) > 21) {
            status = "Player Wins!!!";
        }else if ((value1 <= 21 && value1 === playerTotal) || (value2 <= 21 && value2 === playerTotal)) {
            status = "Push";
        }else if ((value1 <= 21 && value1 > playerTotal) || (value2 <= 21 && value2 > playerTotal)) {
            status = "Dealer wins!!!";
        }
        return status;
    },
    checkBust:  function(playerData){
        let status = "";
        let value1 = list.calcCards(playerData, false);
        let value2 = list.calcCards(playerData, true);
        let min = Math.min(value1, value2);

        if (min > 21) {
            status = "Player Bust!!!";
        }else if(min === 21){
            status = "Player Wins!!!";
        }
        return status;
    },
    drawCards: function(deck, playerCards, numOfCards){
        for (let i = 1; i <= numOfCards; i++) {
            let card = deck.pop();
            playerCards.push(card);
        }
        return playerCards;
    }
}