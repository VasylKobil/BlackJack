import React, {useState} from "react";
import './Dealer.css';
import Hamburger from 'hamburger-react';

function Dealer(props) {
    const {onclickResetGame, onclickReset, onHistory, dropdown, dealerValue, dealerValueTotal, dealerData} = props;
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <div className="container_ham">
                <Hamburger toggled={isOpen} toggle={setOpen}/>
                {isOpen ? <div className="burger">
                    <li>
                        <ul><a className="btn" onClick={onHistory}>History</a></ul>
                        <ul><a className="btn" onClick={onclickReset}>Reset Round</a></ul>
                        <ul><a className="btn" onClick={onclickResetGame}>Reset Game</a></ul>
                    </li>
                </div> : null}
                {dropdown ?
                    <div className="dropdown">
                    {dropdown}
                    </div> : null}

            </div>
            <div className="dealer">
                Dealer: {dealerValue}/{dealerValueTotal}
            </div>
            <div className="cards">
                {dealerData}
            </div>
        </>
    )
}

export default Dealer;