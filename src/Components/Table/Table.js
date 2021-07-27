import React, { useEffect, useState} from "react";
import './Table.css';
import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Controls from "../ControlButtons/ControlButtons";
import {list} from "../../services/functions";
import Moment from "moment";
import {connect} from "react-redux";
import {
    addDealerCards,
    addPlayerCards,
    changeBet, dealerValue,
    dealerValueSum,
    playerValue, playerValueSum,
    playGame,
    saveDeck
} from "../../Redux/actions";


const Table = (props) => {
    const {state} = props.state
    const {changeBet, addPlayerCards, addDealerCards, saveDeck, playGame, dealerValue, dealerValueSum, playerValue, playerValueSum} = props
    const [sto, setState] = useState('');


    const onStay = async () => {
        let playerTotal = Math.max(state.playerValue, state.playerValueTotal);
        if (playerTotal > 21){
            playerTotal = Math.min(state.playerValue, state.playerValueTotal);
        }
        let deck = await list.checkDeck(state.deck);
        let dealerCards = state.dealerCards;
        let status = list.checkDealerStatus(dealerCards, playerTotal);
        saveData(status);

        if (status === "") {
            do {
                list.drawCards(deck, dealerCards, 1);
                status = list.checkDealerStatus(dealerCards, playerTotal);
            }
            while(status === "");
        }

        setState(Object.assign(state, {
            deck: deck,
            dealerCards: dealerCards,
            gameStatus: status,
        }));
        // countCards();
    };

    const countCards = () => {
        dealerValue(list.calcCards(state.dealerCards, false))
        dealerValueSum(list.calcCards(state.dealerCards, true))
        playerValue(list.calcCards(state.playerCards, false))
        playerValueSum(list.calcCards(state.playerCards, true))
    }

    const onDeal = async () => {
        if(state.bet === 0){return}
        let deck = await list.checkDeck(state.deck);
        const dealerCards = [];
        const playerCards = [];
        list.drawCards(deck, dealerCards, 2);
        list.drawCards(deck, playerCards, 2);
        addPlayerCards(playerCards);
        addDealerCards(dealerCards);
        saveDeck(deck);
        playGame(true);
        countCards();
    };

    const onHit = async () => {
        if (state.gameStatus !== null) return;
        let deck = await list.checkDeck(state.deck);
        let playerCards = state.playerData
        list.drawCards(deck, playerCards, 1);

        setState(Object.assign(state, {
            playerCards: playerCards,
            deck: deck
        }));
        let dealerData = state.dealerData
        let playerValue = state.playerValueTotal
        let status = list.checkDealerStatus(dealerData, playerValue);
        setState(Object.assign(state, {
            gameStatus: status
        }));
        // countCards();
        status = list.checkBust(state.playerData);
        saveData(status);
        setState(Object.assign(state, {
            gameStatus: status
        }));
    };

    const onDown = () => {
        if (state.gameStatus !== null) return;
        if (state.bet >= 1000){
            return;
        }
        changeBet(state.bet);
    };


    const onReset = () => {
        if (state.bet === 0) return;
        let chips = state.chips;
        let bet = state.bet;

        if (state.gameStatus === "Push") {
            chips = chips + bet;
        }
        else if (state.gameStatus === "Player Wins!!!") {
            chips = chips + (bet * 1.5);
        }

        this.setState({
            savedState: [],
            dealerData: [],
            dealerValue: 0,
            dealerValueTotal: 0,
            dealerCards: [],
            playerData: [],
            playerValue: 0,
            playerValueTotal: 0,
            playerCards: [],
            play: false,
            bet: 0,
            chips: chips,
            gameStatus: null
        });
    };

    const onresetGame = () => {
        localStorage.clear();
        this.setState({
            visible: true,
            savedState: [],
            dataLastGame: [],
            deck: '',
            chips: 1000,
            bet: 0,
            playerData: [],
            playerCards: [],
            playerValue: 0,
            playerValueTotal: 0,
            dealerData: [],
            dealerCards: [],
            dealerValue: 0,
            dealerValueTotal: 0,
            play: false,
            gameStatus: null,
            ele: null
        });
    }
    const saveData = (status) => {
        const dataLastGame = localStorage.dataGame ? JSON.parse(localStorage.dataGame) : null;
        this.setState(dataLastGame);
        let latestRound = {data: Moment(new Date()).format('LTS'), status: status, bet: state.bet};
        state.dataLastGame.push(latestRound);
        localStorage.dataGame = JSON.stringify(state.dataLastGame);
    }

    const onHistory = () => {
        if (!localStorage.dataGame || state.ele1) return;
        const dataLatestGames = JSON.parse(localStorage.dataGame);
        const lastFiveGames = dataLatestGames.slice(Math.max(dataLatestGames.length - 5, 0)).reverse();
        renderHtml(lastFiveGames);
    }

    const renderHtml = (data) => {
        const array = [];
        data.forEach((ele) =>{
            const Ele = <li>{ele.data} {ele.status} = {ele.bet}</li>;
            array.push(Ele);
        })
        this.setState({
            ele: <div className="dropdown" onClick={clear}>
                        <ul>{array[0]}{array[1]}{array[2]}{array[3]}{array[4]}</ul>
                    </div>
        })
    }

    const clear = () => {
        this.setState({
            ele: null
        })
    }

    useEffect(()=>{
        const savedState = localStorage.table ? JSON.parse(localStorage.table) : null;
        setState(savedState);
        window.onbeforeunload = () => {
            localStorage.table = JSON.stringify(state);
            return "Do you really want to close?";
        }
        // eslint-disable-next-line
    },[]);

    return(
        <>
            <div>
                <Dealer
                    onHistory={onHistory}
                    onclickReset={onReset}
                    onclickResetGame={onresetGame}
                />
                <Player/>
                <div className="bet">
                    Bet: {state.bet}$
                </div>
                <div className="chips">
                    Wallet: {state.chips}$
                </div>
                <Controls
                    play={state.playGame}
                    bet={state.bet}
                    onclickDeal={onDeal}
                    onclickHit={onHit}
                    onclickDouDown={onDown}
                    onclickStand={onStay}
                />
                {state.gameStatus ? <div className="message" onClick={onReset}>
                    <p>{state.gameStatus}</p>
                </div> : null}
                {state.ele ? state.ele : null}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        state: state
    }
}
const mapDispatchToProps = {
    changeBet,
    addPlayerCards,
    addDealerCards,
    saveDeck,
    playGame,
    dealerValue,
    dealerValueSum,
    playerValue,
    playerValueSum
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)