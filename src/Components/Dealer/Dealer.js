import React, {useState} from "react";
import './Dealer.css';
import Hamburger from 'hamburger-react';
import {connect} from "react-redux";

function Dealer(props) {
    const {state} = props.state
    const {onclickResetGame, onclickReset, onHistory, dropdown} = props;
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="container_ham">
                <Hamburger toggled={isOpen} toggle={setOpen}/>
                {isOpen ? <div className="burger">
                    <li>
                        <ul><button className="btn" onClick={onHistory}>History</button></ul>
                        <ul><button className="btn" onClick={onclickReset}>Reset Round</button></ul>
                        <ul><button className="btn" onClick={onclickResetGame}>Reset Game</button></ul>
                    </li>
                </div> : null}
                {dropdown ?
                    <div className="dropdown">
                    {dropdown}
                    </div> : null}

            </div>
            <div className="dealer">
                Dealer: {state.dealerValue}/{state.dealerValueSum}
            </div>
            <div className="cards">
                {state.dealerCards.flat().map(card => <img alt={'card ' + card.value} key={card.code} src={card.image} height="150px"/>)}
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        state: state
    }
}

export default connect(mapStateToProps, null)(Dealer)