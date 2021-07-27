import {
    ADD_DEALER_CARDS,
    ADD_PLAYER_CARDS,
    CHANGE_BET,
    DEALER_VALUE,
    DEALER_VALUE_SUM,
    PLAY_GAME, PLAYER_VALUE, PLAYER_VALUE_SUM,
    SAVE_DECK
} from "./types";

export function saveDeck(deck){
    return {
        type: SAVE_DECK,
        payload: deck
    }
}
export function changeBet(bet){
    return {
        type: CHANGE_BET,
        payload: bet
    }
}
export function addPlayerCards(cards){
    return {
        type: ADD_PLAYER_CARDS,
        payload: cards
    }
}
export function addDealerCards(cards){
    return {
        type: ADD_DEALER_CARDS,
        payload: cards
    }
}
export function playGame(boolean){
    return {
        type: PLAY_GAME,
        payload: boolean
    }
}
export function dealerValue(number){
    return {
        type: DEALER_VALUE,
        payload:number
    }
}
export function dealerValueSum(number){
    return {
        type: DEALER_VALUE_SUM,
        payload: number
    }
}
export function playerValue(number){
    return {
        type: PLAYER_VALUE,
        payload:number
    }
}
export function playerValueSum(number){
    return {
        type: PLAYER_VALUE_SUM,
        payload: number
    }
}
