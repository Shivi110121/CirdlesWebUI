import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";


// Components
import Main from "./components/Main"
import SkeletonExample from "./components/ManageProject"
import ManageSpots from "./components/ManageSpots"
import ShowAbout from "./components/ShowAbout"
import 'styles/Squidink/Main.scss';
//Constants
import {
    BASE_ROUTE,
    CURRENTTASK_ROUTE,
    MANAGEPROJECT_ROUTE,
    MANAGESPOTS_ROUTE,
    SHOWABOUT_ROUTE,
    VIEWTASK_ROUTE
} from "./util/constants"
import {CurrentTask} from "./components/CurrentTask";
import TaskLibrary from "./components/TaskLibrary";

class SquidInkPage extends Component {
    render() {
        return (
            <div className="squidink">
                <main>
                    <Route exact path={BASE_ROUTE} component={Main}/>
                    <Route exact path={MANAGEPROJECT_ROUTE} component={SkeletonExample}/>
                    <Route exact path={MANAGESPOTS_ROUTE} component={ManageSpots}/>
                    <Route exact path={SHOWABOUT_ROUTE} component={ShowAbout}/>
                    <Route exact path={CURRENTTASK_ROUTE} component={CurrentTask}/>
                    <Route exact path={VIEWTASK_ROUTE} component={TaskLibrary}/>
                </main>
            </div>
        );
    }
}


export default connect()(SquidInkPage);