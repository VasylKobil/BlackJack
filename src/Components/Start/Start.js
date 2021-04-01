import React, {useState} from 'react';
import './Start.css';
import DeckOfCards from "../../services/api";

function Start(props){
    const [showContent, setShowContent] = useState(true);

    const onStart = () => {
        const promise = DeckOfCards.generateDeck();
        promise.then((deck) => {
            props.parentCallBack(deck);
            setShowContent(false);
        });
    }

    return(
        <div className="content" style={{display: showContent ? 'block' : 'none'}}>
            <div className="title">
                <h1>Black Jack</h1>
            </div>
            <div className="start">
                <button onClick={onStart}>Start Game</button>
            </div>
        </div>
    )
}

export default Start;