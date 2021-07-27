import './Player.css';
import React, {useEffect} from "react";
import {connect} from "react-redux";

function Player (props){
    const {state} = props.state



    return(
        <>
            <div className="player">
                Player: {state.playerValue}/{state.playerValueSum}
            </div>
            <div className="cards">
                {state.playerCards.flat().map(card => <img alt={'card ' + card.value} key={card.code} src={card.image} height="150px"/>)}
            </div>
        </>
    )
}
const mapStateToProps = state => {
    return {
        state: state
    }
}

export default connect(mapStateToProps, null)(Player)