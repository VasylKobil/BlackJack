import {
    ADD_DEALER_CARDS,
    ADD_PLAYER_CARDS,
    CHANGE_BET, DEALER_VALUE, DEALER_VALUE_SUM, PLAY_GAME, PLAYER_VALUE, PLAYER_VALUE_SUM,
    SAVE_DECK
} from "./types";

const initialState = {
    savedState: [],
    dataLastGame: [],
    deck: '',
    chips: 1000,
    bet: 0,
    playerCards: [],
    playerValue: 0,
    playerValueSum: 0,
    dealerCards: [],
    dealerValue: 0,
    dealerValueSum: 0,
    playGame: false,
    statusGame: null,
    ele: null
}

export const stateReducer = (state = initialState, action) => {
    switch (action.type){
        case SAVE_DECK:
            return { ...state, deck: action.payload}
        case CHANGE_BET:
            return { ...state,
                bet: state.bet + action.payload,
                chips: state.chips - action.payload
            }
        case ADD_PLAYER_CARDS:
            return { ...state,
                playerCards: [ ...state.playerCards, action.payload]
            }
        case ADD_DEALER_CARDS:
            return { ...state,
                dealerCards: [ ...state.dealerCards, action.payload]
            }
        case PLAY_GAME:
            return { ...state,
                playGame: action.payload
            }
        case PLAYER_VALUE:
            return { ...state,
                playerValue: state.playerValue + action.payload
            }
        case PLAYER_VALUE_SUM:
            return { ...state,
                playerValueSum: state.playerValueSum + action.payload
            }
        case DEALER_VALUE:
            return {...state,
                dealerValue: state.dealerValue + action.payload
            }
        case DEALER_VALUE_SUM:
            return { ...state,
                dealerValueSum: state.dealerValueSum + action.payload
            }
        default: return state
    }
}