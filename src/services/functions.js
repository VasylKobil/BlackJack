import {requests} from "./api";

export const list = {
    checkDeck: async function (deck){
        if(deck.length < 10 || !deck){
            deck = await requests.getDeck();
        }
        return deck;
    }
}