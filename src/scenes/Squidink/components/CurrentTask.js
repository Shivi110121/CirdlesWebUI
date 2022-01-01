import React from 'react';
import style from 'styles/Squidink/CurrentTask.scss';
import classNames from 'classnames/bind';
import "constants/api";
import {connect} from "react-redux";
import WrapperComponent from "./WrapperComponent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {requestSender} from "../util/constants";

let cx = classNames.bind(style);

export class CurrentTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            mount: false,
            taskName: "",
            taskDesc: "",
            taskAuthor: "",
            taskLab: "",
            taskProv: "",
            taskParentNuc: "",
            taskDirect: "",
            audit: "",
            primaryRadio: "232",
            secondaryRadio: "direct",
            Uncor206: "",
            Uncor208: "",
            THU: "",
            ParEle: "",
            Uncor206Styling: true,
            Uncor208Styling: true,
            THUStyling: true,
            ParEleStyling: true

        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.pullStrings = this.pullStrings.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)

    }
    componentDidMount() {
        this.pullStrings()
    }
    pullStrings() {
        return requestSender('/curtaskstrings', localStorage.getItem('user')).then((response) => {
            let body = response.data.substring(1, response.data.length - 1).split(',')
            this.setState({
                taskName: body[0],
                taskDesc: body[1],
                taskAuthor: body[2],
                taskLab: body[3],
                taskProv: body[4],
                primaryRadio: body[5].toString().trim(),
                secondaryRadio: body[6].trim(),
                Uncor206: body[7],
                Uncor208: body[8],
                THU: body[9],
                ParEle: body[10],
                Uncor206Styling: eval(body[11].trim()),
                Uncor208Styling: eval(body[12].trim()),
                THUStyling: eval(body[13].trim()),
                ParEleStyling: eval(body[14].trim()),
            })
            requestSender('/curtaskaudit', localStorage.getItem('user')).then((response) => {
                let body = response.data.replace("�", "±").replace("�","±")
                this.setState({audit: body, mount: true})
            })
        })
    }
    flipPrimary = () => {
        if(this.state.primaryRadio == "238") {
            this.setState({primaryRadio: "232"}, this.saveStrings)
        }
        else {
            this.setState({primaryRadio: "238"}, this.saveStrings)
        }
    }
    flipSecondary = () => {
        if(this.state.secondaryRadio == "direct") {
            this.setState({secondaryRadio: "indirect"}, this.saveStrings)
        }
        else {
            this.setState({secondaryRadio: "direct"}, this.saveStrings)
        }
    }
    saveStrings = () => {
        let bodyData = localStorage.getItem("user") + "!@#" + this.state.taskName + "!@#" + this.state.taskDesc + "!@#" + this.state.taskAuthor + "!@#" +
            this.state.taskLab + "!@#" + this.state.taskProv + "!@#" + this.state.primaryRadio + "!@#" + this.state.secondaryRadio
        requestSender('/settaskstrings', bodyData).then((r) => {
            this.pullStrings().then(() => {
                this.changeBoxStyling()
            })

        })
    }

    changeBoxStyling = () => {

        document.getElementsByClassName("uncor-uranium-box")[0].style.backgroundColor = (this.state.Uncor206Styling ? "#00FF0033" : "#ff00004d")
        document.getElementsByClassName("uncor-thor-box")[0].style.backgroundColor = (this.state.Uncor208Styling ? "#00FF0033" : "#ff00004d")
        document.getElementsByClassName("thor-ur-box")[0].style.backgroundColor = (this.state.THUStyling ? "#00FF0033" : "#ff00004d")
        document.getElementsByClassName("p-ele-const-box")[0].style.backgroundColor = (this.state.ParEleStyling ? "#00FF0033" : "#ff00004d")



    }
    render() {
        return (
            this.state.mount ?
            //All functions are self-contained to the wrapper with the exception of the history.push to reroute the user, which requires a reference to the React-Router
            //Because WrapperComponent is not instantiated from the router but from its child, we have to pass in the history as a prop
            <WrapperComponent stateNum={1}history={this.props.history}>
                <div className={cx('grid-container-custom-t')}>
                    <div className={cx('task-name-label')}>
                        <h3>Task Name:</h3>
                    </div>
                    <div className={cx('task-name-text')}>
                        <TextField defaultValue={this.state.taskName}
                                   label="Task name"style={{width: '80%'}} onChange={(e) => {
                                      this.setState({taskName: e.target.value}, this.saveStrings)
                        }}/>
                        <h5 className={cx('geochron-label')} style={{display: "inline", paddingTop: "10px", paddingLeft: "30px"}}>Geochron Mode</h5>
                    </div>
                    <div className={cx('description-label')}>
                        <h3>Description:</h3>
                    </div>
                    <div className={cx('description-text')}>
                        <TextField defaultValue={this.state.taskDesc}
                                   label="Task Description"style={{width: '100%'}} onChange={(e) => {
                            this.setState({taskDesc: e.target.value}, this.saveStrings)
                        }}/>
                    </div>
                    <div className={cx('author-lab-label')}>
                        <h3>Author & Lab:</h3>
                    </div>
                    <div className={cx('author-name-text')}>
                        <TextField defaultValue={this.state.taskAuthor}
                                   label="Author's Name"style={{width: '100%'}} onChange={(e) => {
                            this.setState({taskAuthor: e.target.value}, this.saveStrings)
                        }}/>
                    </div>
                    <div className={cx('lab-name-label')}>
                        <h3>Lab Name:</h3>
                    </div>
                    <div className={cx('lab-name-text')}>
                        <TextField defaultValue={this.state.taskLab}
                                   label="Lab Name"style={{width: '85%'}} onChange={(e) => {
                            this.setState({taskLab: e.target.value}, this.saveStrings)
                        }}/>
                    </div>
                    <div className={cx('provenance-label')}>
                        <h3>Provenance:</h3>
                    </div>
                    <div className={cx('provenance-text')}>
                        <TextField defaultValue={this.state.taskProv}
                                   label="Provenance"style={{width: '95%'}} onChange={(e) => {
                            this.setState({taskProv: e.target.value}, this.saveStrings)
                        }}/>
                    </div>
                    <div className={cx('directives-label')}>
                        <h3>Directives:</h3>
                    </div>
                    <div className={cx('directives-content')}>
                        <div className={cx('directives-grid-wrapper')}>
                            <div className={cx('primary-ratio')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "14px"}}>Primary daughter/parent ratio:</p>
                                </div>
                            </div>
                            <div className={cx('primary-radio')}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="primary-radio"
                                        name="controlled-radio-buttons-group"
                                        value={this.state.primaryRadio}
                                        onChange={this.flipPrimary}
                                    >
                                        <FormControlLabel value="238" control={<Radio />} label="206Pb/238U" />
                                        <FormControlLabel value="232" control={<Radio />} label="208Pb/232Th" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={cx('secondary-ratio')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "14px"}}>Calculate secondary d/p ratio:</p>
                                </div>
                            </div>
                            <div className={cx('secondary-radio')}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        row
                                        aria-label="primary-radio"
                                        name="controlled-radio-buttons-group"
                                        value={this.state.secondaryRadio}
                                        onChange={this.flipSecondary}
                                    >
                                        <FormControlLabel value="direct" control={<Radio />} label="Directly" />
                                        <FormControlLabel value="indirect" control={<Radio />} label="Indirectly" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className={cx('uranium-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px", display: "inline"}}>Uncor_206PB238U_CalibConst:</p>
                                </div>
                            </div>
                            <div className={cx('uncor-uranium-box')}  style={{backgroundColor: (this.state.Uncor206Styling ? "#00FF0033" : "#ff00004d")}}>
                                <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.Uncor206}</p></div>
                            </div>
                            <div className={cx('thorium-uranium-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px"}}>232Th238U_RM:</p>
                                </div>
                            </div>
                            <div className={cx('thor-ur-box')}  style={{backgroundColor: (this.state.THUStyling ? "#00FF0033" : "#ff00004d")}}>
                                <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.THU}</p></div>
                            </div>
                            <div className={cx('thorium-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px"}}>Uncor_208Pb232Th_CalibConst:</p>
                                </div>
                            </div>
                            <div className={cx('uncor-thor-box')}  style={{backgroundColor: (this.state.Uncor208Styling ? "#00FF0033" : "#ff00004d")}}>
                                <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.Uncor208}</p></div>
                            </div>
                            <div className={cx('parent-check')}>
                                <div style={{display: "inline"}}>
                                    <p style={{margin: "0 0 0 0 !important", fontSize: "12px"}}>ParentElement_ConcenConst:</p>
                                </div>
                            </div>
                            <div className={cx('p-ele-const-box')}  style={{backgroundColor: (this.state.ParEleStyling ? "#00FF0033" : "#ff00004d")}}>
                                <div className={cx('center-flex')}><p style={{fontSize: "12px", fontFamily: "monospace"}}>{this.state.ParEle}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('task-audit-label')}>
                        <h3>Task Audit:</h3>
                    </div>
                    <div className={cx('task-audit-content')}>
                        <div style={{overflow: "scroll", width: "100%", height:"100%"}}>
                            <p style={{wordWrap: "break-word", whiteSpace: "pre-wrap", fontFamily: "monospace"}}>
                                {this.state.audit}
                            </p>
                        </div>
                    </div>
                    <div className={cx('actions-label')}>
                        <h3>Actions:</h3>
                    </div>
                    <div className={cx('actions-content')}>
                        <div style={{paddingRight: "10px",display: "inline"}}>
                            <Button variant="contained" color={"primary"}
                                    onClick={() => {console.log("")}}>
                                Edit Current Task
                            </Button>
                        </div>
                        <Button variant="contained" color={"primary"} style={{display: "inline"}}
                                onClick={() => {console.log("")}}>
                            Save Current Task as a Squid Task '.xml' file
                        </Button>
                    </div>
                </div>
            </WrapperComponent>
            :
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%"
        }}>
            <h1>No File Selected</h1>
        </div>
        )
    }
}

export default connect()(CurrentTask);

