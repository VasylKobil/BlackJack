import styled from 'styled-components';

export const BetButton = styled.button`
    color: black;
    border-radius: 50px;
    border: 1px black solid;
    height: 50px;
    width: 50px;
    margin: 0 5px 10px 0;
    background: ${props => (props.bgRed && 'red')} ${props => (props.bgYellow && 'yellow')} ${props => (props.bgWhite && 'white')};
    &:hover {
    cursor: pointer
    }
    &.disabled {
    background: lightgreen;
        &:hover {
        cursor: default;
        }
    }
`

export const Button = styled.button`
    width: auto;
    height: 50px;
    border: 1px black solid;
    border-radius: 10px;
    background: green;
    color: white;
    font-size: 15px;
    &.hide{
    display: none;
    }
    &.disabled {
    background: lightgreen;
        &:hover {
        cursor: default;
        }
    }
    &:hover {
    cursor: pointer
    }
`
