import React from 'react';
import style from 'styles/Squidink/Main.scss';
import classNames from 'classnames/bind';
import "constants/api";
import {connect} from "react-redux";
import WrapperComponent from "./WrapperComponent";

let cx = classNames.bind(style);

export class Main extends React.Component {
    render() {
        return (
            //All functions are self-contained to the wrapper with the exception of the history.push to reroute the user, which requires a reference to the React-Router
            //Because WrapperComponent is not instantiated from the router but from its child, we have to pass in the history as a prop
            <WrapperComponent stateNum={0}history={this.props.history}/>
        )
    }
}

export default connect()(Main);

