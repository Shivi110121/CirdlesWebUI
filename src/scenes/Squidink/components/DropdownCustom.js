import React, {createRef, useRef, useState} from "react";
import '../../../styles/Squidink/dropdown-custom.scss';
import {dropdownState} from '../util/constants'
import {dropdownOptions} from "../util/constants";
export default class DropdownCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            listenerActive: false,
            hoverState: false,
            keyCount: 0
        }
        this.dropdownRef = createRef();
        this.toggleHover = this.toggleHover.bind(this);
        this.setIsActive = this.setIsActive.bind(this);
        this.clickAction = this.clickAction.bind(this);
        this.pageClick = this.pageClick.bind(this);
        this.incrementKey = this.incrementKey.bind(this);
    }
    incrementKey() {
        this.setState({keyCount: this.state.keyCount++})
        return this.state.keyCount
    }
    toggleHover() {
        this.setState({hoverState: !this.state.hoverState})
    }
    setIsActive(isActive) {
        this.setState({isActive: !isActive})
    }
    clickAction() {
            this.setIsActive(this.state.isActive);
            if(!this.state.listenerActive) {
                this.setState({listenerActive: true})
                window.addEventListener('click', this.pageClick)
            }
            else {
                this.setState({listenerActive: false})
                window.removeEventListener('click', this.pageClick)
            }


    }
    pageClick = (e) => {
        if (this.dropdownRef.current !== null && !this.dropdownRef.current.contains(e.target)) {
            this.setState({listenerActive: false})
            this.setState({isActive: false});
            window.removeEventListener('click', this.pageClick)
        }
    }

    render() {
        return (
            this.props.onClickOveride != null ?
                <div  ref={this.dropdownRef}className="menu-container-custom">
                    <button onClick={this.props.onClickOveride} className="menu-trigger-custom">
                        <span>{this.props.dropdownName}</span>
                    </button>
                </div>
                :
            <div  ref={this.dropdownRef}className="menu-container-custom">
                <button onClick={this.clickAction} className="menu-trigger-custom">
                    <span>{this.props.dropdownName}</span>
                </button>
                <nav className={`menu-custom ${this.state.isActive ? "active" : "inactive"}`}>
                    <ul onClick={this.clickAction} key={1234*Math.random()}>
                        {
                            this.props.dropdownOptions.map((options) => {
                                if(dropdownState[this.props.stateNum][options.id-1] == 0) {
                                    return (
                                        <li style={{backgroundColor: "#E7EAEF", cursor:"not-allowed"}}className={"dropdown-context-custom"}key={options.id + 1000*Math.random()}>
                                            <a className={"dropdown-context-custom"}key={options.id+2000*Math.random()}> <s>{options.title}</s> </a>
                                        </li>
                                    )
                                }

                                else if(this.props.functionOverride != undefined && this.props.functionOverride.has(options.id.toString())) {
                                        return(
                                            <li className={"dropdown-context-custom"}key={options.id+1000 * Math.random()}>
                                                <a className={"dropdown-context-custom"}key={options.id+2000 * Math.random()}onClick={this.props.functionOverride.get(options.id.toString()).function}>{options.title} </a>
                                            </li>
                                        )}
                                else {
                                        return(
                                            <li className={"dropdown-context-custom"}key={options.id+1000*Math.random()}>
                                                <a className={"dropdown-context-custom"}key={options.id+2000*Math.random()}onClick={options.onclick}>{options.title}</a>
                                            </li>
                                        );
                                    }
                                })}
                    </ul>
                </nav>
            </div>

        );
    }
}

