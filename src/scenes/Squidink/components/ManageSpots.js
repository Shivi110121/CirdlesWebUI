import React from "react";
import {connect} from "react-redux";
import {requestSender, testFunction} from "../util/constants";
import classNames from "classnames/bind";
import style from "styles/Squidink/ManageSpots.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import WrapperComponent from "./WrapperComponent";
import ContextMenu from "./ContextMenu";

let cx = classNames.bind(style);

export class ManageSpots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //State-initializer, initialize state vars here for reference from html
            filterSpotsSelector: "All Samples",
            filterSpotsOptions: [],
            rmSpots: [],
            rmCount: 0,
            rmFilter: "N/A",
            crmSpots: [],
            crmCount: 0,
            crmFilter: "N/A",
            spotName: "no spot selected",
            rmModel: "Model1",
            crmModel: "Model1",
            spotsTable: [],
            maxSampleCount: 0,
            currentSampleCount: 0,
            showfbr: true,
            adragging: false,
            loading: false,
            modalOpen: false,
            xPos: '0px',
            yPos: '0px',
            menuActive: false,
            currentSpot: null,
            rmModels: null,
            crmModels: null,
            data1: 0,
            data2: 0,
            data3: 0,
            data4: 0,
            uppm: null,
            thppm: null,
            eudit: null,
            auditChanges: "",
            contextContent: [],
            leftTargetElement: null,
            rightTargetElement: null,
            cleared: false,
            isDeleted: false,
            mount: false,


        };
        //If a component requires 'this.' context, it's easiest to bind it, i.e.
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateTable = this.generateTable.bind(this);
        this.copyRMButton = this.copyRMButton.bind(this);
        this.copyCRMButton = this.copyCRMButton.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLeftContextMenu = this.handleLeftContextMenu.bind(this)
        this.handleRightContextMenu = this.handleRightContextMenu.bind(this)
        this.pullContent = this.pullContent.bind(this);
        this.handleRightActiveClick = this.handleRightActiveClick.bind(this)
        this.handleLeftActiveClick = this.handleLeftActiveClick.bind(this)
        this.spotNameOnChange = this.spotNameOnChange.bind(this);
        this.clearListRM = this.clearListRM.bind(this);
        this.clearListCRM = this.clearListCRM.bind(this);
        this.saveNameClick = this.saveNameClick.bind(this);
        this.restoreSpot = this.restoreSpot.bind(this);
        this.removeListeners = this.removeListeners.bind(this)
    }

    handleChange = (event) => {
        switch (event.target.name) {
            case "filterSpotsSelector":
                this.updateTable(event.target.value);
                this.setState({filterSpotsSelector: event.target.value})
                break;
            case "rmModel":
                this.updateModel(event, event.target.value)
                this.setState({rmModel: event.target.value})
                break;
            case "crmModel":
                this.updateModel(event, event.target.value)
                this.setState({crmModel: event.target.value})
                break;
        }
    }

    pullModelData(arg) {
        requestSender('/spotsdata', localStorage.getItem("user") + "!@#" + this.state.rmModel + "!@#" + this.state.crmModel).then((body) => {
            let response = body.data.split("\n")
            let parsedAudit = JSON.parse(response[0])[0]
            document.body.style.cursor = 'default'
            if (parsedAudit.includes("F")) {
                if(this.state.rmModel != "NONE v.1.0 <Built-in>" && this.state.crmModel != "NONE v.1.0 <Built-in>") {
                    window.alert("This reference material model is missing meaningful age data. \n\nPlease choose another model")
                }
                this.setState({
                    data1: 0,
                    data2: 0,
                    data3: 0,
                    data4: 0
                })
            } else {
                if (parsedAudit.includes(1)) {
                    if(this.state.rmModel != "NONE v.1.0 <Built-in>" && this.state.crmModel != "NONE v.1.0 <Built-in>") {
                        window.alert("This reference material model is missing * key age(s), so Squid3 is temporarily substituting values (shown in red) and refreshing as follows\n\n" + response[0][1])
                    }
                    this.setState({auditChanges: JSON.parse(response[0])[1]})
                }

                this.setState({
                    data1: parseFloat(response[1].replace(/['"]+/g, '')).toFixed(3),
                    data2: parseFloat(response[2].replace(/['"]+/g, '')).toFixed(3),
                    data3: parseFloat(response[3].replace(/['"]+/g, '')).toFixed(3),
                    data4: parseFloat(response[4].replace(/['"]+/g, '')).toFixed(3)
                })
                if (arg != "CRM") {
                    this.setState({
                        uppm: parseFloat(response[5].replace(/['"]+/g, '')).toFixed(3),
                        thppm: parseFloat(response[6].replace(/['"]+/g, '')).toFixed(3)
                    })
                }
            }
            if(Number.isNaN(parseInt(this.state.uppm)) || Number.isNaN(parseInt(this.state.thppm))) {
                this.setState({
                    uppm: 0,
                    thppm: 0
                })
            }

        })
    }

    updateModel(event, modelName) {
        document.body.style.cursor = 'wait'
        return requestSender('/spotsmodels', localStorage.getItem("user") + "!@#" + event.target.name + "!@#" + modelName).then(() => {
            this.pullModelData();
        })
    }

    generateRMTable(value) {
        return (
            <tr>
                <td>
                    {value[0]}
                </td>
                <td>
                    {value[1]}
                </td>
                <td>
                    {value[2]}
                </td>
            </tr>
        )
    }

    generateTable(value) {
        {
            return (
                <tr>
                    <td id="name">
                        {value[0]}
                    </td>
                    <td>
                        {value[1]}
                    </td>
                    <td>
                        {value[2]}
                    </td>
                    <td>
                        {value[3]}
                    </td>
                    <td>
                        {value[4]}
                    </td>
                </tr>
            )
        }
    }

    updateTable(event) {
        requestSender('/spotsupdate', localStorage.getItem("user") + "!@#" + event).then((body) => {
            this.setState({
                spotsTable: body.data,
                currentSampleCount: body.data.length,
                currentSpot: null,
                spotName: "no spot selected"
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    pullContent(arg, clearListAction) {
        return requestSender('/spotspull', localStorage.getItem("user")).then((body) => {
            //Because all of the responses come from a single servlet, must split/remove new line
            let arr = (body.data.split("\n"))
            console.log(arr)
            if(clearListAction) {
                this.setState({
                    filterSpotsOptions: JSON.parse(arr[0].trim()),
                    rmFilter: JSON.parse(arr[4]),
                    crmFilter: JSON.parse(arr[5])
                })
            }
            else {
                this.setState({
                    filterSpotsOptions: JSON.parse(arr[0].trim()),
                    spotsTable: JSON.parse(arr[1].trim()),
                    rmFilter: JSON.parse(arr[4]),
                    crmFilter: JSON.parse(arr[5])
                })
            }
            if (this.state.rmFilter != "NO FILTER" && this.state.rmFilter.length != 0) {
                this.setState({
                    rmSpots: JSON.parse(arr[2].trim()),
                    rmCount: JSON.parse(arr[2].trim()).length
                })
            }
            if (this.state.crmFilter != "NO FILTER" && this.state.crmFilter.length != 0) {
                this.setState({
                    crmSpots: JSON.parse(arr[3].trim()),
                    crmCount: JSON.parse(arr[3].trim()).length
                })
            }
            if(!clearListAction) {
                this.setState({
                    maxSampleCount: JSON.parse(arr[1].trim()).length,
                    currentSampleCount: JSON.parse(arr[1].trim()).length
                })
            }
            let model1 = arr[6].replace("\r", "").split("!@#")
            let model2 = arr[7].replace("\r", "").split("!@#")
            model2.push("NONE v.1.0 <Built-in>")
            this.setState({
                rmModels: model1,
                crmModels: model2,
                rmModel: JSON.parse(arr[8]),
                crmModel: JSON.parse(arr[9]),
                isDeleted: !arr[10],
            })
            this.pullModelData(arg);
            this.setState({mount: true})
            this.removeListeners()
            const leftTable = document.getElementById('leftTable')
            const RMTable = document.getElementById('RMTable')
            const CRMTable = document.getElementById('CRMTable')
            leftTable.addEventListener('contextmenu', this.handleLeftContextMenu)
            RMTable.addEventListener('contextmenu', this.handleRightContextMenu)
            CRMTable.addEventListener('contextmenu', this.handleRightContextMenu)
            leftTable.addEventListener('click', this.handleLeftActiveClick)
            RMTable.addEventListener('click', this.handleRightActiveClick)
            CRMTable.addEventListener('click', this.handleRightActiveClick)
        }).catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        this.pullContent()
        document.addEventListener("click", this.handleClick);
    }

    handleLeftActiveClick(event) {
        if (this.state.leftTargetElement != null) {
            this.state.leftTargetElement.classList.remove("activeSelection")
        }
        let childElements = event.target.parentElement.children;
        for (let i = 0; i < childElements.length; i++) {
            if (childElements[i].id == "name") {
                this.setState({
                    spotName: childElements[i].textContent.trim(),
                    currentSpot: childElements[i]
                })
            }
        }
        event.target.parentElement.classList.add("activeSelection")
        this.setState({
            leftTargetElement: event.target.parentElement,
        })
    }

    handleRightActiveClick(event) {
        if (this.state.rightTargetElement != null) {
            this.state.rightTargetElement.classList.remove("activeSelection")
        }
        event.target.parentElement.classList.add("activeSelection")
        this.setState({
            rightTargetElement: event.target.parentElement,
        })
    }

    removeListeners() {
        const leftTable = document.getElementById('leftTable')
        const RMTable = document.getElementById('RMTable')
        const CRMTable = document.getElementById('CRMTable')
        leftTable.removeEventListener('contextmenu', this.handleLeftContextMenu)
        RMTable.removeEventListener('contextmenu', this.handleRightContextMenu)
        CRMTable.removeEventListener('contextmenu', this.handleRightContextMenu)
        leftTable.removeEventListener('click', this.handleLeftActiveClick)
        RMTable.removeEventListener('click', this.handleRightActiveClick)
        CRMTable.removeEventListener('click', this.handleRightActiveClick)
    }

    componentWillUnmount() {
        this.removeListeners()
        document.removeEventListener("click", this.handleClick);
    }

    handleLeftContextMenu(event) {
        if (event.target.parentElement.parentElement.id != "header") {
            //Catches the standard context menu action
            event.preventDefault();
            if (this.state.leftTargetElement != null) {
                this.state.leftTargetElement.classList.remove("activeSelection")
            }
            event.target.parentElement.classList.add("activeSelection")
            //Iterate through children of the target's parent to identify the name-identifying element
            let childElements = event.target.parentElement.children;
            for (let i = 0; i < childElements.length; i++) {
                if (childElements[i].id == "name") {
                    this.setState({spotName: childElements[i].textContent.trim()})
                    this.setState({currentSpot: childElements[i]})
                }
            }
            let funcArr = [];
            if (this.state.isDeleted) {
                funcArr.push(() => this.restoreSpot())
                funcArr.push(() => this.removeSpot(this.state.spotName))
            } else {
                funcArr.push(() => this.removeSpot(this.state.spotName))
            }
            funcArr.push(() => testFunction())
            funcArr.push(() => testFunction())
            this.setState({contextContentFunctions: funcArr})
            this.setState({
                contextContent: this.state.isDeleted ? ["Restore removed spot(s)", "Remove selected spot.", "Split Prawn file starting from this run, using original unedited and without duplicates notes.", "Split prawn file starting from this run, using this edited list with duplicates noted."] : ["Remove selected spot.", "Split Prawn file starting from this run, using original unedited and without duplicates notes.", "Split prawn file starting from this run, using this edited list with duplicates noted."],
                xPos: event.pageX + 'px',
                yPos: (event.pageY - 40) + 'px',
                leftTargetElement: event.target.parentElement,
                menuActive: true
            })

        }
    }

    handleRightContextMenu(event) {
        if (event.target.parentElement.parentElement.id != "header") {
            let table = event.target.parentElement.parentElement.parentElement
            //Catches the standard context menu action
            event.preventDefault();
            if (this.state.rightTargetElement != null) {
                this.state.rightTargetElement.classList.remove("activeSelection")
            }
            event.target.parentElement.classList.add("activeSelection")
            if (table.id == "RMTable") {
                let funcArr = [];
                let func = () => {
                    this.clearListRM(null, "RM")
                }
                funcArr.push(func)
                this.setState({contextContentFunctions: funcArr})
            }
            else {
                let funcArr = [];
                let func = () => {
                    this.clearListCRM(null, "CRM")
                }
                funcArr.push(func)
                this.setState({contextContentFunctions: funcArr})
            }
            this.setState({
                contextContent: ["Clear list."],
                xPos: event.pageX + 'px',
                yPos: (event.pageY - 40) + 'px',
                rightTargetElement: event.target.parentElement,
                menuActive: true
            })
        }
    }

    removeSpot(name) {
        document.body.style.cursor = 'wait'
        requestSender('/removespot', localStorage.getItem("user") + ":" + name).then(() => {
            this.pullContent().then(() => {
                this.setState({
                    filterSpotsSelector: "All Samples"
                })
                document.body.style.cursor = 'default'
                this.setState({isDeleted: true});
            })
        })
    }

    restoreSpot() {
        document.body.style.cursor = 'wait'
        requestSender('/restorespot', localStorage.getItem("user")).then(() => {
            this.pullContent().then(() => {
                document.body.style.cursor = 'default'
                this.setState({isDeleted: false});
            })
        })
    }

    handleClick(event) {
        //on a click action hide the menu
        if (this.state.menuActive) {
            this.setState({menuActive: false})
        }
    }

    saveNameClick(event) {
        if (this.state.spotName.length > 0) {
            document.body.style.cursor = 'wait'
            requestSender('/spotsname', localStorage.getItem("user") + "!@#" + this.state.currentSpot.textContent + "!@#" +
                this.state.spotName).then(() => {
                document.body.style.cursor = 'default'
                this.pullContent();
            })
        }
    }

    buttonPost(event, arg, contentOpt) {
        if (contentOpt != null && contentOpt == "clear") {
            return requestSender('/spotstables', localStorage.getItem("user") + "!@#" + arg + "!@#" + contentOpt)
        }
        return requestSender('/spotstables', localStorage.getItem("user") + "!@#" + arg + "!@#" + this.state.filterSpotsSelector)
    }

    copyRMButton(event, arg) {
        if (this.state.filterSpotsSelector != "All Samples") {
            this.buttonPost(event, arg).then(() => {
                this.pullModelData();
                this.setState({
                    rmSpots: this.state.spotsTable,
                    rmCount: this.state.currentSampleCount,
                    rmFilter: this.state.filterSpotsSelector
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    copyCRMButton(event, arg) {
        if (this.state.filterSpotsSelector != "All Samples") {
            this.buttonPost(event, arg).then(() => {
                this.pullModelData();
                this.setState({
                    crmSpots: this.state.spotsTable,
                    crmCount: this.state.currentSampleCount,
                    crmFilter: this.state.filterSpotsSelector
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    clearListRM(event, arg) {
        this.buttonPost(event, arg, "clear").then(() => {
            this.pullContent(arg, true).then(() => {
                this.setState({
                    rmSpots: [],
                    rmCount: 0,
                    rmFilter: "NO FILTER"
                })
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    clearListCRM(event, arg) {
        this.buttonPost(event, arg, "clear").then(() => {
            this.pullContent(arg, true).then(() => {
                this.setState({
                    crmSpots: [],
                    crmCount: 0,
                    crmFilter: "NO FILTER",
                    uppm: 0,
                    thppm: 0
                })
            })

        }).catch((err) => {
            console.log(err);
        })
    }

    spotNameOnChange(event) {
        this.setState({spotName: event.target.value})
    }

    render() {
        return (
            <>
                {
                    //Dont generate elements until project spots pull is complete for defaultVal generation
                    this.state.mount ?
                        <WrapperComponent style={{overflow: "scroll"}} history={this.props.history} stateNum={1}>
                            <ContextMenu functions={this.state.contextContentFunctions}
                                         contextContent={this.state.contextContent} xPos={this.state.xPos}
                                         yPos={this.state.yPos} menuActive={this.state.menuActive}/>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%"
                            }}>
                                <div className={cx('grid-container-spots')}>
                                    <div className={cx('filter-spots-label')}>
                                        <h6 style={{display: "inline"}}>Filter Spots by Sample name:</h6>
                                        <FormControl style={{padding: "0 0 0 40px"}}>
                                            <Select
                                                labelId="filterSpotsSelector-label"
                                                id="filterSpotsSelector"
                                                name="filterSpotsSelector"
                                                value={this.state.filterSpotsSelector}
                                                onChange={this.handleChange}
                                            >
                                                {
                                                    this.state.filterSpotsOptions.map((value) => {
                                                        return (<MenuItem value={value}>{value}</MenuItem>)
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <p style={{
                                            padding: "0 0 0 40px",
                                            display: "inline",
                                            fontSize: "smaller"
                                        }}>{this.state.currentSampleCount + "/" + this.state.maxSampleCount} shown</p>

                                    </div>
                                    <div className={cx('table-left-custom')} style={{display: 'inline'}}>
                                        <div style={{overflowY: "auto", height: "40em"}}>
                                            <table id="leftTable" style={{width: "100%"}}>
                                                <thead id="header">
                                                <tr>
                                                    <th>
                                                        Spot Name
                                                    </th>
                                                    <th>
                                                        Date
                                                    </th>
                                                    <th>
                                                        Time
                                                    </th>
                                                    <th>
                                                        Peaks
                                                    </th>
                                                    <th>
                                                        Scans
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    this.state.spotsTable.map(this.generateTable.bind(null))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={cx('hint-wrapper')}>
                                            <div className={cx('hint-wrapper')} style={{width: "100%"}}>
                                                <p style={{
                                                    fontSize: "smaller",
                                                    display: "block",
                                                    paddingRight: "10px"
                                                }}>
                                                    Hint: To remove a spot or split session, right mouse-click on spot
                                                    for menu.</p>
                                            </div>
                                            <h6 style={{display: "inline", paddingRight: "5%"}}> Edit Spot Name: </h6>
                                            <TextField value={this.state.spotName} onChange={this.spotNameOnChange}
                                                       style={{paddingRight: "5%"}}/>
                                            <Button name="spotNameButton" variant="contained" color="primary"
                                                    onClick={this.saveNameClick}>
                                                Save Name</Button>
                                        </div>
                                    </div>
                                    <div className={cx('rm-spots-label')}>
                                        <div className={cx('hint-wrapper')}>
                                            <h5 style={{
                                                fontSize: "17px",
                                                paddingTop: "15px",
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "center"
                                            }}>Isotopic Reference Material (RM) Spots</h5>
                                            <h6 style={{color: "#000000"}}>
                                                <b>{this.state.rmCount + " "}</b>
                                                RM Spots selected using filter
                                                <b>{" " + this.state.rmFilter}</b>
                                            </h6>
                                        </div>
                                        <div style={{overflowY: "scroll", maxHeight: "15em"}}>
                                            <table id="RMTable">
                                                <thead id="header">
                                                <tr>
                                                    <th>
                                                        Ref Mat Name
                                                    </th>
                                                    <th>
                                                        Date
                                                    </th>
                                                    <th>
                                                        Time
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.rmSpots.map(this.generateRMTable.bind(null))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={cx('hint-wrapper')}>
                                            <p style={{fontSize: "smaller", display: "inline"}}>Hint: To clear the list,
                                                right mouse-click on it anywhere for menu.</p>

                                                <Button id="RM" variant="contained" color="primary"
                                                        onClick={(event) => {
                                                            this.copyRMButton(event, "RM")
                                                        }}>Copy Filtered Spots to RM Spots.</Button>

                                        </div>
                                        <div className={cx('hint-wrapper')}>
                                            <h5 style={{fontSize: "17px", paddingTop: "15px"}}>Concentration Reference
                                                Material (CRM) Spots</h5>
                                            <h6 style={{color: "#000000"}}>
                                                <b>{this.state.crmCount + " "}</b>
                                                CRM Spots selected using filter
                                                <b>{" " + this.state.crmFilter}</b>
                                            </h6>
                                        </div>
                                        <div style={{overflowY: "scroll", maxHeight: "15em"}}>
                                            <table id="CRMTable">
                                                <thead id="header">
                                                <tr>
                                                    <th>
                                                        Ref Mat Name
                                                    </th>
                                                    <th>
                                                        Date
                                                    </th>
                                                    <th>
                                                        Time
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.crmSpots.map(this.generateRMTable.bind(null))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className={cx('hint-wrapper')}>
                                            <p style={{fontSize: "smaller", display: "inline"}}>Hint: To clear the list,
                                                right mouse-click on it anywhere for menu.</p>

                                                <Button id="CRM" variant="contained" color="primary"
                                                        onClick={(event) => {
                                                            this.copyCRMButton(event, "CRM")
                                                        }}>Copy Filtered Spots to CRM Spots.</Button>

                                        </div>
                                    </div>
                                    <div className={cx('isotopic-rm-label')}>
                                        <h6>Select Isotopic RM Model:</h6>
                                        <FormControl style={{width: "90%"}}>
                                            <Select
                                                labelId="isotopic-RM-label"
                                                id="rmModel"
                                                name="rmModel"
                                                value={this.state.rmModel}
                                                onChange={this.handleChange}
                                            >
                                                {
                                                    this.state.rmModels.map((value) => {
                                                        if (value != "NONE v.1.0 <Built-in>")
                                                            return (<MenuItem value={value}>{value}</MenuItem>)
                                                        else {
                                                            return (<MenuItem disabled={true}
                                                                              value={value}>{value}</MenuItem>)
                                                        }
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={cx('isotopic-rm-list')}>
                                        <div className={cx('grid-list')}>
                                            <h5 className={cx('grid-list-item-left')}>
                                                206Pb/238U date (Ma):
                                            </h5>
                                            <b className={cx('grid-list-item-right')}>
                                                {this.state.data1}
                                            </b>
                                        </div>
                                        <div className={cx('grid-list')}>
                                            <h5 className={cx('grid-list-item-left')}>
                                                207Pb/206Pb date (Ma):
                                            </h5>
                                            <b className={cx('grid-list-item-right')}>
                                                {this.state.data2}
                                            </b>
                                        </div>
                                        <div className={cx('grid-list')}>
                                            <h5 className={cx('grid-list-item-left')}>
                                                208Pb/232Th date (Ma):
                                            </h5>
                                            <b className={cx('grid-list-item-right')}>
                                                {this.state.data3}
                                            </b>
                                        </div>
                                        <div className={cx('grid-list')}>
                                            <h5 className={cx('grid-list-item-left')}>
                                                238U/235U (nat abun):
                                            </h5>
                                            <b className={cx('grid-list-item-right')}>
                                                {this.state.data4}
                                            </b>
                                        </div>
                                        <div className={cx('grid-list-crm')}>
                                            <div className={cx('grid-list-button-crm')}>
                                                <Button variant="contained" color="grey">Manage RM Model</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('crm-model-label')}>
                                        <h6>Select CRM Model:</h6>
                                        <FormControl style={{width: "90%"}}>
                                            <Select
                                                labelId="crm-model-label"
                                                id="crmModel"
                                                name="crmModel"
                                                value={this.state.crmModel}
                                                onChange={this.handleChange}
                                            >
                                                {
                                                    this.state.crmModels.map((value) => {
                                                        if (value != "NONE v.1.0 <Built-in>") {
                                                            return (<MenuItem value={value}>{value}</MenuItem>)
                                                        } else {
                                                            return (<MenuItem disabled={true}
                                                                              value={value}>{value}</MenuItem>)
                                                        }
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className={cx('crm-list')}>
                                        <div className={cx('grid-list-crm')}>
                                            <h5 className={cx('grid-list-item-left-crm')}>
                                                U (ppm):
                                            </h5>
                                            <b className={cx('grid-list-item-right-crm')}>
                                                {this.state.uppm}
                                            </b>
                                        </div>
                                        <div className={cx('grid-list-crm')}>
                                            <h5 className={cx('grid-list-item-left-crm')}>
                                                Th (ppm):
                                            </h5>
                                            <b className={cx('grid-list-item-right-crm')}>
                                                {this.state.thppm}
                                            </b>
                                        </div>
                                        <div className={cx('grid-list-crm')}>
                                            <div className={cx('grid-list-button-crm')}>
                                                <Button variant="contained" color="grey">Manage CRM Model</Button>
                                            </div>
                                        </div>
                                    </div>
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
                }
            </>
        )
    }
}

export default connect()(ManageSpots)