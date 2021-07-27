import {useState} from 'react';
import './App.css';
import Start from "../Start/Start";
import ControlGame from "../Controls/ControlGame";


export default function App(){
    const [showComponent, setShowComponent] = useState(false);

    const onStart = () => setShowComponent(true);

    return (
        <div className="App">
            {!showComponent && <Start onStart={onStart}/>}
            {showComponent && <ControlGame/>}
        </div>
    );
}
