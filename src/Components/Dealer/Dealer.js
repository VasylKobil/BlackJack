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
                Dealer: {dealerValue}/{dealerValueTotal}
            </div>
            <div className="cards">
                {dealerData}
            </div>
        </>
    )
}

export default Dealer;