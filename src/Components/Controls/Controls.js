import React from "react";
import './Controls.css';

class Controls extends React.Component{
    buttonVisible = (check) => {
        return (this.props.play === check) ? "hide" : "";
    };


    isDisabled = () => {
        return this.props.play ? "Disabled" : "";
    };


    isDealDisabled = () => {
        return this.props.bet === 0 ? "Disabled" : "";
    };

    render() {
        const {onclickResetGame ,onclickReset, onclickDouDown, onclickStand, onclickHit, onclickDeal, onClickBetMin, onClickBetMid, onClickBetMax} = this.props;
        return(
            <>
                <div className="bets">
                    <button className={"bet " + this.buttonVisible(true)} onClick={onClickBetMin} style = {{backgroundColor:'red'}}>5</button>
                    <button className={"bet " + this.buttonVisible(true)} onClick={onClickBetMid} style = {{backgroundColor:'yellow'}}>15</button>
                    <button className={"bet " + this.buttonVisible(true)} onClick={onClickBetMax} style = {{backgroundColor:'white'}}>30</button>
                </div>
                <div className="control">
                    <button className={"btn" + this.isDealDisabled() + " " + this.buttonVisible(true)} onClick={onclickDeal}>Deal</button>
                    <button className={"btn " + this.buttonVisible(false)} onClick={onclickHit}>Hit</button>
                    <button className={"btn " + this.buttonVisible(false)} onClick={onclickStand}>Stand</button>
                    <button className={"btn " + this.buttonVisible(false)} onClick={onclickDouDown}>Double Down</button>
                    <button className={"btn"} onClick={onclickReset}>Reset Round</button>
                    <button className={"btn"} onClick={onclickResetGame}>Reset Game</button>
                </div>
            </>
        )
    }
}

export default Controls;