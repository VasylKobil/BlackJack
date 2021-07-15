import './Start.css';

export default function Start(props){
    const onStart = props.onStart

    return(
        <div className="content">
            <div className="title">
                <h1>Black Jack</h1>
            </div>
            <div className="start">
                <button onClick={onStart}>Start Game</button>
            </div>
        </div>
    )
}