import React from "react";
import './Table.css';
import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Controls from "../Controls/Controls";
import DeckOfCards from "../../services/api";


class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            savedState: [],
            dataLastGame: [],
            deck: [],
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
            ele1: null,
            ele2: null,
            ele3: null,
            ele4: null,
            ele5: null
        }

    }
    checkDeck = (deck) => {
        return (this.state.deck.length < 10) ? this.getNewDeck : deck;
    }

    takeBet = (valueBet) => {
        this.setState(prevState => ({
            bet: prevState.bet + valueBet,
            chips: prevState.chips - valueBet
        }));
    }
    countCards = () => {
        this.setState({
            dealerValue: this.calcCards(this.state.dealerCards, false),
            playerValue: this.calcCards(this.state.playerCards, false),
            dealerValueTotal: this.calcCards(this.state.dealerCards, true),
            playerValueTotal: this.calcCards(this.state.playerCards, true)
        })
    }

    calcCards = (cards, value) => {
        let sumCards = Object.keys(cards).reduce((total, card) => {
            let cardVal = cards[card].value;
            if(cardVal === "ACE"){
                cardVal = 1;
            }else if(cardVal === "KING" || cardVal === "QUEEN" || cardVal === "JACK"){
                cardVal = 10;
            }
            cardVal = Number(cardVal);
            cardVal = (cardVal === 1 && value) ? 11 : cardVal;
            return Number(total) + cardVal;
        }, 0);
        return sumCards;
    };

    drawCards = (deck, playerCards, numOfCards) => {
        let i;
        for (i = 1; i <= numOfCards; i++) {
            let card = deck.pop();
            playerCards.push(card);
        }
        return playerCards;
    };

    checkBust = () => {
        let value1, value2, min, status = "";
        value1 = this.calcCards(this.state.playerData, false);
        value2 = this.calcCards(this.state.playerData, true);
        min = Math.min(value1, value2);

        if (min > 21) {
            status = "Player Bust!!!";
            this.saveData(status);
        }else if(min === 21){
            status = "Player Wins!!!";
            this.saveData(status);
        }

        this.setState({
            gameStatus: status
        });
    };

    checkDealerStatus = (dealerCards, playerTotal) => {
        let value1, value2, status = "";

        value1 = this.calcCards(dealerCards, false);
        value2 = this.calcCards(dealerCards, true);

        if (Math.min(value1, value2) > 21) {
            status = "Player Wins!!!";
            this.saveData(status);
        }
        else if ((value1 <= 21 && value1 === playerTotal) || (value2 <= 21 && value2 === playerTotal)) {
            status = "Push";
            this.saveData(status);
        }
        else if ((value1 <= 21 && value1 > playerTotal) || (value2 <= 21 && value2 > playerTotal)) {
            status = "Dealer wins!!!";
            this.saveData(status);
        }

        return status;
    };

    onStay = () => {
        let playerTotal = Math.max(this.state.playerValue, this.state.playerValueTotal);
        if (playerTotal > 21)
            playerTotal = Math.min(this.state.playerValue, this.state.playerValueTotal);
        let deck = this.checkDeck(this.state.deck);
        let dealerCards = this.state.dealerCards;
        let status = this.checkDealerStatus(dealerCards, playerTotal);

        if (status === "") {
            this.saveData(status);
            do {
                this.drawCards(deck, dealerCards, 1);
                status = this.checkDealerStatus(dealerCards, playerTotal);
            }
            while(status === "");
            this.saveData(status);
        }

        this.setState(prevState => ({
            deck: deck,
            dealerCards: dealerCards,
            gameStatus: status,
        }));
        this.countCards();
    };

    onDeal = () => {
        if(this.state.bet === 0){
            return;
        }
        const promise = DeckOfCards.generateDeck();
        promise.then((deck)=>{
            this.setState({deck});
        }).then(() => {
            let deck = this.checkDeck(this.state.deck);
            let dealerData = this.state.dealerData;
            let playerData = this.state.playerData;


            this.drawCards(deck, dealerData, 2);
            this.drawCards(deck, playerData, 2);

            this.setState(prevState => ({
                deck: deck,
                dealerCards: dealerData,
                playerCards: playerData,
                play: true
            }));
            this.countCards();
        })
    };

    onHit = () => {
        if (this.state.gameStatus !== null) return;
        let deck = this.checkDeck(this.state.deck);
        let playerCards = this.state.playerData
        this.drawCards(deck, playerCards, 1);

        this.setState(prevState => ({
            playerCards: playerCards,
            deck: deck,
            play: true
        }));
        let dealerData = this.state.dealerData
        let playerValue = this.state.playerValueTotal
        this.checkDealerStatus(dealerData, playerValue);
        this.countCards();
        this.checkBust();
    };

    onDown = () => {
        if (this.state.gameStatus !== null) return;
        let bet = this.state.bet;
        if (bet >= 1000){
            return;
        }
        this.takeBet(bet);
    };

    getNewDeck = () => {
        const promise = DeckOfCards.generateDeck();
        promise.then((deck)=>{
            this.setState({deck});
        });
    };


    onReset = () => {
        if (this.state.bet === 0) return;
        let chips = this.state.chips;
        let bet = this.state.bet;

        if (this.state.gameStatus === "Push") {
            chips = chips + bet;
        }
        else if (this.state.gameStatus === "Player Wins!!!") {
            chips = chips + (bet * 1.5);
        }

        this.setState({
            savedState: [],
            deck: [],
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

    onresetGame = () => {
        localStorage.clear();
        this.setState({
            savedState: [],
            deck: [],
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
            gameStatus: null
        });
    }
    saveData = (status) => {
        const dataLastGame = localStorage.dataGame ? JSON.parse(localStorage.dataGame) : null;
        this.setState(dataLastGame);
        let latestRound = {status: status, bet: this.state.bet};
        this.state.dataLastGame.push(latestRound);
        localStorage.dataGame = JSON.stringify(this.state.dataLastGame);
    }

    onHistory = () => {
        if(this.state.ele1){
            this.setState({
                ele1: null
            })
            return;
        }
        if (!localStorage.dataGame) {
            return;
        }
        const dataLatestGames = JSON.parse(localStorage.dataGame);
        const lastFiveGames = dataLatestGames.slice(Math.max(dataLatestGames.length - 5, 0)).reverse();
        this.renderHtml(lastFiveGames);
    }

    renderHtml = (data) => {
        if(data[0]){
            const Ele1 = 'Last Result ' + data[0].status + ' = ' + data[0].bet;
            this.setState({
                ele1: Ele1
            })
        }
        if(data[1]){
            const Ele2 = data[1].status + ' = ' + data[1].bet;
            this.setState({
                ele2: Ele2
            })
        }
        if(data[2]){
            const Ele3 = data[2].status + ' = ' + data[2].bet;
            this.setState({
                ele3: Ele3
            })
        }
        if(data[3]){
            const Ele4 = data[3].status + ' = ' + data[3].bet;
            this.setState({
                ele4: Ele4
            })
        }if(data[4]){
            const Ele5 = data[4].status + ' = ' + data[4].bet;
            this.setState({
                ele5: Ele5
            })
        }
    }

    clear = () => {
        this.setState({
            ele1: null
        })
    }

    componentDidMount() {
        const savedState = localStorage.table ? JSON.parse(localStorage.table) : null;
        this.setState(savedState);
        window.onbeforeunload = () => {
            localStorage.table = JSON.stringify(this.state);
            return "Do you really want to close?";
        };
    };

    render() {
        const {play, chips, bet, dealerData, playerData, dealerValue, playerValue, dealerValueTotal, playerValueTotal, gameStatus, content, ele1, ele2, ele3, ele4, ele5} = this.state;

        return(
            <>
                <Dealer
                    onHistory={this.onHistory}
                    dealerValue={dealerValue}
                    dealerValueTotal={dealerValueTotal}
                    dealerData={dealerData.map(card => <img alt='card' key={card.code} src={card.image} height="180px"/>)}
                />
                {content}
                <Player
                    playerValue={playerValue}
                    playerValueTotal={playerValueTotal}
                    playerData={playerData.map(card => <img alt='card' key={card.code} src={card.image} height="180px"/>)}
                />
                <div className="bet">
                    Bet: {bet}$
                </div>
                <div className="chips">
                    Wallet: {chips}$
                </div>
                <Controls
                    play={play}
                    bet={bet}
                    onclickDeal={this.onDeal}
                    onclickHit={this.onHit}
                    onclickDouDown={this.onDown}
                    onclickStand={this.onStay}
                    onclickReset={this.onReset}
                    onclickResetGame={this.onresetGame}
                    onClickBetMin={() => !this.state.play ? this.takeBet(5) : null}
                    onClickBetMid={() => !this.state.play ? this.takeBet(15) : null}
                    onClickBetMax={() => !this.state.play ? this.takeBet(30) : null}
                />
                {gameStatus ? <div className="message" onClick={this.onReset}>
                    <p>{gameStatus}</p>
                </div> : null}
                {ele1 ? <div className="dropdown" onClick={this.clear}>
                    <ul>
                        <li>{ele1}</li>
                        <li>{ele2}</li>
                        <li>{ele3}</li>
                        <li>{ele4}</li>
                        <li>{ele5}</li>
                    </ul>
                </div> : null}
            </>
        )
    }
}

export default Table;