import React from 'react';
import Table from "../Table/Table";
import './App.css';

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>BlackJack</h1>
                </header>
                <Table/>
            </div>
        );
    }
}

export default App;
