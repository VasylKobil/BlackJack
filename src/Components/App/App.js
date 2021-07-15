import {useContext, useEffect, useState} from 'react';
import Table from "../Table/Table";
import './App.css';
import Start from "../Start/Start";
import {requests} from "../../services/api";
import {DeckContext} from "../Context/ContextConfirm";


export default function App(){
    const {setDeck} = useContext(DeckContext);
    const [showComponent, setShowComponent] = useState(false);

    const onStart = () => setShowComponent(true);

    useEffect(()=>{
        async function getDeck(){
            const deck = await requests.getDeck();
            setDeck(deck.cards);
        }
        getDeck();

        // eslint-disable-next-line
    },[])

    return (
        <div className="App">
            {!showComponent && <Start onStart={onStart}/>}
            {showComponent && <Table/>}
        </div>
    );
}
