import React, {createRef, useRef, useState} from "react";
import '../../../styles/Squidink/ContextMenu.scss';
export default class DropdownCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outputMap: []
        }
        this.generateContent = this.generateContent.bind(this)
    }
    generateContent() {
        this.state.outputMap = []
        for(let i = 0; i < this.props.contextContent.length; i++) {
            this.state.outputMap.push((<li key={Math.random()} onClick={this.props.functions[i]} className="menuOpt">{this.props.contextContent[i]}</li>))
        }
    }


    render() {
        this.generateContent()
        return (
            <>
                {
                    this.props.menuActive ?
                        <ul className="menu" style={{top: this.props.yPos, left: this.props.xPos, position: "absolute"}}>
                            {
                                this.state.outputMap.map((content) => {
                                    return content
                                })
                            }
                        </ul>
                        : null
                }
            </>
        )
    }
}

