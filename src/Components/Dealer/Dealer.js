import React from "react";
import './Dealer.css';

class Dealer extends React.Component{
    render() {
        const {onHistory, dropdown, dealerValue, dealerValueTotal, dealerData} = this.props;
        return(
            <>
                <div className="container">
                    <button className="history" onClick={onHistory}>History</button>
                    <div className="dropdown">
                        {dropdown}
                    </div>
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
}

export default Dealer;