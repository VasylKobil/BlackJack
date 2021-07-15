import React, {useState, createContext} from 'react'

export const DeckContext = createContext('');

const DeckContextProvider = (props) => {
    const [deck, setDeck] = useState(props.deck);

    return (
        <DeckContext.Provider value={{deck, setDeck}}>
            {props.children}
        </DeckContext.Provider>
    )
}

export default DeckContextProvider;