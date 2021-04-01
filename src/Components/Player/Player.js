import React from "react";
import './Player.css';

class Player extends React.Component{
    render() {
        const {playerValue, playerValueTotal, playerData} = this.props;
        return(
            <>
                <div className="player">
                    Player: {playerValue}/{playerValueTotal}
                </div>
                <div className="cards">
                    {playerData}
                </div>
            </>
        )
    }
}
export default Player;