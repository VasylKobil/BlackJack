import './Player.css';

export default function Player (props){
    const {playerValue, playerValueTotal, playerData} = props;

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