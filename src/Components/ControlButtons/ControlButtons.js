import {connect} from "react-redux";
import {changeBet} from "../../Redux/actions";
import {Button, BetButton} from "../Styles/Buttons";

const ControlButtons = (props) => {
    const {onclickDouDown, onclickStand, onclickHit, onclickDeal, play, bet, changeBet} = props;
    return(
        <>
            <div>
                <BetButton bgRed className={play && "disabled"} onClick={() => changeBet(5)}>5</BetButton>
                <BetButton bgYellow className={play && "disabled"} onClick={() => changeBet(15)}>15</BetButton>
                <BetButton bgWhite className={play && "disabled"} onClick={() => changeBet(30)}>30</BetButton>
            </div>
            <div>
                <Button className={(!bet ? "disabled" : "") + (play ? " hide" : "")} onClick={onclickDeal}>Deal</Button>
                <Button className={!play && "hide"} onClick={onclickHit}>Hit</Button>
                <Button className={!play && "hide"} onClick={onclickStand}>Stand</Button>
                <Button className={!play && "hide"} onClick={onclickDouDown}>Double Down</Button>
            </div>
        </>
    )
}
const mapDispatchToProps = {
    changeBet
}

export default connect(null, mapDispatchToProps)(ControlButtons);