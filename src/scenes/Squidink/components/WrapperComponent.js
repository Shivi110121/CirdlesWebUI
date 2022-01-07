import React, {createRef} from 'react';
import ReactLoading from 'react-loading';
import ResizePanel from "./ResizePanel";
import style from 'styles/Squidink/Main.scss';
import classNames from 'classnames/bind';
import DropdownCustom from "./DropdownCustom";
import "constants/api";
import {BASE_ROUTE, dropdownOptions, MANAGEPROJECT_ROUTE, requestSender} from "../util/constants";
import {FILEBROWSER_URL, SQUIDINK_ENDPOINT} from "constants/api";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


let cx = classNames.bind(style);
class WrapperComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showfbr: true,
            adragging: false,
            loading: false,
            modalOpen: false,
            saveAsModalOpen: false,
            saveAsName: "",
        };
        this.hidediv = this.hidediv.bind(this);
        this.hideinternal = this.hideinternal.bind(this);
        this.showinternal = this.showinternal.bind(this);
        this.handClose = this.handClose.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.openAction = this.openAction.bind(this);
        this.saveAsAction = this.saveAsAction.bind(this);
        this.messageFunction = this.messageFunction.bind(this);
        this.saveAsNameOnChange = this.saveAsNameOnChange.bind(this);
        this.saveAsClick = this.saveAsClick.bind(this);

    }
    messageFunction = (e) => {
        try {
            let apiCheck = e.data.toString().split(':');
            if (e.origin == FILEBROWSER_URL) {
                if (e.data.toString().length != 0 && apiCheck[0] != "api") {
                    this.setState({loading: true})
                    axios.post(SQUIDINK_ENDPOINT + '/OpenServlet/O', localStorage.getItem("user")
                        + ":" + e.data, {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    }).then(() => {
                        this.setState({showfbr: false});
                        this.setState({loading: false});
                        localStorage.setItem("profileFilePath", e.data);
                        //Remove .squid and / which we'll reinclude when sent to the server
                        this.setState({saveAsName: this.profilePathIsNull()})
                        console.log(this.state.saveAsName)
                        window.location.href = MANAGEPROJECT_ROUTE;

                    }).catch((er) => {
                        console.log(er)
                        this.setState({loading: false});
                    })
                } else if (apiCheck[0] == "api") {
                    localStorage.setItem("user", apiCheck[1]);
                    axios.post(SQUIDINK_ENDPOINT + '/api', apiCheck[1], {
                        headers: {
                            'Content-Type': 'text/plain'
                        }
                    }).catch((er) => {
                        console.log(er)
                    })
                } else {
                    requestSender('/close', localStorage.getItem("user")).then((d) => {
                        if (d.data == 1) {
                            localStorage.setItem("user", "")
                            window.location.href = BASE_ROUTE;
                        }
                    })
                }
            }
        }
        catch(e) {
            console.log(e)
            localStorage.setItem("user", "")
        }
    }
    saveAsClick() {
        try {
            requestSender('/sapreflight',localStorage.getItem("user")
                + ":" + this.state.saveAsName + ".squid")
                .then((d) => {
                    return requestSender('/saveAsServlet',localStorage.getItem("user")
                        + ":" + this.state.saveAsName + ".squid").then(this.setState({saveAsModalOpen: false}))
                },(e) => {
                    if(confirm("This file already exists, are you sure you want to overwrite it?")) {
                        return requestSender('/saveAsServlet',localStorage.getItem("user")
                            + ":" + this.state.saveAsName + ".squid").then(this.setState({saveAsModalOpen: false}))
                    }
                    return null;
                }).then((d) => {
                    localStorage.setItem("profileFilePath", "/" + this.state.saveAsName + ".squid")
                    location.reload();
                },
                (e) => {

                })
        }
        catch(e) {
            console.log(e)
            localStorage.setItem("user", "")
        }
    }
    componentDidMount() {
        try {
            window.addEventListener('message', this.messageFunction, false);
            this.setState({saveAsName: this.profilePathIsNull()})
            if (localStorage.getItem("profileFilePath").includes("xml") || localStorage.getItem("profileFilePath").includes("zip")) {
                this.setState({saveAsName: "NO_NAME"})
                localStorage.setItem("profileFilePath", "NO_NAME")
            }
        } catch (e)
            {
                localStorage.setItem("profileFilePath", "NO_NAME")
                console.log(e)
            }
    }
    componentWillUnmount() {
        window.removeEventListener('message', this.messageFunction, false)
    }
    saveAsNameOnChange(event) {
        let regex = /[-_0-9a-zA-Z]+/g;
        if (event.target.value == (event.target.value.match(regex) || []).join('') && event.target.value.length != 0) {
                this.setState({saveAsName: event.target.value})
        }
    }
    profilePathIsNull = () => {
        try {
            //Should catch the NullPointerE for profileFilePath.replace, meaning the item does not exist, in which case "" is fine, otherwise just
            //return it
            return localStorage.getItem("profileFilePath").replace(".squid", "").replace("/", "")
        }
        catch(e) {
            return "";
        }
    }
    async handClose() {
        this.setState({modalOpen: false})
    }

    async hidediv() {
        this.setState({showfbr: !this.state.showfbr});
    }

    async hideinternal() {
        console.log('hide')
        this.setState({adragging: true})
    }

    async showinternal() {
        console.log('show')
        this.setState({adragging: false})
    }

    async openAction() {
        this.setState({modalOpen: true})
    }
    async saveAsAction() {
        this.setState({saveAsModalOpen: true})
    }

    render() {
        let fOvd = new Map();
        fOvd.set('2', {function: this.openAction})
        fOvd.set('3', {function: this.openAction})
        fOvd.set('6', {function: this.saveAsAction})
        return(
            <>{this.state.loading ?
                <div>
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        width: '100%'
                    }}>
                        <div>
                            <ReactLoading type={'spin'} color={'#000000'}/>
                        </div>
                    </div>
                    <div style={{
                        position: 'absolute',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'calc(100% + 8em)',
                        width: '100%'
                    }}>
                        <h1>Your file is loading</h1>
                    </div>
                </div>
                : <div className={cx('container-custom')} style={this.props.style}>
                    <Modal open={this.state.modalOpen} onClose={this.handClose}>{body}</Modal>
                    <Modal open={this.state.saveAsModalOpen} onClose={this.saveAsAction}>{
                        <div style={{position: 'absolute', width: '600px', height: "150px", top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '2px solid #000', backgroundColor: 'white', padding: '4px'}} className={'paper'}>
                        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center", height: "100%", width: "100%"}}>
                            <p id="simple-modal-description" style={{paddingTop: "15px", paddingRight: "10px", width:"1fr"}}>
                                Enter a file name:
                            </p>
                            <TextField value={this.state.saveAsName} onChange={this.saveAsNameOnChange} style={{width: "45%", paddingRight: "10px"}}/>
                            <div style={{paddingRight: "10px"}}>
                                <Button variant="contained" color="primary" onClick={this.saveAsClick}>Save</Button>
                            </div>
                            <Button variant="contained" color="primary" onClick={() => {
                                this.setState({saveAsModalOpen: false,
                                                    saveAsName:  this.profilePathIsNull()});
                            }}>Cancel</Button>
                        </div>
                    </div>}</Modal>
                    <div className={cx('body')}>
                        {this.state.showfbr ?
                            <ResizePanel onDragStart={this.hideinternal} onDragEnd={this.showinternal} direction="e"
                                         style={{id: 'fbr', flexGrow: '1'}}>
                                <div className={cx('sidebar', 'withMargin', 'panel')}>
                                    <iframe id='iframee'
                                            style={{
                                                display: 'flex',
                                                flexGrow: '1',
                                                overflow: 'auto',
                                                height: '100%',
                                                width: `100%`
                                            }}
                                            src={FILEBROWSER_URL}></iframe>

                                </div>
                            </ResizePanel>
                            : null}
                        <div className={cx('content')}
                             style={{display: 'flex', overflow: 'scroll !important'}}>
                            <div className={cx('header-custom', 'panel-custom')}
                                 style={{position: 'fixed', top: '40', zIndex: 10}}>
                                <div className="rownav" style={{display: 'flex'}}>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum} dropdownName="Filebrowser"
                                                    onClickOveride={this.hidediv}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Project"
                                                    dropdownOptions={dropdownOptions[0]}
                                                    functionOverride={fOvd}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Data"
                                                    dropdownOptions={dropdownOptions[1]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Task"
                                                    dropdownOptions={dropdownOptions[2]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Isotopes"
                                                    dropdownOptions={dropdownOptions[3]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Expressions"
                                                    dropdownOptions={dropdownOptions[4]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Common Pb"
                                                    dropdownOptions={dropdownOptions[5]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Interpretations"
                                                    dropdownOptions={dropdownOptions[6]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Reports"
                                                    dropdownOptions={dropdownOptions[7]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Archiving"
                                                    dropdownOptions={dropdownOptions[8]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="Parameter"
                                                    dropdownOptions={dropdownOptions[9]}></DropdownCustom>
                                    <DropdownCustom stateNum={this.profilePathIsNull().includes("NO_NAME") ? 2 : this.props.stateNum}dropdownName="About"
                                                    dropdownOptions={dropdownOptions[10]}></DropdownCustom>
                                </div>
                            </div>

                            {this.props.children}
                        </div>

                    </div>
                </div>}
            </>
        );
    }
}


const body = (
    <div style={{
        position: 'absolute',
        width: '400',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #000',
        backgroundColor: 'white',
        padding: '4px'
    }}
         className={'paper'}>
        <p id="simple-modal-description">
            Open / New File Actions are handled in the Filebrowser! Try double-clicking an appropriate file or
            viewing the context-menu with right-click.
        </p>
    </div>
);
export default WrapperComponent;