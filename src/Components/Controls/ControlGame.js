import {useEffect, useState} from "react";
import Table from "../Table/Table";
import {connect} from 'react-redux'
import {requests} from "../../services/api";
import {saveDeck} from "../../Redux/actions";

const ControlGame = (props) => {
    const [showTable,setShowTable] = useState(false);

    useEffect(()=>{
        async function getDeck(){
            const deck = await requests.getDeck();
            props.saveDeck(deck.cards);
            setShowTable(true);
        }
        getDeck();

        // eslint-disable-next-line
    },[])

    return(
        <>
            {showTable && <Table/>}
        </>
    )
}
const mapDispatchToProps = {
    saveDeck
}

export default connect(null, mapDispatchToProps)(ControlGame)