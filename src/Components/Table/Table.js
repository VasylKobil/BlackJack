import React from "react";
import './Table.css';
import Dealer from "../Dealer/Dealer";
import Player from "../Player/Player";
import Controls from "../Controls/Controls";
import Start from "../Start/Start";
import functions from "../../services/functions";
import Moment from "moment";


class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
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
        }
        this.passDate = this.passDate.bind(this);

    }

    passDate(data){
        if (!data){
            return;
        }
        const newData = JSON.parse(JSON.stringify(data));
        this.setState( {
            deck: newData,
            visible: true
        })
    }

    takeBet = (valueBet) => {
        this.setState(prevState => ({
            bet: prevState.bet + valueBet,
            chips: prevState.chips - valueBet
        }));
    }
    countCards = () => {
        this.setState( prevState =>({
            dealerValue: this.calcCards(this.state.dealerCards, false),
            playerValue: this.calcCards(this.state.playerCards, false),
            dealerValueTotal: this.calcCards(this.state.dealerCards, true),
            playerValueTotal: this.calcCards(this.state.playerCards, true)
        }))
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
        }else if ((value1 <= 21 && value1 === playerTotal) || (value2 <= 21 && value2 === playerTotal)) {
            status = "Push";
            this.saveData(status);
        }else if ((value1 <= 21 && value1 > playerTotal) || (value2 <= 21 && value2 > playerTotal)) {
            status = "Dealer wins!!!";
            this.saveData(status);
        }
        return status;
    };

    onStay = async () => {
        let playerTotal = Math.max(this.state.playerValue, this.state.playerValueTotal);
        if (playerTotal > 21){
            playerTotal = Math.min(this.state.playerValue, this.state.playerValueTotal);
        }
        let deck = await functions(this.state.deck);
        let dealerCards = this.state.dealerCards;
        let status = this.checkDealerStatus(dealerCards, playerTotal);

        if (status === "") {
            do {
                this.drawCards(deck, dealerCards, 1);
                status = this.checkDealerStatus(dealerCards, playerTotal);
            }
            while(status === "");
        }

        this.setState(prevState => ({
            deck: deck,
            dealerCards: dealerCards,
            gameStatus: status,
        }));
        this.countCards();
    };

    onDeal = async () => {
        if(this.state.bet === 0){
            return;
        }
        let deck = await functions(this.state.deck);
        let dealerData = this.state.dealerData;
        let playerData = this.state.playerData;

        this.drawCards(deck, dealerData, 2);
        this.drawCards(deck, playerData, 2);

        this.setState({
            deck: deck,
            dealerCards: dealerData,
            playerCards: playerData,
            play: true
        }, function (){
            this.countCards();
        });
    };

    onHit = async () => {
        if (this.state.gameStatus !== null) return;
        let deck = await functions(this.state.deck);
        let playerCards = this.state.playerData
        this.drawCards(deck, playerCards, 1);

        this.setState(prevState => ({
            playerCards: playerCards,
            deck: deck
        }));
        let dealerData = this.state.dealerData
        let playerValue = this.state.playerValueTotal
        let status = this.checkDealerStatus(dealerData, playerValue);
        this.setState({
            gameStatus: status
        });
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
    saveData = (status) => {
        const dataLastGame = localStorage.dataGame ? JSON.parse(localStorage.dataGame) : null;
        this.setState(dataLastGame);
        let latestRound = {data: Moment(new Date()).format('LTS'), status: status, bet: this.state.bet};
        this.state.dataLastGame.push(latestRound);
        localStorage.dataGame = JSON.stringify(this.state.dataLastGame);
    }

    onHistory = () => {
        if (!localStorage.dataGame || this.state.ele1) return;
        const dataLatestGames = JSON.parse(localStorage.dataGame);
        const lastFiveGames = dataLatestGames.slice(Math.max(dataLatestGames.length - 5, 0)).reverse();
        this.renderHtml(lastFiveGames);
    }

    renderHtml = (data) => {
        const array = [];
        data.forEach((ele) =>{
            const Ele = <li>{ele.data} {ele.status} = {ele.bet}</li>;
            array.push(Ele);
        })
        this.setState({
            ele: <div className="dropdown" onClick={this.clear}>
                        <ul>{array[0]}{array[1]}{array[2]}{array[3]}{array[4]}</ul>
                    </div>
        })
    }

    clear = () => {
        this.setState({
            ele: null
        })
    }

    componentDidMount() {
        const savedState = localStorage.table ? JSON.parse(localStorage.table) : null;
        this.setState(savedState);
        window.onbeforeunload = () => {
            this.setState({
                visible: false
            })
            localStorage.table = JSON.stringify(this.state);
            return "Do you really want to close?";
        };
    };


    render() {
        const {play, chips, bet, dealerData, playerData, dealerValue, playerValue, dealerValueTotal, playerValueTotal, gameStatus, content, ele} = this.state;

        return(
            <>
                <Start parentCallBack = {this.passDate}/>
                <div style={{display: this.state.visible ? 'block' : 'none'}}>
                    <Dealer
                        onHistory={this.onHistory}
                        onclickReset={this.onReset}
                        onclickResetGame={this.onresetGame}
                        dealerValue={dealerValue}
                        dealerValueTotal={dealerValueTotal}
                        dealerData={dealerData.map(card => <img alt='card' key={card.code} src={card.image} height="150px"/>)}
                    />
                    {content}
                    <Player
                        playerValue={playerValue}
                        playerValueTotal={playerValueTotal}
                        playerData={playerData.map(card => <img alt='card' key={card.code} src={card.image} height="150px"/>)}
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
                        onClickBetMin={() => !this.state.play ? this.takeBet(5) : null}
                        onClickBetMid={() => !this.state.play ? this.takeBet(15) : null}
                        onClickBetMax={() => !this.state.play ? this.takeBet(30) : null}
                    />
                    {gameStatus ? <div className="message" onClick={this.onReset}>
                        <p>{gameStatus}</p>
                    </div> : null}
                    {ele ? ele : null}
                </div>
            </>
        )
    }
}

export default Table;