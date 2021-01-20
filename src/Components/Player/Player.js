import React from "react";
import './Player.css';

class Player extends React.Component{
    render() {
        return(
            <>
                <div className="player">
                    Player: {this.props.playerValue}/{this.props.playerValueTotal}
                </div>
                <div className="cards">
                    {this.props.playerData}
                </div>
            </>
        )
    }
}
export default Player;